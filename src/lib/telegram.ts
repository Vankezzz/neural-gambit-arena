// Telegram Bot API integration
const BOT_TOKEN = '7992720873:AAHGfgdLjZpYJLXwec0S6_0HeUgsWCUa4VI';
const CHAT_ID = '-4917460404';

export const sendTelegramMessage = async (message: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
};

export const formatButtonClickMessage = (buttonText: string, userAgent?: string): string => {
  const timestamp = new Date().toLocaleString('ru-RU', { 
    timeZone: 'Europe/Moscow',
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return `🤖 <b>AI ARENA - Новое действие</b>\n\n` +
         `🔘 Кнопка: <i>${buttonText}</i>\n` +
         `⏰ Время: ${timestamp}\n` +
         `🌐 User Agent: ${userAgent || 'Неизвестно'}\n` +
         `📊 Источник: AI Arena Platform`;
};