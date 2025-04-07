// /api/create-checkout-session.js

const Stripe = require('stripe');
const cors = require('cors');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // 環境変数から取得

// CORSミドルウェアをセットアップ
const corsHandler = cors({
  origin: ['https://vkirinukiproject.vercel.app', 'http://localhost:3000'],
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
});

module.exports = async (req, res) => {
  await new Promise((resolve, reject) => {
    corsHandler(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { videoUrl, details, name, email } = req.body;

    // プラン判定
    let planName = '';
    let amount = 0;

    if (details.includes('イラスト')) {
      planName = 'ゆるイラスト切り抜き';
      amount = 8000;
    } else if (details.includes('リンクを送るだけ')) {
      planName = 'おんぶにだっこプラン';
      amount = 4000;
    } else {
      planName = 'きほんプラン';
      amount = 3000;
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'jpy',
              product_data: {
                name: planName,
                description: `希望詳細: ${details}`,
              },
              unit_amount: amount * 100, // 円を最小単位に
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_URL || 'https://vkirinukiproject.vercel.app'}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://vkirinukiproject.vercel.app'}/cancel.html`,
        metadata: {
          video_url: videoUrl,
          name: name,
          email: email,
          details: details,
          plan: planName,
          amount: amount,
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
