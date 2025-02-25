const { botInfo } = require('../src');

describe('botInfo', () => {
  test('should return detailed info for known bots', () => {
    const gptBotInfo = botInfo('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.0; +https://openai.com/gptbot)');
    
    expect(gptBotInfo).not.toBeNull();
    if (gptBotInfo) {
      expect(gptBotInfo.isBot).toBe(true);
    }
  });

  test('should return info for ChatGPT-User bot', () => {
    const chatGptInfo = botInfo('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot');
    
    expect(chatGptInfo).not.toBeNull();
    if (chatGptInfo) {
      expect(chatGptInfo.isBot).toBe(true);
    }
  });

  test('should return null for unknown bots or browsers', () => {
    expect(botInfo('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36')).toBeNull();
    expect(botInfo('Some random bot that is not in our database')).toBeNull();
  });

  test('should handle null/undefined/empty inputs', () => {
    expect(botInfo(null)).toBeNull();
    expect(botInfo(undefined)).toBeNull();
    expect(botInfo('')).toBeNull();
  });
});
