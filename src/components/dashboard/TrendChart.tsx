import type { SerieTendencia } from "@/lib/api/types";

const VIEWBOX_WIDTH = 576;
const TOP_Y = 18;
const BOTTOM_Y = 146;

function buildPoints(serie: SerieTendencia): string {
  const count = serie.valores.length;
  if (count === 0) return "";
  const stepX = VIEWBOX_WIDTH / (count - 1);
  return serie.valores
    .map((valor, index) => {
      const x = Math.round(index * stepX);
      const y = Math.round(BOTTOM_Y - (valor / serie.valorMaximo) * (BOTTOM_Y - TOP_Y));
      return `${x},${y}`;
    })
    .join(" ");
}

export function TrendChart({ serie }: { serie: SerieTendencia }) {
  const points = buildPoints(serie);
  const [lastX = VIEWBOX_WIDTH, lastY = TOP_Y] = (points.split(" ").pop() ?? "").split(",");
  const gridLines = serie.ejeY.map((_, index) =>
    Math.round(TOP_Y + (index * (BOTTOM_Y - TOP_Y)) / (serie.ejeY.length - 1)),
  );

  return <div className="chart-wrap">
    <div className="chart-y">{serie.ejeY.map(label => <span key={label}>{label}</span>)}</div>
    <div className="chart-area">
      <svg viewBox="0 0 576 150" preserveAspectRatio="none" className="chart">
        <defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#26C467" stopOpacity=".22" /><stop offset="1" stopColor="#26C467" stopOpacity="0" /></linearGradient></defs>
        {gridLines.map(y => <line key={y} x1="0" x2="576" y1={y} y2={y} className="grid-line" />)}
        <polygon points={`${points} 576,150 0,150`} fill="url(#fill)" />
        <polyline points={points} fill="none" stroke="#26C467" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        <circle cx={lastX} cy={lastY} r="5" fill="#26C467" stroke="white" strokeWidth="3" />
      </svg>
      <div className="chart-x">{serie.ejeX.map(label => <span key={label}>{label}</span>)}</div>
    </div>
  </div>;
}
