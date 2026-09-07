/* Daily Keiko — application code.
   Plain ES5-flavoured JavaScript, no build step. Three parts:
     1. the app itself (state, day view, calendar, stats, settings)
     2. the guide renderer
     3. optional Firebase sign-in and sync
   guide.js and config.js load before this file. */

(function(){
"use strict";

/* =======================================================================
   PLAN CONTENT
   ======================================================================= */
var BLOCKS = {
  warmup:{ name:"Warm-up", items:[
    {n:"Physio's set — 7 s holds", c:"Exactly as prescribed. This comes first, always.", d:"as given"},
    {n:"Easy skipping or jog in place", c:"Until you are slightly warm and breathing a little harder.", d:"3 min"},
    {n:"Arm circles + shoulder rolls", c:"Loose, no forcing.", d:"20 each way"},
    {n:"Standing hip circles", c:"Knee up, draw a circle. Small at first, bigger as it loosens.", d:"10 each way"},
    {n:"Knee and ankle rotations", c:"", d:"10 each"},
    {n:"Torso twists, arms loose", c:"Turn from the ribs, not by yanking the lower back.", d:"20"}
  ]},
  mobility:{ name:"Hip mobility & control", items:[
    {n:"Hip CARs, wall-supported", c:"Knee to hip height, biggest slow circle you can draw. Slow is the point.", d:"5 each way ×2"},
    {n:"90/90 switches", c:"Sitting, both knees at 90°, rotate side to side. This is the internal rotation ura mawashi needs.", d:"10 switches"},
    {n:"Cossack squat, chair-supported", c:"Shallow. Only as deep as stays painless.", d:"8 each side"},
    {n:"Mawashi chamber hold", c:"Start lying on your side — no balance needed. Knee bent and lifted, heel tucked. The standing version comes later.", d:"10 s ×3 each"},
    {n:"Adductor rock-back", c:"Hands and knees, one leg out to the side, rock back gently.", d:"10 slow"}
  ]},
  kihon:{ name:"Kihon — basics", items:[
    {n:"Stance holds", c:"Zenkutsu dachi, kokutsu dachi, kiba dachi.", d:"30 s each"},
    {n:"Choku zuki from kiba dachi", c:"Hips still, hikite pulling hard.", d:"20"},
    {n:"Oi zuki, stepping", c:"", d:"10 each side"},
    {n:"Gyaku zuki", c:"Drive from the back foot, but don't over-rotate the hip.", d:"10 each side"},
    {n:"Kizami zuki", c:"Snap and return, guard back up.", d:"10 each side"},
    {n:"Blocks: gedan barai, age uke, soto uke, uchi uke", c:"", d:"10 each side"}
  ]},
  kicks:{ name:"Kicks — slow and low", items:[
    {n:"Mae geri, 4-count", c:"Chamber, extend, re-chamber, place down. Four distinct steps, hand on the wall.", d:"8 each side"},
    {n:"Mawashi geri, 4-count", c:"Waist to chest height only. Never let the leg drop uncontrolled.", d:"8 each side"},
    {n:"Yoko geri keage", c:"Hand on wall, height at hip.", d:"8 each side"},
    {n:"Ura mawashi prep — knee height", c:"Hook the leg at knee height, no power, wall support. Any pinch or clunk: stop, lower it.", d:"5 each side", flag:true}
  ]},
  kata:{ name:"Kata & form", items:[
    {n:"Taikyoku / Heian shodan, slow", c:"Full stances, correct hikite, no speed.", d:"5 run-throughs"},
    {n:"Same kata at speed", c:"Only if the slow runs were clean.", d:"2 run-throughs"},
    {n:"Line drill: step, block, counter", c:"Down and back the room.", d:"10 each side"}
  ]},
  core:{ name:"Core — your back insurance", items:[
    {n:"Dead bug", c:"Lower back stays pressed to the floor the whole time.", d:"8 each side"},
    {n:"Bird dog", c:"Slow, no wobble, no arching.", d:"8 each side"},
    {n:"Side plank", c:"Knees down is fine to start.", d:"20–30 s each"},
    {n:"Glute bridge", c:"Squeeze the glutes, ribs down.", d:"12"}
  ]},
  strength:{ name:"Push & hang", items:[
    {n:"Push-ups", c:"Knees down if needed. Stop two reps before failure — quality over count.", d:"3 × max−2"},
    {n:"Dead hang", c:"Shoulders active, not slumped in the sockets. Build toward 45 s.", d:"3 × max"},
    {n:"Scapular pulls", c:"Hanging, pull the shoulders DOWN without bending the elbows. This is the missing piece for a pull-up.", d:"3 × 6"},
    {n:"Negative pull-up", c:"Jump or step to the top, then lower for 5 slow seconds.", d:"3 × 3"}
  ]},
  cooldown:{ name:"Cool-down stretch", items:[
    {n:"Physio's set — 7 s holds", c:"Exactly as prescribed. Do this before anything below.", d:"as given"},
    {n:"Supine hamstring with a towel", c:"Lying down, knee slightly bent. Never a standing toe touch.", d:"40 s each"},
    {n:"Half-kneeling hip flexor", c:"Squeeze the back glute, tuck the tailbone. If your back arches, you're doing it wrong.", d:"40 s each"},
    {n:"Figure-4 glute stretch, lying", c:"", d:"40 s each"},
    {n:"Butterfly, gentle", c:"Elbows resting, no pushing the knees down.", d:"60 s"},
    {n:"Calf stretch at a wall", c:"Essential now that you are running.", d:"30 s each"},
    {n:"Supported leg hold at a wall", c:"Foot resting on a wall at waist height or lower, body turned as in mawashi. Mild tension only, pelvis level.", d:"30 s each"}
  ]},
  easyrun:{ name:"Easy run", run:true, items:[
    {n:"Walk or jog to start", c:"Never begin at pace. Let the legs come up to speed.", d:"3 min"},
    {n:"Easy run", c:"6:30–7:00 /km. If you can't say a full sentence out loud, you're too fast. This day is meant to feel too slow.", d:"5 km"},
    {n:"Walk it out, don't stop dead", c:"", d:"3 min"}
  ]},
  teamrun:{ name:"Team session", run:true, items:[
    {n:"Physio's set before the team warm-up", c:"", d:"as given"},
    {n:"2 slow · 1 fast · 2 slow · 1 fast · 3 slow · 1 fast", c:"Fast laps around 5:00–5:15 /km — controlled and strong, not a sprint. Run the slow laps genuinely slow.", d:"10 laps"},
    {n:"Cool-down walk", c:"", d:"5 min"}
  ]},
  longrun:{ name:"Long run", run:true, items:[
    {n:"Walk or jog to start", c:"", d:"5 min"},
    {n:"Long run, conversational", c:"6:40–7:10 /km. Distance is the point, pace is not. Only add distance if last week's felt comfortable.", d:"build to 7 km"},
    {n:"Walk it out", c:"", d:"5 min"}
  ]},
  dojo:{ name:"Karate class", items:[
    {n:"Physio's set before class", c:"", d:"as given"},
    {n:"Class", c:"If a partner stretch is offered, decline it or keep it gentle. Your back isn't ready for forced range.", d:"—", flag:true},
    {n:"Physio's set after class", c:"", d:"as given"}
  ]}
};

var DAYS = {
  mon:{ label:"Mon", tag:"Easy run", note:"Easy run · strength · core", run:"easy",
    blocks:[["warmup",6],["mobility",8],["easyrun",32],["strength",8],["core",8],["cooldown",8]] },
  tue:{ label:"Tue", tag:"Class", note:"Karate class · core",
    blocks:[["mobility",8],["dojo",null],["core",8],["cooldown",8]] },
  wed:{ label:"Wed", tag:"Solo keiko", note:"Your biggest solo karate day",
    blocks:[["warmup",8],["mobility",10],["kihon",12],["kicks",10],["strength",8],["core",8],["cooldown",8]] },
  thu:{ label:"Thu", tag:"Team run", note:"Team intervals — the hard day", run:"team",
    blocks:[["mobility",8],["teamrun",45],["core",6],["cooldown",8]] },
  fri:{ label:"Fri", tag:"Class", note:"Karate class · strength · core",
    blocks:[["mobility",8],["dojo",null],["strength",8],["core",8],["cooldown",8]] },
  sat:{ label:"Sat", tag:"Long run", note:"Long run · light karate", run:"long",
    blocks:[["warmup",6],["mobility",8],["longrun",50],["kata",8],["core",5],["cooldown",10]] },
  sun:{ label:"Sun", tag:"Rest", note:"Recovery only — no core, no kicks, no strength", rest:true,
    blocks:[["mobility",10],["kata",10],["cooldown",12]] }
};
var JSDAY = ["sun","mon","tue","wed","thu","fri","sat"];
var BLOCK_DAYS = 56; // 8 weeks

/* =======================================================================
   STORAGE
   ======================================================================= */
var KEY = "dailykeiko.v2";
var store = {
  start: null,
  days: {},          // "YYYY-MM-DD": {c:{itemId:1}, note:"", km:null, min:null, ts:0}
  reminders: [],     // {t:"06:00", m:"message"}
  theme: "auto",
  settingsTs: 0
};

function load(){
  try{
    var raw = localStorage.getItem(KEY);
    if(raw){
      var p = JSON.parse(raw);
      if(p && typeof p === "object"){
        store.start = p.start || null;
        store.days = p.days || {};
        store.reminders = Array.isArray(p.reminders) ? p.reminders : [];
        store.theme = p.theme || "auto";
        store.settingsTs = p.settingsTs || 0;
      }
    }
  }catch(e){}
  if(!store.start) store.start = ymd(new Date());
}
function save(){
  try{ localStorage.setItem(KEY, JSON.stringify(store)); }
  catch(e){ toast("Could not save — storage full or blocked"); }
}

/* =======================================================================
   DATES
   ======================================================================= */
function ymd(d){
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}
function parseYmd(s){
  var p = String(s).split("-");
  return new Date(+p[0], +p[1]-1, +p[2]);
}
function addDays(d,n){ var x = new Date(d.getTime()); x.setDate(x.getDate()+n); return x; }
function daysBetween(a,b){ return Math.round((parseYmd(b)-parseYmd(a))/86400000); }

var TODAY = ymd(new Date());
var cursor = TODAY;                       // the day being viewed
var calMonth = new Date();                // month shown on calendar
calMonth.setDate(1);

function planFor(dateStr){ return DAYS[JSDAY[parseYmd(dateStr).getDay()]]; }
function dayRec(dateStr){
  if(!store.days[dateStr]) store.days[dateStr] = { c:{}, note:"", km:null, min:null, ts:0 };
  var r = store.days[dateStr];
  if(!r.c) r.c = {};
  if(typeof r.ts !== "number") r.ts = 0;
  return r;
}
/* Call whenever a day's contents change, before save(). The timestamp is what
   lets two devices merge without a server-side conflict resolver. */
function markDay(dateStr){
  dayRec(dateStr).ts = Date.now();
  if(window.KEIKO_SYNC) window.KEIKO_SYNC.schedule();
}
function markSettings(){
  store.settingsTs = Date.now();
  if(window.KEIKO_SYNC) window.KEIKO_SYNC.schedule();
}
function counts(dateStr){
  var plan = planFor(dateStr), rec = store.days[dateStr] || {c:{}};
  var total = 0, done = 0;
  plan.blocks.forEach(function(b){
    var items = BLOCKS[b[0]].items;
    total += items.length;
    items.forEach(function(_,i){ if(rec.c && rec.c[b[0]+":"+i]) done++; });
  });
  return { total:total, done:done, pct: total ? done/total : 0 };
}
function isComplete(dateStr){
  var plan = planFor(dateStr);
  var need = plan.rest ? 0.5 : 0.7;
  return counts(dateStr).pct >= need;
}

/* =======================================================================
   TOAST + CONFIRM
   ======================================================================= */
var toastTimer = null;
function toast(msg){
  var old = document.querySelector(".toast");
  if(old) old.remove();
  var t = document.createElement("div");
  t.className = "toast"; t.textContent = msg; t.setAttribute("role","status");
  document.body.appendChild(t);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ t.remove(); }, 2200);
}

function confirmBox(opts){
  return new Promise(function(resolve){
    var scrim = document.createElement("div");
    scrim.className = "scrim";
    var m = document.createElement("div"); m.className = "modal";
    var h = document.createElement("h3"); h.textContent = opts.title;
    var p = document.createElement("p"); p.textContent = opts.body;
    var row = document.createElement("div"); row.className = "btnrow";
    row.style.justifyContent = "flex-end";
    var cancel = document.createElement("button");
    cancel.className = "btn ghost"; cancel.textContent = opts.cancel || "Cancel";
    var ok = document.createElement("button");
    ok.className = "btn" + (opts.danger ? " danger" : ""); ok.textContent = opts.ok || "Yes";
    row.appendChild(cancel); row.appendChild(ok);
    m.appendChild(h); m.appendChild(p); m.appendChild(row);
    scrim.appendChild(m);
    document.body.appendChild(scrim);
    ok.focus();
    function done(v){ scrim.remove(); resolve(v); }
    cancel.addEventListener("click", function(){ done(false); });
    ok.addEventListener("click", function(){ done(true); });
    scrim.addEventListener("click", function(e){ if(e.target === scrim) done(false); });
    document.addEventListener("keydown", function esc(e){
      if(e.key === "Escape"){ document.removeEventListener("keydown", esc); done(false); }
    });
  });
}

/* =======================================================================
   DAY VIEW
   ======================================================================= */
var el = {
  hdDate: document.getElementById("hdDate"),
  hdPlan: document.getElementById("hdPlan"),
  jumpToday: document.getElementById("jumpToday"),
  blocks: document.getElementById("blocks"),
  runlog: document.getElementById("runlog"),
  ringArc: document.getElementById("ringArc"),
  ringPct: document.getElementById("ringPct"),
  sumTitle: document.getElementById("sumTitle"),
  sumSub: document.getElementById("sumSub"),
  sumBadge: document.getElementById("sumBadge"),
  note: document.getElementById("noteInput")
};

function planMinsText(plan){
  var m = 0, cls = false;
  plan.blocks.forEach(function(b){ if(b[1] === null) cls = true; else m += b[1]; });
  return m + " min" + (cls ? " + class" : "");
}

function renderHeader(){
  var d = parseYmd(cursor), plan = planFor(cursor);
  var dayNo = daysBetween(store.start, cursor) + 1;
  el.hdDate.textContent = d.toLocaleDateString(undefined,{weekday:"long", day:"numeric", month:"short"});
  var inBlock = dayNo >= 1 && dayNo <= BLOCK_DAYS;
  el.hdPlan.textContent = plan.tag + (inBlock ? " · day " + dayNo + " of " + BLOCK_DAYS : "");
  el.jumpToday.hidden = (cursor === TODAY);
  document.getElementById("prevDay").disabled = false;
  document.getElementById("nextDay").disabled = false;
}

function renderDay(){
  renderHeader();
  var plan = planFor(cursor), rec = dayRec(cursor);
  var future = cursor > TODAY;

  /* summary */
  var c = counts(cursor);
  var p = Math.round(c.pct * 100);
  el.ringArc.style.strokeDashoffset = String(176 - 176 * c.pct);
  el.ringPct.textContent = p + "%";
  el.sumTitle.textContent = plan.note;
  el.sumSub.textContent = c.done + " of " + c.total + " done · " + planMinsText(plan);
  if(future){
    el.sumBadge.hidden = false; el.sumBadge.className = "badge future";
    el.sumBadge.textContent = "Not yet";
  }else if(isComplete(cursor)){
    el.sumBadge.hidden = false; el.sumBadge.className = "badge done";
    el.sumBadge.textContent = plan.rest ? "Recovered" : "Complete";
  }else{
    el.sumBadge.hidden = true;
  }

  /* run log */
  el.runlog.innerHTML = "";
  if(plan.run){
    el.runlog.hidden = false;
    var card = document.createElement("section"); card.className = "card";
    var h = document.createElement("h2"); h.textContent = "Log this run";
    var grid = document.createElement("div");
    grid.style.cssText = "display:grid;grid-template-columns:1fr 1fr;gap:9px";
    var paceLine = document.createElement("div");
    paceLine.className = "insight";

    function refreshPace(){
      if(rec.km > 0 && rec.min > 0){
        var pace = rec.min / rec.km;
        var msg = "<b>" + fmtPace(pace) + " /km.</b> ";
        if(plan.run === "easy" || plan.run === "long"){
          if(pace < 6.2) msg += "Faster than your easy range. Slow down next time — easy days are supposed to feel too slow.";
          else if(pace > 7.6) msg += "A little slower than the range, which is completely fine. Never a problem on an easy day.";
          else msg += "Right in the range. This is exactly how an easy day should look.";
        }else{
          msg += "Session logged.";
        }
        paceLine.innerHTML = msg;
        paceLine.hidden = false;
      }else{
        paceLine.hidden = true;
      }
    }
    /* NOTE: these inputs deliberately do not re-render the day — that would
       yank focus out of the field while she is still typing. */
    function fld(label, val, onch, step){
      var l = document.createElement("label"); l.className = "fld";
      var s = document.createElement("span"); s.textContent = label;
      var inp = document.createElement("input");
      inp.type = "number"; inp.step = step; inp.min = "0"; inp.inputMode = "decimal";
      inp.value = (val === null || val === undefined) ? "" : val;
      inp.addEventListener("input", function(){
        var v = inp.value === "" ? null : parseFloat(inp.value);
        onch((v === null || isNaN(v)) ? null : v);
        markDay(cursor); save(); refreshPace(); renderStats();
      });
      l.appendChild(s); l.appendChild(inp); return l;
    }
    grid.appendChild(fld("Distance (km)", rec.km, function(v){ rec.km = v; }, "0.1"));
    grid.appendChild(fld("Time (min)", rec.min, function(v){ rec.min = v; }, "0.1"));
    card.appendChild(h); card.appendChild(grid);
    refreshPace();
    card.appendChild(paceLine);
    el.runlog.appendChild(card);
  }else{
    el.runlog.hidden = true;
  }

  /* blocks */
  el.blocks.innerHTML = "";
  plan.blocks.forEach(function(entry, bi){
    var key = entry[0], mins = entry[1], block = BLOCKS[key];
    var sec = document.createElement("section");
    sec.className = "block" + (block.run ? " run" : "");

    var head = document.createElement("div"); head.className = "bhead";
    var num = document.createElement("span"); num.className = "bnum";
    num.textContent = String(bi+1).padStart(2,"0");
    var nm = document.createElement("h2"); nm.className = "bname"; nm.textContent = block.name;
    var mn = document.createElement("span"); mn.className = "bmins";
    mn.textContent = (mins === null) ? "class length" : mins + " min";
    head.appendChild(num); head.appendChild(nm); head.appendChild(mn);
    sec.appendChild(head);

    block.items.forEach(function(item, i){
      var id = key + ":" + i;
      var on = !!rec.c[id];
      var row = document.createElement("div");
      row.className = "item" + (on ? " on" : "") + (item.flag ? " flag" : "") + (future ? " locked" : "");
      row.setAttribute("role","checkbox");
      row.setAttribute("aria-checked", String(on));
      row.tabIndex = future ? -1 : 0;

      var box = document.createElement("span"); box.className = "box";
      box.innerHTML = '<svg viewBox="0 0 12 12"><path d="M1.5 6.2 4.4 9 10.5 2.6"/></svg>';
      var txt = document.createElement("span"); txt.className = "itxt";
      var t1 = document.createElement("span"); t1.className = "iname"; t1.textContent = item.n;
      txt.appendChild(t1);
      if(item.c){
        var t2 = document.createElement("span"); t2.className = "icue"; t2.textContent = item.c;
        txt.appendChild(t2);
      }
      var dose = document.createElement("span"); dose.className = "idose"; dose.textContent = item.d;

      row.appendChild(box); row.appendChild(txt); row.appendChild(dose);

      /* jump straight to this exercise's written instructions */
      if(window.KEIKO_GUIDE && window.KEIKO_GUIDE.blocks && window.KEIKO_GUIDE.blocks[key] &&
         window.KEIKO_GUIDE.blocks[key][i]){
        var info = document.createElement("button");
        info.type = "button"; info.className = "infobtn";
        info.textContent = "?";
        info.setAttribute("aria-label", "How to do " + item.n);
        info.addEventListener("click", function(ev){
          ev.stopPropagation(); ev.preventDefault();
          if(window.KEIKO_OPEN_GUIDE) window.KEIKO_OPEN_GUIDE(key, i);
        });
        row.appendChild(info);
      }

      function activate(){
        if(future){ toast("That day hasn't happened yet"); return; }
        if(rec.c[id]){
          confirmBox({
            title:"Untick this?",
            body:"You marked “" + item.n + "” as done. Only untick it if that was a mistake — your streak depends on an honest log.",
            ok:"Untick", cancel:"Keep it", danger:true
          }).then(function(yes){
            if(yes){ delete rec.c[id]; markDay(cursor); save(); renderDay(); renderStats(); renderCal(); }
          });
        }else{
          rec.c[id] = 1; markDay(cursor); save(); renderDay(); renderStats(); renderCal();
        }
      }
      row.addEventListener("click", activate);
      row.addEventListener("keydown", function(e){
        if(e.key === " " || e.key === "Enter"){ e.preventDefault(); activate(); }
      });
      sec.appendChild(row);
    });
    el.blocks.appendChild(sec);
  });

  el.note.value = rec.note || "";
}

el.note.addEventListener("input", function(){
  dayRec(cursor).note = el.note.value;
  markDay(cursor); save();
});

document.getElementById("prevDay").addEventListener("click", function(){
  cursor = ymd(addDays(parseYmd(cursor), -1)); renderDay(); renderCal();
});
document.getElementById("nextDay").addEventListener("click", function(){
  cursor = ymd(addDays(parseYmd(cursor), 1)); renderDay(); renderCal();
});
el.jumpToday.addEventListener("click", function(){
  cursor = TODAY; calMonth = parseYmd(TODAY); calMonth.setDate(1);
  renderDay(); renderCal();
});

/* =======================================================================
   CALENDAR
   ======================================================================= */
var calGrid = document.getElementById("calGrid");
var calDow = document.getElementById("calDow");
["M","T","W","T","F","S","S"].forEach(function(x){
  var d = document.createElement("div"); d.className = "dow"; d.textContent = x; calDow.appendChild(d);
});

function renderCal(){
  document.getElementById("calTitle").textContent =
    calMonth.toLocaleDateString(undefined,{month:"long", year:"numeric"});
  calGrid.innerHTML = "";
  var first = new Date(calMonth.getFullYear(), calMonth.getMonth(), 1);
  var lead = (first.getDay() + 6) % 7;   // Monday-first
  var last = new Date(calMonth.getFullYear(), calMonth.getMonth()+1, 0).getDate();
  var i;
  for(i = 0; i < lead; i++){
    var b = document.createElement("div"); b.className = "cell blank"; calGrid.appendChild(b);
  }
  for(i = 1; i <= last; i++){
    (function(dayNum){
      var ds = ymd(new Date(calMonth.getFullYear(), calMonth.getMonth(), dayNum));
      var plan = planFor(ds);
      var c = counts(ds);
      var dayNo = daysBetween(store.start, ds) + 1;
      var outside = dayNo < 1 || dayNo > BLOCK_DAYS;
      var cell = document.createElement("button");
      cell.type = "button";
      cell.className = "cell" + (plan.rest ? " rest" : "") + (ds === TODAY ? " today" : "") +
                       (ds === cursor ? " sel" : "") + (outside ? " outside" : "");
      var fill = document.createElement("span");
      fill.className = "fillbar";
      fill.style.height = Math.round(c.pct * 100) + "%";
      if(isComplete(ds)) fill.style.opacity = ".55";
      var n = document.createElement("span"); n.className = "n"; n.textContent = dayNum;
      var t = document.createElement("span"); t.className = "t"; t.textContent = plan.tag.split(" ")[0];
      cell.appendChild(fill); cell.appendChild(n); cell.appendChild(t);
      cell.title = ds + " — " + plan.note;
      cell.addEventListener("click", function(){
        cursor = ds; showView("v-day"); renderDay(); renderCal();
      });
      calGrid.appendChild(cell);
    })(i);
  }
  renderBlockRows();
}
document.getElementById("calPrev").addEventListener("click", function(){
  calMonth = new Date(calMonth.getFullYear(), calMonth.getMonth()-1, 1); renderCal();
});
document.getElementById("calNext").addEventListener("click", function(){
  calMonth = new Date(calMonth.getFullYear(), calMonth.getMonth()+1, 1); renderCal();
});

function renderBlockRows(){
  var rows = document.getElementById("blockRows");
  rows.innerHTML = "";
  var done = 0, complete = 0, km = 0;
  for(var i = 0; i < BLOCK_DAYS; i++){
    var ds = ymd(addDays(parseYmd(store.start), i));
    if(ds > TODAY) break;
    done++;
    if(isComplete(ds)) complete++;
    var r = store.days[ds];
    if(r && r.km > 0) km += r.km;
  }
  function add(k, v, hl){
    var row = document.createElement("div"); row.className = "row";
    var a = document.createElement("span"); a.className = "k"; a.textContent = k;
    var b = document.createElement("span"); b.className = "v" + (hl ? " hl" : ""); b.textContent = v;
    row.appendChild(a); row.appendChild(b); rows.appendChild(row);
  }
  var elapsed = Math.max(0, Math.min(BLOCK_DAYS, daysBetween(store.start, TODAY) + 1));
  add("Block started", parseYmd(store.start).toLocaleDateString(undefined,{day:"numeric",month:"short"}));
  add("Block ends", addDays(parseYmd(store.start), BLOCK_DAYS-1).toLocaleDateString(undefined,{day:"numeric",month:"short"}));
  add("Days elapsed", elapsed + " of " + BLOCK_DAYS);
  add("Days completed", complete + " of " + elapsed, true);
  add("Kilometres logged", km ? km.toFixed(1) + " km" : "—");
  var pct = elapsed ? Math.round(complete/elapsed*100) : 0;
  document.getElementById("blockHint").textContent =
    elapsed === 0 ? "The block starts today." :
    pct >= 85 ? "You are hitting " + pct + "% of your days. That is well above what most people manage — this is what gets you to 24 minutes." :
    pct >= 60 ? "You are hitting " + pct + "% of your days. Solid. Consistency is worth more than any single hard session." :
    "You are hitting " + pct + "% of your days. Aim for the easy days first — they are the ones that build the engine.";
}

/* =======================================================================
   STATS
   ======================================================================= */
function fmtPace(minPerKm){
  var m = Math.floor(minPerKm);
  var s = Math.round((minPerKm - m) * 60);
  if(s === 60){ m++; s = 0; }
  return m + ":" + String(s).padStart(2,"0");
}
function fmtTime(mins){
  var m = Math.floor(mins), s = Math.round((mins - m)*60);
  if(s === 60){ m++; s = 0; }
  return m + ":" + String(s).padStart(2,"0");
}
function rowInto(parent, k, v, hl){
  var row = document.createElement("div"); row.className = "row";
  var a = document.createElement("span"); a.className = "k"; a.textContent = k;
  var b = document.createElement("span"); b.className = "v" + (hl ? " hl" : ""); b.textContent = v;
  row.appendChild(a); row.appendChild(b); parent.appendChild(row);
}

function currentStreak(){
  var n = 0, d = parseYmd(TODAY);
  if(!isComplete(ymd(d))) d = addDays(d,-1);
  while(isComplete(ymd(d)) && n < 1000){ n++; d = addDays(d,-1); }
  return n;
}
function longestStreak(){
  var keys = Object.keys(store.days).filter(function(k){ return isComplete(k); }).sort();
  if(!keys.length) return 0;
  var best = 1, run = 1;
  for(var i = 1; i < keys.length; i++){
    if(daysBetween(keys[i-1], keys[i]) === 1){ run++; if(run > best) best = run; }
    else run = 1;
  }
  return best;
}

function renderStats(){
  /* streaks */
  var s = document.getElementById("streakRows"); s.innerHTML = "";
  var cur = currentStreak(), lng = longestStreak();
  var totalDone = Object.keys(store.days).filter(isComplete).length;
  rowInto(s, "Current streak", cur === 1 ? "1 day" : cur + " days", true);
  rowInto(s, "Longest streak", lng === 1 ? "1 day" : lng + " days");
  rowInto(s, "Days completed, all time", String(totalDone));
  var last7 = 0;
  for(var i = 0; i < 7; i++){ if(isComplete(ymd(addDays(parseYmd(TODAY), -i)))) last7++; }
  rowInto(s, "This past week", last7 + " of 7");

  /* bars */
  var bc = document.getElementById("barChart"), bl = document.getElementById("barLabels");
  bc.innerHTML = ""; bl.innerHTML = "";
  for(var j = 13; j >= 0; j--){
    var d = addDays(parseYmd(TODAY), -j), ds = ymd(d);
    var c = counts(ds);
    var bar = document.createElement("div"); bar.className = "bar";
    var fill = document.createElement("i");
    fill.style.height = Math.round(c.pct*100) + "%";
    if(planFor(ds).rest) fill.style.background = "var(--tatami)";
    bar.appendChild(fill);
    bar.title = ds + " — " + Math.round(c.pct*100) + "%";
    bc.appendChild(bar);
    var lab = document.createElement("span");
    lab.textContent = d.getDate();
    bl.appendChild(lab);
  }

  /* running */
  var rr = document.getElementById("runRows"); rr.innerHTML = "";
  var runs = [];
  Object.keys(store.days).forEach(function(k){
    var r = store.days[k];
    if(r && r.km > 0) runs.push({d:k, km:r.km, min:r.min, plan:planFor(k).run});
  });
  runs.sort(function(a,b){ return a.d < b.d ? 1 : -1; });
  var totalKm = runs.reduce(function(t,r){ return t + r.km; }, 0);
  var longest = runs.reduce(function(t,r){ return Math.max(t, r.km); }, 0);
  var wk = 0;
  runs.forEach(function(r){ if(daysBetween(r.d, TODAY) < 7) wk += r.km; });
  rowInto(rr, "Runs logged", String(runs.length));
  rowInto(rr, "Total distance", totalKm ? totalKm.toFixed(1) + " km" : "—");
  rowInto(rr, "This week", wk ? wk.toFixed(1) + " km" : "—", true);
  rowInto(rr, "Longest run", longest ? longest.toFixed(1) + " km" : "—");
  var timed = runs.filter(function(r){ return r.min > 0; });
  if(timed.length){
    var last = timed[0];
    rowInto(rr, "Last run pace", fmtPace(last.min/last.km) + " /km");
  }

  /* insights */
  var ins = document.getElementById("insights"); ins.innerHTML = "";
  function say(html){
    var d = document.createElement("div"); d.className = "insight"; d.innerHTML = html; ins.appendChild(d);
  }
  var easy = timed.filter(function(r){ return r.plan === "easy" || r.plan === "long"; });
  if(easy.length >= 2){
    var avg = easy.slice(0,4).reduce(function(t,r){ return t + r.min/r.km; }, 0) / Math.min(4, easy.length);
    if(avg < 6.2) say("<b>Your easy runs are averaging " + fmtPace(avg) + " /km.</b> That is too quick for an easy day. Slow to 6:30–7:00 — the aerobic gain comes from time on feet, not effort.");
    else if(avg > 7.7) say("<b>Easy runs averaging " + fmtPace(avg) + " /km.</b> Perfectly fine. Never worry about an easy day being slow.");
    else say("<b>Easy runs averaging " + fmtPace(avg) + " /km.</b> Right where they should be. Keep it there.");
  }
  if(wk > 0){
    var prev = 0;
    runs.forEach(function(r){ var g = daysBetween(r.d, TODAY); if(g >= 7 && g < 14) prev += r.km; });
    if(prev > 0){
      var jump = (wk - prev) / prev;
      if(jump > 0.15) say("<b>Volume up " + Math.round(jump*100) + "% on last week.</b> That is a bigger jump than the 10% rule. Hold this week's distance flat before adding more — this is where the hip would complain.");
      else if(jump < -0.3) say("<b>Volume down " + Math.round(-jump*100) + "%.</b> If that was deliberate or a rest week, good. If not, the easy run is the one to protect.");
    }
  }
  if(!runs.length) say("Log a run's distance and time on any run day and this fills in with your paces and weekly volume.");

  renderPaceCalc();
}

function renderPaceCalc(){
  var km = parseFloat(document.getElementById("pcKm").value);
  var mn = parseFloat(document.getElementById("pcMin").value);
  var out = document.getElementById("pcOut"); out.innerHTML = "";
  if(!(km > 0 && mn > 0)){
    var d = document.createElement("p"); d.className = "hint";
    d.textContent = "Enter a distance and a time to see the pace and what it projects over 5k.";
    out.appendChild(d); return;
  }
  var pace = mn/km;
  rowInto(out, "Pace", fmtPace(pace) + " /km", true);
  // Riegel: T2 = T1 * (D2/D1)^1.06
  var t5 = mn * Math.pow(5/km, 1.06);
  rowInto(out, "Projected 5k", fmtTime(t5));
  var gap = t5 - 20;
  rowInto(out, "From sub-20", gap <= 0 ? "there already" : fmtTime(gap) + " to find");
  rowInto(out, "Sub-20 needs", "4:00 /km");
}
document.getElementById("pcKm").addEventListener("input", renderPaceCalc);
document.getElementById("pcMin").addEventListener("input", renderPaceCalc);

/* =======================================================================
   EXPORT SUMMARY
   ======================================================================= */
function plural(n, word){ return n + " " + word + (n === 1 ? "" : "s"); }

var PLAN_CONTEXT = [
  "## The plan I am following",
  "Mon — easy run 5 km at 6:30-7:00 /km, push-ups & hangs, core",
  "Tue — karate class, core",
  "Wed — solo karate: kihon, kicks, push-ups & hangs, core",
  "Thu — team running intervals: 10 laps, 3 of them fast at 5:00-5:15 /km, core",
  "Fri — karate class, push-ups & hangs, core",
  "Sat — long run building toward 7 km at 6:40-7:10 /km, kata, core",
  "Sun — rest: hip mobility and physio stretches only",
  "Every day — physio's prescribed stretches, 7-second holds, before and after.",
  "",
  "## Where I am",
  "Karate: beginner. Can kick to chest height, not head height. Working up to ura mawashi geri.",
  "Running: 5k around 27:00. Goal is 5k under 20:00. Next target is 24:00.",
  "Constraints: history of lower back pain from over-stretching, and hip discomfort on rotation.",
  "Under a physiotherapist's care. No kicks above chest height, no forced or bounced stretching."
].join("\n");

function rangeDates(mode){
  var out = [], i, d;
  if(mode === "all"){
    out = Object.keys(store.days).filter(function(k){
      var r = store.days[k];
      return counts(k).done > 0 || (r.note||"").trim() || r.km > 0;
    }).sort();
  }else if(mode === "block"){
    for(i = 0; i < BLOCK_DAYS; i++){
      d = ymd(addDays(parseYmd(store.start), i));
      if(d > TODAY) break;
      out.push(d);
    }
  }else{
    var n = parseInt(mode, 10) || 7;
    for(i = n-1; i >= 0; i--){
      d = ymd(addDays(parseYmd(TODAY), -i));
      if(d >= store.start) out.push(d);   // don't report days before the block began
    }
  }
  return out;
}

function buildSummary(){
  var mode = document.getElementById("expRange").value;
  var withCtx = document.getElementById("expCtx").checked;
  var dates = rangeDates(mode);
  var L = [];

  L.push("# Daily Keiko — training log");
  if(dates.length) L.push("Range: " + dates[0] + " to " + dates[dates.length-1] + "  (" + plural(dates.length,"day") + ")");
  L.push("Exported: " + TODAY);
  L.push("");
  if(withCtx){ L.push(PLAN_CONTEXT); L.push(""); }

  /* headline numbers */
  var completed = 0, trained = 0, km = 0, runs = 0, missed = [];
  dates.forEach(function(ds){
    var c = counts(ds), r = store.days[ds] || {};
    if(c.done > 0) trained++; else missed.push(ds);
    if(isComplete(ds)) completed++;
    if(r.km > 0){ km += r.km; runs++; }
  });
  L.push("## Totals for this range");
  L.push("- Days with training logged: " + trained + " of " + dates.length);
  L.push("- Days completed (70% of the session, 50% on rest days): " + completed);
  L.push("- Current streak: " + plural(currentStreak(),"day") + " · longest ever: " + plural(longestStreak(),"day"));
  L.push("- Runs: " + runs + (km ? ", " + km.toFixed(1) + " km total" : ""));
  var timed = [];
  dates.forEach(function(ds){
    var r = store.days[ds];
    if(r && r.km > 0 && r.min > 0) timed.push({ d:ds, p:r.min/r.km, run:planFor(ds).run });
  });
  if(timed.length){
    var easy = timed.filter(function(t){ return t.run === "easy" || t.run === "long"; });
    if(easy.length){
      var avg = easy.reduce(function(t,x){ return t + x.p; }, 0) / easy.length;
      L.push("- Average easy/long run pace: " + fmtPace(avg) + " /km (target 6:30-7:00)");
    }
  }
  if(missed.length) L.push("- Nothing logged on: " + missed.join(", "));
  L.push("");

  /* per day */
  L.push("## Day by day");
  L.push("");
  dates.forEach(function(ds){
    var plan = planFor(ds), c = counts(ds), rec = store.days[ds] || { c:{}, note:"" };
    var dayNo = daysBetween(store.start, ds) + 1;
    var wd = parseYmd(ds).toLocaleDateString("en-GB", { weekday:"short" });
    L.push("### " + wd + " " + ds + " — " + plan.tag +
           (dayNo >= 1 && dayNo <= BLOCK_DAYS ? " (block day " + dayNo + ")" : ""));
    if(c.done === 0){
      L.push("Nothing logged.");
      L.push("");
      return;
    }
    L.push("Completed " + c.done + " of " + c.total + " items (" + Math.round(c.pct*100) + "%)" +
           (isComplete(ds) ? " — counts as a completed day." : " — partial."));
    if(rec.km > 0){
      var line = "Run: " + rec.km.toFixed(1) + " km";
      if(rec.min > 0) line += " in " + rec.min + " min (" + fmtPace(rec.min/rec.km) + " /km)";
      L.push(line);
    }
    /* what was skipped */
    if(c.done < c.total){
      var skipped = [];
      plan.blocks.forEach(function(b){
        BLOCKS[b[0]].items.forEach(function(item, i){
          if(!rec.c[b[0]+":"+i]) skipped.push(BLOCKS[b[0]].name + " — " + item.n);
        });
      });
      if(skipped.length){
        var shown = skipped.slice(0, 10).join("; ");
        if(skipped.length > 10) shown += "; +" + (skipped.length - 10) + " more";
        L.push("Not done: " + shown);
      }
    }
    if((rec.note||"").trim()) L.push("Note: " + rec.note.trim().replace(/\s*\n\s*/g, " / "));
    L.push("");
  });

  return L.join("\n");
}

document.getElementById("expBuild").addEventListener("click", function(){
  document.getElementById("expOut").value = buildSummary();
  toast("Summary built");
});
document.getElementById("expCopy").addEventListener("click", function(){
  var ta = document.getElementById("expOut");
  if(!ta.value) ta.value = buildSummary();
  var text = ta.value;
  function fallback(){
    ta.removeAttribute("readonly");
    ta.focus(); ta.select(); ta.setSelectionRange(0, text.length);
    var ok = false;
    try{ ok = document.execCommand("copy"); }catch(e){}
    ta.setAttribute("readonly","readonly");
    toast(ok ? "Copied" : "Select the text and copy it manually");
  }
  if(navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(text).then(function(){ toast("Copied"); }, fallback);
  }else fallback();
});
document.getElementById("expDl").addEventListener("click", function(){
  var ta = document.getElementById("expOut");
  if(!ta.value) ta.value = buildSummary();
  download("keiko-summary-" + TODAY + ".md", ta.value, "text/markdown;charset=utf-8");
});

/* =======================================================================
   SETTINGS — reminders
   ======================================================================= */
var notifTimers = [];
function notifSupported(){ return "Notification" in window; }

function updateNotifState(){
  var p = document.getElementById("notifState");
  var btn = document.getElementById("notifEnable");
  if(!notifSupported()){
    p.textContent = "This browser cannot show notifications. Use the calendar export below instead.";
    btn.hidden = true; return;
  }
  if(Notification.permission === "granted"){
    p.textContent = "Reminders are on. They fire while this app is open on your phone.";
    btn.hidden = true;
  }else if(Notification.permission === "denied"){
    p.textContent = "Notifications are blocked for this page in your browser settings. The calendar export below is the reliable route.";
    btn.hidden = true;
  }else{
    p.textContent = "Reminders are off.";
    btn.hidden = false;
  }
}
document.getElementById("notifEnable").addEventListener("click", function(){
  if(!notifSupported()) return;
  Notification.requestPermission().then(function(){ updateNotifState(); scheduleAll(); });
});
document.getElementById("testNotif").addEventListener("click", function(){
  fire("Daily Keiko", store.reminders.length ? store.reminders[0].m : "This is what a reminder looks like.");
});
function fire(title, body){
  if(notifSupported() && Notification.permission === "granted"){
    try{ new Notification(title, { body: body, tag: "keiko" }); return; }catch(e){}
  }
  toast(body || title);
}

function scheduleAll(){
  notifTimers.forEach(clearTimeout);
  notifTimers = [];
  if(!notifSupported() || Notification.permission !== "granted") return;
  store.reminders.forEach(function(r){
    if(!r.t) return;
    var parts = r.t.split(":");
    var now = new Date();
    var when = new Date();
    when.setHours(+parts[0], +parts[1], 0, 0);
    if(when <= now) when = addDays(when, 1);
    var ms = when - now;
    if(ms > 0 && ms < 2147483647){
      notifTimers.push(setTimeout(function(){
        var plan = planFor(ymd(new Date()));
        fire("Daily Keiko · " + plan.tag, r.m || plan.note);
        scheduleAll();
      }, ms));
    }
  });
}

function renderReminders(){
  var list = document.getElementById("reminderList");
  list.innerHTML = "";
  if(!store.reminders.length){
    var p = document.createElement("p"); p.className = "hint";
    p.textContent = "No reminders yet.";
    list.appendChild(p);
  }
  store.reminders.forEach(function(r, idx){
    var wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;flex-direction:column;gap:7px;padding:11px;border:1px solid var(--line);border-radius:4px";
    var top = document.createElement("div");
    top.style.cssText = "display:grid;grid-template-columns:110px 1fr auto;gap:8px;align-items:end";

    var lt = document.createElement("label"); lt.className = "fld";
    var lts = document.createElement("span"); lts.textContent = "Time";
    var ti = document.createElement("input"); ti.type = "time"; ti.value = r.t || "06:00";
    ti.addEventListener("change", function(){ r.t = ti.value; markSettings(); save(); scheduleAll(); renderGcal(); });
    lt.appendChild(lts); lt.appendChild(ti);

    var lm = document.createElement("label"); lm.className = "fld";
    var lms = document.createElement("span"); lms.textContent = "Message";
    var mi = document.createElement("input"); mi.type = "text"; mi.value = r.m || "";
    mi.placeholder = "Keiko time. Slow is the point.";
    mi.addEventListener("input", function(){ r.m = mi.value; markSettings(); save(); });
    lm.appendChild(lms); lm.appendChild(mi);

    var del = document.createElement("button");
    del.className = "btn danger"; del.textContent = "Remove";
    del.addEventListener("click", function(){
      confirmBox({ title:"Remove this reminder?", body:"The " + (r.t || "") + " reminder will be deleted.", ok:"Remove", danger:true })
        .then(function(yes){ if(yes){ store.reminders.splice(idx,1); save(); renderReminders(); scheduleAll(); } });
    });

    top.appendChild(lt); top.appendChild(lm); top.appendChild(del);
    wrap.appendChild(top);
    list.appendChild(wrap);
  });
}
document.getElementById("addReminder").addEventListener("click", function(){
  if(store.reminders.length >= 5){ toast("Five reminders is plenty"); return; }
  store.reminders.push({ t:"06:00", m:"" });
  markSettings(); save(); renderReminders(); scheduleAll();
});

/* =======================================================================
   SETTINGS — ics, backup, theme, start date
   ======================================================================= */
function pad(n){ return String(n).padStart(2,"0"); }
function icsStamp(d){
  return d.getUTCFullYear()+pad(d.getUTCMonth()+1)+pad(d.getUTCDate())+"T"+
         pad(d.getUTCHours())+pad(d.getUTCMinutes())+pad(d.getUTCSeconds())+"Z";
}
function icsLocal(d, hh, mm){
  return d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+"T"+pad(hh)+pad(mm)+"00";
}
function esc(s){ return String(s).replace(/([,;\\])/g,"\\$1").replace(/\n/g,"\\n"); }

function buildIcs(){
  var t = (document.getElementById("icsTime").value || "06:00").split(":");
  var hh = +t[0], mm = +t[1];
  var custom = document.getElementById("icsMsg").value.trim();
  var start = parseYmd(store.start);
  var until = addDays(start, BLOCK_DAYS);
  var BY = { mon:"MO", tue:"TU", wed:"WE", thu:"TH", fri:"FR", sat:"SA", sun:"SU" };
  var lines = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Daily Keiko//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH"];
  Object.keys(DAYS).forEach(function(k){
    var plan = DAYS[k];
    // first occurrence of this weekday on or after start
    var d = new Date(start.getTime());
    while(JSDAY[d.getDay()] !== k) d = addDays(d, 1);
    var msg = custom || plan.note;
    lines.push("BEGIN:VEVENT");
    lines.push("UID:keiko-" + k + "-" + Date.now() + "@dailykeiko");
    lines.push("DTSTAMP:" + icsStamp(new Date()));
    lines.push("DTSTART:" + icsLocal(d, hh, mm));
    lines.push("DURATION:PT1H");
    lines.push("RRULE:FREQ=WEEKLY;BYDAY=" + BY[k] + ";UNTIL=" + icsLocal(until, hh, mm));
    lines.push("SUMMARY:" + esc("Keiko · " + plan.tag));
    lines.push("DESCRIPTION:" + esc(msg));
    lines.push("BEGIN:VALARM");
    lines.push("TRIGGER:PT0S");
    lines.push("ACTION:DISPLAY");
    lines.push("DESCRIPTION:" + esc(msg));
    lines.push("END:VALARM");
    lines.push("END:VEVENT");
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}
function download(name, text, mime){
  try{
    var blob = new Blob([text], { type: mime || "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(url); a.remove(); }, 1500);
    toast("Saved to your downloads");
  }catch(e){ toast("Download blocked by this browser"); }
}

function gcalStamp(d, hh, mm){
  return d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+"T"+pad(hh)+pad(mm)+"00";
}
function renderGcal(){
  var box = document.getElementById("gcalLinks");
  if(!box) return;
  box.innerHTML = "";
  var t = (document.getElementById("icsTime").value || "06:00").split(":");
  var hh = +t[0], mm = +t[1];
  var custom = document.getElementById("icsMsg").value.trim();
  var BY = { mon:"MO", tue:"TU", wed:"WE", thu:"TH", fri:"FR", sat:"SA", sun:"SU" };
  var tz = "";
  try{ tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; }catch(e){}
  var start = parseYmd(store.start);

  ["mon","tue","wed","thu","fri","sat","sun"].forEach(function(k){
    var plan = DAYS[k];
    var d = new Date(start.getTime());
    while(JSDAY[d.getDay()] !== k) d = addDays(d, 1);
    var endH = hh + 1; if(endH > 23) endH = 23;
    var params = [
      "action=TEMPLATE",
      "text=" + encodeURIComponent("Keiko \u00b7 " + plan.tag),
      "details=" + encodeURIComponent(custom || plan.note),
      "dates=" + gcalStamp(d, hh, mm) + "/" + gcalStamp(d, endH, mm),
      "recur=" + encodeURIComponent("RRULE:FREQ=WEEKLY;BYDAY=" + BY[k] + ";COUNT=8")
    ];
    if(tz) params.push("ctz=" + encodeURIComponent(tz));

    var a = document.createElement("a");
    a.className = "btn ghost";
    a.href = "https://calendar.google.com/calendar/render?" + params.join("&");
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = plan.label + " \u00b7 " + plan.tag;
    box.appendChild(a);
  });
}
document.getElementById("icsTime").addEventListener("change", renderGcal);
document.getElementById("icsMsg").addEventListener("input", renderGcal);

document.getElementById("icsBtn").addEventListener("click", function(){
  download("daily-keiko.ics", buildIcs(), "text/calendar;charset=utf-8");
});
document.getElementById("expBtn").addEventListener("click", function(){
  download("daily-keiko-backup-" + TODAY + ".json", JSON.stringify(store, null, 2), "application/json");
});
document.getElementById("impBtn").addEventListener("click", function(){
  document.getElementById("impFile").click();
});
document.getElementById("impFile").addEventListener("change", function(e){
  var f = e.target.files && e.target.files[0];
  if(!f) return;
  var fr = new FileReader();
  fr.onload = function(){
    try{
      var p = JSON.parse(fr.result);
      if(!p || typeof p !== "object" || !p.days) throw new Error("bad");
      confirmBox({
        title:"Import this backup?",
        body:"It will replace everything currently in the app on this device.",
        ok:"Import", danger:true
      }).then(function(yes){
        if(!yes) return;
        store.start = p.start || store.start;
        store.days = p.days || {};
        store.reminders = Array.isArray(p.reminders) ? p.reminders : [];
        store.theme = p.theme || "auto";
        save(); applyTheme(); renderAll();
        toast("Backup imported");
      });
    }catch(err){ toast("That file isn't a Daily Keiko backup"); }
  };
  fr.readAsText(f);
  e.target.value = "";
});
document.getElementById("resetBtn").addEventListener("click", function(){
  confirmBox({
    title:"Erase everything?",
    body:"Every ticked item, note and logged run on this device will be deleted. This cannot be undone. Export a backup first if you are not sure.",
    ok:"Erase", danger:true
  }).then(function(yes){
    if(!yes) return;
    store.days = {}; store.reminders = []; store.start = TODAY;
    save(); renderAll(); toast("All data erased");
  });
});
document.getElementById("startDate").addEventListener("change", function(e){
  if(e.target.value){ store.start = e.target.value; markSettings(); save(); renderAll(); }
});
function applyTheme(){
  if(store.theme === "auto") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", store.theme);
  document.getElementById("themeSel").value = store.theme;
}
document.getElementById("themeSel").addEventListener("change", function(e){
  store.theme = e.target.value; markSettings(); save(); applyTheme();
});

/* =======================================================================
   TABS
   ======================================================================= */
function showView(id){
  ["v-day","v-cal","v-stats","v-guide","v-set"].forEach(function(v){
    document.getElementById(v).hidden = (v !== id);
  });
  Array.prototype.forEach.call(document.querySelectorAll(".tab"), function(t){
    t.setAttribute("aria-selected", String(t.dataset.view === id));
  });
  window.scrollTo(0,0);
}
Array.prototype.forEach.call(document.querySelectorAll(".tab"), function(t){
  t.addEventListener("click", function(){ showView(t.dataset.view); });
});

/* =======================================================================
   BOOT
   ======================================================================= */
window.KEIKO_APP = {
  getStore: function(){ return store; },
  replaceStore: function(next){
    store.start = next.start; store.days = next.days;
    store.reminders = next.reminders; store.theme = next.theme;
    store.settingsTs = next.settingsTs;
  },
  save: save, applyTheme: applyTheme,
  renderAll: function(){ renderAll(); },
  toast: toast, confirmBox: confirmBox, showView: showView,
  BLOCKS: BLOCKS, DAYS: DAYS
};

function renderAll(){
  document.getElementById("startDate").value = store.start;
  renderDay(); renderCal(); renderStats(); renderReminders(); updateNotifState(); scheduleAll(); renderGcal();
}

load();
applyTheme();
renderAll();

// midnight rollover
setInterval(function(){
  var t = ymd(new Date());
  if(t !== TODAY){
    var wasToday = (cursor === TODAY);
    TODAY = t;
    if(wasToday) cursor = t;
    renderAll();
  }
}, 60000);

})();


/* =========================================================================
   GUIDE — renders guide.js into the Guide tab and links every checklist
   item to its written instructions.
   ========================================================================= */
(function(){
  "use strict";
  var G = window.KEIKO_GUIDE;
  var APP = window.KEIKO_APP;
  if(!G || !APP) return;

  var ORDER = ["warmup","mobility","kihon","kicks","kata","core","strength",
               "cooldown","easyrun","teamrun","longrun","dojo"];
  var body = document.getElementById("guideBody");
  var search = document.getElementById("guideSearch");
  if(!body) return;

  function h(tag, cls, text){
    var e = document.createElement(tag);
    if(cls) e.className = cls;
    if(text !== undefined && text !== null) e.textContent = text;
    return e;
  }
  function field(parent, label, text){
    if(!text || text === "—") return;
    var w = h("div","gfield");
    w.appendChild(h("span","glabel",label));
    w.appendChild(h("p","gtext",text));
    parent.appendChild(w);
  }
  function listField(parent, label, items){
    if(!items || !items.length) return;
    var w = h("div","gfield");
    w.appendChild(h("span","glabel",label));
    var ul = h("ul","glist");
    items.forEach(function(t){ ul.appendChild(h("li",null,t)); });
    w.appendChild(ul);
    parent.appendChild(w);
  }
  function stopField(parent, text){
    if(!text || text === "—") return;
    var w = h("div","gfield stopfield");
    w.appendChild(h("span","glabel","Stop if"));
    w.appendChild(h("p","gtext",text));
    parent.appendChild(w);
  }
  function entryText(e){
    return [e.n, e.setup, e.doIt, e.feel, e.wrong, e.why]
      .concat(e.mistakes || []).join(" ").toLowerCase();
  }

  function render(q){
    q = (q || "").trim().toLowerCase();
    body.innerHTML = "";
    var shown = 0;

    /* principles */
    var pMatches = (G.principles || []).filter(function(p){
      return !q || (p.n + " " + p.body.join(" ")).toLowerCase().indexOf(q) !== -1;
    });
    if(pMatches.length){
      var pc = h("section","card");
      pc.appendChild(h("h2",null,"Read this first"));
      pMatches.forEach(function(p){
        var w = h("div","gfield");
        w.appendChild(h("h3","gname",p.n));
        p.body.forEach(function(t){ w.appendChild(h("p","gtext",t)); });
        pc.appendChild(w);
        shown++;
      });
      body.appendChild(pc);
    }

    /* per block */
    ORDER.forEach(function(key){
      var entries = G.blocks[key];
      if(!entries) return;
      var blockName = (APP.BLOCKS[key] && APP.BLOCKS[key].name) || key;
      var matches = entries.map(function(e,i){ return { e:e, i:i }; })
        .filter(function(x){ return !q || entryText(x.e).indexOf(q) !== -1; });
      if(!matches.length) return;

      var card = h("section","card");
      card.appendChild(h("h2",null,blockName));
      matches.forEach(function(x){
        var e = x.e;
        var w = h("article","gentry");
        w.id = "g-" + key + "-" + x.i;
        w.appendChild(h("h3","gname",e.n));
        field(w, "Set up", e.setup);
        field(w, "Do it", e.doIt);
        field(w, "It should feel like", e.feel);
        stopField(w, e.wrong);
        listField(w, "Common mistakes", e.mistakes);
        field(w, "Easier version", e.easier);
        field(w, "Harder version", e.harder);
        field(w, "Why it is in your programme", e.why);
        card.appendChild(w);
        shown++;
      });
      body.appendChild(card);
    });

    if(!shown){
      var none = h("section","card");
      none.appendChild(h("p","hint","Nothing matches “" + q + "”. Try a shorter word — “hip”, “hang”, “run”."));
      body.appendChild(none);
    }
  }

  if(search){
    var t = null;
    search.addEventListener("input", function(){
      clearTimeout(t);
      t = setTimeout(function(){ render(search.value); }, 140);
    });
  }

  window.KEIKO_OPEN_GUIDE = function(key, i){
    if(search) search.value = "";
    render("");
    APP.showView("v-guide");
    var target = document.getElementById("g-" + key + "-" + i);
    if(target){
      target.scrollIntoView({ block:"start", behavior:"smooth" });
      target.classList.add("flash");
      setTimeout(function(){ target.classList.remove("flash"); }, 1600);
    }
  };

  render("");
})();


/* =========================================================================
   SYNC — optional Firebase sign-in and two-device merge.
   With no config in config.js this module stays quiet and the app behaves
   exactly as it did before: everything on one device.

   Data shape in Firestore:
     users/{uid}/days/{YYYY-MM-DD}   ->  { c, note, km, min, ts }
     users/{uid}/meta/settings       ->  { start, reminders, theme, ts }

   `ts` is a millisecond client timestamp. Whichever copy of a day has the
   higher ts wins. For one person on two devices that is exactly right.
   ========================================================================= */
(function(){
  "use strict";
  var APP = window.KEIKO_APP;
  var CFG = window.KEIKO_CONFIG || {};
  if(!APP) return;

  var acctBody = document.getElementById("acctBody");
  var chip = document.getElementById("syncChip");
  var auth = null, fs = null, user = null;
  var timer = null, busy = false, lastSync = null;
  var lastPullTs = 0;                 // highest remote ts we have already seen

  var PULL_KEY = "dailykeiko.pullts";
  try{ lastPullTs = parseInt(localStorage.getItem(PULL_KEY) || "0", 10) || 0; }catch(e){}

  function setChip(state, label){
    if(!chip) return;
    if(!auth){ chip.hidden = true; return; }
    chip.hidden = false;
    chip.className = "syncchip " + (state || "");
    chip.textContent = label;
  }

  function configured(){
    var f = CFG.FIREBASE || {};
    return !!(f.apiKey && f.projectId && window.firebase &&
              window.firebase.initializeApp && window.firebase.firestore);
  }

  function userDoc(){ return fs.collection("users").doc(user.uid); }

  /* ---------------- merge -------------------------------------------- */
  function mergeRemoteDay(day, d){
    var st = APP.getStore();
    var ts = Number(d.ts || 0);
    var mine = st.days[day];
    if(!mine || ts > (mine.ts || 0)){
      st.days[day] = {
        c: d.c || {},
        note: d.note || "",
        km: (d.km === undefined || d.km === null) ? null : d.km,
        min: (d.min === undefined || d.min === null) ? null : d.min,
        ts: ts
      };
      return true;
    }
    return false;
  }

  function mergeRemoteSettings(d){
    var st = APP.getStore();
    var ts = Number(d.ts || 0);
    if(ts > (st.settingsTs || 0)){
      if(d.start) st.start = d.start;
      if(Array.isArray(d.reminders)) st.reminders = d.reminders;
      if(d.theme) st.theme = d.theme;
      st.settingsTs = ts;
      return true;
    }
    return false;
  }

  function hasContent(d){
    return !!((d.c && Object.keys(d.c).length) || (d.note || "").trim() || d.km || d.min);
  }

  /* ---------------- sync ---------------------------------------------- */
  /* full = read every day document. Used on first sync of a device and by
     the Sync now button. Otherwise only days newer than what we last saw are
     fetched, which keeps the daily read count tiny. */
  function syncNow(silent, full){
    if(!auth || !user || busy) return Promise.resolve();
    busy = true;
    setChip("busy", "Syncing…");

    var st = APP.getStore();
    var changed = false;
    var since = full ? 0 : lastPullTs;
    var days = userDoc().collection("days");
    var maxSeen = lastPullTs;

    return days.where("ts", ">", since).get()
      .then(function(snap){
        snap.forEach(function(doc){
          var d = doc.data() || {};
          if(Number(d.ts || 0) > maxSeen) maxSeen = Number(d.ts || 0);
          if(mergeRemoteDay(doc.id, d)) changed = true;
        });
      })
      .then(function(){
        /* push local days that the server has not got, or has an older copy of */
        var pending = [];
        Object.keys(st.days).forEach(function(day){
          var d = st.days[day];
          if(!hasContent(d)) return;
          if((d.ts || 0) > lastPullTs) pending.push(day);
        });
        if(!pending.length) return;

        var chunks = [], i;
        for(i = 0; i < pending.length; i += 400) chunks.push(pending.slice(i, i + 400));
        return chunks.reduce(function(p, chunk){
          return p.then(function(){
            var batch = fs.batch();
            chunk.forEach(function(day){
              var d = st.days[day];
              batch.set(days.doc(day), {
                c: d.c || {}, note: d.note || "",
                km: (d.km === undefined) ? null : d.km,
                min: (d.min === undefined) ? null : d.min,
                ts: d.ts || Date.now()
              });
              if((d.ts || 0) > maxSeen) maxSeen = d.ts || 0;
            });
            return batch.commit();
          });
        }, Promise.resolve());
      })
      .then(function(){
        return userDoc().collection("meta").doc("settings").get();
      })
      .then(function(doc){
        var remoteTs = -1;
        if(doc && doc.exists){
          var d = doc.data() || {};
          remoteTs = Number(d.ts || 0);
          if(mergeRemoteSettings(d)) changed = true;
        }
        var st2 = APP.getStore();
        if((st2.settingsTs || 0) > remoteTs){
          return userDoc().collection("meta").doc("settings").set({
            start: st2.start,
            reminders: st2.reminders || [],
            theme: st2.theme || "auto",
            ts: st2.settingsTs || Date.now()
          });
        }
      })
      .then(function(){
        busy = false;
        lastSync = new Date();
        lastPullTs = maxSeen;
        try{ localStorage.setItem(PULL_KEY, String(lastPullTs)); }catch(e){}
        APP.save();
        if(changed){ APP.applyTheme(); APP.renderAll(); }
        setChip("ok", "Synced");
        renderAccount();
        if(!silent) APP.toast("Synced");
      })
      .catch(function(err){
        busy = false;
        setChip("bad", navigator.onLine ? "Sync failed" : "Offline");
        if(!silent) APP.toast(readable(err));
      });
  }

  function readable(err){
    var code = (err && err.code) || "";
    var map = {
      "auth/invalid-credential":     "Wrong email or password",
      "auth/wrong-password":         "Wrong email or password",
      "auth/user-not-found":         "No account with that email — create one first",
      "auth/invalid-email":          "That email address does not look right",
      "auth/email-already-in-use":   "That email already has an account — sign in instead",
      "auth/weak-password":          "Password needs at least 6 characters",
      "auth/too-many-requests":      "Too many attempts. Wait a minute and try again",
      "auth/network-request-failed": "No connection",
      "auth/operation-not-allowed":  "Email sign-in is off — turn it on in Firebase Authentication",
      "permission-denied":           "Blocked by security rules — publish firestore.rules",
      "unavailable":                 "No connection",
      "failed-precondition":         "Firestore is not set up yet — create the database in the Firebase console"
    };
    if(map[code]) return map[code];
    return (err && err.message) || "Something went wrong";
  }

  function schedule(){
    if(!auth || !user) return;
    clearTimeout(timer);
    timer = setTimeout(function(){ syncNow(true, false); }, 2500);
  }
  window.KEIKO_SYNC = {
    schedule: schedule,
    syncNow: function(silent){ return syncNow(silent, true); }
  };

  /* ---------------- account UI ---------------------------------------- */
  function el(tag, cls, text){
    var e = document.createElement(tag);
    if(cls) e.className = cls;
    if(text !== undefined) e.textContent = text;
    return e;
  }
  function fld(label, type, ph, autocomplete){
    var l = el("label","fld");
    l.appendChild(el("span",null,label));
    var i = document.createElement("input");
    i.type = type; i.placeholder = ph || "";
    if(autocomplete) i.autocomplete = autocomplete;
    l.appendChild(i);
    l.input = i;
    return l;
  }

  function renderAccount(){
    if(!acctBody) return;
    acctBody.innerHTML = "";

    if(!configured()){
      acctBody.appendChild(el("p","hint",
        "Sign-in is switched off because config.js has no Firebase settings yet. The app works fully without it — everything is stored on this device. Paste your Firebase web config into config.js to turn on sync between your phone and your PC."));
      if(chip) chip.hidden = true;
      return;
    }

    if(user){
      var rows = el("div","rows");
      function row(k, v){
        var r = el("div","row");
        r.appendChild(el("span","k",k));
        r.appendChild(el("span","v",v));
        rows.appendChild(r);
      }
      row("Signed in as", user.email || "—");
      row("Last sync", lastSync ? lastSync.toLocaleTimeString(undefined,{hour:"2-digit",minute:"2-digit"}) : "not yet");
      acctBody.appendChild(rows);

      var br = el("div","btnrow");
      var sync = el("button","btn","Sync now");
      sync.addEventListener("click", function(){ syncNow(false, true); });
      var out = el("button","btn danger","Sign out");
      out.addEventListener("click", function(){
        APP.confirmBox({
          title:"Sign out?",
          body:"Your training stays on this device. Signing back in merges it with whatever is on your other devices.",
          ok:"Sign out", danger:true
        }).then(function(yes){
          if(!yes) return;
          auth.signOut().then(function(){
            user = null; lastSync = null;
            if(chip) chip.hidden = true;
            renderAccount(); APP.toast("Signed out");
          });
        });
      });
      br.appendChild(sync); br.appendChild(out);
      acctBody.appendChild(br);
      acctBody.appendChild(el("p","hint",
        "Syncs automatically a couple of seconds after any change, when you open the app, and when you come back online. Sync now does a full re-read of everything."));
      return;
    }

    /* signed out */
    acctBody.appendChild(el("p","hint",
      "Sign in on your phone and your PC with the same account and your training follows you between them. Everything keeps working offline; changes sync when you are back online."));

    var email = fld("Email", "email", "you@example.com", "username");
    var pw = fld("Password", "password", "at least 6 characters", "current-password");
    acctBody.appendChild(email);
    acctBody.appendChild(pw);

    var br2 = el("div","btnrow");
    var inBtn = el("button","btn","Sign in");
    var upBtn = el("button","btn ghost","Create account");
    br2.appendChild(inBtn); br2.appendChild(upBtn);
    acctBody.appendChild(br2);

    function attempt(which, verb){
      var e = email.input.value.trim(), p = pw.input.value;
      if(!e || !p){ APP.toast("Email and password, please"); return; }
      inBtn.disabled = upBtn.disabled = true;
      setChip("busy", verb + "…");
      var call = (which === "up")
        ? auth.createUserWithEmailAndPassword(e, p)
        : auth.signInWithEmailAndPassword(e, p);
      call.then(function(cred){
        inBtn.disabled = upBtn.disabled = false;
        user = cred.user;
        APP.toast("Signed in");
        renderAccount();
        syncNow(true, true);
      }).catch(function(err){
        inBtn.disabled = upBtn.disabled = false;
        setChip("bad", "Not signed in");
        APP.toast(readable(err));
      });
    }
    inBtn.addEventListener("click", function(){ attempt("in", "Signing in"); });
    upBtn.addEventListener("click", function(){ attempt("up", "Creating"); });

    if(CFG.ENABLE_GOOGLE){
      var g = el("button","btn ghost","Continue with Google");
      g.addEventListener("click", function(){
        var provider = new window.firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).catch(function(err){ APP.toast(readable(err)); });
      });
      acctBody.appendChild(g);
    }
  }

  /* ---------------- boot ----------------------------------------------- */
  function boot(){
    if(!configured()){ renderAccount(); return; }
    try{
      if(!window.firebase.apps.length) window.firebase.initializeApp(CFG.FIREBASE);
      auth = window.firebase.auth();
      fs = window.firebase.firestore();
    }catch(e){
      auth = null; fs = null;
      renderAccount();
      return;
    }

    setChip("", "Not signed in");

    auth.onAuthStateChanged(function(u){
      var wasId = user && user.uid;
      user = u || null;
      renderAccount();
      if(user){
        setChip("", "Signed in");
        if(user.uid !== wasId) syncNow(true, true);
      }else{
        setChip("", "Not signed in");
      }
    });

    document.addEventListener("visibilitychange", function(){
      if(!document.hidden && user) syncNow(true, false);
    });
    window.addEventListener("online", function(){ if(user) syncNow(true, false); });
    window.addEventListener("offline", function(){ if(user) setChip("bad","Offline"); });
  }

  /* the Firebase scripts are deferred, so wait for them if they have not landed */
  if(window.firebase || !(CFG.FIREBASE && CFG.FIREBASE.apiKey)) boot();
  else{
    var tries = 0;
    var iv = setInterval(function(){
      tries++;
      if(window.firebase || tries > 50){ clearInterval(iv); boot(); }
    }, 100);
  }
})();
