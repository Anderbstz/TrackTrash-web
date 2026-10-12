export function TrendChart() {
  const points = "0,132 48,120 96,126 144,96 192,104 240,70 288,82 336,45 384,58 432,35 480,19 528,30 576,8";
  return <div className="chart-wrap">
    <div className="chart-y"><span>160 t</span><span>120 t</span><span>80 t</span><span>40 t</span><span>0</span></div>
    <div className="chart-area">
      <svg viewBox="0 0 576 150" preserveAspectRatio="none" className="chart">
        <defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#26C467" stopOpacity=".22" /><stop offset="1" stopColor="#26C467" stopOpacity="0" /></linearGradient></defs>
        {[18, 50, 82, 114, 146].map(y => <line key={y} x1="0" x2="576" y1={y} y2={y} className="grid-line" />)}
        <polygon points={`${points} 576,150 0,150`} fill="url(#fill)" />
        <polyline points={points} fill="none" stroke="#26C467" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        <circle cx="576" cy="8" r="5" fill="#26C467" stroke="white" strokeWidth="3" />
      </svg>
      <div className="chart-x"><span>1 Jun</span><span>5 Jun</span><span>10 Jun</span><span>15 Jun</span><span>20 Jun</span><span>25 Jun</span><span>30 Jun</span></div>
    </div>
  </div>;
}
