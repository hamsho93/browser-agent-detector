declare module './botCategory' {
    /**
     * Categorizes a bot based on its user agent string
     * @param userAgent - The user agent string to check
     * @return Category name or null if not a bot
     */
    function botCategory(userAgent: string | null | undefined): string | null;
    
    export = botCategory;
  }