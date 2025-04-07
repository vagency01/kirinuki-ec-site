const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'Session ID is required' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const lineItems = await stripe.checkout.sessions.listLineItems(session_id, { limit: 1 });

    const productName = lineItems.data[0]?.description || '不明';
    const price = (lineItems.data[0]?.price?.unit_amount || 0) / 100;

    const metadata = session.metadata || {};

    res.status(200).json({
      planName: productName,
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
}
