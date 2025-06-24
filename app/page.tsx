"use client"; // 👈 importante para que el botón funcione (hace falta para usar hooks o eventos en App Router)

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handlePago = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/mercado-pago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Si necesitás enviar datos, agregalos en el body:
        // body: JSON.stringify({ productos: [...] })
      });

      if (!response.ok) throw new Error("Error al contactar la API");

      const data = await response.json();

      // Supongamos que tu backend devuelve el link de pago
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("No se recibió un link de pago");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al intentar pagar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            onClick={handlePago}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-green-600 text-white hover:bg-green-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8"
            disabled={loading}
          >
            {loading ? "Generando link..." : "Pagar con Mercado Pago"}
          </button>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* tus links de abajo */}
      </footer>
    </div>
  );
}
