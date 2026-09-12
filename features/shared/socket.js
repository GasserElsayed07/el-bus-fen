export function createSocket() {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";

  const socket = new WebSocket(`${protocol}//${window.location.host}/api/ws`);

  return socket;
}
