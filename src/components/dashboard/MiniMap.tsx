import { Icon } from "@/components/Icon";

export function MiniMap() {
  const markers: [number, number, string][] = [
    [14, 22, "green"], [28, 63, "amber"], [39, 28, "green"], [51, 52, "red"], [64, 22, "green"], [70, 70, "amber"], [84, 39, "red"], [91, 67, "green"],
  ];
  return <div className="map-box">
    <svg className="map-lines" viewBox="0 0 500 260" preserveAspectRatio="none">
      <path d="M-20 70C80 48 110 105 220 80s180-35 310 20M-20 210c105-65 176-26 250-70s180-2 290-50M80-20c-4 80 45 115 21 300M310-20c22 76-13 130 40 300M430-20c-23 70-5 195 34 300" />
      <path className="road-major" d="M-20 143C115 110 190 180 290 119S420 90 530 135M205-20c20 86-21 194 15 300" />
    </svg>
    <div className="map-label label-1">CAYMA</div><div className="map-label label-2">CERCADO</div><div className="map-label label-3">YANAHUARA</div>
    {markers.map(([x, y, color], i) => <div key={i} className={`marker marker-${color}`} style={{ left: `${x}%`, top: `${y}%` }}><Icon name="bin" size={13} /></div>)}
    <div className="map-legend"><span><i className="dot green-dot" />Normal</span><span><i className="dot amber-dot" />Atención</span><span><i className="dot red-dot" />Crítico</span></div>
  </div>;
}
