// /api/create-checkout-session.js

const Stripe = require('stripe');
const cors = require('cors');
const stripe = Stripe('sk_test_51RAZVXBRsJ5pZ7020fQL54uhRXU3YW5tOy9R65UtFmhfiBblNnpvBICsBlzPeart4GVlkTY1TufcXQ9XZAvuH5VN00v5lbeKf8');

// CORSミドルウェアをセットアップ
const corsHandler = cors({
  origin: ['https://vkirinukiproject.vercel.app', 'http://localhost:3000'],
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
});

module.exports = async (req, res) => {
  // CORSヘッダーを適用
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

    let planName = '';
    let unitAmount = 0;

    // プランの判定（URLで判別）
    const referer = req.headers.referer || '';
    if (referer.includes('plan1_form.html')) {
      planName = 'きほんプラン';
      unitAmount = 3000;
    } else if (referer.includes('plan2_form.html')) {
      planName = 'おんぶにだっこプラン';
      unitAmount = 4000;
    } else if (referer.includes('plan3_form.html')) {
      planName = 'ゆるイラスト切り抜き';
      unitAmount = 8000;
    } else {
      planName = '不明なプラン';
      unitAmount = 0;
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
              unit_amount: unitAmount, // ← 修正済み！100倍しない
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
        },
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
