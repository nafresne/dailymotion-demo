// Type definitions for Dailymotion Player SDK

interface DailymotionPlayerOptions {
  video?: string;
  playlist?: string;
  [key: string]: unknown;
}

interface DailymotionPlayer {
  on: (event: string, callback: () => void) => void;
  off: (event: string, callback: () => void) => void;
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  // Add other player methods as needed
}

interface DailymotionSDK {
  createPlayer?: (
    targetId: string,
    options: DailymotionPlayerOptions
  ) => Promise<DailymotionPlayer>;
  events: {
    VIDEO_END: string;
    VIDEO_START: string;
    VIDEO_PLAYING: string;
    VIDEO_PAUSE: string;
    // Add other events as needed
  };
  onScriptLoaded?: () => void;
}

interface Window {
  dailymotion?: {
    onScriptLoaded: DailymotionSDK['onScriptLoaded'];
  };
}

declare const dailymotion: DailymotionSDK;
