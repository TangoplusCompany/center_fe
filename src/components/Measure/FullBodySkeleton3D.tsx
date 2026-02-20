"use client";

import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useMemo } from "react";
import * as THREE from "three";
import { IUserDetailMeasureInfo } from "@/types/measure";

type RiskKey = "risk_neck" | "risk_shoulder_left" | "risk_shoulder_right" | "risk_elbow_left" | "risk_elbow_right" | "risk_hip_left" | "risk_hip_right" | "risk_knee_left" | "risk_knee_right" | "risk_ankle_left" | "risk_ankle_right";

type JointPoint = {
  position: [number, number, number];
  riskKey: RiskKey;
};

type JointLevel = "none" | "warning" | "danger";

type JointColor = {
  core: string;
  emissive: string;
  halo: string;
};

const jointColorByLevel: Record<JointLevel, JointColor> = {
  none: {
    core: "#3b82f6",
    emissive: "#1d4ed8",
    halo: "#60a5fa"
  },
  warning: {
    core: "#f59e0b",
    emissive: "#d97706",
    halo: "#fbbf24"
  },
  danger: {
    core: "#ef4444",
    emissive: "#dc2626",
    halo: "#f87171"
  }
};

/** 스켈레톤이 정면을 보도록 하는 Y축 회전 (모델과 JointDots에 동일 적용) */
const SKELETON_FRONT_Y = 0.3;

const jointPoints: JointPoint[] = [
  { position: [0, 1.65, -0.025], riskKey: "risk_neck" },
  { position: [-0.15, 1.59, -0.055], riskKey: "risk_shoulder_left" },
  { position: [0.15, 1.59, -0.055], riskKey: "risk_shoulder_right" },
  { position: [-0.21, 1.34, -0.055], riskKey: "risk_elbow_left" },
  { position: [0.21, 1.34, -0.055], riskKey: "risk_elbow_right" },
  { position: [-0.125, 1.1, -0.02], riskKey: "risk_hip_left" },
  { position: [0.125, 1.1, -0.02], riskKey: "risk_hip_right" },
  { position: [-0.07, 0.79, -0.01], riskKey: "risk_knee_left" },
  { position: [0.07, 0.79, -0.01], riskKey: "risk_knee_right" },
  { position: [-0.06, 0.4, -0.04], riskKey: "risk_ankle_left" },
  { position: [0.06, 0.4, -0.04], riskKey: "risk_ankle_right" }
];

function getJointLevel(risk: number): JointLevel {
  const level = Number(risk);
  if (level >= 2) return "danger";
  if (level >= 1) return "warning";
  return "none";
}

function SkeletonModel() {
  const gltf = useGLTF("/models/free_pack_-_human_skeleton/scene.gltf");
  const model = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(model);
    if (box.isEmpty()) return;

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    model.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const uniformScale = maxDim > 0 ? 1.55 / maxDim : 1;
    model.scale.setScalar(uniformScale);
    model.position.y += (size.y * uniformScale) / 2 + 0.48;
    model.rotation.y = SKELETON_FRONT_Y;

    model.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [model]);

  return <primitive object={model} position={[0, 0.02, 0]} />;
}

function JointDots({ data }: { data: IUserDetailMeasureInfo }) {
  return (
    <group position={[0, 0.02, 0]} rotation={[0, SKELETON_FRONT_Y, 0]}>
      {jointPoints.map((joint) => {
        const risk = data[joint.riskKey] ?? 0;
        const level = getJointLevel(risk);
        if (level === "none") return null;
        const colors = jointColorByLevel[level];

        return (
          <group key={joint.riskKey} position={joint.position} renderOrder={10}>
            <mesh>
              <sphereGeometry args={[0.024, 20, 20]} />
              <meshStandardMaterial
                color={colors.core}
                emissive={colors.emissive}
                emissiveIntensity={0.45}
                depthTest={false}
                depthWrite={false}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.05, 20, 20]} />
              <meshBasicMaterial
                color={colors.halo}
                transparent
                opacity={0.25}
                depthTest={false}
                depthWrite={false}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

useGLTF.preload("/models/free_pack_-_human_skeleton/scene.gltf");

type FullBodySkeleton3DProps = {
  data: IUserDetailMeasureInfo;
  className?: string;
};

export function FullBodySkeleton3D({ data, className }: FullBodySkeleton3DProps) {
  return (
    <div className={className ?? "w-full h-full min-h-[300px]"}>
      <Canvas
        camera={{ position: [0.7, 1.34, 2.2], fov: 42 }}
        shadows
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.78} />
        <directionalLight
          castShadow
          intensity={1.15}
          position={[2.4, 3.6, 1.5]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <hemisphereLight
          intensity={0.45}
          groundColor="#ced8e8"
          color="#ffffff"
        />

        <Suspense
          fallback={
            <Html center>
              <div
                className="flex flex-col items-center justify-center gap-2 rounded-lg bg-black/40 px-6 py-4"
                style={{ minWidth: 120 }}
              >
                <div
                  className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white"
                  aria-hidden
                />
                <span className="text-sm text-white/90">로딩중...</span>
              </div>
            </Html>
          }
        >
          <SkeletonModel />
        </Suspense>
        <JointDots data={data} />

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.09}
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          target={[0, 1.1, 0]}
        />
      </Canvas>
    </div>
  );
}