"use client";

import { useState } from "react";
import ChatFloatingButton from "./ChatFloatingButton";
import ChatWidget from "./ChatWidget";

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ChatFloatingButton onClick={() => setOpen(true)} />
      <ChatWidget open={open} onClose={() => setOpen(false)} />
    </>
  );
}
