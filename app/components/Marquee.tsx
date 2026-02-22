export default function Marquee() {
  return (
    <div
      style={{
        background: "var(--color-dorado)",
        overflow: "hidden",
        paddingTop: "17px",
        paddingBottom: "11px",
        position: "relative",
      }}
    >
      <div className="marquee-container">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="marquee-content">
            {[
              "RAUL GONZALEZ BLANCO",
              "FERNANDO TORRES",
              "XAVI HERNANDEZ",
              "IKER CASILLAS",
              "CARLES PUYOL",
              "FERNANDO HIERRO",
              "LUIS ENRIQUE",
              "MANOLO SANCHIS",
            ].map((nombre, j) => (
              <span
                key={`${i}-${j}`}
                style={{
                  color: "var(--color-verde)",
                  borderRight: "1px solid var(--color-verde-mid)",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "13px",
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
