export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Route API requests to our handler
    if (url.pathname === '/api/send-email') {
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      };

      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: corsHeaders });
      }

      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      try {
        const { name, email, message, subject } = await request.json();

        if (!env.RESEND_API_KEY) {
          return new Response(JSON.stringify({ error: 'RESEND_API_KEY environment variable is not set.' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Call Resend API using native fetch
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Contact Form <website@wajahatsiddique.com>',
            to: ['contact@wajahatsiddique.com'],
            subject: subject || 'New Contact Form Submission',
            reply_to: email,
            html: `
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            `,
          }),
        });

        const data = await res.json();
        return new Response(JSON.stringify(data), {
          status: res.ok ? 200 : res.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Otherwise, serve static assets
    return env.ASSETS.fetch(request);
  },
};
