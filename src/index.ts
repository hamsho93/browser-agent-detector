// Types
export type BotDetectFunction = (userAgent: string | null | undefined) => boolean;
export type BotMatchFunction = (userAgent: string | null | undefined) => string | null;
export type BotMatchesFunction = (userAgent: string | null | undefined) => string[];

export interface BotDetectOptions {
  allowList?: string[];
  denyList?: string[];
}

// Bot patterns
export const botPatterns = [
  'googlebot',
  'bingbot',
  'yandexbot',
  'duckduckbot',
  'baiduspider',
  'yahoo.ad.monitoring',
  'yahoo!.+crawler',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'pinterest',
  'bot',
  'spider',
  'crawler',
  'scraper',
  'checker',
  'http.?client',
  'feed',
  '^$'
];

// Patterns that should be excluded from bot detection
export const nonBotPatterns = [
  'chrome-lighthouse',
  'googleweblight',
  'googlewebcache',
  'like gecko'
];

// Utility functions
function createBotPattern(options: BotDetectOptions = {}): RegExp {
  // Start with the default patterns
  let patterns = [...botPatterns];
  
  // Add custom deny patterns if provided
  if (options.denyList && options.denyList.length > 0) {
    patterns = [...patterns, ...options.denyList];
  }
  
  // Create the pattern string
  const patternString = patterns
    .map(pattern => {
      // Escape special regex characters
      const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return `(?:${escaped})`;
    })
    .join('|');
  
  // Create the RegExp with case insensitivity
  return new RegExp(patternString, 'i');
}

function createNonBotPattern(options: BotDetectOptions = {}): RegExp {
  // Start with the default non-bot patterns
  let patterns = [...nonBotPatterns];
  
  // Add custom allow patterns if provided
  if (options.allowList && options.allowList.length > 0) {
    patterns = [...patterns, ...options.allowList];
  }
  
  // Create the pattern string
  const patternString = patterns
    .map(pattern => {
      // Escape special regex characters
      const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return `(?:${escaped})`;
    })
    .join('|');
  
  // Create the RegExp with case insensitivity
  return new RegExp(patternString, 'i');
}

function normalizeUserAgent(userAgent: string | null | undefined): string {
  if (!userAgent) return '';
  return userAgent.toLowerCase().trim();
}

/**
 * Creates a custom bot detection function with the given options
 */
export function createBotDetect(options: BotDetectOptions = {}): BotDetectFunction {
  const botPattern = createBotPattern(options);
  const nonBotPattern = createNonBotPattern(options);
  
  return (userAgent: string | null | undefined): boolean => {
    const normalizedUA = normalizeUserAgent(userAgent);
    if (!normalizedUA) return false;
    
    // If it matches a non-bot pattern, it's not a bot
    if (nonBotPattern.test(normalizedUA)) return false;
    
    // Check if it matches a bot pattern
    return botPattern.test(normalizedUA);
  };
}

/**
 * Default bot detection function
 */
export const botdetect: BotDetectFunction = createBotDetect();

/**
 * Creates a custom bot match function with the given options
 */
export function createBotMatch(options: BotDetectOptions = {}): BotMatchFunction {
  return (userAgent: string | null | undefined): string | null => {
    const normalizedUA = normalizeUserAgent(userAgent);
    if (!normalizedUA) return null;
    
    // First check custom deny patterns if provided
    if (options.denyList && options.denyList.length > 0) {
      for (const pattern of options.denyList) {
        const regex = new RegExp(pattern, 'i');
        if (regex.test(normalizedUA)) {
          return pattern;
        }
      }
    }
    
    // Then check default patterns
    for (const pattern of botPatterns) {
      const regex = new RegExp(pattern, 'i');
      if (regex.test(normalizedUA)) {
        return pattern;
      }
    }
    
    return null;
  };
}

/**
 * Default bot match function
 */
export const botMatch: BotMatchFunction = createBotMatch();

/**
 * Creates a custom bot matches function with the given options
 */
export function createBotMatches(options: BotDetectOptions = {}): BotMatchesFunction {
  return (userAgent: string | null | undefined): string[] => {
    const normalizedUA = normalizeUserAgent(userAgent);
    if (!normalizedUA) return [];
    
    // Get patterns with custom options
    let patterns = [...botPatterns];
    if (options.denyList && options.denyList.length > 0) {
      patterns = [...patterns, ...options.denyList];
    }
    
    // Check each pattern individually and collect matches
    return patterns.filter(pattern => {
      const regex = new RegExp(pattern, 'i');
      return regex.test(normalizedUA);
    });
  };
}

/**
 * Default bot matches function
 */
export const botMatches: BotMatchesFunction = createBotMatches();

/**
 * Returns the RegExp pattern used for bot detection
 */
export function getPattern(options: BotDetectOptions = {}): RegExp {
  return createBotPattern(options);
}

/**
 * Returns the list of bot patterns
 */
export function getPatternList(): string[] {
  return [...botPatterns];
}

// Export the bot info functionality
import botInfo = require('./botInfo');
import botCategory = require('./botCategory');

export { botInfo, botCategory };