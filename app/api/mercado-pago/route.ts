import { NextRequest, NextResponse } from "next/server";
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN || "",
});

export async function POST(req: NextRequest) {
  try {
    const preference = {
      items: [
        {
          title: "Pago de prueba",
          quantity: 1,
          unit_price: 1.0,
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "https://prueba-mp-kappa.vercel.app/mercado-pago/success",
        failure: "https://prueba-mp-kappa.vercel.app/mercado-pago/failure",
        pending: "https://prueba-mp-kappa.vercel.app/mercado-pago/pending",
      },
       auto_return: "approved", // Hay que probarlo remotamente, de forma local rompe la llamada al link de mp
    };

    const response = await mercadopago.preferences.create(preference);
    console.log("Init point generado:", response.body.init_point);

    return NextResponse.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error("Error creando preferencia:", error);
    return NextResponse.json({ error: "Error creando preferencia" }, { status: 500 });
  }
}
