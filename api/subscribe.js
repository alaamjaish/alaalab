// Vercel Serverless Function - ConvertKit Subscriber Handler
// This keeps your API key secure on the server side

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get form data from request
  const { email, first_name } = req.body;

  // Validate required fields
  if (!email || !first_name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }

  // ConvertKit API configuration (from environment variables)
  const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
  const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;

  // Check if environment variables are set
  if (!CONVERTKIT_API_KEY || !CONVERTKIT_FORM_ID) {
    console.error('Missing environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Send to ConvertKit API
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email: email,
          first_name: first_name
        })
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Success!
      return res.status(200).json({
        success: true,
        message: 'Subscription successful'
      });
    } else {
      // ConvertKit returned an error
      console.error('ConvertKit error:', data);
      return res.status(response.status).json({
        error: data.message || 'Subscription failed'
      });
    }
  } catch (error) {
    // Network or other error
    console.error('Server error:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
}
