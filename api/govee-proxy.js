export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const response = await fetch('https://openapi.api.govee.com/router/api/v1/device/state', {
      method: 'POST',
      headers: {
        'govee-api-key': process.env.GOVEE_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        requestId: crypto.randomUUID(),
        payload: {
          sku: "H5179",
          device: "E2:A9:18:1F:68:82:D8:B7"
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Govee API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch sensor data',
      details: error.message 
    });
  }
}