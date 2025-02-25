const { botdetect } = require('./index');

/**
 * Categorizes a bot based on its user agent string
 * @param {string|null} userAgent - The user agent string to check
 * @return {string|null} - Category name or null if not a bot
 */
function botCategory(userAgent) {
  if (!userAgent) return null;
  
  const lowerUA = userAgent.toLowerCase();
  
  // Define categories based on patterns
  const categories = {
    'ai': ['gptbot', 'chatgpt', 'oai-searchbot', 'claude', 'anthropic', 'bard', 'perplexity'],
    'search': ['googlebot', 'bingbot', 'yandex', 'baidu', 'duckduckbot', 'slurp'],
    'social': ['facebookexternalhit', 'twitterbot', 'linkedinbot', 'pinterest'],
    'analytics': ['ahrefs', 'semrush', 'majestic'],
    'monitoring': ['pingdom', 'uptimerobot', 'newrelic']
  };
  
  // First check if it matches any category
  for (const [category, patterns] of Object.entries(categories)) {
    if (patterns.some(pattern => lowerUA.includes(pattern))) {
      return category;
    }
  }
  
  // If it contains 'bot', 'crawler', 'spider', etc. but doesn't match a specific category
  const genericBotPatterns = ['bot', 'crawler', 'spider', 'scraper', 'fetch', 'http'];
  if (genericBotPatterns.some(pattern => lowerUA.includes(pattern))) {
    return 'other';
  }
  
  return null;
}

module.exports = botCategory;
