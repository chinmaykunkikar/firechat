export default function MessageBubble() {
  return (
    <div>
      <div className="chat chat-start">
        <div className="placeholder chat-image avatar">
          <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
            as
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble chat-bubble-accent">
          You were the chosen one!
        </div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
      <div className="chat chat-end">
        <div className="placeholder chat-image avatar">
          <div className="w-12 rounded-full bg-neutral-focus text-neutral-content">
            ck
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">12:46</time>
        </div>
        <div className="chat-bubble chat-bubble-primary">I knew it!</div>
        <div className="chat-footer opacity-50">Seen at 12:46</div>
      </div>
    </div>
  );
}
