// /api/create-checkout-session.js

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51RAZVXBRsJ5pZ7020fQL54uhRXU3YW5tOy9R65UtFmhfiBblNnpvBICsBlzPeart4GVlkTY1TufcXQ9XZAvuH5VN00v5lbeKf8'); // シークレットキー

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { videoUrl, details, name, email } = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'jpy',
              product_data: {
                name: 'プラン1 - VTuber切り抜きサービス',
                description: `希望詳細: ${details}`,
              },
              unit_amount: 1000, // 価格（単位は最小通貨単位）
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.YOUR_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.YOUR_DOMAIN}/cancel.html`,
        metadata: {
          video_url: videoUrl,
          name: name,
          email: email,
        },
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
