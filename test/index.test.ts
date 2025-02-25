import { botdetect, createBotDetect, botMatch, createBotMatch, botMatches, createBotMatches, getPattern, getPatternList } from '../src';
import botUserAgents from './fixtures/bots.json';
import browserUserAgents from './fixtures/browsers.json';

describe('botdetect', () => {
  test('should detect bots correctly', () => {
    botUserAgents.forEach(ua => {
      expect(botdetect(ua)).toBe(true);
    });
  });

  test('should not detect browsers as bots', () => {
    browserUserAgents.forEach(ua => {
      expect(botdetect(ua)).toBe(false);
    });
  });

  test('should handle null and undefined user agents', () => {
    expect(botdetect(null)).toBe(false);
    expect(botdetect(undefined)).toBe(false);
    expect(botdetect('')).toBe(false);
  });
  
  test('should allow custom bot detection with options', () => {
    const customDetect = createBotDetect({
      allowList: ['chrome-lighthouse'],
      denyList: ['custom-bot']
    });
    
    // Should detect custom bot
    expect(customDetect('Mozilla/5.0 custom-bot')).toBe(true);
    
    // Should not detect chrome-lighthouse as a bot (it's in allowList)
    expect(customDetect('Mozilla/5.0 chrome-lighthouse')).toBe(false);
  });
});

describe('botMatch', () => {
  test('should return the matching pattern for bots', () => {
    expect(botMatch('Googlebot/2.1')).toBe('googlebot');
    expect(botMatch('Bingbot/2.0')).toBe('bingbot');
    expect(botMatch('Mozilla/5.0 (compatible; YandexBot/3.0)')).toBe('yandexbot');
  });
  
  test('should return null for non-bots', () => {
    browserUserAgents.forEach(ua => {
      expect(botMatch(ua)).toBeNull();
    });
  });
  
  test('should handle null and undefined user agents', () => {
    expect(botMatch(null)).toBeNull();
    expect(botMatch(undefined)).toBeNull();
    expect(botMatch('')).toBeNull();
  });
  
  test('should allow custom bot matching with options', () => {
    const customMatch = createBotMatch({
      denyList: ['uniquecustom']
    });
    
    expect(customMatch('Mozilla/5.0 uniquecustom')).toBe('uniquecustom');
  });
});

describe('botMatches', () => {
  test('should return all matching patterns for bots', () => {
    // A user agent that matches multiple patterns
    const matches = botMatches('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
    expect(matches).toContain('googlebot');
    expect(matches).toContain('bot');
  });
  
  test('should return empty array for non-bots', () => {
    browserUserAgents.forEach(ua => {
      expect(botMatches(ua)).toEqual([]);
    });
  });
  
  test('should handle null and undefined user agents', () => {
    expect(botMatches(null)).toEqual([]);
    expect(botMatches(undefined)).toEqual([]);
    expect(botMatches('')).toEqual([]);
  });
  
  test('should allow custom bot matches with options', () => {
    const customMatches = createBotMatches({
      denyList: ['custom-bot']
    });
    
    const matches = customMatches('Mozilla/5.0 custom-bot');
    expect(matches).toContain('custom-bot');
  });
});

describe('getPattern', () => {
  test('should return a RegExp object', () => {
    const pattern = getPattern();
    expect(pattern).toBeInstanceOf(RegExp);
  });
  
  test('should create a pattern that matches bots', () => {
    const pattern = getPattern();
    botUserAgents.forEach(ua => {
      expect(pattern.test(ua.toLowerCase())).toBe(true);
    });
  });
  
  test('should accept custom options', () => {
    const pattern = getPattern({
      denyList: ['custom-bot']
    });
    expect(pattern.test('custom-bot')).toBe(true);
  });
});

describe('getPatternList', () => {
  test('should return an array of patterns', () => {
    const patterns = getPatternList();
    expect(Array.isArray(patterns)).toBe(true);
    expect(patterns.length).toBeGreaterThan(0);
  });
  
  test('should include common bot patterns', () => {
    const patterns = getPatternList();
    expect(patterns).toContain('googlebot');
    expect(patterns).toContain('bingbot');
    expect(patterns).toContain('bot');
  });
  
  test('should return a copy of the patterns array', () => {
    const patterns1 = getPatternList();
    const patterns2 = getPatternList();
    
    // Should be different array instances
    expect(patterns1).not.toBe(patterns2);
    
    // But with the same content
    expect(patterns1).toEqual(patterns2);
    
    // Modifying one should not affect the other
    patterns1.push('test');
    expect(patterns2).not.toContain('test');
  });
});
