// src/app/talk/talk.tsx
import dynamic from "next/dynamic";
import React from "react";

const VoiceAssistant = dynamic(
  () => import("../../components/VoiceAssistant/VoiceAssistantButton"),
  { ssr: false }
);

const TalkPage: React.FC = () => {
  return (
    <main style={{ padding: 24 }}>
      <VoiceAssistant />
    </main>
  );
};

export default TalkPage;
