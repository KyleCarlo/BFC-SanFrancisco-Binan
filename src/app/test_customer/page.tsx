"use client";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useState, useEffect } from "react";
import socket from "@lib/socket";

export default function Test() {
  const [message, setMessage] = useState("");
  const [r_messages, setR_messages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("rcv_confirmation", (data: string) => {
      setR_messages([...r_messages, data]);
    });

    return () => {
      socket.off("rcv_confirmation");
    };
  }, [r_messages]);

  return (
    <div className="grid grid-cols-2">
      <div className="h-[100vh] flex flex-col items-center justify-center">
        <h1>TEST PAGE FOR SOCKET</h1>
        <p>Customer Sending Order</p>
        <p>Customer Receiving Confirmation</p>
        <Input
          placeholder="Enter your message"
          className="w-96 my-12"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            socket.emit("send_order", message);
          }}
        >
          Send Message
        </Button>
      </div>
      <div>
        <ul>
          {r_messages.map((msg, index) => {
            return <li key={index}>{msg}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
