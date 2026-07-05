import { SKILL_TAGS } from "../data.js";
import { calcMatch } from "../utils.js";
import Avatar from "../components/Avatar.jsx";
import SkillTag from "../components/SkillTag.jsx";
import MatchBar from "../components/MatchBar.jsx";

export default function DiscoverPage({ list, myOffers, myWants, activeTag, setTag, sentSet, onRequest }) {
  return (
    <div id="page-discover" className="page on max-w-5xl mx-auto px-6 py-10">
      <div className="mb-7">
        <h1 className="text-3xl font-semibold tracking-tight mb-2 font-display">
          Find your <em className="text-emerald-500 not-italic">match</em>
        </h1>
        <p className="text-sm text-[#666]">Trade what you know for what you need.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {SKILL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setTag(tag)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              activeTag === tag
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "border-[#E5E5E5] text-[#666] hover:border-[#ccc] hover:text-[#111] bg-white"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="col-span-full text-center py-20 text-[#999]">
          <div className="text-4xl mb-3">🔍</div>
          <div className="font-semibold text-[#444] mb-1">No results</div>
          <div className="text-sm">Try a different search or clear the filter</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((u, i) => (
            <UserCard
              key={u.id}
              user={u}
              index={i}
              match={calcMatch(u, myOffers, myWants)}
              isSent={sentSet.has(u.id)}
              onRequest={() => onRequest(u)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function UserCard({ user, index, match, isSent, onRequest }) {
  const isMutual = match > 40;

  return (
    <div
      className="card hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_16px_40px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-300 relative"
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <Avatar name={user.name} initials={user.initials} showOnline={user.online} />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-[#111] truncate">{user.name}</div>
          <div className="text-xs text-[#999] truncate">{user.dept}</div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xs font-semibold text-amber-600">
            ★ {user.rating} <span className="text-[#bbb] font-normal">({user.reviews})</span>
          </div>
          <div className="text-xs text-[#999]">{user.swaps} swaps</div>
        </div>
      </div>

      {isMutual && (
        <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1 mb-3">
          ⇄ Mutual benefit match
        </div>
      )}

      <div className="mb-2">
        <div className="text-xs uppercase tracking-wider text-[#aaa] font-semibold mb-1.5">Can teach</div>
        <div className="flex flex-wrap gap-1.5">
          {user.offers.map((s) => <SkillTag key={s} label={s} variant="offer" />)}
        </div>
      </div>
      <div className="mb-3">
        <div className="text-xs uppercase tracking-wider text-[#aaa] font-semibold mb-1.5">Wants to learn</div>
        <div className="flex flex-wrap gap-1.5">
          {user.wants.map((s) => <SkillTag key={s} label={s} variant="want" />)}
        </div>
      </div>

      <div className="flex justify-between text-xs text-[#999] mb-1">
        <span>Skill compatibility</span>
        <span className="text-emerald-600 font-semibold">{match}%</span>
      </div>
      <MatchBar match={match} index={index} />

      <button
        onClick={isSent ? undefined : onRequest}
        disabled={isSent}
        className={`w-full mt-4 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-300 ${
          isSent
            ? "bg-emerald-50 text-emerald-700 border border-emerald-100 cursor-default"
            : "bg-[#111] text-white hover:-translate-y-0.5 shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:bg-emerald-600"
        }`}
      >
        {isSent ? "✓ Request sent" : "Request exchange →"}
      </button>
    </div>
  );
}
