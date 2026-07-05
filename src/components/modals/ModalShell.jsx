export default function ModalShell({ open, title, onClose, children }) {
  return (
    <div
      className={`mo${open ? " on" : ""}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="mo-box">
        <div className="mo-title">
          {title}
          <button className="mo-close" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
