import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
const useSocket = () => {
  const socketRef = useRef<Socket>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
      transports: ["websocket"],
    });

    socketRef.current.on("connected to server", () => {
      console.log("connected to server: ", socketRef.current?.id);
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ Disconnected from server");
    });

    // listen for response
    socketRef.current.on("message", msg => {
      console.log("received :", msg);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // function to send message
  const sendMessage = (msg: string) => {
    socketRef.current?.emit("message", msg);
  };

  return { sendMessage };
};
export default useSocket;
