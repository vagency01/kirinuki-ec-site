const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).send('セッションIDが見つかりません。');
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const metadata = session.metadata;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="ja">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
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
              <p><strong>切り抜き元のURL:</strong> ${metadata.video_url || '取得失敗'}</p>
              <p><strong>希望詳細:</strong> ${metadata.details || '取得失敗'}</p>
              <p><strong>完成しましたら:</strong> ${metadata.email || '取得失敗'} にお送りいたします。</p>
              <p><strong>注文番号:</strong> ${session.id}</p>

              <a href="/" class="btn">ホームへ戻る</a>
          </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('セッション取得エラー:', error);
    res.status(500).send('内部サーバーエラーが発生しました。');
  }
};
