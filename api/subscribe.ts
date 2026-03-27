// api/subscribe.ts
// Vercel Serverless Function — salva gli iscritti newsletter in Supabase
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const { email } = req.body as { email?: string };

  // Validazione email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(400).json({ error: 'Email non valida' });
  }

  const { error } = await supabase
    .from('subscribers')
    .insert({ email: email.toLowerCase().trim() });

  if (error) {
    // Codice 23505 = violazione unique constraint (email già presente)
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email già iscritta' });
    }
    console.error('Supabase error:', error);
    return res.status(500).json({ error: 'Errore del server' });
  }

  return res.status(200).json({ success: true });
}
