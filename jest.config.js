module.exports = {
  testMatch: [
    "**/__tests__/**/*.js?(x)",
    "**/?(*.)+(spec|test).js?(x)",
    "**/?(*.)+(spec|test).ts?(x)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
}; 