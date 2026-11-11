/* =========================================================
   Guía Matemáticas 11° · Lógica de la aplicación
   ========================================================= */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const MODS = window.MODULES;
  const STUDENT = "Sneyder";

  /* ---------------- Progreso (localStorage seguro) ---------------- */
  const KEY = "guia-mate11-v1";
  const store = {
    load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } },
    save(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } },
  };
  const P = Object.assign({ ex: {}, quiz: {}, sim: null, tab: {} }, store.load());
  const save = () => store.save(P);

  function modProgress(m) {
    const done = m.exercises.filter((e) => P.ex[e.id]).length;
    const q = P.quiz[m.id];
    const qPart = q ? q.best / q.total : 0;
    return Math.round((done / m.exercises.length) * 80 + qPart * 20);
  }
  const totalProgress = () => Math.round(MODS.reduce((s, m) => s + modProgress(m), 0) / MODS.length);

  /* ---------------- Utilidades matemáticas ---------------- */
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);
  const bgcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a || 1n; };
  const fmt = (n, d = 2) => {
    if (!isFinite(n)) return String(n);
    const r = Math.round(n * 10 ** d) / 10 ** d;
    return (Object.is(r, -0) ? 0 : r).toString().replace(".", ",");
  };
  const texNum = (n, d = 2) => fmt(n, d).replace(",", "{,}");
  const fracTex = (n, d) => {
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d); n /= g; d /= g;
    if (d === 1) return `${n}`;
    return `${n < 0 ? "-" : ""}\\frac{${Math.abs(n)}}{${d}}`;
  };
  /** número "bonito" para extremos: fracciones simples si aplica */
  const niceTex = (x) => {
    if (Number.isInteger(x)) return `${x}`;
    for (let d = 2; d <= 12; d++) { const n = Math.round(x * d); if (Math.abs(n / d - x) < 1e-9) return fracTex(n, d); }
    return texNum(x);
  };
  const fact = (n) => { let r = 1n; for (let i = 2n; i <= BigInt(n); i++) r *= i; return r; };
  const big = (b) => b.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* Protege los < y > dentro de $...$ para que el HTML no los confunda con etiquetas */
  const prep = (html) => String(html).replace(/\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g, (m) => m.replace(/</g, "&lt;").replace(/>/g, "&gt;"));

  const MACROS = { "\\hl": "\\color{FFD60A}{#1}", "\\bl": "\\color{64D2FF}{#1}", "\\gr": "\\color{30D158}{#1}", "\\rd": "\\color{FF7A70}{#1}" };
  function typeset(el) {
    if (!el || !window.renderMathInElement) return;
    try {
      window.renderMathInElement(el, {
        delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
        throwOnError: false,
        strict: "ignore",
        macros: Object.assign({}, MACROS),
      });
    } catch (e) { console.warn(e); }
  }

  /* ---------------- LaTeX → texto hablado ---------------- */
  const ORD = { 2: "cuadrada", 3: "cúbica", 4: "cuarta", 5: "quinta", 6: "sexta" };
  const pow = (e) => { e = e.trim(); return e === "2" ? " al cuadrado " : e === "3" ? " al cubo " : ` elevado a ${e} `; };
  function tex2say(t) {
    let s = " " + t + " ";
    s = s.replace(/\\left|\\right|\\[,;!]|\\quad|\\displaystyle/g, " ").replace(/\{,\}/g, ",");
    s = s.replace(/\\\{/g, " el conjunto de los ").replace(/\\\}/g, " ");
    const rules = [
      [/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, (m, a, b) => ` ${a} sobre ${b} `],
      [/\\binom\{([^{}]*)\}\{([^{}]*)\}/g, (m, a, b) => ` combinaciones de ${a} en ${b} `],
      [/\\sqrt\[([^\]]*)\]\{([^{}]*)\}/g, (m, n, x) => ` raíz ${ORD[n.trim()] || n} de ${x} , `],
      [/\\sqrt\{([^{}]*)\}/g, (m, x) => ` raíz cuadrada de ${x} , `],
      [/\^\{([^{}]*)\}/g, (m, e) => pow(e)],
      [/_\{([^{}]*)\}/g, " "],
      [/\\overline\{([^{}]*)\}/g, " $1 periódico "],
      [/\\(?:text|mathrm|textbf|mathbf|underline|underbrace|cancel|operatorname)\{([^{}]*)\}/g, " $1 "],
      [/\\mathbb\{([^{}]*)\}/g, (m, x) => ({ R: " los reales ", Q: " los racionales ", Z: " los enteros ", I: " los irracionales ", N: " los naturales " }[x] || x)],
      [/(?<![a-zA-Z}\]^_])\{([^{}]*)\}/g, " $1 "],
    ];
    for (let k = 0; k < 25; k++) {
      const before = s;
      for (const [re, rep] of rules) s = s.replace(re, rep);
      if (s === before) break;
    }
    s = s.replace(/\^(-?\w)/g, (m, e) => pow(e)).replace(/_\w/g, " ");
    const words = [
      [/\\cdot|\\times/g, " por "], [/\\div/g, " entre "], [/\\leq?(?![a-zA-Z])/g, " menor o igual que "], [/\\geq?(?![a-zA-Z])/g, " mayor o igual que "],
      [/\\neq?(?![a-zA-Z])/g, " diferente de "], [/\\pm/g, " más o menos "], [/\\infty/g, " infinito "], [/\\cup/g, " unión "],
      [/\\in(?![a-zA-Z])/g, " en "], [/\\setminus/g, " menos "], [/(\d)\s*\/\s*(\d)/g, "$1 sobre $2"], [/\\approx/g, " aproximadamente "], [/\\Rightarrow|\\to|\\rightarrow/g, " entonces "],
      [/\\[lc]?dots|\\cdots/g, " y así sucesivamente "], [/\\varnothing|\\emptyset/g, " conjunto vacío "], [/\\pi/g, " pi "],
      [/\\square/g, " qué signo "], [/\\[a-zA-Z]+/g, " "],
      [/(\w)!/g, "$1 factorial "], [/</g, " menor que "], [/>/g, " mayor que "], [/=/g, " igual a "],
      [/\+/g, " más "], [/[-−]/g, " menos "], [/\//g, " tal que "], [/[()[\]{}|&]/g, " "], [/·/g, " por "],
    ];
    for (const [re, rep] of words) s = s.replace(re, rep);
    return s.replace(/\s+/g, " ").trim();
  }
  function html2say(html) {
    const t = String(html).replace(/\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g, (m, a, b) => " " + tex2say(a || b) + " ");
    const d = document.createElement("div");
    d.innerHTML = t.replace(/<(li|p|div|tr|h\d)[^>]*>/gi, ". ").replace(/<(td|th)[^>]*>/gi, ", ");
    return d.textContent.replace(/→/g, ", entonces, ").replace(/⇄/g, ", ").replace(/[✓✗✅⚠️💡🧠🍕🔍🛗🧰🧪🙂🧮🔁❓📈🏆👥🔄∞]/gu, " ").replace(/\s+/g, " ").replace(/(\.\s*){2,}/g, ". ").trim();
  }

  /* ---------------- Voz del profe (Web Speech API) ---------------- */
  const Voice = {
    ok: "speechSynthesis" in window,
    voices: [], voice: null, rate: 1, auto: false, current: null, queue: 0,
    init() {
      if (!this.ok) { $("#voiceInfo").textContent = "Tu navegador no tiene voz 😕"; return; }
      this.rate = +(P.rate || 1); this.auto = !!P.auto;
      $("#rate").value = this.rate; $("#autoVoice").checked = this.auto;
      const load = () => {
        this.voices = speechSynthesis.getVoices().filter((v) => /^es/i.test(v.lang));
        const pref = ["es-CO", "es-MX", "es-US", "es-419", "es-ES"];
        const saved = this.voices.find((v) => v.name === P.voiceName);
        this.voice = saved || pref.map((l) => this.voices.find((v) => v.lang === l || v.lang.replace("_", "-") === l)).find(Boolean) || this.voices[0] || null;
        const sel = $("#voiceSel");
        sel.innerHTML = this.voices.length ? this.voices.map((v) => `<option ${v === this.voice ? "selected" : ""}>${esc(v.name)} (${v.lang})</option>`).join("") : "<option>Voz por defecto del sistema</option>";
        $("#voiceInfo").textContent = this.voices.length ? `${this.voices.length} voces en español` : "";
      };
      load();
      speechSynthesis.onvoiceschanged = load;
      $("#voiceSel").onchange = (e) => { this.voice = this.voices[e.target.selectedIndex] || null; P.voiceName = this.voice && this.voice.name; save(); };
      $("#rate").oninput = (e) => { this.rate = +e.target.value; P.rate = this.rate; save(); };
      $("#autoVoice").onchange = (e) => { this.auto = e.target.checked; P.auto = this.auto; save(); toast(this.auto ? "🎙️ El profe leerá cada paso" : "🔇 Lectura automática apagada"); };
      $("#testVoice").onclick = () => this.speak(`¡Hola ${STUDENT}! Soy tu profe virtual. Vamos a preparar ese examen juntos.`);
      $("#dockStop").onclick = () => this.stop();
    },
    chunks(text) {
      const parts = text.split(/(?<=[.!?:;])\s+/);
      const out = []; let cur = "";
      for (const p of parts) { if ((cur + " " + p).length > 220 && cur) { out.push(cur); cur = p; } else cur = (cur + " " + p).trim(); }
      if (cur) out.push(cur);
      return out;
    },
    speak(text, opts = {}) {
      if (!this.ok) { toast("Tu navegador no soporta voz 😕"); return; }
      this.stop(true);
      const id = ++this.queue;
      const pieces = this.chunks(text);
      this.current = opts;
      if (opts.btn) opts.btn.classList.add("playing");
      if (opts.el) opts.el.classList.add("speaking");
      $("#dockTxt").textContent = opts.label || text.slice(0, 80);
      $("#dock").classList.add("show");
      pieces.forEach((p, i) => {
        const u = new SpeechSynthesisUtterance(p);
        u.lang = (this.voice && this.voice.lang) || "es-ES";
        if (this.voice) u.voice = this.voice;
        u.rate = this.rate; u.pitch = 1.02;
        if (i === pieces.length - 1) u.onend = u.onerror = () => { if (id === this.queue) this.cleanup(); };
        speechSynthesis.speak(u);
      });
    },
    cleanup() {
      const o = this.current || {};
      if (o.btn) o.btn.classList.remove("playing");
      if (o.el) o.el.classList.remove("speaking");
      this.current = null;
      $("#dock").classList.remove("show");
    },
    stop(silent) {
      if (!this.ok) return;
      this.queue++;
      speechSynthesis.cancel();
      this.cleanup();
    },
    toggle(text, opts) {
      if (opts.btn && opts.btn.classList.contains("playing")) { this.stop(); return; }
      this.speak(text, opts);
    },
  };
  const speakBtn = (attrs = "") => `<button class="speak-btn" ${attrs} title="Escuchar al profe" aria-label="Escuchar">🔊</button>`;

  /* ---------------- Feedback visual ---------------- */
  let toastT;
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2200);
  }
  function confetti() {
    const c = $("#confetti"), ctx = c.getContext("2d");
    c.width = innerWidth; c.height = innerHeight;
    const cols = ["#0A84FF", "#64D2FF", "#30D158", "#FF9F0A", "#FF375F", "#BF5AF2", "#FFD60A"];
    const ps = Array.from({ length: 140 }, () => ({ x: innerWidth / 2, y: innerHeight * 0.35, vx: (Math.random() - 0.5) * 16, vy: Math.random() * -14 - 4, s: Math.random() * 7 + 4, c: cols[(Math.random() * cols.length) | 0], r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3 }));
    let f = 0;
    (function tick() {
      ctx.clearRect(0, 0, c.width, c.height);
      ps.forEach((p) => { p.x += p.vx; p.y += p.vy; p.vy += 0.38; p.vx *= 0.99; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore(); });
      if (++f < 160) requestAnimationFrame(tick); else ctx.clearRect(0, 0, c.width, c.height);
    })();
  }
  function setAccent(c1, c2) {
    document.documentElement.style.setProperty("--accent", c1);
    document.documentElement.style.setProperty("--accent2", c2);
  }
  function observeReveal(root) {
    const els = $$(".reveal", root);
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: 0.08 });
    els.forEach((e, i) => { e.style.transitionDelay = `${Math.min(i, 6) * 60}ms`; io.observe(e); });
  }

  /* ---------------- Visuales SVG ---------------- */
  function numberLine(v, color = "var(--accent)") {
    if (v.empty) {
      return `<svg viewBox="0 0 640 110" role="img" aria-label="Conjunto vacío">
        <line x1="20" y1="55" x2="620" y2="55" stroke="rgba(255,255,255,.5)" stroke-width="2"/>
        ${[-11, -10, -9, -8, -7, -6, -5, -4, -3].map((n, i) => `<line x1="${60 + i * 65}" y1="49" x2="${60 + i * 65}" y2="61" stroke="rgba(255,255,255,.5)"/><text x="${60 + i * 65}" y="84" fill="rgba(255,255,255,.75)" font-size="14" text-anchor="middle">${n}</text>`).join("")}
        <text x="320" y="28" fill="#FF453A" font-size="18" font-weight="700" text-anchor="middle">∅  ningún número es &gt; −5 y ≤ −9 a la vez</text>
        <path d="M450 55 H615" stroke="#FF9F0A" stroke-width="5" opacity=".55"/><circle cx="450" cy="55" r="7" fill="#000" stroke="#FF9F0A" stroke-width="3"/>
        <path d="M25 55 H190" stroke="#64D2FF" stroke-width="5" opacity=".55"/><circle cx="190" cy="55" r="7" fill="#64D2FF"/>
        <text x="530" y="105" fill="#FF9F0A" font-size="12" text-anchor="middle">x &gt; −5</text><text x="110" y="105" fill="#64D2FF" font-size="12" text-anchor="middle">x ≤ −9</text>
      </svg>`;
    }
    const fin = [v.a, v.b].filter((x) => x !== null && x !== undefined);
    let lo = Math.floor(Math.min(...fin, 0)) - 2, hi = Math.ceil(Math.max(...fin, 0)) + 2;
    if (!fin.length) { lo = -5; hi = 5; }
    if (hi - lo < 10) { const pad = (10 - (hi - lo)) / 2; lo = Math.floor(lo - pad); hi = Math.ceil(hi + pad); }
    const W = 640, L = 30, R = 610;
    const X = (x) => L + ((x - lo) / (hi - lo)) * (R - L);
    const step = hi - lo > 22 ? 5 : hi - lo > 14 ? 2 : 1;
    let ticks = "";
    for (let n = Math.ceil(lo); n <= hi; n++) {
      if (n % step) continue;
      ticks += `<line x1="${X(n)}" y1="49" x2="${X(n)}" y2="61" stroke="rgba(255,255,255,.45)"/><text x="${X(n)}" y="84" fill="rgba(255,255,255,${n === 0 ? 1 : 0.6})" font-size="13" text-anchor="middle">${n}</text>`;
    }
    const x1 = v.a == null ? L - 4 : X(v.a), x2 = v.b == null ? R + 4 : X(v.b);
    const lab = (x) => (Number.isInteger(x) ? x : fmt(x)).toString().replace("-", "−");
    const pt = (x, closed) => `<circle cx="${X(x)}" cy="55" r="8" fill="${closed ? color : "#000"}" stroke="${color}" stroke-width="3" class="ln-pt"/><text x="${X(x)}" y="30" fill="#fff" font-size="14" font-weight="700" text-anchor="middle">${lab(x)}</text>`;
    const valid = v.a == null || v.b == null || v.a < v.b || (v.a === v.b && v.ac && v.bc);
    return `<svg viewBox="0 0 ${W} 100" role="img" aria-label="Recta numérica">
      <defs><marker id="ar" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="rgba(255,255,255,.6)"/></marker>
      <marker id="arc" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="${color}"/></marker></defs>
      <line x1="${L - 18}" y1="55" x2="${R + 18}" y2="55" stroke="rgba(255,255,255,.45)" stroke-width="2" marker-start="url(#ar)" marker-end="url(#ar)"/>
      ${ticks}
      ${valid ? `<line x1="${x1}" y1="55" x2="${x2}" y2="55" stroke="${color}" stroke-width="7" stroke-linecap="round" ${v.a == null ? 'marker-start="url(#arc)"' : ""} ${v.b == null ? 'marker-end="url(#arc)"' : ""} class="ln-seg" style="--len:${Math.abs(x2 - x1)}"/>` : ""}
      ${v.a != null ? pt(v.a, v.ac) : ""}${v.b != null ? pt(v.b, v.bc) : ""}
    </svg>`;
  }
  function intervalTex(v) {
    if (v.empty) return "\\varnothing";
    const a = v.a == null ? "(-\\infty" : (v.ac ? "[" : "(") + niceTex(v.a);
    const b = v.b == null ? "\\infty)" : niceTex(v.b) + (v.bc ? "]" : ")");
    return `${a},\\,${b}`;
  }
  function setTex(v) {
    const A = v.a != null ? niceTex(v.a) : null, B = v.b != null ? niceTex(v.b) : null;
    let body;
    if (A == null && B == null) body = "x\\in\\mathbb{R}";
    else if (A == null) body = `x${v.bc ? "\\le" : "<"}${B}`;
    else if (B == null) body = `x${v.ac ? "\\ge" : ">"}${A}`;
    else body = `${A}${v.ac ? "\\le" : "<"}x${v.bc ? "\\le" : "<"}${B}`;
    return `\\{x\\in\\mathbb{R}\\,/\\,${body}\\}`;
  }
  function intervalType(v) {
    if (v.a == null && v.b == null) return "toda la recta real";
    if (v.a == null || v.b == null) {
      const closed = v.a == null ? v.bc : v.ac;
      return `infinito, ${closed ? "cerrado" : "abierto"} en el extremo finito`;
    }
    if (v.ac && v.bc) return "cerrado";
    if (!v.ac && !v.bc) return "abierto";
    return `semiabierto (cerrado a la ${v.ac ? "izquierda" : "derecha"})`;
  }

  function solveQuad(a, b, c, op) {
    const D = b * b - 4 * a * c;
    const pos = op === ">" || op === ">=", incl = op.includes("=");
    const rs = D > 1e-12 ? [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)].sort((x, y) => x - y) : Math.abs(D) <= 1e-12 ? [-b / (2 * a)] : [];
    const up = a > 0; // carita feliz
    const wantOutside = (pos && up) || (!pos && !up);
    let tex, segs = [];
    if (rs.length === 2) {
      const [r1, r2] = rs.map(niceTex), o = incl ? "[" : "(", cl = incl ? "]" : ")";
      if (wantOutside) { tex = `(-\\infty,${r1}${cl}\\cup${o}${r2},\\infty)`; segs = [[null, rs[0]], [rs[1], null]]; }
      else { tex = `${o}${r1},${r2}${cl}`; segs = [[rs[0], rs[1]]]; }
    } else if (rs.length === 1) {
      const r = niceTex(rs[0]);
      if (wantOutside) { tex = incl ? "\\mathbb{R}" : `\\mathbb{R}\\setminus\\{${r}\\}`; segs = [[null, null]]; }
      else { tex = incl ? `\\{${r}\\}` : "\\varnothing"; segs = incl ? [[rs[0], rs[0]]] : []; }
    } else {
      const always = up ? pos : !pos;
      tex = always ? "\\mathbb{R}" : "\\varnothing"; segs = always ? [[null, null]] : [];
    }
    return { D, rs, tex, segs, incl, up, wantOutside };
  }
  function parabolaSVG(a, b, c, op) {
    const s = solveQuad(a, b, c, op);
    const vx = -b / (2 * a);
    const span = s.rs.length === 2 ? Math.max((s.rs[1] - s.rs[0]) / 2 + 2.5, 4) : 5;
    const x0 = vx - span, x1 = vx + span;
    const f = (x) => a * x * x + b * x + c;
    const ys = []; for (let i = 0; i <= 80; i++) ys.push(f(x0 + ((x1 - x0) * i) / 80));
    let y0 = Math.min(...ys, 0), y1 = Math.max(...ys, 0);
    const pad = (y1 - y0) * 0.12 || 1; y0 -= pad; y1 += pad;
    const W = 640, H = 300, L = 30, R = 610, Tp = 16, B = 270;
    const X = (x) => L + ((x - x0) / (x1 - x0)) * (R - L), Y = (y) => B - ((y - y0) / (y1 - y0)) * (B - Tp);
    let d = ""; for (let i = 0; i <= 120; i++) { const x = x0 + ((x1 - x0) * i) / 120; d += (i ? "L" : "M") + X(x).toFixed(1) + " " + Y(f(x)).toFixed(1); }
    const yAx = Y(0);
    const col = "#30D158";
    const segs = s.segs.map(([p, q]) => {
      const xa = p == null ? L : X(p), xb = q == null ? R : X(q);
      return `<line x1="${xa}" y1="${yAx}" x2="${xb}" y2="${yAx}" stroke="${col}" stroke-width="8" stroke-linecap="round" opacity=".9"/>`;
    }).join("");
    // sombreado del área donde se cumple
    let area = "";
    s.segs.forEach(([p, q]) => {
      const pa = p == null ? x0 : p, pb = q == null ? x1 : q;
      if (pb - pa < 1e-9) return;
      let ad = `M${X(pa)} ${yAx}`;
      for (let i = 0; i <= 60; i++) { const x = pa + ((pb - pa) * i) / 60; ad += `L${X(x).toFixed(1)} ${Y(f(x)).toFixed(1)}`; }
      ad += `L${X(pb)} ${yAx}Z`;
      area += `<path d="${ad}" fill="${col}" opacity=".16"/>`;
    });
    const ticks = [];
    const st = (x1 - x0) > 16 ? 2 : 1;
    for (let n = Math.ceil(x0); n <= x1; n++) if (n % st === 0) ticks.push(`<line x1="${X(n)}" y1="${yAx - 4}" x2="${X(n)}" y2="${yAx + 4}" stroke="rgba(255,255,255,.4)"/><text x="${X(n)}" y="${Math.min(yAx + 20, H - 4)}" fill="rgba(255,255,255,.55)" font-size="11" text-anchor="middle">${n}</text>`);
    const roots = s.rs.map((r) => `<circle cx="${X(r)}" cy="${yAx}" r="7" fill="${s.incl ? "#fff" : "#000"}" stroke="#fff" stroke-width="2.5"/><text x="${X(r)}" y="${yAx - 14}" fill="#fff" font-weight="700" font-size="13" text-anchor="middle">${fmt(r)}</text>`).join("");
    const yAxis = 0 >= x0 && 0 <= x1 ? `<line x1="${X(0)}" y1="${Tp}" x2="${X(0)}" y2="${B}" stroke="rgba(255,255,255,.25)"/>` : "";
    const svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Parábola">
      ${area}${yAxis}
      <line x1="${L}" y1="${yAx}" x2="${R}" y2="${yAx}" stroke="rgba(255,255,255,.45)" stroke-width="1.5"/>
      ${ticks.join("")}
      <path d="${d}" fill="none" stroke="url(#pg)" stroke-width="3.5" stroke-linecap="round" class="draw"/>
      <defs><linearGradient id="pg" x1="0" x2="1"><stop offset="0" stop-color="#FF9F0A"/><stop offset="1" stop-color="#FFD60A"/></linearGradient></defs>
      ${segs}${roots}
    </svg>`;
    return { svg, s };
  }
  function barModel() {
    const parts = Array.from({ length: 8 }, (_, i) => {
      const done = i < 5, x = 20 + i * 75;
      return `<rect x="${x}" y="40" width="71" height="46" rx="8" fill="${done ? "#0A84FF" : "rgba(255,159,10,.25)"}" stroke="${done ? "#64D2FF" : "#FF9F0A"}" stroke-width="2" style="opacity:0;animation:stepIn .5s ${i * 0.12}s var(--spring) forwards"/>
      <text x="${x + 35}" y="69" fill="#fff" font-size="13" font-weight="700" text-anchor="middle" style="opacity:0;animation:stepIn .5s ${1 + i * 0.1}s forwards">${done ? "✓" : "10 km"}</text>`;
    }).join("");
    return `<svg viewBox="0 0 640 140" role="img" aria-label="Modelo de barras">
      <text x="20" y="26" fill="#64D2FF" font-size="13" font-weight="700">Recorrido: 5/8</text>
      <text x="620" y="26" fill="#FF9F0A" font-size="13" font-weight="700" text-anchor="end">Faltan 3/8 = 30 km</text>
      ${parts}
      <path d="M20 104 v8 h596 v-8" fill="none" stroke="rgba(255,255,255,.5)"/><text x="320" y="132" fill="#fff" font-size="14" font-weight="700" text-anchor="middle">Total = 8 × 10 km = 80 km</text>
    </svg>`;
  }

  /* =========================================================
     PIZARRA: escribe las operaciones como un profe en el tablero
     ========================================================= */
  const Board = (() => {
    let d = 0; // orden de escritura
    const item = (html, cls = "") => `<div class="bi ${cls}" style="--d:${d++}">${html}</div>`;
    const cells = (s) => [...s].map((c) => `<span class="c">${c === " " ? "&nbsp;" : esc(c)}</span>`).join("");
    const padL = (s, w) => " ".repeat(Math.max(0, w - [...s].length)) + s;
    const arith = (rows) => {
      const W = Math.max(...rows.map((r) => [...r.s].length));
      return `<div class="arith">${rows.map((r) => item(cells(padL(r.s, W)), "ar " + (r.cls || ""))).join("")}</div>`;
    };
    const withComma = (digits, dec) => {
      if (!dec) return digits;
      const s = digits.padStart(dec + 1, "0");
      return s.slice(0, -dec) + "," + s.slice(-dec);
    };
    const tex = (t) => item(`$\\displaystyle ${t}$`, "bl-tex");
    const note = (t) => item(`✎ ${prep(t)}`, "bnote");

    function mul(a, b) {
      const da = (a.split(",")[1] || "").length, db = (b.split(",")[1] || "").length;
      const A = BigInt(a.replace(",", "")), bd = String(BigInt(b.replace(",", "")));
      const rows = [{ s: a }, { s: "× " + b }];
      const res = (A * BigInt(bd)).toString();
      if (bd.length > 1) {
        [...bd].reverse().forEach((dg, i) => rows.push({ s: (A * BigInt(dg)).toString() + " ".repeat(i), cls: i === 0 ? "rule part" : "part" }));
        rows.push({ s: res, cls: "rule res" });
      } else rows.push({ s: res, cls: "rule res" });
      let out = arith(rows);
      if (bd.length > 1) out += note(`Multiplico ${String(A)} por cada cifra de ${bd}, de derecha a izquierda, corriendo un lugar cada vez, y luego sumo.`);
      if (da + db) out += tex(`${da}+${db}=${da + db}\\text{ decimales}\\;\\Rightarrow\\;\\hl{${withComma(res, da + db).replace(",", "{,}")}}`);
      return out;
    }
    function addSub(list, op) {
      const dec = Math.max(...list.map((x) => (x.split(",")[1] || "").length));
      const norm = list.map((x) => { const [i, f = ""] = x.split(","); return { i, f: f.padEnd(dec, "0") }; });
      const vals = norm.map((n) => BigInt(n.i + n.f));
      const total = op === "+" ? vals.reduce((s, v) => s + v, 0n) : vals[0] - vals.slice(1).reduce((s, v) => s + v, 0n);
      const show = (n) => (dec ? `${n.i},${n.f}` : n.i);
      const rows = norm.map((n, k) => ({ s: (k === norm.length - 1 ? (op === "+" ? "+ " : "− ") : "") + show(n) }));
      rows.push({ s: withComma(total.toString(), dec), cls: "rule res" });
      const padded = list.some((x) => (x.split(",")[1] || "").length < dec);
      return arith(rows) + (padded ? note("Completo con ceros para que las comas queden una debajo de la otra.") : "");
    }
    function div(D, dv, decs) {
      const s = String(D), dd = +dv;
      const head = item(`<span class="galera"><span>${esc(s)}</span><span class="gd">${esc(dv)}</span></span>`, "bl-tex");
      let rem = 0, q = "", started = false, out = "";
      for (let i = 0; i < s.length; i++) {
        if (started && rem === 0 && /^0+$/.test(s.slice(i))) {
          const rest = s.slice(i); q += rest;
          out += tex(`\\text{residuo 0: bajo los ceros que faltan}\\to\\;\\hl{${rest}}`);
          break;
        }
        const cur = rem * 10 + +s[i], qd = Math.floor(cur / dd);
        if (!started && qd === 0 && i < s.length - 1) { rem = cur; continue; }
        const bring = started ? `\\text{bajo el }${s[i]}\\to\\;` : "";
        started = true; q += qd; rem = cur - qd * dd;
        out += tex(`${bring}${cur}\\div${dd}=\\hl{${qd}}\\quad ${qd}\\times${dd}=${qd * dd}\\quad ${cur}-${qd * dd}=\\bl{${rem}}`);
      }
      if (!q) q = "0";
      if (decs > 0 && rem !== 0) {
        q += ",";
        for (let k = 0; k < decs && rem !== 0; k++) {
          const cur = rem * 10, qd = Math.floor(cur / dd);
          out += tex(`\\text{${k === 0 ? "pongo coma y " : ""}bajo un }0\\to\\;${cur}\\div${dd}=\\hl{${qd}}\\quad ${cur}-${qd * dd}=\\bl{${cur - qd * dd}}`);
          q += qd; rem = cur - qd * dd;
        }
      }
      return head + out + tex(`${s}\\div${dv}=\\gr{${q.replace(",", "{,}")}${rem !== 0 && decs > 0 ? "\\ldots" : ""}}`) + (rem !== 0 && decs === 0 ? "" : "");
    }
    function fact(n) {
      n = +n; let x = n; const rows = []; const ps = [];
      for (let p = 2; x > 1; ) { if (x % p === 0) { rows.push([x, p]); ps.push(p); x /= p; } else p++; }
      rows.push([1, ""]);
      const cnt = {}; ps.forEach((p) => (cnt[p] = (cnt[p] || 0) + 1));
      const pw = Object.entries(cnt).map(([p, c]) => (c > 1 ? `${p}^{${c}}` : p)).join("\\cdot");
      return `<div class="ladder">${rows.map(([a, p]) => item(`<span>${a}</span><span>${p}</span>`, "lr")).join("")}</div>` + tex(`${n}=${ps.join("\\cdot")}${ps.length > 1 ? "=" + pw : ""}`);
    }
    function mcm(list) {
      let nums = list.split(",").map(Number); const rows = []; const ps = [];
      while (nums.some((v) => v > 1)) {
        let p = 2; while (!nums.some((v) => v % p === 0 && v > 1)) p++;
        rows.push([nums.slice(), p]); ps.push(p);
        nums = nums.map((v) => (v % p === 0 ? v / p : v));
      }
      rows.push([nums, ""]);
      return `<div class="ladder">${rows.map(([vs, p]) => item(`${vs.map((v) => `<span>${v}</span>`).join("")}<span>${p}</span>`, "lr")).join("")}</div>` + tex(`\\text{mcm}=${ps.join("\\cdot")}=\\hl{${ps.reduce((a, b) => a * b, 1)}}`);
    }
    function sign(r1, r2, op) {
      r1 = +r1; r2 = +r2;
      const f = (r) => (r < 0 ? `x+${-r}` : `x-${r}`);
      const pos = op.startsWith(">"), incl = op.includes("=");
      const sg = (v) => (v > 0 ? `<b class="sp">+</b>` : `<b class="sm">−</b>`);
      const cols = [[-1, -1], [1, -1], [1, 1]];
      const want = cols.map(([a, b]) => (a * b > 0) === pos);
      const head = [`$(-\\infty,${r1})$`, `$(${r1},${r2})$`, `$(${r2},\\infty)$`];
      const th = `<tr><th></th>${head.map((h, i) => `<th class="${want[i] ? "w" : ""}">${h}</th>`).join("")}</tr>`;
      const tr = (label, vals) => `<tr><td>${label}</td>${vals.map((v, i) => `<td class="${want[i] ? "w" : ""}">${sg(v)}</td>`).join("")}</tr>`;
      const table = `<div class="table-wrap"><table class="signs">${th}${tr(`$${f(r1)}$`, cols.map((c) => c[0]))}${tr(`$${f(r2)}$`, cols.map((c) => c[1]))}${tr(`<b>Producto</b>`, cols.map((c) => c[0] * c[1]))}</table></div>`;
      const o = incl ? "[" : "(", c = incl ? "]" : ")";
      const sol = pos ? `(-\\infty,${r1}${c}\\cup${o}${r2},\\infty)` : `${o}${r1},${r2}${c}`;
      return item(table, "bl-table") + note(`Queremos que el producto sea ${pos ? "positivo (+)" : "negativo (−)"}${incl ? " o cero" : ""}: columnas en verde.`) + tex(`\\gr{${sol}}`);
    }
    function slots(spec) {
      const [v, l = ""] = spec.split("|"); const vals = v.split(","), labs = l.split(",");
      const html = vals.map((x, i) => `${i ? '<span class="slot-op">×</span>' : ""}<div class="slot"><b>${x}</b><small>${esc(labs[i] || "")}</small></div>`).join("");
      return item(`<div class="slots" style="margin:4px 0">${html}</div>`, "bl-slots");
    }
    function line(L) {
      const m = /^(\w+):([\s\S]*)$/.exec(L);
      const kind = m && ["mul", "add", "sub", "div", "fact", "mcm", "sign", "slots", "note"].includes(m[1]) ? m[1] : null;
      if (!kind) return tex(L);
      const arg = m[2];
      if (kind === "note") return note(arg);
      if (kind === "mul") { const [a, b] = arg.split("|"); return mul(a, b); }
      if (kind === "add") return addSub(arg.split("|"), "+");
      if (kind === "sub") return addSub(arg.split("|"), "-");
      if (kind === "div") { const [a, b, k = "2"] = arg.split("|"); return div(a, b, +k); }
      if (kind === "fact") return fact(arg);
      if (kind === "mcm") return mcm(arg);
      if (kind === "sign") { const [a, b, o] = arg.split("|"); return sign(a, b, o); }
      if (kind === "slots") return slots(arg);
    }
    function auto(stepHtml) {
      const segs = [];
      String(stepHtml).replace(/\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g, (m, a, b) => { const t = (a || b).trim(); if (t.replace(/[\s{},]/g, "").length > 3) segs.push(t); });
      return segs;
    }
    function html(exId, idx, stepHtml) {
      const lines = ((window.BOARDS || {})[exId] || {})[idx] || auto(stepHtml);
      if (!lines.length) return "";
      d = 0;
      const body = lines.map(line).join("");
      return `<div class="board"><div class="board-head"><span>✍️ Pizarra</span><button class="board-replay" title="Volver a escribir" aria-label="Volver a escribir">↻</button></div><div class="board-body play">${body}</div></div>`;
    }
    function bind(root) {
      $$(".board-replay", root).forEach((b) => b.onclick = () => {
        const body = b.closest(".board").querySelector(".board-body");
        body.classList.remove("play"); void body.offsetWidth; body.classList.add("play");
      });
    }
    return { html, bind };
  })();

  /* ---------------- Navegación ---------------- */
  function renderNav(route) {
    const items = [["#/", "Inicio"], ...MODS.map((m) => [`#/m/${m.id}`, `${m.emoji} ${m.num}`]), ["#/simulacro", "🏁 Simulacro"], ["#/formulas", "📋 Fórmulas"]];
    $("#nav").innerHTML = items.map(([h, t]) => `<a href="${h}" class="${("#" + route) === h || (route === "/" && h === "#/") ? "active" : ""}" title="${h.startsWith("#/m/") ? esc(MODS.find((m) => h.endsWith(m.id)).title) : ""}">${t}</a>`).join("");
  }

  function router() {
    Voice.stop();
    const route = (location.hash || "#/").slice(1) || "/";
    renderNav(route);
    const app = $("#app");
    const m = route.match(/^\/m\/(a\d)/);
    if (m) { const mod = MODS.find((x) => x.id === m[1]); if (mod) return viewModule(app, mod); }
    if (route.startsWith("/simulacro")) return viewSim(app);
    if (route.startsWith("/formulas")) return viewFormulas(app);
    viewHome(app);
  }

  function mount(app, html) {
    app.innerHTML = `<div class="view">${html}</div>`;
    typeset(app);
    observeReveal(app);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  /* ---------------- Vista: Inicio ---------------- */
  function viewHome(app) {
    setAccent("#0A84FF", "#64D2FF");
    const tp = totalProgress();
    const greet = `¡Hola, ${STUDENT}! Soy tu profe virtual. Mañana es el examen y vamos a llegar listos. Esta guía tiene los cinco temas de tu plan de apoyo. En cada uno te explico la teoría con ejemplos, resolvemos juntos todos los ejercicios del taller paso a paso, juegas en un laboratorio interactivo y al final te pongo un quiz. Mi consejo: intenta cada ejercicio primero, y solo después mira los pasos. ¡Vamos!`;
    let t = 0;
    const plan = MODS.map((m) => { const s = t; t += m.minutes; return { m, s }; });
    mount(app, `
      <section class="hero glass reveal">
        <div class="orb"></div>
        <span class="eyebrow">Matemáticas 11° · Plan de apoyo · Período I</span>
        <h1 style="margin-top:10px">Tu examen,<br><span class="grad-text">explicado paso a paso.</span></h1>
        <p class="lead">Fracciones, potencias, intervalos, inecuaciones y conteo. Cada ejercicio del taller resuelto, con explicaciones, animaciones, voz y quizzes que te dicen en qué fallaste.</p>
        <div class="hero-actions">
          <a class="btn primary" href="#/m/${(MODS.find((m) => modProgress(m) < 100) || MODS[0]).id}">${tp ? "▶ Continuar" : "▶ Empezar ahora"}</a>
          <a class="btn" href="#/simulacro">🏁 Hacer el simulacro</a>
          <a class="btn ghost" href="#/formulas">📋 Hoja de fórmulas</a>
        </div>
        <div class="teacher">
          <div class="avatar">👨‍🏫</div>
          <div class="bubble"><b class="who">Tu profe virtual</b>¡Hola, ${STUDENT}! Mañana es el examen y vamos a llegar listos. Intenta cada ejercicio primero y solo después mira los pasos. Si algo no se entiende, toca 🔊 y te lo explico en voz alta.</div>
          ${speakBtn('id="greet"')}
        </div>
      </section>

      <section class="section">
        <div class="section-head reveal">
          <div><span class="eyebrow">Los 5 temas</span><h2>Elige por dónde empezar</h2></div>
          <div style="display:flex;align-items:center;gap:12px"><span class="muted">Progreso total</span><div class="ring big" style="--p:${tp}" data-label="${tp}%"></div></div>
        </div>
        <div class="grid">
          ${MODS.map((m) => { const p = modProgress(m); return `
          <a class="mod-card glass reveal" href="#/m/${m.id}" style="--c:${m.color}">
            <div class="glow"></div>
            <div class="top"><div class="emoji">${m.emoji}</div><div class="ring" style="--p:${p};--c:${m.color}" data-label="${p}%"></div></div>
            <span class="tag">Actividad ${m.num}</span>
            <h3>${m.title}</h3>
            <p>${m.subtitle}</p>
            <div class="meta"><span>🧠 ${m.method}</span></div>
            <div class="meta"><span>${m.exercises.length} ejercicios · ${m.quiz.length} preguntas</span><span>⏱ ${m.minutes} min</span></div>
          </a>`; }).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-head reveal"><div><span class="eyebrow">Plan para esta noche</span><h2>Estudia en bloques, con pausas</h2></div><span class="muted">≈ ${Math.round((t + 25) / 60 * 10) / 10} horas en total</span></div>
        <div class="timeline glass reveal" style="padding:14px">
          ${plan.map(({ m, s }) => `<a class="tl-item" href="#/m/${m.id}" style="text-decoration:none;color:inherit"><span class="time">+${s} min</span><span><b>${m.emoji} ${m.title}</b><br><span class="muted" style="font-size:14px">${m.minutes} min · luego 5 min de descanso</span></span><span class="done">${modProgress(m) >= 80 ? "✓ listo" : ""}</span></a>`).join("")}
          <a class="tl-item" href="#/simulacro" style="text-decoration:none;color:inherit"><span class="time">+${t} min</span><span><b>🏁 Simulacro final</b><br><span class="muted" style="font-size:14px">13 preguntas tipo examen · 25 min</span></span><span class="done">${P.sim ? `✓ ${P.sim.best}/${P.sim.total}` : ""}</span></a>
        </div>
      </section>

      <section class="section">
        <div class="section-head reveal"><div><span class="eyebrow">Cómo estudiar con esta guía</span><h2>4 hábitos que sí funcionan</h2></div></div>
        <div class="tips">
          <div class="tip glass reveal"><div class="n">✍️</div><h3>Intenta primero</h3><p>Antes de abrir los pasos, resuelve en tu cuaderno. Equivocarte primero hace que recuerdes mejor la solución.</p></div>
          <div class="tip glass reveal"><div class="n">🗣️</div><h3>Explícalo en voz alta</h3><p>Técnica Feynman: si puedes explicárselo a alguien en palabras simples, lo entendiste. ¡En la sustentación te lo van a pedir!</p></div>
          <div class="tip glass reveal"><div class="n">🎯</div><h3>Pruébate sin mirar</h3><p>Los quizzes y el simulacro son práctica de recuperación: la forma más efectiva de estudiar según la ciencia.</p></div>
          <div class="tip glass reveal"><div class="n">😴</div><h3>Duerme bien</h3><p>El cerebro guarda lo aprendido mientras duermes. Mejor dormir 8 horas que estudiar hasta las 3 a. m.</p></div>
        </div>
      </section>`);
    $("#greet").onclick = (e) => Voice.toggle(greet, { btn: e.currentTarget, label: "👨‍🏫 Bienvenida" });
  }

  /* ---------------- Vista: Módulo ---------------- */
  const TABS = [["learn", "📖 Aprende"], ["ex", "✏️ Paso a paso"], ["lab", "🧪 Laboratorio"], ["quiz", "🎯 Quiz"]];
  function viewModule(app, m) {
    setAccent(m.color, m.color2);
    const tab = P.tab[m.id] || "learn";
    const idx = MODS.indexOf(m), next = MODS[idx + 1];
    mount(app, `
      <section class="mod-hero glass reveal">
        <div class="glow"></div>
        <div class="row">
          <div class="big-emoji">${m.emoji}</div>
          <div style="flex:1;min-width:240px">
            <span class="eyebrow">Actividad ${m.num} · ⏱ ${m.minutes} min</span>
            <h1 style="font-size:clamp(30px,5vw,48px);margin-top:6px">${m.title}</h1>
            <p class="muted" style="margin:6px 0 0">${m.subtitle}</p>
            <span class="method-pill">🧠 Método: ${m.method}</span>
          </div>
          <div class="ring big" style="--p:${modProgress(m)}" data-label="${modProgress(m)}%"></div>
        </div>
        <p class="method-why">${m.methodWhy}</p>
        <div class="teacher">
          <div class="avatar">👨‍🏫</div>
          <div class="bubble"><b class="who">El profe dice</b>${prep(m.intro)}</div>
          ${speakBtn('id="introSpeak"')}
        </div>
      </section>
      <div class="segmented glass" id="seg"><span class="thumb"></span>${TABS.map(([k, t]) => `<button data-tab="${k}" class="${k === tab ? "active" : ""}">${t}</button>`).join("")}</div>
      <div id="panel" class="panel"></div>
      <div style="display:flex;justify-content:space-between;gap:12px;margin-top:30px;flex-wrap:wrap">
        <a class="btn" href="${idx ? `#/m/${MODS[idx - 1].id}` : "#/"}">← ${idx ? MODS[idx - 1].title : "Inicio"}</a>
        <a class="btn primary" href="${next ? `#/m/${next.id}` : "#/simulacro"}">${next ? next.title : "🏁 Simulacro final"} →</a>
      </div>`);
    $("#introSpeak").onclick = (e) => Voice.toggle(html2say(m.intro) + " " + m.methodWhy, { btn: e.currentTarget, label: `${m.emoji} ${m.title}` });
    const seg = $("#seg");
    const moveThumb = () => {
      const b = $("button.active", seg), th = $(".thumb", seg);
      if (b) { th.style.width = b.offsetWidth + "px"; th.style.transform = `translateX(${b.offsetLeft}px)`; }
    };
    $$("button", seg).forEach((b) => b.onclick = () => {
      $$("button", seg).forEach((x) => x.classList.toggle("active", x === b));
      P.tab[m.id] = b.dataset.tab; save(); moveThumb(); Voice.stop();
      renderPanel(m, b.dataset.tab);
      b.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    });
    requestAnimationFrame(moveThumb);
    window.addEventListener("resize", moveThumb, { passive: true });
    renderPanel(m, tab);
  }

  function renderPanel(m, tab) {
    const panel = $("#panel");
    panel.innerHTML = "";
    if (tab === "learn") renderLearn(panel, m);
    else if (tab === "ex") renderExercises(panel, m);
    else if (tab === "lab") m.labs.forEach((l) => LABS[l](panel, m));
    else renderQuiz(panel, m.quiz, (score) => {
      const prev = P.quiz[m.id];
      if (!prev || score > prev.best) P.quiz[m.id] = { best: score, total: m.quiz.length };
      save();
    }, { title: `Quiz · ${m.title}` });
    typeset(panel);
    observeReveal(panel);
  }

  function renderLearn(panel, m) {
    panel.innerHTML = m.theory.map((t, i) => `
      <article class="card glass reveal" data-i="${i}">
        <div class="card-head"><div class="ic">${t.icon}</div><h3>${t.title}</h3>${speakBtn(`data-say="${i}"`)}</div>
        ${prep(t.html)}
      </article>`).join("") + `
      <div class="card glass reveal" style="text-align:center">
        <p style="margin-top:0">¿Listo? Ahora resolvemos juntos los ejercicios del taller.</p>
        <button class="btn primary" id="goEx">✏️ Ir al paso a paso</button>
      </div>`;
    $$("[data-say]", panel).forEach((b) => b.onclick = () => {
      const t = m.theory[+b.dataset.say];
      Voice.toggle(t.title + ". " + html2say(t.html), { btn: b, el: b.closest("article"), label: `${t.icon} ${t.title}` });
    });
    $("#goEx", panel).onclick = () => $('#seg button[data-tab="ex"]').click();
  }

  function renderExercises(panel, m) {
    let html = "", lastGroup = "";
    m.exercises.forEach((e, i) => {
      if (e.group !== lastGroup) { html += `<div class="group-title reveal">${e.group}</div>`; lastGroup = e.group; }
      html += `
      <article class="ex glass reveal ${P.ex[e.id] ? "done" : ""}" data-id="${e.id}">
        <div class="ex-head" role="button" tabindex="0" aria-expanded="false">
          <span class="num">${P.ex[e.id] ? "✓" : i + 1}</span>
          <span class="t">${prep(e.title)}</span>
          <span class="chev">›</span>
        </div>
        <div class="ex-body"><div><div class="ex-inner">
          ${e.statement ? `<p class="ex-statement">${prep(e.statement)}</p>` : ""}
          <div class="ex-actions">
            <button class="btn small primary" data-act="next">▶ Primer paso</button>
            <button class="btn small" data-act="all">Ver todo</button>
            ${e.hint ? `<button class="btn small ghost" data-act="hint">💡 Pista</button>` : ""}
            <button class="btn small ghost" data-act="speak">🔊 Explícamelo</button>
            <button class="btn small ghost" data-act="reset" style="display:none">↺ Reiniciar</button>
          </div>
          ${e.hint ? `<div class="hint">💡 ${prep(e.hint)}</div>` : ""}
          <div class="steps"></div>
          <div class="ans-slot"></div>
        </div></div></div>
      </article>`;
    });
    panel.innerHTML = html;

    $$(".ex", panel).forEach((card) => {
      const e = m.exercises.find((x) => x.id === card.dataset.id);
      const stepsEl = $(".steps", card), ansEl = $(".ans-slot", card);
      const nextBtn = $('[data-act="next"]', card), resetBtn = $('[data-act="reset"]', card), allBtn = $('[data-act="all"]', card);
      let shown = 0;
      const head = $(".ex-head", card);
      const toggleOpen = () => { card.classList.toggle("open"); head.setAttribute("aria-expanded", card.classList.contains("open")); };
      head.onclick = toggleOpen;
      head.onkeydown = (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); toggleOpen(); } };

      const addStep = (silent) => {
        if (shown >= e.steps.length) return;
        const s = e.steps[shown];
        const div = document.createElement("div");
        div.className = "step";
        div.innerHTML = `<span class="sn">${shown + 1}</span><div class="sx">${prep(s)}${Board.html(e.id, shown, s)}</div>${speakBtn()}`;
        stepsEl.appendChild(div);
        typeset(div);
        Board.bind(div);
        const b = $(".speak-btn", div);
        b.onclick = () => Voice.toggle(`Paso ${+div.querySelector(".sn").textContent}. ` + html2say(s), { btn: b, el: div, label: `Paso ${div.querySelector(".sn").textContent}` });
        shown++;
        if (!silent && Voice.auto) Voice.speak(`Paso ${shown}. ` + html2say(s), { btn: b, el: div, label: `Paso ${shown}` });
        if (!silent) setTimeout(() => div.scrollIntoView({ block: "nearest", behavior: "smooth" }), 60);
        update();
      };
      const finish = () => {
        if (ansEl.childElementCount) return;
        let vis = "";
        if (e.viz) vis = `<div class="visual">${numberLine(e.viz)}<div style="text-align:center;margin-top:6px">$${intervalTex(e.viz)}$</div></div>`;
        if (e.parab) { const { svg } = parabolaSVG(e.parab.a, e.parab.b, e.parab.c, e.parab.op); vis = `<div class="visual">${svg}<div class="muted" style="text-align:center;font-size:13px">Verde = donde se cumple la desigualdad</div></div>`; }
        if (e.visual === "barModel") vis = `<div class="visual">${barModel()}</div>`;
        ansEl.innerHTML = `${vis}<div class="answer">${prep(e.answer)}</div>`;
        typeset(ansEl);
        if (!P.ex[e.id]) {
          P.ex[e.id] = 1; save();
          card.classList.add("done"); $(".num", card).textContent = "✓";
          const ring = $(".mod-hero .ring"), pr = modProgress(m);
          if (ring) { ring.style.setProperty("--p", pr); ring.dataset.label = pr + "%"; }
          const all = m.exercises.every((x) => P.ex[x.id]);
          if (all) { confetti(); toast(`🎉 ¡Terminaste todos los ejercicios de ${m.title}!`); }
          else toast("✅ ¡Ejercicio completado!");
        }
      };
      const update = () => {
        nextBtn.textContent = shown === 0 ? "▶ Primer paso" : shown < e.steps.length ? `▶ Paso ${shown + 1} de ${e.steps.length}` : "✓ Completo";
        nextBtn.disabled = shown >= e.steps.length;
        allBtn.style.display = shown >= e.steps.length ? "none" : "";
        resetBtn.style.display = shown ? "" : "none";
        if (shown >= e.steps.length) finish();
      };
      nextBtn.onclick = () => addStep(false);
      allBtn.onclick = () => { while (shown < e.steps.length) addStep(true); };
      resetBtn.onclick = () => { Voice.stop(); shown = 0; stepsEl.innerHTML = ""; ansEl.innerHTML = ""; update(); };
      const hb = $('[data-act="hint"]', card);
      if (hb) hb.onclick = () => $(".hint", card).classList.toggle("show");
      $('[data-act="speak"]', card).onclick = (ev) => {
        while (shown < e.steps.length) addStep(true);
        const text = `${html2say(e.title)}. ${e.statement ? html2say(e.statement) + ". " : ""}` + e.steps.map((s, k) => `Paso ${k + 1}. ${html2say(s)}`).join(" ") + ` La respuesta es: ${html2say(e.answer)}.`;
        Voice.toggle(text, { btn: ev.currentTarget, label: `✏️ ${html2say(e.title).slice(0, 50)}` });
      };
    });
    // abre el primero pendiente
    const firstPending = $$(".ex", panel).find((c) => !c.classList.contains("done"));
    if (firstPending) firstPending.classList.add("open");
  }

  /* ---------------- Quiz genérico ---------------- */
  function renderQuiz(panel, qs, onFinish, opts = {}) {
    let answered = 0, score = 0;
    const wrongMods = {};
    panel.innerHTML = `
      <div class="card glass reveal">
        <div class="card-head"><div class="ic">🎯</div><h3>${opts.title || "Quiz"}</h3><span class="muted" id="qcount">0/${qs.length}</span></div>
        <div class="progress-bar"><i id="qbar"></i></div>
        <p class="muted" style="margin-bottom:0">Elige una opción. Te digo al instante si está bien y por qué.</p>
      </div>
      ${qs.map((q, i) => `
      <div class="quiz-q glass reveal" data-q="${i}">
        <div class="qn">Pregunta ${i + 1}${opts.modLabel ? ` · ${opts.modLabel(q)}` : ""}</div>
        <div class="qt">${prep(q.q)}</div>
        <div class="opts">${q.options.map((o, k) => `<button class="opt" data-k="${k}"><span class="l">${"abcd"[k]}</span><span>${prep(o)}</span></button>`).join("")}</div>
      </div>`).join("")}
      <div id="qres"></div>`;
    $$(".quiz-q", panel).forEach((qe) => {
      const q = qs[+qe.dataset.q];
      $$(".opt", qe).forEach((b) => b.onclick = () => {
        const k = +b.dataset.k, ok = k === q.correct;
        $$(".opt", qe).forEach((x) => { x.disabled = true; if (+x.dataset.k === q.correct) x.classList.add("right"); });
        if (!ok) { b.classList.add("wrong"); if (q.m) wrongMods[q.m] = (wrongMods[q.m] || 0) + 1; }
        answered++; if (ok) score++;
        const fb = document.createElement("div");
        fb.className = "feedback " + (ok ? "ok" : "no");
        const praise = ["¡Excelente! 🎉", "¡Muy bien! 💪", "¡Correcto! 🔥", "¡Eso es! ⭐"][answered % 4];
        fb.innerHTML = `<b>${ok ? praise : "Casi… 🤔 Revisemos:"}</b> ${prep(q.explain)} ${speakBtn()}`;
        qe.appendChild(fb); typeset(fb);
        const sb = $(".speak-btn", fb);
        sb.onclick = () => Voice.toggle((ok ? "¡Correcto! " : "Casi. ") + html2say(q.explain), { btn: sb, label: "🎯 Retroalimentación" });
        if (Voice.auto) Voice.speak((ok ? "¡Correcto! " : "Casi. Revisemos. ") + html2say(q.explain), { btn: sb, label: "🎯 Retroalimentación" });
        $("#qcount", panel).textContent = `${answered}/${qs.length}`;
        $("#qbar", panel).style.width = (answered / qs.length) * 100 + "%";
        if (answered === qs.length) done();
      });
    });
    function done() {
      const pct = score / qs.length;
      onFinish && onFinish(score, wrongMods);
      const msg = pct === 1 ? "¡Perfecto! Estás listo para el examen 🏆" : pct >= 0.7 ? "¡Muy bien! Repasa las que fallaste y quedas listo 💪" : pct >= 0.5 ? "Vas bien. Vuelve al paso a paso de los temas que fallaste 📚" : "Tranquilo, para eso es la práctica. Repasa la teoría y vuelve a intentarlo 🙌";
      const rec = Object.keys(wrongMods).map((id) => MODS.find((m) => m.id === id)).filter(Boolean);
      const r = $("#qres", panel);
      r.innerHTML = `<div class="score-card glass">
        <div class="eyebrow">Resultado</div>
        <div class="big grad-text">${score}/${qs.length}</div>
        <p>${msg}</p>
        ${rec.length ? `<p class="muted">Te recomiendo repasar:</p><div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">${rec.map((m) => `<a class="btn small" href="#/m/${m.id}">${m.emoji} ${m.title}</a>`).join("")}</div>` : ""}
        <div style="margin-top:16px"><button class="btn primary" id="retry">↺ Intentar de nuevo</button></div>
      </div>`;
      $("#retry", r).onclick = () => { renderQuiz(panel, qs, onFinish, opts); typeset(panel); observeReveal(panel); panel.scrollIntoView({ behavior: "smooth" }); };
      r.scrollIntoView({ behavior: "smooth", block: "center" });
      if (pct >= 0.7) confetti();
      Voice.speak(`Sacaste ${score} de ${qs.length}. ${msg.replace(/[^\p{L}\p{N}\s.,!¡]/gu, "")}`, { label: "🎯 Resultado" });
    }
  }

  /* ---------------- Vista: Simulacro ---------------- */
  function viewSim(app) {
    setAccent("#5E5CE6", "#64D2FF");
    mount(app, `
      <section class="mod-hero glass reveal"><div class="glow"></div>
        <div class="row"><div class="big-emoji">🏁</div><div style="flex:1;min-width:240px">
          <span class="eyebrow">Simulacro final · ≈ 25 min</span>
          <h1 style="font-size:clamp(30px,5vw,48px);margin-top:6px">Ensayo del examen</h1>
          <p class="muted" style="margin:6px 0 0">${window.SIMULACRO.length} preguntas nuevas de los 5 temas. Hazlas con lápiz y papel, sin mirar las fórmulas. Al final te digo qué repasar.</p>
        </div>${P.sim ? `<div class="ring big" style="--p:${Math.round((P.sim.best / P.sim.total) * 100)}" data-label="${P.sim.best}/${P.sim.total}"></div>` : ""}</div>
      </section>
      <div id="panel" class="panel"></div>`);
    const panel = $("#panel");
    renderQuiz(panel, window.SIMULACRO, (score) => {
      if (!P.sim || score > P.sim.best) P.sim = { best: score, total: window.SIMULACRO.length };
      save();
    }, { title: "Simulacro", modLabel: (q) => { const m = MODS.find((x) => x.id === q.m); return m ? `${m.emoji} ${m.title}` : ""; } });
    typeset(panel); observeReveal(panel);
  }

  /* ---------------- Vista: Fórmulas ---------------- */
  function viewFormulas(app) {
    setAccent("#64D2FF", "#0A84FF");
    mount(app, `
      <section class="section-head reveal"><div><span class="eyebrow">Repaso rápido</span><h1 style="font-size:clamp(30px,5vw,48px)">Hoja de fórmulas</h1><p class="muted">Léela 10 minutos antes de entrar al examen. Toca imprimir si la quieres en papel.</p></div>
        <button class="btn" onclick="window.print()">🖨️ Imprimir</button></section>
      <div class="grid">${window.FORMULAS.map((f) => `
        <div class="formula-card glass reveal" style="--c:${f.color}">
          <h3 style="color:${f.color}">${f.title}</h3>
          <ul>${f.items.map((x) => `<li>${prep(x)}</li>`).join("")}</ul>
        </div>`).join("")}
      </div>`);
  }

  /* =========================================================
     LABORATORIOS INTERACTIVOS
     ========================================================= */
  const labCard = (panel, icon, title, desc, inner) => {
    const el = document.createElement("article");
    el.className = "lab glass reveal";
    el.innerHTML = `<div class="card-head"><div class="ic">${icon}</div><h3>${title}</h3></div><p class="muted" style="margin-top:0">${desc}</p>${prep(inner)}`;
    panel.appendChild(el);
    return el;
  };
  const LABS = {};

  /* ----- A1: Barras de fracciones ----- */
  LABS.fractionLab = (panel) => {
    const el = labCard(panel, "🍫", "Laboratorio de barras de fracciones", "Cambia las fracciones y mira cómo se “cortan del mismo tamaño” para poder sumarlas o restarlas.", `
      <div class="lab-controls">
        <label class="field">Numerador 1<input class="input" type="number" id="fa" value="3" min="0" max="24"></label>
        <label class="field">Denominador 1<input class="input" type="number" id="fb" value="4" min="1" max="12"></label>
        <label class="field">Operación<select class="select" id="fop"><option value="+">+</option><option value="-">−</option></select></label>
        <label class="field">Numerador 2<input class="input" type="number" id="fc" value="4" min="0" max="24"></label>
        <label class="field">Denominador 2<input class="input" type="number" id="fd" value="3" min="1" max="12"></label>
      </div>
      <div id="fout"></div>`);
    const bars = (n, d, cls) => {
      const k = Math.max(1, Math.ceil(n / d));
      let h = "";
      for (let j = 0; j < k; j++) h += `<div class="fbar">${Array.from({ length: d }, (_, i) => `<i class="${j * d + i < n ? cls : ""}"></i>`).join("")}</div>`;
      return h;
    };
    const draw = () => {
      const g = (id, mn, mx) => Math.min(mx, Math.max(mn, parseInt($(id, el).value, 10) || 0));
      const a = g("#fa", 0, 24), b = g("#fb", 1, 12), c = g("#fc", 0, 24), d = g("#fd", 1, 12), op = $("#fop", el).value;
      const L = lcm(b, d), A = a * (L / b), C = c * (L / d), N = op === "+" ? A + C : A - C;
      $("#fout", el).innerHTML = `
        <div class="fbar-label"><span>$\\frac{${a}}{${b}}$</span></div>${bars(a, b, "on")}
        <div class="fbar-label"><span>$\\frac{${c}}{${d}}$</span></div>${bars(c, d, "on2")}
        <div class="out">
          <div class="row-line">1️⃣ m.c.m. de ${b} y ${d}: <b>${L}</b> → cortamos todo en ${L} partes.</div>
          <div class="row-line">2️⃣ $\\frac{${a}}{${b}}=\\frac{${A}}{${L}}$ y $\\frac{${c}}{${d}}=\\frac{${C}}{${L}}$</div>
          <div class="fbar-label"><span>Mismo tamaño de pedazo:</span></div>${bars(A, L, "on")}${bars(C, L, "on2")}
          <div class="row-line">3️⃣ $\\frac{${A}}{${L}}${op === "+" ? "+" : "-"}\\frac{${C}}{${L}}=\\frac{${N}}{${L}}${fracTex(N, L) !== `\\frac{${N}}{${L}}` ? "=" + fracTex(N, L) : ""}\\approx${texNum(N / L, 3)}$</div>
          ${N >= 0 ? `<div class="fbar-label"><span>Resultado</span></div>${bars(N, L, "on")}` : `<div class="callout warn">El resultado es negativo: le quitaste más de lo que tenías.</div>`}
        </div>`;
      typeset(el);
    };
    $$("input,select", el).forEach((i) => i.oninput = draw);
    draw();
  };

  /* ----- A1: Convertidor decimal → fracción ----- */
  LABS.decimalLab = (panel) => {
    const el = labCard(panel, "🔁", "Convertidor decimal → fracción", "Escribe la parte entera, la parte que NO se repite y el período (la que se repite). Deja el período vacío si el decimal es exacto.", `
      <div class="lab-controls">
        <label class="field">Parte entera<input class="input" id="di" value="0" inputmode="numeric"></label>
        <span style="font-size:28px;padding-top:16px">,</span>
        <label class="field">No se repite<input class="input wide" id="dn" value="" placeholder="(vacío)" inputmode="numeric"></label>
        <label class="field">Período (se repite)<input class="input wide" id="dp" value="39" inputmode="numeric"></label>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn small" data-ex="0|25|">0,25</button><button class="btn small" data-ex="4|75|">4,75</button>
        <button class="btn small" data-ex="0||39">0,3939…</button><button class="btn small" data-ex="0|1|6">0,1666…</button><button class="btn small" data-ex="0||9">0,999…</button>
      </div>
      <div id="dout"></div>`);
    $$("[data-ex]", el).forEach((b) => b.onclick = () => {
      const [i, n, p] = b.dataset.ex.split("|");
      $("#di", el).value = i; $("#dn", el).value = n; $("#dp", el).value = p;
      draw();
    });
    const draw = () => {
      const clean = (s) => (s || "").replace(/\D/g, "").slice(0, 9);
      const I = clean($("#di", el).value) || "0", A = clean($("#dn", el).value), Pp = clean($("#dp", el).value);
      const out = $("#dout", el);
      const shown = `${I}${A || Pp ? "{,}" : ""}${A}${Pp ? `\\overline{${Pp}}` : ""}`;
      let num, den, steps = [];
      if (!Pp) {
        if (!A) { out.innerHTML = `<div class="out">Es un número entero: $${I}=\\frac{${I}}{1}$</div>`; typeset(out); return; }
        num = BigInt(I + A); den = 10n ** BigInt(A.length);
        steps.push(`<b>Decimal exacto</b> con ${A.length} cifra(s) decimal(es): arriba todo el número sin coma, abajo un 1 con ${A.length} cero(s).`);
        steps.push(`$${shown}=\\frac{${num}}{${den}}$`);
      } else {
        const full = BigInt(I + A + Pp), sub = BigInt(I + A);
        num = full - sub; den = BigInt("9".repeat(Pp.length) + "0".repeat(A.length));
        steps.push(`<b>Periódico ${A ? "mixto" : "puro"}</b>: el período tiene ${Pp.length} cifra(s)${A ? ` y hay ${A.length} cifra(s) que no se repiten` : ""}.`);
        steps.push(`Arriba: $${I + A + Pp}-${I + A}=${num}$. Abajo: ${Pp.length} nueve(s)${A ? ` y ${A.length} cero(s)` : ""} → $${den}$.`);
        steps.push(`$${shown}=\\frac{${num}}{${den}}$`);
      }
      const g = bgcd(num, den), n2 = num / g, d2 = den / g;
      steps.push(g > 1n ? `Simplificamos dividiendo entre ${g}: $\\frac{${n2}}{${d2}}$${d2 === 1n ? ` $=${n2}$` : ""}` : "Ya no se puede simplificar.");
      out.innerHTML = `<div class="out">${steps.map((s, i) => `<div class="row-line step" style="animation-delay:${i * 0.12}s"><span class="sn">${i + 1}</span><div class="sx">${s}</div></div>`).join("")}
        <div class="answer">$${shown}=${d2 === 1n ? n2 : `\\frac{${n2}}{${d2}}`}$</div></div>`;
      typeset(out);
    };
    $$("input", el).forEach((i) => i.oninput = draw);
    draw();
  };

  /* ----- A2: Tarjetas de memoria ----- */
  LABS.flashLab = (panel) => {
    const cards = [
      ["Producto de potencias de igual base", "a^m\\cdot a^n=a^{m+n}"], ["Cociente de potencias de igual base", "\\frac{a^m}{a^n}=a^{m-n}"],
      ["Potencia de una potencia", "(a^m)^n=a^{m\\cdot n}"], ["Potencia de un producto", "(ab)^n=a^n b^n"], ["Potencia de un cociente", "\\left(\\frac{a}{b}\\right)^n=\\frac{a^n}{b^n}"],
      ["Exponente cero", "a^0=1"], ["Exponente negativo", "a^{-n}=\\frac{1}{a^n}"], ["Exponente fraccionario", "a^{\\frac{m}{n}}=\\sqrt[n]{a^m}"],
      ["Raíz de un producto", "\\sqrt[n]{ab}=\\sqrt[n]{a}\\sqrt[n]{b}"], ["Raíz de un cociente", "\\sqrt[n]{\\frac{a}{b}}=\\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}}"],
      ["Raíz de una raíz", "\\sqrt[m]{\\sqrt[n]{a}}=\\sqrt[mn]{a}"], ["Extracción de factores", "\\sqrt[n]{a^n b}=a\\sqrt[n]{b}"],
    ];
    const el = labCard(panel, "🃏", "Tarjetas de memoria", "Lee el nombre, di la fórmula en voz alta (¡sin mirar!) y toca la tarjeta para comprobar. Esto se llama práctica de recuperación.", `
      <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn small" id="shuf">🔀 Mezclar</button><button class="btn small" id="flipAll">↻ Voltear todas</button></div>
      <div class="flash-grid" id="fg"></div>`);
    const draw = (list) => {
      $("#fg", el).innerHTML = list.map(([n, f]) => `<div class="flash" tabindex="0"><div class="in"><div class="f">${n}<br><span class="muted" style="font-size:12px">toca para ver</span></div><div class="b">$${f}$</div></div></div>`).join("");
      typeset($("#fg", el));
      $$(".flash", el).forEach((c) => { c.onclick = () => c.classList.toggle("flip"); c.onkeydown = (e) => { if (e.key === "Enter") c.classList.toggle("flip"); }; });
    };
    $("#shuf", el).onclick = () => draw(cards.slice().sort(() => Math.random() - 0.5));
    $("#flipAll", el).onclick = () => $$(".flash", el).forEach((c) => c.classList.toggle("flip"));
    draw(cards);
  };

  /* ----- A2: La cárcel de los radicales ----- */
  LABS.radicalLab = (panel) => {
    const el = labCard(panel, "⛓️", "La cárcel de los radicales", "Escribe un número y el índice. Lo descomponemos en primos y los que forman grupo completo salen de la raíz.", `
      <div class="lab-controls">
        <label class="field">Índice<select class="select" id="ri"><option>2</option><option>3</option><option>4</option><option>5</option></select></label>
        <label class="field">Número dentro de la raíz<input class="input wide" type="number" id="rn" value="75" min="1" max="1000000"></label>
        <button class="btn small primary" id="rgo" style="margin-top:16px">⛓️ ¡Liberar!</button>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn small" data-v="2|12">√12</button><button class="btn small" data-v="2|27">√27</button><button class="btn small" data-v="2|50">√50</button><button class="btn small" data-v="3|432">∛432</button><button class="btn small" data-v="2|48">√48</button></div>
      <div id="rout"></div>`);
    const run = () => {
      const n = Math.min(1e6, Math.max(1, parseInt($("#rn", el).value, 10) || 1)), k = +$("#ri", el).value;
      const fs = []; let x = n;
      for (let p = 2; p * p <= x; p++) while (x % p === 0) { fs.push(p); x /= p; }
      if (x > 1) fs.push(x);
      const cnt = {}; fs.forEach((p) => cnt[p] = (cnt[p] || 0) + 1);
      let outF = 1, inF = 1; const chips = [];
      Object.entries(cnt).forEach(([p, c]) => {
        p = +p; const g = Math.floor(c / k), r = c % k;
        outF *= p ** g; inF *= p ** r;
        for (let i = 0; i < g; i++) chips.push(`<span class="chip" data-g="1" title="grupo de ${k}">${Array(k).fill(p).join("·")}</span>`);
        for (let i = 0; i < r; i++) chips.push(`<span class="chip">${p}</span>`);
      });
      const root = (v) => k === 2 ? `\\sqrt{${v}}` : `\\sqrt[${k}]{${v}}`;
      const res = inF === 1 ? `${outF}` : `${outF === 1 ? "" : outF}${root(inF)}`;
      const o = $("#rout", el);
      o.innerHTML = `<div class="out">
        <div class="row-line">1️⃣ Factores primos: $${n}=${fs.join("\\cdot") || 1}$</div>
        <div class="row-line">2️⃣ Agrupamos de a <b>${k}</b> (el índice):</div>
        <div class="jail"><div class="chips">${chips.join("") || '<span class="chip">1</span>'}</div></div>
        <div class="row-line" style="margin-top:12px">3️⃣ De cada grupo sale <b>un</b> número; los sueltos se quedan adentro.</div>
        <div class="answer">$${root(n)}=${res}$</div></div>`;
      typeset(o);
      setTimeout(() => $$('.chip[data-g]', o).forEach((c) => c.classList.add("grouped")), 250);
      setTimeout(() => $$('.chip[data-g]', o).forEach((c) => c.classList.add("out")), 1000);
    };
    $("#rgo", el).onclick = run;
    $("#rn", el).onkeydown = (e) => { if (e.key === "Enter") run(); };
    $("#ri", el).onchange = run;
    $$("[data-v]", el).forEach((b) => b.onclick = () => { const [k, n] = b.dataset.v.split("|"); $("#ri", el).value = k; $("#rn", el).value = n; run(); });
    run();
  };

  /* ----- A3: Recta numérica interactiva + reto ----- */
  LABS.intervalLab = (panel) => {
    const el = labCard(panel, "📏", "Recta numérica interactiva", "Mueve los extremos y decide si se incluyen. La guía escribe el intervalo, el conjunto y el tipo al instante.", `
      <div class="lab-controls">
        <label class="field">Extremo izquierdo<input class="input" type="number" id="ia" value="-2" step="1"></label>
        <label class="toggle"><input type="checkbox" id="iac"><span class="sw"></span>incluye</label>
        <label class="toggle"><input type="checkbox" id="iainf"><span class="sw"></span>−∞</label>
        <span style="width:16px"></span>
        <label class="field">Extremo derecho<input class="input" type="number" id="ib" value="8" step="1"></label>
        <label class="toggle"><input type="checkbox" id="ibc" checked><span class="sw"></span>incluye</label>
        <label class="toggle"><input type="checkbox" id="ibinf"><span class="sw"></span>+∞</label>
      </div>
      <div class="visual" id="iviz"></div>
      <div class="out" id="iout"></div>
      <hr style="border:0;border-top:1px solid rgba(255,255,255,.1);margin:22px 0">
      <div class="card-head"><div class="ic">🎮</div><h3>Reto: ¿qué intervalo es?</h3><button class="btn small primary" id="inew">Nuevo reto</button></div>
      <div id="ich"></div>`);
    const draw = () => {
      const ainf = $("#iainf", el).checked, binf = $("#ibinf", el).checked;
      $("#ia", el).disabled = $("#iac", el).disabled = ainf;
      $("#ib", el).disabled = $("#ibc", el).disabled = binf;
      const v = { a: ainf ? null : +$("#ia", el).value, b: binf ? null : +$("#ib", el).value, ac: $("#iac", el).checked, bc: $("#ibc", el).checked };
      if (v.a != null && v.b != null && (v.a > v.b || (v.a === v.b && !(v.ac && v.bc)))) {
        $("#iviz", el).innerHTML = numberLine(v);
        $("#iout", el).innerHTML = `<div class="callout warn">⚠️ El extremo izquierdo debe ser menor que el derecho. Así como está, es el <b>conjunto vacío</b> $\\varnothing$.</div>`;
      } else {
        $("#iviz", el).innerHTML = numberLine(v);
        $("#iout", el).innerHTML = prep(`<div class="row-line">📐 Intervalo: $${intervalTex(v)}$</div><div class="row-line">🧺 Conjunto: $${setTex(v)}$</div><div class="row-line">🏷️ Tipo: <b>${intervalType(v)}</b></div>`);
      }
      typeset($("#iout", el));
    };
    $$("input", el).forEach((i) => i.oninput = draw);
    draw();
    const challenge = () => {
      const r = () => Math.floor(Math.random() * 15) - 7;
      let a = r(), b = r(); while (b <= a) { a = r(); b = r(); }
      const kind = Math.random();
      const v = { a: kind < 0.2 ? null : a, b: kind > 0.8 ? null : b, ac: Math.random() < 0.5, bc: Math.random() < 0.5 };
      const variants = [v, { ...v, ac: !v.ac }, { ...v, bc: !v.bc }, { ...v, ac: !v.ac, bc: !v.bc }].filter((x, i, arr) => arr.findIndex((y) => intervalTex(y) === intervalTex(x)) === i);
      while (variants.length < 4) { variants.push({ ...v, a: v.a == null ? b - 9 : v.a + 1, b: v.b == null ? a + 9 : v.b }); }
      const opts = variants.slice(0, 4).sort(() => Math.random() - 0.5);
      const ch = $("#ich", el);
      ch.innerHTML = `<div class="visual">${numberLine(v)}</div><div class="opts" style="margin-top:12px">${opts.map((o, k) => `<button class="opt" data-k="${k}"><span class="l">${"abcd"[k]}</span><span>$${intervalTex(o)}$</span></button>`).join("")}</div><div id="ifb"></div>`;
      typeset(ch);
      $$(".opt", ch).forEach((btn) => btn.onclick = () => {
        const ok = intervalTex(opts[+btn.dataset.k]) === intervalTex(v);
        $$(".opt", ch).forEach((x) => { x.disabled = true; if (intervalTex(opts[+x.dataset.k]) === intervalTex(v)) x.classList.add("right"); });
        if (!ok) btn.classList.add("wrong");
        $("#ifb", ch).innerHTML = prep(`<div class="feedback ${ok ? "ok" : "no"}"><b>${ok ? "¡Bien! 🎉" : "Revisa los puntos:"}</b> punto relleno = corchete, punto vacío = paréntesis, flecha = infinito. Es $${intervalTex(v)}$, o sea $${setTex(v)}$.</div>`);
        typeset($("#ifb", ch));
      });
    };
    $("#inew", el).onclick = challenge;
    challenge();
  };

  /* ----- A4: Balanza de desigualdades ----- */
  LABS.balanceLab = (panel) => {
    const el = labCard(panel, "⚖️", "La balanza de las desigualdades", "Aplica operaciones a ambos lados de 2 < 5 y mira cuándo se voltea el signo. ¡Descubre la regla tú mismo!", `
      <div class="balance-stage">
        <div class="balance-ineq"><span id="bl">2</span><span class="sign" id="bs">&lt;</span><span id="br">5</span></div>
        <div class="beam" id="beam"></div><div class="fulcrum"></div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
        ${[["+3", "a", 3], ["−4", "a", -4], ["×2", "m", 2], ["÷2", "m", 0.5], ["×(−1)", "m", -1], ["×(−3)", "m", -3], ["÷(−2)", "m", -0.5]].map(([t, k, v]) => `<button class="btn small" data-k="${k}" data-v="${v}">${t}</button>`).join("")}
        <button class="btn small ghost" id="breset">↺ Reiniciar</button>
      </div>
      <div class="out" id="blog" style="margin-top:14px">Empezamos con $2<5$ (cierto: 2 está a la izquierda de 5).</div>`);
    let L = 2, R = 5, s = "<";
    const draw = (flipped) => {
      $("#bl", el).textContent = fmt(L).replace("-", "−"); $("#br", el).textContent = fmt(R).replace("-", "−");
      const sg = $("#bs", el); sg.textContent = s;
      sg.classList.remove("flip"); if (flipped) { void sg.offsetWidth; sg.classList.add("flip"); }
      $("#beam", el).style.transform = `rotate(${s === "<" ? 7 : -7}deg)`;
    };
    $$("[data-k]", el).forEach((b) => b.onclick = () => {
      const v = +b.dataset.v, k = b.dataset.k;
      const opTxt = b.textContent;
      let flip = false;
      if (k === "a") { L += v; R += v; } else { L *= v; R *= v; if (v < 0) { flip = true; s = s === "<" ? ">" : "<"; } }
      draw(flip);
      const log = $("#blog", el);
      const line = document.createElement("div");
      line.className = "row-line";
      line.innerHTML = prep(flip
        ? `🔄 ${opTxt} a ambos lados → $${texNum(L)}${s}${texNum(R)}$ <b style="color:var(--red)">¡Se volteó el signo! Multiplicaste/dividiste por un negativo.</b>`
        : `✅ ${opTxt} a ambos lados → $${texNum(L)}${s}${texNum(R)}$ El signo se mantiene.`);
      log.appendChild(line); typeset(line);
      if (flip) toast("🔄 ¡Negativo → se voltea el signo!");
    });
    $("#breset", el).onclick = () => { L = 2; R = 5; s = "<"; draw(); $("#blog", el).innerHTML = prep("Empezamos con $2<5$."); typeset($("#blog", el)); };
    draw();
  };

  /* ----- A4: Parábola y tabla de signos ----- */
  LABS.parabolaLab = (panel) => {
    const el = labCard(panel, "🎢", "Laboratorio de inecuaciones cuadráticas", "Escribe a, b y c de ax² + bx + c y elige el signo. Verás la parábola, sus raíces y en verde la solución.", `
      <div class="lab-controls">
        <label class="field">a<input class="input" type="number" id="pa" value="1" step="1"></label>
        <label class="field">b<input class="input" type="number" id="pb" value="-7" step="1"></label>
        <label class="field">c<input class="input" type="number" id="pc" value="12" step="1"></label>
        <label class="field">Signo<select class="select" id="po"><option value=">">&gt; 0</option><option value=">=">≥ 0</option><option value="<">&lt; 0</option><option value="<=">≤ 0</option></select></label>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn small" data-p="1|-7|12|>">x²−7x+12&gt;0</button><button class="btn small" data-p="1|-7|12|<=">x²−7x+12≤0</button><button class="btn small" data-p="1|11|18|>">x²+11x+18&gt;0</button><button class="btn small" data-p="1|0|-9|<">x²−9&lt;0</button><button class="btn small" data-p="-1|2|3|>=">−x²+2x+3≥0</button>
      </div>
      <div class="visual" id="pviz"></div><div class="out" id="pout"></div>`);
    const draw = () => {
      const a = +$("#pa", el).value || 0, b = +$("#pb", el).value || 0, c = +$("#pc", el).value || 0, op = $("#po", el).value;
      if (!a) { $("#pviz", el).innerHTML = ""; $("#pout", el).innerHTML = `<div class="callout warn">Si $a=0$ no es cuadrática. ¡Pon un valor de a distinto de cero!</div>`; typeset($("#pout", el)); return; }
      const { svg, s } = parabolaSVG(a, b, c, op);
      const opTex = { ">": ">", ">=": "\\ge", "<": "<", "<=": "\\le" }[op];
      const poly = `${a === 1 ? "" : a === -1 ? "-" : a}x^2${b ? (b > 0 ? "+" : "-") + (Math.abs(b) === 1 ? "" : Math.abs(b)) + "x" : ""}${c ? (c > 0 ? "+" : "-") + Math.abs(c) : ""}`;
      $("#pviz", el).innerHTML = svg;
      const rootsTxt = s.rs.length === 2 ? `$x_1=${niceTex(s.rs[0])}$ y $x_2=${niceTex(s.rs[1])}$` : s.rs.length === 1 ? `una raíz doble: $x=${niceTex(s.rs[0])}$` : "no tiene raíces reales (la parábola no toca el eje x)";
      $("#pout", el).innerHTML = prep(`
        <div class="row-line">1️⃣ <b>Reordena:</b> $${poly}${opTex}0$</div>
        <div class="row-line">2️⃣ <b>Raíces:</b> discriminante $\\Delta=b^2-4ac=${texNum(s.D)}$ → ${rootsTxt}</div>
        <div class="row-line">3️⃣ <b>Región:</b> $a${a > 0 ? ">" : "<"}0$, la parábola ${a > 0 ? "abre hacia arriba 🙂" : "abre hacia abajo 🙁"}. Buscamos donde es ${op.startsWith(">") ? "positiva (arriba del eje)" : "negativa (abajo del eje)"}${op.includes("=") ? " o cero" : ""}${s.rs.length === 2 ? ` → <b>${s.wantOutside ? "afuera" : "entre"}</b> de las raíces` : ""}.</div>
        <div class="answer">Solución: $${s.tex}$</div>`);
      typeset($("#pout", el));
    };
    $$("input,select", el).forEach((i) => i.oninput = draw);
    $$("[data-p]", el).forEach((b) => b.onclick = () => { const [a, bb, c, o] = b.dataset.p.split("|"); $("#pa", el).value = a; $("#pb", el).value = bb; $("#pc", el).value = c; $("#po", el).value = o; draw(); });
    draw();
  };

  /* ----- A5: Árbol de decisión ----- */
  LABS.countWizard = (panel) => {
    const el = labCard(panel, "🌳", "¿Qué fórmula uso? El árbol de preguntas", "Responde con un problema en mente y te digo qué técnica usar.", `<div id="wz"></div>`);
    const R = {
      pr: { name: "Principio multiplicativo (con repetición)", f: "n^r", ex: "Celulares de Claro: 10 prefijos y 7 dígitos libres → $10\\cdot10^7$." },
      pn: { name: "Permutación de todos", f: "P(n)=n!", ex: "7 personas en fila → $7!=5040$." },
      prep: { name: "Permutación con repetición", f: "\\frac{n!}{a!\\,b!\\cdots}", ex: "Números con 3224531 → $\\frac{7!}{2!\\,2!}=1260$." },
      pnr: { name: "Permutación de r en n", f: "P(n,r)=\\frac{n!}{(n-r)!}", ex: "7 libros en 3 espacios → $7\\cdot6\\cdot5=210$." },
      c: { name: "Combinación", f: "C(n,r)=\\frac{n!}{r!(n-r)!}", ex: "Escoger 4 temas de 6 → $C(6,4)=15$." },
    };
    const Q = {
      start: { q: "Si cambio el orden de los elementos, ¿obtengo un resultado diferente?", yes: "rep", no: "c", tip: "Ej.: un podio sí cambia; un comité no." },
      rep: { q: "¿Se pueden repetir los elementos? (como los dígitos de un PIN)", yes: "pr", no: "all" },
      all: { q: "¿Se usan TODOS los elementos a la vez?", yes: "same", no: "pnr" },
      same: { q: "¿Hay elementos idénticos? (como letras repetidas en una palabra)", yes: "prep", no: "pn" },
    };
    const path = [];
    const draw = (node) => {
      const w = $("#wz", el);
      const crumbs = `<div class="wizard-path">${path.map((p) => `<span>${p}</span>`).join("")}</div>`;
      if (R[node]) {
        const r = R[node];
        w.innerHTML = `${crumbs}<div class="out" style="animation:stepIn .5s var(--spring)"><div class="eyebrow">Usa</div><h3 style="margin:6px 0">${r.name}</h3><div style="font-size:1.3em;margin:10px 0">$$${r.f}$$</div><p class="muted">📌 Del taller: ${r.ex}</p></div><button class="btn small" id="wzr" style="margin-top:12px">↺ Empezar de nuevo</button>`;
        typeset(w);
        $("#wzr", w).onclick = () => { path.length = 0; draw("start"); };
        return;
      }
      const q = Q[node];
      w.innerHTML = `${crumbs}<div class="wizard-q">❓ ${q.q}</div>${q.tip ? `<p class="muted" style="margin-top:0">${q.tip}</p>` : ""}<div style="display:flex;gap:10px"><button class="btn primary" id="wy">Sí</button><button class="btn" id="wn">No</button></div>`;
      $("#wy", w).onclick = () => { path.push("✓ " + q.q.split("?")[0].replace("¿", "").slice(0, 34) + "…"); draw(q.yes); };
      $("#wn", w).onclick = () => { path.push("✗ " + q.q.split("?")[0].replace("¿", "").slice(0, 34) + "…"); draw(q.no); };
    };
    draw("start");
  };

  /* ----- A5: Calculadora con casillas ----- */
  LABS.countLab = (panel) => {
    const el = labCard(panel, "🔲", "Calculadora de casillas", "Elige n (cuántos elementos hay) y r (cuántas posiciones). Mira cómo se llenan las casillas.", `
      <div class="lab-controls">
        <label class="field">n (elementos)<input class="input" type="number" id="cn" value="7" min="1" max="20"></label>
        <label class="field">r (posiciones)<input class="input" type="number" id="cr" value="3" min="0" max="20"></label>
      </div>
      <div id="cout"></div>`);
    const draw = () => {
      const n = Math.min(20, Math.max(1, parseInt($("#cn", el).value, 10) || 1));
      const r = Math.min(n, Math.max(0, parseInt($("#cr", el).value, 10) || 0));
      const Pnr = fact(n) / fact(n - r), Cnr = Pnr / fact(r);
      const slots = Array.from({ length: r }, (_, i) => `${i ? '<span class="slot-op">×</span>' : ""}<div class="slot" style="animation-delay:${i * 0.08}s"><b>${n - i}</b><small>pos. ${i + 1}</small></div>`).join("");
      const o = $("#cout", el);
      o.innerHTML = `
        <div class="slots">${slots || '<span class="muted">r = 0: hay una sola forma (no elegir nada).</span>'}</div>
        <div class="out">
          <div class="row-line">🏆 <b>Si importa el orden</b> (permutación): $P(${n},${r})=\\frac{${n}!}{${n - r}!}=${big(Pnr)}$</div>
          <div class="row-line">👥 <b>Si NO importa el orden</b> (combinación): $C(${n},${r})=\\frac{P(${n},${r})}{${r}!}=\\frac{${big(Pnr)}}{${big(fact(r))}}=${big(Cnr)}$</div>
          <div class="row-line">❗ $${n}!=${big(fact(n))}$</div>
          <div class="callout">💡 La combinación divide entre $${r}!$ porque cada grupo de ${r} se puede ordenar de $${r}!=${big(fact(r))}$ formas y todas cuentan como una sola.</div>
        </div>`;
      typeset(o);
    };
    $$("input", el).forEach((i) => i.oninput = draw);
    draw();
  };

  /* ---------------- Arranque ---------------- */
  $("#voiceBtn").onclick = (e) => { e.stopPropagation(); $("#settings").classList.toggle("show"); };
  document.addEventListener("click", (e) => { const s = $("#settings"); if (s.classList.contains("show") && !s.contains(e.target)) s.classList.remove("show"); });
  Voice.init();
  window.addEventListener("hashchange", router);
  router();
})();
