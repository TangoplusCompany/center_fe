<div className="w-full max-w-xl mx-auto">

  <p className="text-sm mb-2" style={{ color: "#9A9A9A" }}>
    *측정 기준 설명
  </p>

  {/* 상단 3단 바 */}
  <div className="flex overflow-hidden rounded-xl border" style={{ borderColor: "#E5E5E5" }}>
    <div className="flex-1 py-3 text-center font-semibold" style={{ backgroundColor: "#F5F5F5", color: "#555555" }}>
      정상
    </div>
    <div className="flex-1 py-3 text-center font-semibold" style={{ backgroundColor: "#F5DDC3", color: "#B5741A" }}>
      주의
    </div>
    <div className="flex-1 py-3 text-center font-semibold" style={{ backgroundColor: "#C77C82", color: "#81363D" }}>
      위험
    </div>
  </div>

  {/* 하단 설명 */}
  <div className="flex justify-between text-sm mt-3">
    <span style={{ color: "#9A9A9A" }}>상태 유지 강화 권장</span>
    <span style={{ color: "#B5741A" }}>제공되는 맨몸 운동 권장</span>
    <span style={{ color: "#81363D" }}>전문가 상담 권장</span>
  </div>
</div>