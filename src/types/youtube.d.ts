
declare namespace YT {
  interface Player {
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number): void;
    mute(): void;
    unMute(): void;
  }

  class Player {
    constructor(element: HTMLIFrameElement, options?: any);
  }

  enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5
  }

  interface PlayerEvent {
    target: Player;
    data: any;
  }
}

interface Window {
  onYouTubeIframeAPIReady: (() => void) | null;
  YT: typeof YT;
}
