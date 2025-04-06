const express = require('express');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Vercel環境変数を使用

const app = express();
app.use(express.static('public'));
app.use(express.json());

// /create-checkout-sessionエンドポイントを作成
app.post('/create-checkout-session', async (req, res) => {
  const { videoUrl, details, name, email } = req.body;

  try {
    // Checkoutセッションを作成
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
        details: details,
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send('Internal Server Error');
  }
});

// サーバーを指定ポートで起動
const YOUR_DOMAIN = process.env.YOUR_DOMAIN || "http://localhost:4242"; // 本番URLを環境変数に設定
app.listen(4242, () => {
  console.log('Server is running on http://localhost:4242');
});
