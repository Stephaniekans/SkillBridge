import { USERS } from "../../data.js";
import ModalShell from "./ModalShell.jsx";

export default function SessionModal({
  open, onClose,
  withUser, setWithUser,
  skill, setSkill,
  date, setDate,
  time, setTime,
  dur, setDur,
  onBook,
}) {
  return (
    <ModalShell open={open} title="Schedule a session" onClose={onClose}>
      <div className="mo-field">
        <label className="mo-label">Session with</label>
        <select className="mo-select" value={withUser} onChange={(e) => setWithUser(e.target.value)}>
          {USERS.map((u) => <option key={u.id}>{u.name}</option>)}
        </select>
      </div>
      <div className="mo-field">
        <label className="mo-label">Skill topic</label>
        <input
          className="mo-input"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="e.g. React Hooks, Spanish basics…"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="mo-field">
          <label className="mo-label">Date</label>
          <input type="date" className="mo-input" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="mo-field">
          <label className="mo-label">Time</label>
          <input type="time" className="mo-input" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
      </div>
      <div className="mo-field">
        <label className="mo-label">Duration</label>
        <select className="mo-select" value={dur} onChange={(e) => setDur(parseInt(e.target.value))}>
          <option value={30}>30 minutes</option>
          <option value={45}>45 minutes</option>
          <option value={60}>1 hour</option>
          <option value={90}>1.5 hours</option>
        </select>
      </div>

      <div className="mo-actions">
        <button className="mo-cancel" onClick={onClose}>Cancel</button>
        <button className="mo-confirm" onClick={onBook}>Book Session →</button>
      </div>
    </ModalShell>
  );
}
