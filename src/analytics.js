import { botDatabase } from './botDatabase';

/**
 * Categorizes bots by their origin/purpose
 * @param {string|null} userAgent - The user agent string
 * @return {string|null} - Category of the bot or null
 */
export function botCategory(userAgent) {
  if (!userAgent) return null;
  
  const lowerUA = userAgent.toLowerCase();
  
  // Define categories based on patterns
  const categories = {
    'ai': ['gptbot', 'chatgpt', 'oai-searchbot', 'claude', 'bard'],
    'search': ['googlebot', 'bingbot', 'yandex', 'baidu', 'slurp'],
    'social': ['facebookexternalhit', 'twitterbot', 'linkedinbot'],
    'analytics': ['ahrefs', 'semrush', 'majestic'],
    'monitoring': ['pingdom', 'uptimerobot', 'newrelic']
  };
  
  for (const [category, patterns] of Object.entries(categories)) {
    if (patterns.some(pattern => lowerUA.includes(pattern))) {
      return category;
    }
  }
  
  return 'other';
}

/**
 * Provides statistics about bot traffic
 * @param {Array<string>} userAgents - Array of user agent strings
 * @return {object} - Statistics about bot traffic
 */
export function botStats(userAgents) {
  const stats = {
    total: userAgents.length,
    bots: 0,
    botPercentage: 0,
    botCategories: {},
    topBots: []
  };
  
  const botCounts = {};
  
  userAgents.forEach(ua => {
    if (!ua) return;
    
    const lowerUA = ua.toLowerCase();
    let isBot = false;
    
    for (const bot of botDatabase) {
      if (lowerUA.includes(bot.pattern.toLowerCase())) {
        isBot = true;
        
        // Count occurrences
        botCounts[bot.pattern] = (botCounts[bot.pattern] || 0) + 1;
        
        // Track category
        const category = botCategory(ua) || 'other';
        stats.botCategories[category] = (stats.botCategories[category] || 0) + 1;
        
        break;
      }
    }
    
    if (isBot) stats.bots++;
  });
  
  // Calculate percentage
  stats.botPercentage = (stats.bots / stats.total * 100).toFixed(2);
  
  // Get top bots
  stats.topBots = Object.entries(botCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));
  
  return stats;
} 