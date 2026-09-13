import {
  experimental_upgradeWebSocket,
  type WebSocketData,
} from "@vercel/functions";

import type { WebSocket } from "ws";

const clients = new Set<WebSocket>();

export function GET() {
  return experimental_upgradeWebSocket((ws) => {
    clients.add(ws);

    // ws.on("message", (data: WebSocketData) => {
    //   const message = data.toString();

    //   for (const client of clients) {
    //     if (client !== ws && client.readyState === 1) {
    //       client.send(message);
    //     }
    //   }
    // });

    ws.on("message", (data) => {
      const message = JSON.parse(data.toString());

      if (message.type === "newEntry") {
        for (const client of clients) {
          if (client !== ws && client.readyState === 1) {
            client.send(JSON.stringify(message));
          }
        }
      }
    });

    ws.on("close", () => {
      clients.delete(ws);
    });

    ws.on("error", () => {
      clients.delete(ws);
    });
  });
}
