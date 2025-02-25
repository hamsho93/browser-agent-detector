/**
 * Categorizes a bot based on its user agent string
 * @param userAgent - The user agent string to check
 * @returns Category name or null if not a bot
 */
declare function botCategory(userAgent: string | null | undefined): string | null;

export = botCategory;