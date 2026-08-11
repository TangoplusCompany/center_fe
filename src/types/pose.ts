export interface IPoseLandmark {
  index: number;
  isActive: boolean;
  sx: number;
  sy: number;
  wx: number;
  wy: number;
  wz: number;
}

export interface I2DPoseLandmark {
  x: number;
  y: number;
}

export interface I3DPoseLandmark {
  x: number;
  y: number;
  z: number;
}
