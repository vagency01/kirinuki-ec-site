const express = require('express');
const Stripe = require('stripe');
const cors = require('cors'); // CORSライブラリをインポート

const stripe = Stripe('sk_test_51RAZVXBRsJ5pZ7020fQL54uhRXU3YW5tOy9R65UtFmhfiBblNnpvBICsBlzPeart4GVlkTY1TufcXQ9XZAvuH5VN00v5lbeKf8'); // シークレットキー

const app = express();

// CORSを許可する設定
app.use(cors({
    origin: 'https://kirinuki-ec-site.vercel.app', // 許可するドメインを設定
    methods: ['GET', 'POST'], // 許可するHTTPメソッド
    allowedHeaders: ['Content-Type'] // 許可するヘッダー
}));

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
      success_url: `${YOUR_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
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

// 成功ページにデータを表示
app.get('/success.html', async (req, res) => {
  const sessionId = req.query.session_id;

  // セッション情報を取得
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  // メタデータの取得
  const metadata = session.metadata;

  res.send(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>決済成功</title>
        <style>
            body {
                font-family: 'Hiragino Kaku Gothic ProN', 'メイリオ', sans-serif;
                background-color: #FFF8EF;
                margin: 0;
                padding: 0;
                text-align: center;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .success-message {
                background-color: #FF9D00;
                color: white;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
            }
            .btn {
                background-color: #FF9D00;
                color: white;
                padding: 10px 20px;
                border-radius: 20px;
                text-decoration: none;
                font-weight: bold;
            }
            .btn:hover {
                background-color: #FF7F00;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>購入が完了しました！</h1>
            <p class="success-message">下記の内容で制作いたします。(納品予定1〜2週間以内)</p>

            <p><strong>購入プラン名:</strong> プラン1 - VTuber切り抜きサービス</p>
            <p><strong>値段:</strong> ¥1,000</p>
            <p><strong>切り抜き元のURL:</strong> ${metadata.video_url}</p>
            <p><strong>希望詳細:</strong> ${metadata.details}</p>
            <p><strong>完成しましたら:</strong> ${metadata.email} にお送りいたします。</p>
            <p><strong>注文番号:</strong> ${session.id}</p>

            <a href="index.html" class="btn">ホームへ戻る</a>
        </div>
    </body>
    </html>
  `);
});

// サーバーを指定ポートで起動
const YOUR_DOMAIN = "https://kirinuki-ec-site.vercel.app"; // 本番のURLを指定
app.listen(4242, () => {
  console.log('Server is running on http://localhost:4242');
});
