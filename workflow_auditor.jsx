import { useState, useRef, useEffect } from "react";

const C = {
  bg: "#07090f", card: "#0d1117", border: "rgba(255,255,255,0.07)",
  cyan: "#00d4ff", purple: "#8b5cf6", green: "#10b981",
  yellow: "#f59e0b", red: "#ef4444",
  text: "#f1f5f9", dim: "#94a3b8", muted: "#64748b",
};

const DEMO = {
  workflowName: "New Application Training Development",
  applicationName: "Enterprise CRM System Rollout",
  teamSize: "4", cycleTime: "6–8 weeks",
  tools: "SharePoint, Word, PowerPoint, Articulate 360, LMS",
  painPoints: "No structured document intake process, manual parsing of complex technical docs takes days, learning design requires deep domain expertise, effectiveness measurement is entirely manual with no dashboards or automation",
  stages: [
    { id: 1, name: "Document Intake", desc: "Collect technical specs, SOPs, user guides from SMEs and IT teams" },
    { id: 2, name: "Content Analysis", desc: "Manually parse and deconstruct documents to extract key workflows and user journeys" },
    { id: 3, name: "Training Design", desc: "Define learning objectives, module structure, and map user journey through the application" },
    { id: 4, name: "Content Creation", desc: "Build interactive training modules, videos, and assessments inside LMS" },
    { id: 5, name: "Effectiveness Measurement", desc: "Manual analysis of completion rates, quiz scores, and user experience feedback" },
  ],
};

function ScoreGauge({ score }) {
  const r = 48, cx = 60, cy = 60, sz = 120;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const col = score >= 70 ? C.green : score >= 45 ? C.cyan : C.yellow;
  return (
    <div style={{ position: "relative", width: sz, height: sz, flexShrink: 0 }}>
      <svg width={sz} height={sz} style={{ transform: "rotate(-90deg)", position: "absolute" }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={7} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={col} strokeWidth={7}
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", top: 0, left: 0, width: sz, height: sz, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 26, fontWeight: 500, color: col, lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>/100</div>
      </div>
    </div>
  );
}

function AutoBar({ stage, idx }) {
  const { name, automationScore: s, automationLevel: lv, rationale, hitlRequired, hitlReason } = stage;
  const col = s >= 75 ? C.green : s >= 50 ? C.cyan : s >= 25 ? C.yellow : C.red;
  const lvCol = { high: C.green, medium: C.cyan, low: C.yellow, "human-only": C.red };
  return (
    <div style={{ padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: C.cyan, width: 20 }}>{`0${idx + 1}`}</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{name}</span>
          {hitlRequired && (
            <span style={{ fontSize: 9, background: "rgba(239,68,68,0.12)", color: C.red, border: "1px solid rgba(239,68,68,0.28)", padding: "1px 6px", borderRadius: 2, fontFamily: "'DM Mono',monospace", letterSpacing: "0.06em" }}>HITL</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 10, color: lvCol[lv] || col, fontFamily: "'DM Mono',monospace", textTransform: "uppercase", letterSpacing: "0.07em" }}>{lv}</span>
          <span style={{ fontSize: 13, fontFamily: "'DM Mono',monospace", color: col, fontWeight: 500 }}>{s}%</span>
        </div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 2, height: 5, overflow: "hidden", marginBottom: 6 }}>
        <div style={{ width: `${s}%`, height: "100%", background: col, borderRadius: 2, transition: `width 0.9s ease ${idx * 0.1}s` }} />
      </div>
      <div style={{ fontSize: 11, color: C.muted }}>{rationale}</div>
      {hitlRequired && hitlReason && (
        <div style={{ fontSize: 11, color: "rgba(239,68,68,0.65)", marginTop: 3 }}>⚠ {hitlReason}</div>
      )}
    </div>
  );
}

function Matrix({ items }) {
  const W = 300, H = 260, pad = 38;
  const pw = W - pad * 2, ph = H - pad * 2;
  const tx = e => pad + ((e - 1) / 4) * pw;
  const ty = i => H - pad - ((i - 1) / 4) * ph;
  const cols = [C.cyan, C.green, C.yellow, C.purple, "#ff6b6b", "#ffd166", "#06b6d4"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "start" }}>
      <svg width={W} height={H}>
        <line x1={pad} y1={H / 2} x2={W - pad} y2={H / 2} stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
        <line x1={W / 2} y1={pad} x2={W / 2} y2={H - pad} stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
        <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="rgba(255,255,255,0.12)" />
        <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke="rgba(255,255,255,0.12)" />
        <text x={pad + 6} y={pad + 14} fill="rgba(16,185,129,0.55)" fontSize={9} fontFamily="DM Mono, monospace">QUICK WINS</text>
        <text x={W / 2 + 6} y={pad + 14} fill="rgba(139,92,246,0.55)" fontSize={9} fontFamily="DM Mono, monospace">BIG BETS</text>
        <text x={pad + 6} y={H - pad - 6} fill="rgba(100,116,139,0.45)" fontSize={9} fontFamily="DM Mono, monospace">FILL-INS</text>
        <text x={W / 2 + 6} y={H - pad - 6} fill="rgba(239,68,68,0.45)" fontSize={9} fontFamily="DM Mono, monospace">DEPRIORITIZE</text>
        <text x={W / 2} y={H - 4} fill={C.muted} fontSize={9} textAnchor="middle" fontFamily="DM Mono, monospace">EFFORT →</text>
        <text x={8} y={H / 2} fill={C.muted} fontSize={9} textAnchor="middle" fontFamily="DM Mono, monospace" transform={`rotate(-90,8,${H / 2})`}>IMPACT →</text>
        {items.map((it, i) => (
          <g key={i}>
            <circle cx={tx(it.effort)} cy={ty(it.impact)} r={6} fill={cols[i % cols.length]} opacity={0.85} />
            <text x={tx(it.effort) + 9} y={ty(it.impact) + 4} fill={C.dim} fontSize={9} fontFamily="DM Sans, sans-serif">
              {it.item.split(" ").slice(0, 3).join(" ")}
            </text>
          </g>
        ))}
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: cols[i % cols.length], flexShrink: 0, marginTop: 3 }} />
            <div>
              <div style={{ fontSize: 12, color: C.dim, lineHeight: 1.3 }}>{it.item}</div>
              <div style={{ fontSize: 10, color: C.muted, fontFamily: "'DM Mono',monospace", marginTop: 1 }}>E:{it.effort}  I:{it.impact}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Roadmap({ roadmap }) {
  const pc = { critical: C.red, high: C.cyan, medium: C.yellow };
  return (
    <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8 }}>
      {roadmap.map((ph, i) => (
        <div key={i} style={{ flex: "0 0 220px", background: "rgba(255,255,255,0.02)", border: `1px solid ${C.border}`, borderTop: `3px solid ${pc[ph.priority] || C.cyan}`, borderRadius: 8, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Phase {ph.phase}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginTop: 3, fontFamily: "'Syne',sans-serif", lineHeight: 1.2 }}>{ph.title}</div>
            </div>
            <span style={{ fontSize: 9, color: pc[ph.priority], background: `${pc[ph.priority]}15`, border: `1px solid ${pc[ph.priority]}35`, padding: "2px 6px", borderRadius: 2, fontFamily: "'DM Mono',monospace", textTransform: "uppercase", whiteSpace: "nowrap" }}>{ph.priority}</span>
          </div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "'DM Mono',monospace", marginBottom: 10 }}>{ph.timeframe}</div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
            {ph.items.map((item, j) => (
              <li key={j} style={{ display: "flex", gap: 7, fontSize: 12, color: C.dim, lineHeight: 1.4 }}>
                <span style={{ color: pc[ph.priority], flexShrink: 0 }}>→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState(DEMO);
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState(null);
  const [err, setErr] = useState(null);
  const [tab, setTab] = useState("automation");
  const resultsRef = useRef(null);

const [chatOpen, setChatOpen] = useState(false);
const [chatMessages, setChatMessages] = useState([]);
const [chatInput, setChatInput] = useState("");
const [chatBusy, setChatBusy] = useState(false);
const chatMessagesRef = useRef(null);

const sendChatMessage = async (msg) => {
  if (!msg.trim()) return;
  setChatMessages(m => [...m, { role: "user", text: msg }]);
  setChatInput("");
  setChatBusy(true);
        const workflowCtx = results ? `\nCurrent Analysis:\n- Workflow: ${form.workflowName}\n- App: ${form.applicationName}\n- Overall Score: ${results.overallReadinessScore}/100\n- Key Insights: ${results.keyInsights.join(", ")}` : "\nNo analysis performed yet.";
        try {
          const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 800,
              system: `You are a helpful AI change management consultant for application training workflows. Help users understand and improve their workflow automation readiness. Keep responses concise and actionable.${workflowCtx}`,
              messages: [...chatMessages.map(m => ({ role: m.role, content: m.text })), { role: "user", content: msg }]
            })
          });
    const d = await res.json();
    const reply = d.content[0].text;
    setChatMessages(m => [...m, { role: "assistant", text: reply }]);
  } catch (e) {
    setChatMessages(m => [...m, { role: "assistant", text: "Sorry, something went wrong. Please try again." }]);
  }
  setChatBusy(false);
};

useEffect(() => {
  if (chatMessagesRef.current) {
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }
}, [chatMessages]);

useEffect(() => {
  if (chatOpen && chatMessages.length === 0) {
    setChatMessages([{ role: "assistant", text: "Hi! I'm your AI workflow assistant. Ask me anything about your analysis, workflow automation, or change management best practices." }]);
  }
}, [chatOpen]);
  const uf = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const us = (id, k, v) => setForm(f => ({ ...f, stages: f.stages.map(s => s.id === id ? { ...s, [k]: v } : s) }));
  const addStage = () => { const mx = Math.max(...form.stages.map(s => s.id), 0); setForm(f => ({ ...f, stages: [...f.stages, { id: mx + 1, name: "", desc: "" }] })); };
  const delStage = id => setForm(f => ({ ...f, stages: f.stages.filter(s => s.id !== id) }));

  const analyze = async () => {
    setBusy(true); setErr(null); setResults(null);
    const stagesTxt = form.stages.map((s, i) => `${i + 1}. ${s.name}: ${s.desc}`).join("\n");
    const prompt = `You are an expert AI change management consultant for new application training rollouts.
Analyze this workflow and return ONLY raw valid JSON — no markdown, no code fences, no explanation.

Workflow: "${form.workflowName}"
Application: "${form.applicationName}"
Team Size: ${form.teamSize} people | Cycle Time: ${form.cycleTime}
Tools: ${form.tools}
Pain Points: ${form.painPoints}

Stages:
${stagesTxt}

Return exactly this JSON schema:
{
  "overallReadinessScore": <integer 0-100>,
  "keyInsights": ["<insight>","<insight>","<insight>"],
  "stages": [{"name":"<name>","automationScore":<0-100>,"automationLevel":"<high|medium|low|human-only>","rationale":"<1 sentence>","hitlRequired":<bool>,"hitlReason":"<short string or null>"}],
  "effortImpactItems": [{"item":"<short 2-3 word name>","effort":<1-5>,"impact":<1-5>,"category":"<stage>"}],
  "roadmap": [{"phase":<1-3>,"title":"<title>","timeframe":"<e.g. Week 1-2>","items":["<action>","<action>","<action>"],"priority":"<critical|high|medium>"}]
}`;
    try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, messages: [{ role: "user", content: prompt }] })
        });
      const d = await res.json();
      const txt = d.content[0].text.replace(/```json|```/g, "").trim();
      setResults(JSON.parse(txt));
      setTab("automation");
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (e) {
      setErr("Analysis failed — please try again.");
    } finally {
      setBusy(false);
    }
  };

  const card = { background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 24 };
  const lbl = { display: "block", fontSize: 10, fontFamily: "'DM Mono',monospace", textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted, marginBottom: 6 };
  const tabBtn = (id, label) => (
    <button key={id} onClick={() => setTab(id)} style={{ padding: "7px 14px", borderRadius: 4, fontSize: 11, fontFamily: "'DM Mono',monospace", letterSpacing: "0.07em", textTransform: "uppercase", cursor: "pointer", border: "none", background: tab === id ? "rgba(0,212,255,0.1)" : "transparent", color: tab === id ? C.cyan : C.muted, transition: "all 0.15s" }}>
      {label}
    </button>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        input, textarea { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 9px 12px; color: #f1f5f9; font-family: 'DM Sans',sans-serif; font-size: 13px; width: 100%; outline: none; transition: border-color 0.15s; }
        input:focus, textarea:focus { border-color: rgba(0,212,255,0.4); }
        textarea { resize: vertical; min-height: 68px; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:0.25; transform:scale(0.7); } 50% { opacity:1; transform:scale(1); } }
      `}</style>

      <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans',sans-serif" }}>

        {/* Chat Widget */}
        <div style={{ position: "fixed", bottom: 20, right: 20, display: "flex", flexDirection: "column", gap: 10, zIndex: 1000 }}>
          {chatOpen && (
            <div style={{ width: 360, height: 540, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
              <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: C.text }}>Workflow Assistant</div>
                <button onClick={() => setChatOpen(false)} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 18 }}>×</button>
              </div>
              <div ref={chatMessagesRef} style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                {chatMessages.map((m, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{
                      maxWidth: "80%",
                      padding: "10px 12px",
                      borderRadius: 6,
                      fontSize: 12,
                      lineHeight: 1.4,
                      background: m.role === "user" ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.05)",
                      color: C.text,
                      border: `1px solid ${m.role === "user" ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.08)"}`
                    }}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {chatBusy && (
                  <div style={{ display: "flex", gap: 4 }}>
                    {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: C.cyan, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
                  </div>
                )}
              </div>
              <div style={{ padding: 12, borderTop: `1px solid ${C.border}`, display: "flex", gap: 8 }}>
                <input
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyPress={e => e.key === "Enter" && !chatBusy && sendChatMessage(chatInput)}
                  placeholder="Ask a question..."
                  disabled={chatBusy}
                  style={{ fontSize: 12, padding: "8px 10px" }}
                />
                <button
                  onClick={() => sendChatMessage(chatInput)}
                  disabled={chatBusy || !chatInput.trim()}
                  style={{
                    background: chatBusy || !chatInput.trim() ? "rgba(0,212,255,0.3)" : C.cyan,
                    color: "#07090f",
                    border: "none",
                    borderRadius: 4,
                    width: 32,
                    height: 32,
                    cursor: chatBusy || !chatInput.trim() ? "not-allowed" : "pointer",
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700
                  }}
                >
                  →
                </button>
              </div>
            </div>
          )}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: chatOpen ? "rgba(0,212,255,0.2)" : C.cyan,
              border: chatOpen ? `2px solid ${C.cyan}` : "none",
              color: chatOpen ? C.cyan : "#07090f",
              cursor: "pointer",
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              transition: "all 0.2s"
            }}
          >
            {chatOpen ? "−" : "💬"}
          </button>
        </div>

        {/* Header */}
        <div style={{ padding: "28px 36px 20px", borderBottom: "1px solid rgba(0,212,255,0.1)", background: "linear-gradient(180deg,rgba(0,212,255,0.04) 0%,transparent 100%)" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.22)", color: C.cyan, fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 2, marginBottom: 10 }}>◈ Change Management AI</div>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              AI Workflow Readiness <span style={{ color: C.cyan }}>Auditor</span>
            </h1>
            <p style={{ color: C.muted, fontSize: 13, marginTop: 6, fontWeight: 300 }}>Assess AI automation potential for new application training workflows</p>
          </div>
        </div>

        {/* Main */}
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "28px 36px 80px" }}>

          {/* Form */}
          <div style={card}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 20 }}>Workflow Details</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div><label style={lbl}>Workflow Name</label><input value={form.workflowName} onChange={e => uf("workflowName", e.target.value)} /></div>
              <div><label style={lbl}>Application / System</label><input value={form.applicationName} onChange={e => uf("applicationName", e.target.value)} /></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 14, marginBottom: 14 }}>
              <div><label style={lbl}>Team Size</label><input value={form.teamSize} onChange={e => uf("teamSize", e.target.value)} placeholder="e.g. 4" /></div>
              <div><label style={lbl}>Cycle Time</label><input value={form.cycleTime} onChange={e => uf("cycleTime", e.target.value)} /></div>
              <div><label style={lbl}>Tools Currently Used</label><input value={form.tools} onChange={e => uf("tools", e.target.value)} /></div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={lbl}>Pain Points & Bottlenecks</label>
              <textarea value={form.painPoints} onChange={e => uf("painPoints", e.target.value)} />
            </div>

            <div style={{ marginBottom: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <label style={{ ...lbl, margin: 0 }}>Workflow Stages</label>
                <button onClick={addStage} style={{ background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)", color: C.cyan, borderRadius: 4, padding: "4px 12px", fontSize: 10, fontFamily: "'DM Mono',monospace", cursor: "pointer", letterSpacing: "0.06em" }}>+ ADD STAGE</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {form.stages.map((st, i) => (
                  <div key={st.id} style={{ display: "grid", gridTemplateColumns: "22px 160px 1fr auto", gap: 8, alignItems: "center" }}>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: C.cyan }}>{`0${i + 1}`}</span>
                    <input value={st.name} onChange={e => us(st.id, "name", e.target.value)} placeholder="Stage name" />
                    <input value={st.desc} onChange={e => us(st.id, "desc", e.target.value)} placeholder="Brief description" />
                    {form.stages.length > 1
                      ? <button onClick={() => delStage(st.id)} style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", color: C.red, borderRadius: 4, width: 30, height: 36, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                      : <div style={{ width: 30 }} />}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
              {err && <span style={{ color: C.red, fontSize: 12 }}>{err}</span>}
              <button onClick={analyze} disabled={busy} style={{ background: busy ? "rgba(0,212,255,0.4)" : C.cyan, color: "#07090f", border: "none", borderRadius: 6, padding: "11px 28px", fontSize: 13, fontWeight: 700, fontFamily: "'Syne',sans-serif", cursor: busy ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}>
                {busy
                  ? <><div style={{ width: 13, height: 13, border: "2px solid rgba(7,9,15,0.25)", borderTopColor: "#07090f", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />Analyzing...</>
                  : "◈  Analyze Workflow"}
              </button>
            </div>
          </div>

          {/* Loading */}
          {busy && (
            <div style={{ ...card, marginTop: 20, textAlign: "center", padding: 44 }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: C.cyan, letterSpacing: "0.1em", marginBottom: 14 }}>ANALYZING WORKFLOW</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
                {[0, 1, 2, 3, 4].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: C.cyan, animation: `pulse 1.2s ease-in-out ${i * 0.14}s infinite` }} />)}
              </div>
            </div>
          )}

          {/* Results */}
          {results && (
            <div ref={resultsRef} style={{ marginTop: 20 }}>

              {/* Score + Insights */}
              <div style={{ display: "grid", gridTemplateColumns: "148px 1fr", gap: 14, marginBottom: 14 }}>
                <div style={{ ...card, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <ScoreGauge score={results.overallReadinessScore} />
                  <div style={{ fontSize: 10, color: C.muted, textAlign: "center", lineHeight: 1.3 }}>AI Readiness Score</div>
                </div>
                <div style={card}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 14 }}>Key Insights</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {results.keyInsights.map((ins, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, fontSize: 13, color: C.dim, lineHeight: 1.5 }}>
                        <span style={{ color: C.cyan, flexShrink: 0, fontFamily: "'DM Mono',monospace" }}>{`0${i + 1}`}</span>
                        {ins}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: 2, marginBottom: 12, borderBottom: `1px solid ${C.border}`, paddingBottom: 6 }}>
                {tabBtn("automation", "Automation Analysis")}
                {tabBtn("matrix", "Effort / Impact Matrix")}
                {tabBtn("roadmap", "Implementation Roadmap")}
              </div>

              {tab === "automation" && (
                <div style={card}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>Stage Automation Potential</div>
                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>AI readiness score per workflow stage with human-in-the-loop requirements</div>
                  {results.stages.map((st, i) => <AutoBar key={i} stage={st} idx={i} />)}
                </div>
              )}

              {tab === "matrix" && (
                <div style={card}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>Effort vs. Impact Matrix</div>
                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 20 }}>Automation opportunities plotted by implementation effort and expected impact</div>
                  <Matrix items={results.effortImpactItems} />
                </div>
              )}

              {tab === "roadmap" && (
                <div style={card}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>Implementation Roadmap</div>
                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 20 }}>Prioritized phased plan for AI integration into your training workflow</div>
                  <Roadmap roadmap={results.roadmap} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
