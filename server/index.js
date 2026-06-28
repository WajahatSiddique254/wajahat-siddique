import 'dotenv/config';
import express from 'express';
import { Resend } from 'resend';

const app = express();
const PORT = process.env.API_PORT || 3001;

app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'RESEND_API_KEY not set' });
    }

    const resend = new Resend(apiKey);
    const { name, email, message, subject } = req.body;

    const { data, error } = await resend.emails.send({
      from: 'Contact Form <website@wajahatsiddique.com>',
      to: ['contact@wajahatsiddique.com'],
      subject: subject || 'New Contact Form Submission',
      replyTo: email,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      return res.status(500).json({ error });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

