"use client";

import { useEffect, useState, useRef } from "react";
// import { socket } from "@/features/shared/socket";
import { createSocket } from "@/features/shared/socket";
export default function TestCountersPage() {
  const [countK, setCountK] = useState(0);
  const [countL, setCountL] = useState(0);

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === "k") {
  //       setCountK((current) => current + 1);
  //       // socket.emit("test-k", "k was pressed");
  //     }
  //     if (event.key === "l") {
  //       setCountL((current) => current + 1);
  //       // socket.emit("test-l", "l was pressed");
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, []);

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = createSocket();

    socketRef.current = socket;

    socket.addEventListener("open", () => {
      console.log("CONNECTED");
    });

    socket.addEventListener("message", (event) => {
      console.log("RECEIVED:", event.data);
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900 mb-4">
          Keyboard Counter Test
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          Press <span className="font-semibold">k</span> to increment the first
          counter and <span className="font-semibold">l</span> to increment the
          second.
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Counter K</div>
            <div className="text-4xl font-bold text-slate-900">{countK}</div>
            <button
              onClick={() => {
                socketRef.current?.send("hello and K from client");
              }}
              className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Clear K
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Counter L</div>
            <div className="text-4xl font-bold text-slate-900">{countL}</div>
            <button
              onClick={() => {
                socketRef.current?.send("hello and L from client");
              }}
              className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Clear L
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
