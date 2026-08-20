"use client";

import { Navbar } from "@/components/navbar";
import { LoaderScreen } from "@/components/LoaderScreen";
import { ChatBot } from "@/components/ChatBot";
import { DevNoticeModal } from "@/components/DevNoticeModal";

export default function ClientWrapper() {
  return (
    <>
      <LoaderScreen />
      <Navbar />
      <ChatBot />
      <DevNoticeModal />
    </>
  );
}
