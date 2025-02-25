declare module './botInfo' {
    interface BotInfo {
      isBot: boolean;
      name?: string;
      category?: string;
      url?: string;
    }
  
    function botInfo(userAgent: string | null | undefined): BotInfo | null;
    
    export = botInfo;
  }