export default function ChatContactPreview() {
  return (
    <div className="flex gap-3">
      <div>
        <div className="placeholder avatar">
          <div className="w-12 rounded-full bg-neutral-focus font-semibold text-neutral-content">
            <span>as</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="font-semibold">Ayush Swamy</div>
        <div className="text-neutral-content">Hello</div>
      </div>
    </div>
  );
}
