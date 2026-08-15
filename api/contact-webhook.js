// Función serverless de Vercel: recibe el formulario de contacto y lo
// reenvía a un canal de Discord vía Webhook. La URL del webhook vive solo
// en la variable de entorno DISCORD_CONTACT_WEBHOOK_URL (Vercel → Settings
// → Environment Variables) y nunca se expone al navegador.

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const webhookUrl = process.env.DISCORD_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('Falta la variable de entorno DISCORD_CONTACT_WEBHOOK_URL');
    return res.status(500).json({ error: 'Integración no configurada' });
  }

  const { name, email, service, message } = req.body || {};

  if (
    typeof name !== 'string' || !name.trim() ||
    !isValidEmail(email) ||
    typeof service !== 'string' || !service.trim() ||
    typeof message !== 'string' || message.trim().length < 20
  ) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  // El avatar del mensaje apunta al logo servido por el propio sitio,
  // así funciona igual en producción y en cada preview de Vercel sin
  // tener que hardcodear un dominio.
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host;

  const payload = {
    username: 'CGL Producciones — Web',
    avatar_url: `${proto}://${host}/assets/logo.png`,
    // allowed_mentions vacío evita que el mensaje dispare @everyone/@here/roles
    allowed_mentions: { parse: [] },
    embeds: [
      {
        title: 'Nuevo mensaje de contacto — CGL',
        color: 0xff0049,
        description:
          `**Nombre:** ${name.slice(0, 256)}\n` +
          `**Email:** ${email.slice(0, 256)}\n` +
          `**Servicio:** ${service.slice(0, 256)}\n\n` +
          `**Mensaje:**\n${message.slice(0, 1024)}`,
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const discordRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!discordRes.ok) {
      const text = await discordRes.text();
      console.error('Discord webhook error:', discordRes.status, text);
      return res.status(502).json({ error: 'No se pudo notificar a Discord' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error enviando a Discord:', err);
    return res.status(500).json({ error: 'Error interno' });
  }
};
