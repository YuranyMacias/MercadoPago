import mercadopage from "mercadopago";
import { HOST, MERCADOPAGO_API_KEY } from "../config.js";

export const createOrder = async (req, res) => {
  mercadopage.configure({
    access_token: MERCADOPAGO_API_KEY,
  });

  try {
    const result = await mercadopage.preferences.create({
      items: [
        {
          title: "Pago pedido productos en ModaSport",
          unit_price: 5000,
          currency_id: "COP",
          quantity: 1,
        },
      ],
      notification_url: `${HOST}/webhook`,
      back_urls: {
        success: `${HOST}/success`,
        // pending: `${HOST}/pending`,
        // failure: `${HOST}/failure`,
      },
    });

    console.log('Create Order: ------------------> ', result);

    // res.json({ message: "Payment creted" });
    res.json(result.body);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;
    console.log('payment: ------------------> ', payment);
    if (payment.type === "payment") {
      const data = await mercadopage.payment.findById(payment["data.id"]);
      console.log(data);
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
