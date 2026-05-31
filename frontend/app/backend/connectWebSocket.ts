import { PageStateStore } from "../PageStateStore";
export function connectWebSocket() {
    const socket = new WebSocket("ws://localhost:8080")

    socket.onopen = () => {
        console.log("Socket connected")
    }

    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);

            PageStateStore.battery_current = data.battery_current
            PageStateStore.battery_voltage = data.battery_voltage
            PageStateStore.exampleField1 = data.exampleField1

            console.log("updated page state");
        } catch (e) {
            console.error("JSON from websocket formatting invalid");
        }
    }

    socket.onerror = (err) => {
        console.error("socket error", err)
    }

    socket.onclose = () => {
        console.log("socket closed")
    }
    return socket
}