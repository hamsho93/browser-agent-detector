# Browser Agent Detector

A lightweight, efficient library for detecting bots, crawlers, and spiders by analyzing user agent strings.

[![npm version](https://img.shields.io/npm/v/browser-agent-detector.svg)](https://www.npmjs.com/package/browser-agent-detector)
[![Build Status](https://github.com/yourusername/browser-agent-detector/workflows/CI/badge.svg)](https://github.com/yourusername/browser-agent-detector/actions)
[![npm downloads](https://img.shields.io/npm/dm/browser-agent-detector.svg)](https://www.npmjs.com/package/browser-agent-detector)

## Features

- Detects bots, crawlers, and spiders based on user agent strings
- Lightweight with zero dependencies
- Highly customizable with allow and deny lists
- TypeScript support
- Works in both Node.js and browser environments
- Compatible with Next.js (server-side and client-side)

## Installation 

```bash
npm install browser-agent-detector
# or
yarn add browser-agent-detector
```

## Usage

### Basic Usage 
```javascript
import { botdetect } from 'browser-agent-detector';

// Check if a user agent is a bot
const isBot = botdetect('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
console.log(isBot); // true

// Human user agents return false
const isBrowser = botdetect('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36');
console.log(isBrowser); // false

// Handles null/undefined gracefully
console.log(botdetect(null)); // false
```

### Getting Match Information 
```javascript
import { botMatch, botMatches } from 'browser-agent-detector';

// Get the first matching pattern
const matchedPattern = botMatch('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
console.log(matchedPattern); // 'googlebot'

// Get all matching patterns
const allMatches = botMatches('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
console.log(allMatches); // ['googlebot', 'bot']
```

### Custom Detection
```javascript
import { createBotDetect } from 'browser-agent-detector';

// Create a custom detector with your own rules
const customDetect = createBotDetect({
  // Patterns that should NOT be considered bots even if they match bot patterns
  allowList: ['friendly-bot', 'my-custom-tool'],
  // Additional patterns to consider as bots
  denyList: ['evil-scraper', 'unwanted-crawler']
});

console.log(customDetect('Mozilla/5.0 friendly-bot/1.0')); // false
console.log(customDetect('Mozilla/5.0 evil-scraper/1.0')); // true
```

## Next.js Integration

### Server-Side Rendering
```javascript
// pages/index.js
import { botdetect } from 'browser-agent-detector';

export default function Home({ isBot }) {
  return (
    <div>
      {isBot ? (
        <p>Bot-friendly content</p>
      ) : (
        <p>Human-friendly content</p>
      )}
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const userAgent = req.headers['user-agent'];
  const isBot = botdetect(userAgent);
  
  return {
    props: {
      isBot
    }
  };
}
```

### Next.js Middleware
```javascript
// middleware.js
import { NextResponse } from 'next/server';
import { botdetect } from 'browser-agent-detector';

export function middleware(request) {
  const userAgent = request.headers.get('user-agent');
  const isBot = botdetect(userAgent);
  
  // Add isBot to request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-is-bot', isBot.toString());
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
```

## Browser Usage
```javascript
import { botdetect } from 'browser-agent-detector';

// In a React component
useEffect(() => {
  const userAgent = navigator.userAgent;
  const isBot = botdetect(userAgent);
  
  if (!isBot) {
    // Load heavy resources or analytics only for human users
    loadAnalytics();
  }
}, []);
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
