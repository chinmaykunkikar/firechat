import ChatContactPreview from "@components/ChatContactPreview";

export default function ChatsList() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <ChatContactPreview />
      <ChatContactPreview />
      <ChatContactPreview />
      <ChatContactPreview />
      <ChatContactPreview />
    </div>
  );
}
