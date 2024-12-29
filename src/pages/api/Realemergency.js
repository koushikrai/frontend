// Update the route to match the path in your frontend
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { address, details } = req.body;

    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    try {
      // Your backend logic here
    } catch (error) {
      console.error("Error processing request:", error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
