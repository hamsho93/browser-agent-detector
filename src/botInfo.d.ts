/**
 * Bot information interface
 */
interface BotInfo {
  isBot: boolean;
  name?: string;
  category?: string;
  url?: string;
}

/**
 * Gets detailed information about a bot from its user agent
 * @param userAgent - The user agent string to check
 * @returns Bot information or null if not a known bot
 */
declare function botInfo(userAgent: string | null | undefined): BotInfo | null;

export = botInfo;