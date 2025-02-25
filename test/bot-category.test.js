const { botCategory } = require('../src');

describe('botCategory', () => {
  test('should categorize AI bots correctly', () => {
    expect(botCategory('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.0; +https://openai.com/gptbot)')).toBe('ai');
    expect(botCategory('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot')).toBe('ai');
    expect(botCategory('Mozilla/5.0 (compatible; ClaudeBot/0.1; +https://www.anthropic.com/claude-bot)')).toBe('ai');
    expect(botCategory('Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://www.perplexity.ai/bot)')).toBe('ai');
  });

  test('should categorize search engine bots correctly', () => {
    expect(botCategory('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')).toBe('search');
    expect(botCategory('Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)')).toBe('search');
    expect(botCategory('Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)')).toBe('search');
  });

  test('should categorize social media bots correctly', () => {
    expect(botCategory('facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)')).toBe('social');
    expect(botCategory('Mozilla/5.0 (compatible; Twitterbot/1.0)')).toBe('social');
    expect(botCategory('LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)')).toBe('social');
  });

  test('should categorize analytics bots correctly', () => {
    expect(botCategory('Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)')).toBe('analytics');
    expect(botCategory('Mozilla/5.0 (compatible; SemrushBot/7~bl; +http://www.semrush.com/bot.html)')).toBe('analytics');
  });

  test('should categorize monitoring bots correctly', () => {
    expect(botCategory('Mozilla/5.0 (compatible; pingbot/1.0; +http://www.pingdom.com/)')).toBe('monitoring');
    expect(botCategory('Mozilla/5.0 (compatible; UptimeRobot/2.0; http://www.uptimerobot.com/)')).toBe('monitoring');
  });

  test('should return "other" for unknown bot categories', () => {
    expect(botCategory('Some unknown bot')).toBe('other');
  });

  test('should return null for non-bots', () => {
    expect(botCategory('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')).toBeNull();
  });

  test('should handle null/undefined/empty inputs', () => {
    expect(botCategory(null)).toBeNull();
    expect(botCategory(undefined)).toBeNull();
    expect(botCategory('')).toBeNull();
  });
});
