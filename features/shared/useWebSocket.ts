import { useEffect, useRef } from "react";
import { createSocket } from "./socket";

interface UseWebSocketOptions {
  onReconnect?: () => void;
}

interface UseWebSocketResult {
  send: (message: unknown) => boolean;
}

export function useWebSocket(
  onMessage: (event: MessageEvent) => void,
  options: UseWebSocketOptions = {},
): UseWebSocketResult {
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const shouldReconnectRef = useRef(true);
  const hasConnectedRef = useRef(false);
  const { onReconnect } = options;

  useEffect(() => {
    shouldReconnectRef.current = true;

    const connect = () => {
      if (!shouldReconnectRef.current) {
        return;
      }

      const socket = createSocket();

      socketRef.current = socket;

      socket.addEventListener("open", () => {
        console.log("CONNECTED TO WEBSOCKET");
        if (hasConnectedRef.current) {
          onReconnect?.();
        }
        hasConnectedRef.current = true;
      });

      socket.addEventListener("message", onMessage);

      socket.addEventListener("close", () => {
        console.log("WEBSOCKET CLOSED");

        socketRef.current = null;

        if (!shouldReconnectRef.current) {
          return;
        }

        console.log("RECONNECTING...");

        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, 2000);
      });

      socket.addEventListener("error", (error) => {
        console.error("WEBSOCKET ERROR:", error);
      });
    };

    connect();

    return () => {
      shouldReconnectRef.current = false;

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      socketRef.current?.close();
      socketRef.current = null;
    };
  }, [onMessage, onReconnect]);

  const send = (message: unknown) => {
    const socket = socketRef.current;

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.log("WebSocket is not connected");
      return false;
    }

    socket.send(JSON.stringify(message));
    return true;
  };

  return {
    send,
  };
}
