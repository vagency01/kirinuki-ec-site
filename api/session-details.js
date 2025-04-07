// /api/session-details.js

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51RAZVXBRsJ5pZ7020fQL54uhRXU3YW5tOy9R65UtFmhfiBblNnpvBICsBlzPeart4GVlkTY1TufcXQ9XZAvuH5VN00v5lbeKf8');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const metadata = session.metadata || {};

    let planName = session.line_items?.data?.[0]?.price?.product || '不明';
    let price = session.amount_total ? session.amount_total / 100 : '不明';

    res.status(200).json({
      planName: session.metadata.planName || planName,
      price: price,
      videoUrl: metadata.video_url || '不明',
      details: metadata.details || '不明',
      email: metadata.email || '不明',
      orderId: session.id || '不明',
    });
  } catch (error) {
    console.error('Error retrieving session details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
