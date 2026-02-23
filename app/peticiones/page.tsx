"use client";

import { useState } from "react";

export default function PeticionesPage() {
  const [formData, setFormData] = useState({
    nombreJugador: "",
    equipo: "",
    epoca: "",
    email: "",
    detalles: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje("");

    try {
      const res = await fetch("/api/peticiones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMensaje(
          "✓ Peticion enviada correctamente. Gracias por tu sugerencia!",
        );
        setFormData({
          nombreJugador: "",
          equipo: "",
          epoca: "",
          email: "",
          detalles: "",
        });
      } else {
        setMensaje("✗ Hubo un error. Por favor intenta de nuevo.");
      }
    } catch (error) {
      setMensaje("✗ Error al enviar la peticion.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={{ background: "var(--color-crema)", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          background: "var(--color-verde)",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1
            style={{
              color: "var(--color-crema)",
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(36px,5vw,56px)",
              fontWeight: 900,
              marginBottom: "16px",
            }}
          >
            Solicita tu cuadro
          </h1>
          <p
            style={{
              color: "rgba(245,239,224,0.8)",
              fontSize: "16px",
              lineHeight: 1.7,
            }}
          >
            Cuentanos que jugador o momento te gustaria ver en nuestra coleccion
          </p>
        </div>
      </section>

      {/* Formulario */}
      <div
        style={{ padding: "80px 24px", maxWidth: "700px", margin: "0 auto" }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "4px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                color: "var(--color-tinta)",
                fontFamily: "var(--font-bebas)",
                fontSize: "12px",
                letterSpacing: "2px",
                marginBottom: "8px",
              }}
            >
              Nombre del jugador *
            </label>
            <input
              type="text"
              required
              value={formData.nombreJugador}
              onChange={(e) =>
                setFormData({ ...formData, nombreJugador: e.target.value })
              }
              placeholder="Ej: Raul Gonzalez"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid var(--color-crema-osc)",
                borderRadius: "2px",
                fontSize: "15px",
                fontFamily: "var(--font-baskerville)",
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                color: "var(--color-tinta)",
                fontFamily: "var(--font-bebas)",
                fontSize: "12px",
                letterSpacing: "2px",
                marginBottom: "8px",
              }}
            >
              Equipo
            </label>
            <input
              type="text"
              value={formData.equipo}
              onChange={(e) =>
                setFormData({ ...formData, equipo: e.target.value })
              }
              placeholder="Ej: Real Madrid"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid var(--color-crema-osc)",
                borderRadius: "2px",
                fontSize: "15px",
                fontFamily: "var(--font-baskerville)",
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                color: "var(--color-tinta)",
                fontFamily: "var(--font-bebas)",
                fontSize: "12px",
                letterSpacing: "2px",
                marginBottom: "8px",
              }}
            >
              Epoca
            </label>
            <input
              type="text"
              value={formData.epoca}
              onChange={(e) =>
                setFormData({ ...formData, epoca: e.target.value })
              }
              placeholder="Ej: Anos 90, 2000-2005"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid var(--color-crema-osc)",
                borderRadius: "2px",
                fontSize: "15px",
                fontFamily: "var(--font-baskerville)",
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                color: "var(--color-tinta)",
                fontFamily: "var(--font-bebas)",
                fontSize: "12px",
                letterSpacing: "2px",
                marginBottom: "8px",
              }}
            >
              Tu email (opcional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Para notificarte si lo creamos"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid var(--color-crema-osc)",
                borderRadius: "2px",
                fontSize: "15px",
                fontFamily: "var(--font-baskerville)",
              }}
            />
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label
              style={{
                display: "block",
                color: "var(--color-tinta)",
                fontFamily: "var(--font-bebas)",
                fontSize: "12px",
                letterSpacing: "2px",
                marginBottom: "8px",
              }}
            >
              Detalles adicionales
            </label>
            <textarea
              value={formData.detalles}
              onChange={(e) =>
                setFormData({ ...formData, detalles: e.target.value })
              }
              placeholder="Momento especifico, foto de referencia, etc."
              rows={4}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid var(--color-crema-osc)",
                borderRadius: "2px",
                fontSize: "15px",
                fontFamily: "var(--font-baskerville)",
                resize: "vertical",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={enviando}
            style={{
              width: "100%",
              background: enviando ? "var(--color-gris)" : "var(--color-verde)",
              color: "var(--color-crema)",
              border: "none",
              fontFamily: "var(--font-bebas)",
              fontSize: "15px",
              letterSpacing: "3px",
              padding: "16px",
              borderRadius: "2px",
              cursor: enviando ? "not-allowed" : "pointer",
              transition: "all 0.3s",
            }}
          >
            {enviando ? "ENVIANDO..." : "ENVIAR PETICION"}
          </button>

          {mensaje && (
            <div
              style={{
                marginTop: "20px",
                padding: "16px",
                background: mensaje.includes("✓")
                  ? "rgba(74,140,92,0.1)"
                  : "rgba(192,57,43,0.1)",
                color: mensaje.includes("✓")
                  ? "var(--color-verde)"
                  : "var(--color-rojo)",
                borderRadius: "4px",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {mensaje}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
