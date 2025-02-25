const { botDatabase } = require('./botDatabase');

/**
 * Get detailed information about a bot based on its user agent
 * @param {string|null} userAgent - The user agent string to check
 * @return {Object|null} - Bot information or null if not a known bot
 */
function botInfo(userAgent) {
  if (!userAgent) return null;
  
  const lowerUA = userAgent.toLowerCase();
  
  for (const bot of botDatabase) {
    if (lowerUA.includes(bot.pattern.toLowerCase())) {
      return {
        ...bot,
        isBot: true
      };
    }
  }
  
  return null;
}

module.exports = {
  botInfo,
  botDatabase
};
