"use client";

import { useState, useEffect } from "react";
import { useCarrito } from "../context/CarritoContext";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { trackBeginCheckout } from "../lib/analytics";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function CheckoutPage() {
  const { items, totalPrecio } = useCarrito(); // ELIMINADO limpiarCarrito
  const router = useRouter();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // Datos formulario
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [provincia, setProvincia] = useState("");

  // Track begin checkout
  useEffect(() => {
    if (items.length > 0) {
      trackBeginCheckout(totalPrecio, items);
    }
  }, [items, totalPrecio]);

  // Redirigir si carrito vacío
  useEffect(() => {
    if (items.length === 0) {
      router.push("/carrito");
    }
  }, [items, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError("");

    try {
      // Crear checkout session en Stripe
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          customerInfo: {
            nombre,
            email,
            telefono,
            direccion: {
              calle: direccion,
              ciudad,
              codigoPostal,
              provincia,
            },
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear sesión de pago");
      }

      // Redirigir a Stripe Checkout - MÉTODO CORRECTO
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Error al cargar Stripe");
      }

      // Usar el método correcto de Stripe.js v2+
      window.location.href = data.url; // CAMBIO AQUÍ
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error checkout:", err);
      setError(err.message || "Error al procesar el pago");
      setCargando(false);
    }
  };

  if (items.length === 0) {
    return null; // Se redirige automáticamente
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-crema)",
        padding: "80px 24px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <h1
            style={{
              color: "var(--color-verde)",
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 900,
              marginBottom: "12px",
            }}
          >
            Finalizar Pedido
          </h1>
          <p
            style={{
              color: "var(--color-gris)",
              fontSize: "15px",
            }}
          >
            Completa tus datos para continuar al pago seguro
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            marginBottom: "32px",
          }}
        >
          <h2
            style={{
              color: "var(--color-tinta)",
              fontFamily: "var(--font-playfair)",
              fontSize: "24px",
              fontWeight: 700,
              marginBottom: "24px",
            }}
          >
            Datos de contacto
          </h2>

          <div style={{ display: "grid", gap: "20px", marginBottom: "32px" }}>
            <div>
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
                Nombre completo *
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid var(--color-crema-osc)",
                  borderRadius: "4px",
                  fontSize: "15px",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
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
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid var(--color-crema-osc)",
                    borderRadius: "4px",
                    fontSize: "15px",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div>
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
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid var(--color-crema-osc)",
                    borderRadius: "4px",
                    fontSize: "15px",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>
          </div>

          <h2
            style={{
              color: "var(--color-tinta)",
              fontFamily: "var(--font-playfair)",
              fontSize: "24px",
              fontWeight: 700,
              marginBottom: "24px",
            }}
          >
            Dirección de envío
          </h2>

          <div style={{ display: "grid", gap: "20px" }}>
            <div>
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
                Dirección completa *
              </label>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
                placeholder="Calle, número, piso, puerta..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid var(--color-crema-osc)",
                  borderRadius: "4px",
                  fontSize: "15px",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
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
                  Ciudad *
                </label>
                <input
                  type="text"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid var(--color-crema-osc)",
                    borderRadius: "4px",
                    fontSize: "15px",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div>
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
                  Código Postal *
                </label>
                <input
                  type="text"
                  value={codigoPostal}
                  onChange={(e) => setCodigoPostal(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid var(--color-crema-osc)",
                    borderRadius: "4px",
                    fontSize: "15px",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            <div>
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
                Provincia *
              </label>
              <input
                type="text"
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid var(--color-crema-osc)",
                  borderRadius: "4px",
                  fontSize: "15px",
                  fontFamily: "inherit",
                }}
              />
            </div>
          </div>

          {error && (
            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                background: "#fee",
                border: "1px solid #fcc",
                borderRadius: "4px",
                color: "#c00",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={cargando}
            style={{
              width: "100%",
              marginTop: "32px",
              background: cargando ? "var(--color-gris)" : "var(--color-verde)",
              color: "var(--color-crema)",
              border: "none",
              fontFamily: "var(--font-bebas)",
              fontSize: "16px",
              letterSpacing: "3px",
              padding: "18px 36px",
              borderRadius: "4px",
              cursor: cargando ? "not-allowed" : "pointer",
              transition: "all 0.3s",
            }}
          >
            {cargando ? "PROCESANDO..." : "CONTINUAR AL PAGO"}
          </button>
        </form>

        {/* Resumen pedido */}
        <div
          style={{
            background: "white",
            padding: "32px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3
            style={{
              color: "var(--color-tinta)",
              fontFamily: "var(--font-playfair)",
              fontSize: "20px",
              fontWeight: 700,
              marginBottom: "20px",
            }}
          >
            Resumen del pedido
          </h3>

          <div
            style={{
              borderTop: "1px solid var(--color-crema-osc)",
              paddingTop: "16px",
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                  fontSize: "14px",
                }}
              >
                <div>
                  <div style={{ color: "var(--color-tinta)", fontWeight: 600 }}>
                    {item.nombre}
                  </div>
                  <div style={{ color: "var(--color-gris)", fontSize: "13px" }}>
                    {item.formato.label} × {item.cantidad}
                  </div>
                </div>
                <div
                  style={{
                    color: "var(--color-verde)",
                    fontWeight: 700,
                    fontFamily: "var(--font-playfair)",
                  }}
                >
                  {(item.formato.precio * item.cantidad).toFixed(2)} €
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: "2px solid var(--color-crema-osc)",
              marginTop: "16px",
              paddingTop: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "var(--color-tinta)",
                fontFamily: "var(--font-bebas)",
                fontSize: "16px",
                letterSpacing: "2px",
              }}
            >
              TOTAL
            </span>
            <span
              style={{
                color: "var(--color-verde)",
                fontFamily: "var(--font-playfair)",
                fontSize: "28px",
                fontWeight: 700,
              }}
            >
              {totalPrecio.toFixed(2)} €
            </span>
          </div>

          <div
            style={{
              marginTop: "16px",
              padding: "12px",
              background: "var(--color-crema)",
              borderRadius: "4px",
              fontSize: "13px",
              color: "var(--color-gris)",
              textAlign: "center",
            }}
          >
            🚚 Envío gratis incluido · 📦 Entrega en 2-4 días
          </div>
        </div>
      </div>
    </div>
  );
}
