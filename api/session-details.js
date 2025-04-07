const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const sessionId = req.query.session_id;

  if (!sessionId) {
    return res.status(400).json({ error: 'セッションIDが必要です。' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const metadata = session.metadata || {};

    let planName = '';
    let price = '';

    // 単価からプランを判別
    switch (session.amount_total) {
      case 3000 * 100:
        planName = 'きほんプラン';
        price = '3,000';
        break;
      case 4000 * 100:
        planName = 'おんぶにだっこプラン';
        price = '4,000';
        break;
      case 8000 * 100:
        planName = 'ゆるイラスト切り抜き';
        price = '8,000';
        break;
      default:
        planName = '不明';
        price = '不明';
    }

    res.status(200).json({
      plan_name: planName,
      price: price,
      video_url: metadata.video_url || '不明',
      details: metadata.details || '不明',
      email: metadata.email || '不明',
    });
  } catch (error) {
    console.error('Error fetching session details:', error);
    res.status(500).json({ error: 'セッション情報の取得に失敗しました。' });
  }
};
