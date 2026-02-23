export default function Marquee() {
  const nombres = [
    "MANOLO PRECIADO",
    "EUROMALAGA",
    "IKER MUÑAIN",
    "ANTONIO PUERTA",
    "IAGO ASPAS",
    "DANI PAREJO",
    "JAVI MORENO",
    "MÁGICO GONZÁLEZ",
    "MICHEL",
    "PABLO INFANTE",
  ];

  return (
    <div
      style={{
        background: "var(--color-dorado)",
        overflow: "hidden",
        padding: "8px 0",
        position: "relative",
      }}
    >
      <div className="marquee-container">
        {/* Duplicar 4 veces para loop perfecto */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="marquee-content">
            {nombres.map((nombre, j) => (
              <span
                key={`${i}-${j}`}
                style={{
                  color: "var(--color-verde)",
                  borderRight: "1px solid var(--color-verde-mid)",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "11px",
                  letterSpacing: "4px",
                  padding: "0 32px",
                  whiteSpace: "nowrap",
                }}
              >
                {nombre}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
