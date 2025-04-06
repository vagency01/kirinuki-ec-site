const express = require('express');
const Stripe = require('stripe');
const cors = require('cors'); // CORSパッケージをインポート

const stripe = Stripe('sk_test_51RAZVXBRsJ5pZ7020fQL54uhRXU3YW5tOy9R65UtFmhfiBblNnpvBICsBlzPeart4GVlkTY1TufcXQ9XZAvuH5VN00v5lbeKf8'); // シークレットキー

const app = express();

// CORSを有効にする
app.use(cors());  // ここでCORSを有効にする

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
            currency: 'jpy', // 通貨
            product_data: {
              name: 'プラン1 - VTuber切り抜きサービス',
              description: `希望詳細: ${details}`, // ここに希望詳細を表示
            },
            unit_amount: 1000, // 価格（単位は最小通貨単位）
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
      metadata: {
        video_url: videoUrl,
        name: name,
        email: email,
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send('Internal Server Error');
  }
});

// サーバーを指定ポートで起動
const YOUR_DOMAIN = "http://127.0.0.1:4242"; // ローカルホストのURLに変更
app.listen(4242, () => {
  console.log('Server is running on http://127.0.0.1:4242');
});
