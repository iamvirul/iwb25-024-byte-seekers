// hooks/useWebSocket.ts
import { useEffect, useRef } from 'react';

export const useWebSocket = (port : string ,userSessionId: string | null,onInitialData: (data: any) => void) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!userSessionId) return;

    const wsUrl = `ws://127.0.0.1:${port}/proxy/${userSessionId}`;
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
    };

    socketRef.current.onmessage = (event) => {
      try {
        const raw = JSON.parse(event.data);
        if (raw.success && raw.content) {
          onInitialData(raw.content);
        } else {
          console.warn('Unexpected WebSocket payload:', raw);
        }
      } catch (err) {
        console.error('WebSocket message parse error:', err);
      }
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socketRef.current?.close();
    };
  }, [userSessionId]);

  return socketRef;
};
