/// <reference types="vite/client" />

interface Window {
  __TAURI__: {
    app: {
      getVersion(): Promise<string>;
    };
    shell: {
      open(url: string): Promise<void>;
    };
    window: {
      appWindow: {
        minimize(): Promise<void>;
        maximize(): Promise<void>;
        unmaximize(): Promise<void>;
        isMaximized(): Promise<boolean>;
        close(): Promise<void>;
      };
    };
  };
}
