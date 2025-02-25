const { botdetect, botMatch, botMatches, botCategory } = require('../src');

describe('AI Bot Detection', () => {
  const aiBotUserAgents = [
    "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.0; +https://openai.com/gptbot)",
    "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot)",
    "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)",
    "Mozilla/5.0 (compatible; Anthropic-AI/0.1; +https://www.anthropic.com/ai-crawler)",
    "Mozilla/5.0 (compatible; ClaudeBot/0.1; +https://www.anthropic.com/claude-bot)",
    "Mozilla/5.0 (compatible; BardBot/1.0; +https://bard.google.com/bot)",
    "Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://www.perplexity.ai/bot)"
  ];

  test('should detect AI bots correctly', () => {
    aiBotUserAgents.forEach(ua => {
      expect(botdetect(ua)).toBe(true);
    });
  });

  test('should match AI bots with botMatch', () => {
    // All AI bots should match some pattern
    aiBotUserAgents.forEach(ua => {
      expect(botMatch(ua)).not.toBeNull();
    });
  });

  test('should return multiple matches for AI bots', () => {
    aiBotUserAgents.forEach(ua => {
      const matches = botMatches(ua);
      expect(matches.length).toBeGreaterThan(0);
      
      // Check for AI-related patterns instead of specifically 'bot'
      const aiPatterns = ['bot', 'gpt', 'chatgpt', 'claude', 'anthropic', 'bard', 'perplexity', 'crawler'];
      const hasAiPattern = matches.some(match => aiPatterns.includes(match));
      expect(hasAiPattern).toBe(true);
    });
  });

  test('should categorize all AI bots as "ai"', () => {
    aiBotUserAgents.forEach(ua => {
      expect(botCategory(ua)).toBe('ai');
    });
  });
});
