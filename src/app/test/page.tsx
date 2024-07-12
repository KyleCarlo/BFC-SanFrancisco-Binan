"use client";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useState } from "react";
import socket from "@lib/socket";

export default function Test() {
  const [message, setMessage] = useState("");
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center">
      <h1>TEST PAGE FOR SOCKET</h1>
      <p>Remove after</p>
      <Input
        placeholder="Enter your message"
        className="w-96 my-12"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          alert("clicked");
          socket.emit("message", { message: message });
        }}
      >
        Send Message
      </Button>
    </div>
  );
}
