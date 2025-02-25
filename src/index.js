const { botDatabase, botPatterns } = require('./botDatabase');

/**
 * Checks if a user agent string belongs to a bot
 * @param {string|null} userAgent - The user agent string to check
 * @return {boolean} - True if the user agent is a bot, false otherwise
 */
function botdetect(userAgent) {
  if (!userAgent) return false;
  
  const lowerUA = userAgent.toLowerCase();
  return botPatterns.some(pattern => lowerUA.includes(pattern));
}

/**
 * Returns the first matching bot pattern or null
 * @param {string|null} userAgent - The user agent string to check
 * @return {string|null} - The matching pattern or null if no match
 */
function botMatch(userAgent) {
  if (!userAgent) return null;
  
  const lowerUA = userAgent.toLowerCase();
  
  // First try to match specific bot names (googlebot, bingbot, etc.)
  for (const pattern of botPatterns) {
    if (lowerUA.includes(pattern)) {
      // For specific bots like googlebot, return the exact match
      if (pattern.includes('bot') && pattern !== 'bot') {
        return pattern;
      }
    }
  }
  
  // If no specific bot was found, check for generic 'bot' pattern
  if (lowerUA.includes('bot')) {
    return 'bot';
  }
  
  // Check for other generic patterns
  for (const pattern of botPatterns) {
    if (lowerUA.includes(pattern)) {
      return pattern;
    }
  }
  
  return null;
}

/**
 * Returns all matching bot patterns
 * @param {string|null} userAgent - The user agent string to check
 * @return {string[]} - Array of matching patterns
 */
function botMatches(userAgent) {
  if (!userAgent) return [];
  
  const lowerUA = userAgent.toLowerCase();
  return botPatterns.filter(pattern => lowerUA.includes(pattern));
}

/**
 * Creates a custom bot detection function with options
 * @param {Object} options - Configuration options
 * @return {Function} - Custom bot detection function
 */
function createBotDetect(options = {}) {
  return function(userAgent) {
    if (!userAgent) return false;
    
    const lowerUA = userAgent.toLowerCase();
    
    // Check allowList - if a pattern is in allowList, it's not considered a bot
    if (options.allowList) {
      for (const pattern of options.allowList) {
        if (lowerUA.includes(pattern.toLowerCase())) {
          return false;
        }
      }
    }
    
    // Check denyList - if a pattern is in denyList, it's considered a bot
    if (options.denyList) {
      for (const pattern of options.denyList) {
        if (lowerUA.includes(pattern.toLowerCase())) {
          return true;
        }
      }
    }
    
    // Fall back to standard detection
    return botdetect(userAgent);
  };
}

/**
 * Creates a custom bot matching function with options
 * @param {Object} options - Configuration options
 * @return {Function} - Custom bot matching function
 */
function createBotMatch(options = {}) {
  return function(userAgent) {
    if (!userAgent) return null;
    
    const lowerUA = userAgent.toLowerCase();
    
    // Check allowList - if a pattern is in allowList, it's not considered a bot
    if (options.allowList) {
      for (const pattern of options.allowList) {
        if (lowerUA.includes(pattern.toLowerCase())) {
          return null;
        }
      }
    }
    
    // Check denyList - if a pattern is in denyList, it's considered a bot
    if (options.denyList) {
      for (const pattern of options.denyList) {
        if (lowerUA.includes(pattern.toLowerCase())) {
          return pattern.toLowerCase();
        }
      }
    }
    
    // Fall back to standard matching
    return botMatch(userAgent);
  };
}

/**
 * Creates a custom bot matches function with options
 * @param {Object} options - Configuration options
 * @return {Function} - Custom bot matches function
 */
function createBotMatches(options = {}) {
  return function(userAgent) {
    if (!userAgent) return [];
    
    const lowerUA = userAgent.toLowerCase();
    let matches = [];
    
    // Check denyList - add any matching patterns from denyList
    if (options.denyList) {
      for (const pattern of options.denyList) {
        if (lowerUA.includes(pattern.toLowerCase())) {
          matches.push(pattern.toLowerCase());
        }
      }
    }
    
    // If we have matches from denyList, return them
    if (matches.length > 0) {
      return matches;
    }
    
    // Check allowList - if a pattern is in allowList, return empty array
    if (options.allowList) {
      for (const pattern of options.allowList) {
        if (lowerUA.includes(pattern.toLowerCase())) {
          return [];
        }
      }
    }
    
    // Fall back to standard matches
    return botMatches(userAgent);
  };
}

/**
 * Returns detailed information about the matching bot
 * @param {string|null} userAgent - The user agent string to check
 * @return {object|null} - Bot metadata or null if no match
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

/**
 * Get a RegExp pattern for bot detection
 * @param {Object} options - Configuration options
 * @return {RegExp} - Regular expression for bot detection
 */
function getPattern(options = {}) {
  let patterns = [...botPatterns];
  
  // Add patterns from denyList
  if (options.denyList) {
    patterns = patterns.concat(options.denyList);
  }
  
  // Create a RegExp pattern
  const patternString = patterns.join('|');
  return new RegExp(patternString, 'i');
}

/**
 * Get the full list of patterns
 * @return {string[]} - Array of bot patterns
 */
function getPatternList() {
  return [...botPatterns];
}

// Export all functions
module.exports = {
  botdetect,
  createBotDetect,
  botMatch,
  createBotMatch,
  botMatches,
  createBotMatches,
  botInfo,
  getPattern,
  getPatternList
};

// Import and export botCategory
const botCategory = require('./botCategory');
module.exports.botCategory = botCategory;
