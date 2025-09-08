// hooks/useWindowControls.ts
import { useCallback, useState, useEffect, useRef } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { listen, UnlistenFn } from '@tauri-apps/api/event';

export const useWindowControls = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  const unlistenersRef = useRef<UnlistenFn[]>([]);

  // Helper function to safely update maximized state
  const updateMaximizedState = useCallback(async () => {
    try {
      const appWindow = getCurrentWindow();
      const maximized = await appWindow.isMaximized();
      setIsMaximized(maximized);
    } catch (error) {
      console.error('Error checking maximized state:', error);
    }
  }, []);

  // Helper function to execute window operations safely
  const executeWindowOperation = useCallback(async (
    operation: () => Promise<void>,
    operationName: string
  ) => {
    try {
      await operation();
    } catch (error) {
      console.error(`Error ${operationName}:`, error);
      // Refresh state on error
      await updateMaximizedState();
    }
  }, [updateMaximizedState]);

  // Set up event listeners for window state synchronization
  useEffect(() => {
    updateMaximizedState();

    const events = ['tauri://resize', 'tauri://focus'];

    events.forEach(eventName => {
      listen(eventName, updateMaximizedState).then(unlisten => {
        unlistenersRef.current.push(unlisten);
      });
    });

    return () => {
      unlistenersRef.current.forEach(unlisten => unlisten());
      unlistenersRef.current = [];
    };
  }, [updateMaximizedState]);

  const minimizeWindow = useCallback(async () => {
    await executeWindowOperation(async () => {
      const appWindow = getCurrentWindow();
      await appWindow.minimize();
    }, 'minimizing window');
  }, [executeWindowOperation]);

  const maximizeWindow = useCallback(async () => {
    await executeWindowOperation(async () => {
      const appWindow = getCurrentWindow();
      const currentMaximized = await appWindow.isMaximized();

      if (currentMaximized) {
        await appWindow.unmaximize();
        setIsMaximized(false);
      } else {
        await appWindow.maximize();
        setIsMaximized(true);
      }
    }, 'toggling maximize');
  }, [executeWindowOperation]);

  const closeWindow = useCallback(async () => {
    await executeWindowOperation(async () => {
      const appWindow = getCurrentWindow();
      await appWindow.close();
    }, 'closing window');
  }, [executeWindowOperation]);

  return {
    minimizeWindow,
    maximizeWindow,
    closeWindow,
    isMaximized
  };
};