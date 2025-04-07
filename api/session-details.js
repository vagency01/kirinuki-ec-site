const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).send('Bad Request: session_id is required');
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const metadata = session.metadata;

    res.status(200).json({
      plan: session.display_items ? session.display_items[0].custom.name : "不明",
      amount: session.amount_total || "不明",
      video_url: metadata.video_url,
      details: metadata.details,
      name: metadata.name,
      email: metadata.email,
      sessionId: session.id,
    });
  } catch (error) {
    console.error('Error retrieving session details:', error);
    res.status(500).send('Internal Server Error');
  }
};
