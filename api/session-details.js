// /api/session-details.js

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51RAZVXBRsJ5pZ7020fQL54uhRXU3YW5tOy9R65UtFmhfiBblNnpvBICsBlzPeart4GVlkTY1TufcXQ9XZAvuH5VN00v5lbeKf8');

module.exports = async (req, res) => {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'Session ID is required' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // プランごとに情報をマッピング
    const planInfo = {
      'プラン1 - VTuber切り抜きサービス': { planName: 'きほんプラン', price: 3000 },
      'プラン2 - VTuber切り抜きサービス': { planName: 'おんぶにだっこプラン', price: 4000 },
      'プラン3 - VTuber切り抜きサービス': { planName: 'ゆるイラスト切り抜き', price: 8000 },
    };

    const productDescription = session?.display_items?.[0]?.custom?.name || session?.line_items?.data?.[0]?.price?.product_data?.name || '';

    const selectedPlan = planInfo[productDescription] || { planName: '不明', price: '不明' };

    res.status(200).json({
      planName: selectedPlan.planName,
      price: selectedPlan.price,
      videoUrl: session.metadata.video_url || '不明',
      details: session.metadata.details || '不明',
      email: session.metadata.email || '不明',
      orderId: session.id || '不明',
    });
  } catch (error) {
    console.error('Error retrieving session details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
