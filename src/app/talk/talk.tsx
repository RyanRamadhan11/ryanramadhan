//src/app/talk/page.tsx
import dynamic from "next/dynamic";
import React from "react";

// load client-only component dynamically to avoid SSR issues with Web Speech API
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
