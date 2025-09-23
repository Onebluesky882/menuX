"use client";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = () => {
  const socketRef = useRef<Socket>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      console.log("connect to server");
    });
    // listen for response
    socketRef.current.on("message", msg => {
      console.log("📩 Received:", msg);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const sendMessage = (msg: string) => {
    socketRef.current?.emit("message", msg);
  };

  return { sendMessage };
};

export default useSocket;
