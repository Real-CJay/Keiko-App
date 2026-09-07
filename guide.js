/* Daily Keiko — the exercise guide.
   Written to be read instead of watched: every entry says how to set up, what
   to do, what it should feel like, and what it feels like when it is wrong.
   Keys match BLOCKS in app.js exactly, so the info button on any checklist
   item finds its entry here. */

window.KEIKO_GUIDE = {

  principles: [
    {
      n: "Stretch versus pain",
      body: [
        "A stretch is a broad, warm, spread-out pulling feeling across the belly of a muscle. It stays the same or eases while you hold it, and it disappears the moment you come out.",
        "Pain is sharp, pinching, burning, electric, or felt in a joint rather than a muscle. It gets worse as you hold, and it lingers after you stop.",
        "The rule is simple and it is not negotiable: stretch to the first clear tension and stop there. The last 10% of range is where injuries come from and it gives you almost nothing that the first 90% does not."
      ]
    },
    {
      n: "How to breathe",
      body: [
        "Never hold your breath in a stretch. Breathe in through your nose, then let a long slow breath out and let the body sink a little on the exhale. That exhale is doing real work — it lowers muscle guarding.",
        "In core work, breathe normally throughout. If you are holding your breath to hold the position, the position is too hard. Make it easier.",
        "In kihon, the breath sharpens on the technique: a short forced exhale as the punch lands, then relax."
      ]
    },
    {
      n: "Counting tempo",
      body: [
        "Where an exercise says slow, count it out loud. Silently, everyone speeds up.",
        "Mobility work: 3 seconds out, 3 seconds back. Kicks: count 1 chamber, 2 extend, 3 re-chamber, 4 place down, with a real pause at each number.",
        "Slow is not a softer version of the exercise. Slow is the exercise. It is what forces the small stabilising muscles around the hip to do their job instead of letting momentum carry the leg."
      ]
    },
    {
      n: "What a neutral spine means",
      body: [
        "Half the instructions here say do not arch your back. Here is how to find the position they are asking for.",
        "Lie on your back with knees bent. Slide a hand under your lower back — there is a natural gap. Now gently flatten that gap by tilting your pelvis, as if pointing your tailbone toward the ceiling. Feel your lower stomach switch on.",
        "That flattened position is what dead bug, glute bridge and the half-kneeling hip flexor stretch all want. Standing, the same position feels like ribs down, tailbone slightly tucked, stomach lightly braced.",
        "The opposite — ribs flared, back arched, bottom sticking out — is the position that irritated your back in the first place."
      ]
    },
    {
      n: "Left and right will not match",
      body: [
        "One hip will be tighter than the other. One side of the hook kick will feel fine and the other will not. This is normal in everyone and especially normal in you right now.",
        "Do not force the stiff side to catch up in one session. Work both sides to the same effort, not the same range. The gap closes over months."
      ]
    },
    {
      n: "When to stop the whole session",
      body: [
        "Any lower back pain. Not tightness, not fatigue — pain. Stop, write it in the note, tell your physio.",
        "A hip that catches, clunks or feels like it is shifting out of place, and keeps doing it after you lower the height.",
        "Sharp pain anywhere that changes how you move. Limping to finish a session is never worth it.",
        "Feeling tired is not a reason to stop. Feeling wrong is."
      ]
    }
  ],

  blocks: {

    /* ---------------------------------------------------------------- */
    warmup: [
      {
        n: "Physio's set — 7 second holds",
        setup: "Wherever they told you to do it, in the position they showed you.",
        doIt: "Exactly as prescribed, 7 seconds a hold, repeated however many times they said. Do it before the rest of the warm-up and again at the end of the session.",
        feel: "Mild, specific, and unremarkable. Rehab stretches are meant to be boring.",
        wrong: "If any of these have started to hurt where they used to be neutral, that is information for your physio, not a reason to push harder.",
        mistakes: [
          "Holding them for 30 seconds because longer sounds better. Short holds are a deliberate choice in early rehab.",
          "Skipping them on days you feel fine. They are the reason you feel fine."
        ]
      },
      {
        n: "Easy skipping or jog in place",
        setup: "Enough space to bounce lightly. Shoes on if you are on a hard floor.",
        doIt: "Three minutes of gentle bouncing or jogging on the spot. Start almost lazily and build. You are raising your body temperature, nothing more.",
        feel: "Slightly warm, breathing a bit deeper, maybe the first hint of sweat. You should be able to talk easily the whole time.",
        wrong: "Out of breath means you turned a warm-up into a workout. Slow down.",
        mistakes: [
          "Skipping straight to stretching while cold. Cold tissue is stiffer and tears more easily — this three minutes is what makes everything after it safe."
        ]
      },
      {
        n: "Arm circles and shoulder rolls",
        setup: "Standing tall, arms hanging loose.",
        doIt: "Twenty backward shoulder rolls, then twenty forward. Then straight-arm circles, twenty each direction, starting small and growing. Keep the elbows soft, not locked.",
        feel: "Loosening across the top of the shoulders and upper back.",
        wrong: "Pinching at the front of the shoulder when the arm passes overhead. Make the circles smaller.",
        mistakes: ["Rushing them and letting the arms flail. Controlled, moderate speed."]
      },
      {
        n: "Standing hip circles",
        setup: "Stand next to a wall or chair, one hand resting on it for balance.",
        doIt: "Lift one knee to about hip height. Draw a circle with the knee — out to the side, around, and back to the front. Ten circles one way, ten the other, then swap legs. Keep the standing leg soft, not locked.",
        feel: "Movement deep in the hip socket. Some clicking without pain is common and usually harmless.",
        wrong: "A pinch at the front of the hip crease, or a clunk that makes you flinch. Make the circle much smaller — a circle the size of a saucer is a real circle.",
        mistakes: [
          "Leaning the torso to swing the leg around. The body stays upright and still; only the leg moves.",
          "Going fast. This is the warm-up version of hip CARs, so slow still applies."
        ]
      },
      {
        n: "Knee and ankle rotations",
        setup: "Standing, or sitting on the floor for the ankles.",
        doIt: "Knees: feet together, hands on knees, small circles ten each way. Ankles: lift one foot and draw ten circles with the toes each way, then swap.",
        feel: "Nothing dramatic. Joints feeling less stiff.",
        wrong: "Knee pain in any direction. Skip the knee circles and tell your physio.",
        mistakes: ["Cranking the knee circles hard. The knee is a hinge, not a ball joint — keep these tiny."]
      },
      {
        n: "Torso twists, arms loose",
        setup: "Feet shoulder-width, knees slightly bent, arms hanging completely relaxed.",
        doIt: "Turn your shoulders left and right and let your arms swing around and slap your back. Twenty turns total, moderate speed.",
        feel: "The rotation happening in your mid-back and ribs, with the hips fairly quiet.",
        wrong: "Any pull or pinch in the lower back. Reduce the range by half and slow down.",
        mistakes: [
          "Twisting hard and fast at the end range. This is a warm-up, not a stretch — never force the turn.",
          "Locking the knees, which sends the twist into your lower back instead of your ribs."
        ]
      }
    ],

    /* ---------------------------------------------------------------- */
    mobility: [
      {
        n: "Hip CARs, wall-supported",
        setup: "Stand tall beside a wall, inside hand on the wall. Squeeze the standing leg glute and brace your stomach lightly. Ribs down.",
        doIt: "Lift the outside knee toward your chest as high as it goes without your back rounding. From there, take the knee out to the side. Then rotate the shin so the heel comes up behind you and bring the knee back and down to the start. That is one circle. Five each direction per leg, and each circle should take about ten seconds.",
        feel: "Deep, working, slightly awkward sensation inside the hip. Often shaky. Shaking is good — it means the small stabilisers are working, which is exactly the point.",
        wrong: "A sharp pinch at the front of the hip crease, or a clunk that repeats in the same spot. Shrink the circle until it is gone, then work there.",
        mistakes: [
          "Letting the body lean or the pelvis tip to squeeze out more range. If your torso moves, the circle is too big. Smaller circle, still body.",
          "Going fast. Ten seconds a circle. Count it out loud.",
          "Holding your breath. Breathe normally throughout."
        ],
        easier: "Hold the back of a chair with both hands and make the circle half the size.",
        harder: "Let go of the wall. Then, much later, do it without the standing knee bending.",
        why: "This is the single most valuable exercise in your programme. It trains active control at the edges of your hip range, and active control is what is actually missing when a kick feels like the hip is going to slip."
      },
      {
        n: "90/90 switches",
        setup: "Sit on the floor. Front leg bent 90 degrees in front of you, shin roughly parallel to your chest. Back leg bent 90 degrees out to the side, knee pointing away. Sit up tall — hands behind you on the floor is fine, and better than slumping.",
        doIt: "Lift both knees slightly, rotate through your hips and let both legs fall to the other side, so the front leg becomes the back leg. Land softly and sit tall again. Ten switches total, slowly.",
        feel: "A stretch on the outside of the front hip and the inside of the back thigh. Deep hip effort as you rotate through the middle.",
        wrong: "Knee pain on either side. The knee should never be the thing you feel — if it is, widen the angle so the knees are further from 90 degrees, and sit on a folded cushion.",
        mistakes: [
          "Rounding the back and collapsing forward. Sit on a cushion or a folded towel to lift your hips above your knees. This one change fixes it for most people.",
          "Dropping the legs and using momentum instead of controlling the movement.",
          "Forcing the chest toward the front knee. That is a different, more advanced version. Not yet."
        ],
        easier: "Sit on a firm cushion. Keep the hands on the floor behind you and make the angles wider than 90 degrees.",
        harder: "Hands off the floor, chest tall, and pause for two seconds at each side.",
        why: "This trains hip internal rotation, which is the exact motion ura mawashi geri needs and the exact motion you currently do not have. If you only had time for one mobility exercise, this would be it."
      },
      {
        n: "Cossack squat, chair-supported",
        setup: "Feet very wide, toes pointing slightly out. Hold the back of a chair with both hands.",
        doIt: "Shift your weight over to one side, bending that knee and letting the other leg straighten. Go down only as far as is comfortable, keeping the bent-side heel flat on the floor. Come back to the middle and go the other way. Eight each side.",
        feel: "A stretch along the inside of the straight leg, and work in the thigh and glute of the bent leg.",
        wrong: "The bent knee caving inward, or the straight-leg groin feeling sharp rather than stretched. Reduce the depth.",
        mistakes: [
          "Going too deep too early. A quarter of the way down is a completely legitimate starting point.",
          "Letting the heel lift. Depth stops where the heel would lift.",
          "Rounding the back. Chest stays up — hold the chair higher if it helps."
        ],
        easier: "Barely bend at all. Just shift side to side with straight-ish legs to feel the groin stretch.",
        harder: "One hand on the chair, then no hands, then a pause at the bottom.",
        why: "Adductor length in a loaded position. Tight adductors are one of the two reasons a roundhouse kick cannot come up cleanly."
      },
      {
        n: "Mawashi chamber hold",
        setup: "Start LYING ON YOUR SIDE, not standing. Bottom leg bent for stability, head resting on your arm, body in a straight line. This removes balance and the standing leg entirely, so all the effort goes into the hip you are actually training.",
        doIt: "Lift the top leg into the roundhouse chamber: knee bent and lifted toward the ceiling, heel tucked in close to your bottom, shin folded. Hold that shape for ten seconds without the knee dropping. Lower slowly. Three per side.",
        feel: "Working, slightly burning, on the outside and front of the hip. It is meant to be hard — but you should not be fighting for balance at the same time.",
        wrong: "Pinching at the front of the hip crease. Lower the knee and hold there instead. Lower back sensation means you are letting your body roll backward — keep the hips stacked.",
        mistakes: [
          "Going straight to the standing version. This is the exercise most people cannot do on day one, and the standing version adds balance and standing-leg fatigue on top of the actual work.",
          "Letting the knee drift down through the hold. Hold at a height you can genuinely keep for the full ten seconds, even if it is low.",
          "Rolling the body backward to lift the knee higher. Hips stay stacked; if you have to roll, the knee is too high."
        ],
        easier: "Five-second holds. Or hold with the knee only slightly lifted.",
        harder: "The progression, over weeks rather than days: lying on your side, then sitting tall on a chair lifting the knee into chamber, then standing with two hands on a chair back, then standing with one hand on a wall for fifteen seconds, and only then adding the slow extension and re-chamber.",
        why: "Kicking height is limited by strength at the top of your range far more often than by flexibility. This builds it directly — and building it lying down first means you can actually do the reps instead of wobbling through them."
      },
      {
        n: "Adductor rock-back",
        setup: "On hands and knees. Slide one leg straight out to the side, keeping that foot flat and the toes pointing forward. Hands under shoulders.",
        doIt: "Keeping your back flat, push your hips back toward your heel until you feel a stretch along the inside of the extended leg. Hold a beat, then come forward again. Ten slow reps, then swap sides.",
        feel: "A broad stretch along the inner thigh of the straight leg.",
        wrong: "Sharp pain high in the groin, or lower back pain. Reduce how far back you rock.",
        mistakes: [
          "Rounding the lower back to get further. The back stays flat — that is the limit of the movement.",
          "Holding it as a static stretch. Rocking in and out is the point; it is a moving stretch."
        ],
        easier: "Rock back a few centimetres only.",
        harder: "Pause three seconds at the back of each rep."
      }
    ],

    /* ---------------------------------------------------------------- */
    kihon: [
      {
        n: "Stance holds",
        setup: "Space to step. Bare feet or training shoes.",
        doIt: "Hold each for 30 seconds. Zenkutsu dachi: long front stance, front knee bent over the ankle, back leg straight, back foot flat and angled slightly out, roughly 70% of weight on the front. Kokutsu dachi: back stance, most of the weight on the bent back leg, front foot light, feet close to a straight line. Kiba dachi: horse stance, feet wide and parallel, knees pushed out over the feet, back upright.",
        feel: "Burning in the thighs. In kiba dachi, burning on the outside of the hips too — that is the muscle you need for kicking.",
        wrong: "Lower back arching or aching, especially in kiba dachi. Tuck the tailbone slightly and shorten the stance.",
        mistakes: [
          "Sinking so low the form breaks. A higher, correct stance is worth more than a deep, collapsed one.",
          "Back knee bent in zenkutsu dachi, or the back heel lifting.",
          "Knees rolling inward in kiba dachi. Actively push them out."
        ],
        easier: "15 seconds each, higher stances.",
        harder: "45 seconds, and step between the three without standing up in between."
      },
      {
        n: "Choku zuki from kiba dachi",
        setup: "Horse stance, both fists at your hips, palms up, elbows back.",
        doIt: "Punch straight forward from the hip along the centre line, rotating the fist so it lands palm-down. At the same moment, pull the other fist back to the hip hard — that pull is called hikite and it is half the technique. Twenty punches, alternating.",
        feel: "The pulling arm working as much as the punching arm. Shoulders staying down.",
        wrong: "Shoulder pinching. Do not overreach at the end — the punch stops where the arm is nearly straight, elbow soft.",
        mistakes: [
          "Locking the elbow hard at full extension. Stop just short.",
          "Letting the shoulder ride up toward your ear.",
          "Forgetting the hikite. Without it the punch has no snap.",
          "Letting the hips bounce. In this drill the stance stays completely still."
        ]
      },
      {
        n: "Oi zuki, stepping",
        setup: "Zenkutsu dachi, one leg forward.",
        doIt: "Step through into the other front stance and punch with the arm on the same side as the stepping leg, so the punch arrives exactly as the foot lands. Ten each side. Move the feet in an arc through the middle rather than a straight line, staying low the whole way.",
        feel: "The whole body arriving as one thing. If the punch lands after the foot, you are two things.",
        wrong: "Nothing specific to your injury here — but if your back complains, you are probably bobbing up and down. Stay level.",
        mistakes: [
          "Rising up between stances. Keep your head at the same height throughout.",
          "Punch and step at different times.",
          "Short, tentative steps. Commit to the full stance."
        ]
      },
      {
        n: "Gyaku zuki",
        setup: "Zenkutsu dachi, on guard.",
        doIt: "Punch with the rear hand, driving off the back foot and rotating the back hip forward, while the other fist pulls back to the hip. Ten each side.",
        feel: "Power starting in the back foot, travelling through the hip, arriving in the fist.",
        wrong: "Any pull in the lower back or a twinge in the front hip. Use less hip rotation for now — right now technique quality matters more than power.",
        mistakes: [
          "Punching with the arm only, hips dead.",
          "Over-rotating so the back heel lifts and the hip is forced past its comfortable range. Given your hip, deliberately stay short of maximum rotation for the next few weeks.",
          "Leaning the head forward with the punch."
        ]
      },
      {
        n: "Kizami zuki",
        setup: "Zenkutsu dachi, on guard, hands up.",
        doIt: "Snap the front hand straight out and back, a small forward shift of the front hip going with it. Ten each side. Fast out, faster back.",
        feel: "Light and quick. This is a jab — it is speed, not weight.",
        wrong: "—",
        mistakes: [
          "Leaving the hand out after the punch. The return is the technique.",
          "Dropping the rear guard hand while the front hand goes out.",
          "Telegraphing by drawing the hand back before punching."
        ]
      },
      {
        n: "Blocks: gedan barai, age uke, soto uke, uchi uke",
        setup: "Front stance, ten each side of each block.",
        doIt: "Gedan barai, downward sweep across the front of the body, ending above the front thigh. Age uke, rising block, forearm sweeping up in front of the forehead. Soto uke, from outside in, forearm coming across to the centre. Uchi uke, from inside out, forearm travelling from the opposite hip outward. Every one of them starts with the other arm crossed in front and ends with a hard hikite.",
        feel: "The blocking arm accelerating through, then stopping cleanly. Blocks stop, they do not drift.",
        wrong: "—",
        mistakes: [
          "No preparation position. The cross-arm start is where the power comes from.",
          "Blocking with the arm and leaving the body slack. The hips assist every block.",
          "Blocking too far from the body, leaving yourself open."
        ]
      }
    ],

    /* ---------------------------------------------------------------- */
    kicks: [
      {
        n: "Mae geri, 4-count",
        setup: "Beside a wall, one hand on it. Front stance or natural stance.",
        doIt: "Count out loud. One: lift the knee straight up toward the target, foot tucked. Two: extend the leg, striking with the ball of the foot, toes pulled back. Three: fold it back to the knee-up position. Four: place the foot down under control. Eight each side, waist to chest height.",
        feel: "Balanced and controlled. The re-chamber on count three should feel like the hardest part — that is normal and it is where the value is.",
        wrong: "Any pinch in the front of the hip. Lower the height.",
        mistakes: [
          "Skipping count three and letting the leg fall to the floor. This is the single biggest cause of hip and hamstring problems in beginner kicking. Never drop the leg.",
          "Kicking with the toes instead of the ball of the foot.",
          "Leaning the upper body back to get height. If you lean, the kick is too high for you today.",
          "Locking the knee at full extension."
        ],
        easier: "Knee-height kicks, both hands on the wall.",
        harder: "No wall, then a two-second hold at full extension before re-chambering."
      },
      {
        n: "Mawashi geri, 4-count",
        setup: "Beside a wall, hand on it.",
        doIt: "One: chamber — knee up and pointing across your body, heel tucked, shin folded. Two: pivot the standing foot so the heel turns toward the target and extend the leg in an arc, striking with the instep or the ball of the foot. Three: fold back to the chamber. Four: place down. Eight each side, waist to chest height only.",
        feel: "The pivot of the standing foot doing the work. If the standing foot does not turn, the hip has to force the rotation instead, which is exactly what your hip does not want.",
        wrong: "A pinch, clunk or unstable feeling in the kicking hip. Lower the height immediately and check the standing foot is actually pivoting.",
        mistakes: [
          "Not pivoting the standing foot. The most common beginner error and, for your hip, the most important one to fix.",
          "Kicking upward like a football kick instead of arcing across.",
          "Chambering with the knee pointing forward instead of across.",
          "Dropping the leg instead of re-chambering."
        ],
        easier: "Waist height with both hands on a chair back. Practise just the chamber and the pivot, no extension.",
        harder: "Chest height, no support, pause at extension.",
        why: "Roundhouse needs hip flexion, abduction and external rotation at the same time. Rushing the height is what makes hips complain."
      },
      {
        n: "Yoko geri keage",
        setup: "Side on to a wall, hand resting on it. Feet together or in kiba dachi.",
        doIt: "Lift the knee across the body, then snap the leg out to the side in a rising arc, striking with the outer edge of the foot. Snap it straight back to the chamber, then place down. Eight each side, hip height.",
        feel: "A snapping action, not a push. The edge of the foot leads.",
        wrong: "Pinching on the outside of the hip. Lower it.",
        mistakes: [
          "Leaning far away to get height. A small lean is part of the technique; folding sideways at the waist is not.",
          "Kicking with the sole or the toes rather than the foot edge.",
          "Turning it into a slow push instead of a snap."
        ],
        easier: "Hip height or lower with both hands supported."
      },
      {
        n: "Ura mawashi prep — knee height",
        setup: "Beside a wall, hand firmly on it. This one is deliberately the smallest, slowest thing you do all week.",
        doIt: "Lift the knee to about waist height, pointing slightly across your body. Extend the lower leg out and away from you, then hook it back in an arc across your body, striking with the heel or the sole. Bring it back to the chamber, then place down. Five each side at knee height, no power at all.",
        feel: "Rotation deep in the hip. This is the movement your hip currently does not have, so it will feel unfamiliar even when it is going well.",
        wrong: "Any pinch, catch or clunk. Stop that rep, lower the height, and if it repeats at the lowest height, leave this exercise out entirely and tell your physio at your next session.",
        mistakes: [
          "Attempting it at head or chest height because that is how it looks in videos. Knee height for weeks. This is not a slow route, it is the only route.",
          "Adding speed or power. Both come last, long after the range is comfortable.",
          "Doing it on a day the hip already feels off. Skip it."
        ],
        easier: "Do only the 90/90 switches instead for two more weeks, then come back to this.",
        harder: "Waist height, only after two full weeks of clean painless reps at knee height. Then add a few centimetres at a time.",
        why: "This kick needs hip internal rotation under load. You are building the range in 90/90 switches and the control in hip CARs — this is where you slowly cash both in."
      }
    ],

    /* ---------------------------------------------------------------- */
    kata: [
      {
        n: "Taikyoku / Heian shodan, slow",
        setup: "Enough space for the full pattern. Start in the correct ready position.",
        doIt: "Five complete run-throughs at about a third of normal speed. At this tempo you can actually check each stance depth, each hikite, each turn of the hips. Stop and restart if you lose the sequence.",
        feel: "Like a stance workout, because it is one.",
        wrong: "—",
        mistakes: [
          "Rushing to get through it. Slow kata is where technique is built; fast kata only performs what is already there.",
          "Letting stances get shallower as you tire. Stop and rest instead."
        ]
      },
      {
        n: "Same kata at speed",
        setup: "Only after the slow runs were clean.",
        doIt: "Two run-throughs at full speed with proper focus and stops.",
        feel: "Sharp starts and clean stops. Speed comes from relaxation between techniques, not from tension throughout.",
        wrong: "—",
        mistakes: ["Doing this first. If the slow version is not correct, speed just makes the mistakes permanent."]
      },
      {
        n: "Line drill: step, block, counter",
        setup: "A clear line of floor, four or five steps long.",
        doIt: "Step forward into front stance with a block, then counter with gyaku zuki. Continue down the line, turn, and come back. Ten each side.",
        feel: "The block and the step arriving together, then the counter as a separate committed action.",
        wrong: "—",
        mistakes: ["Blurring block and counter into one movement. Two distinct techniques.", "Standing up during the turn."]
      }
    ],

    /* ---------------------------------------------------------------- */
    core: [
      {
        n: "Dead bug",
        setup: "Lie on your back. Knees bent up over your hips at 90 degrees, arms straight up toward the ceiling. Before you move, flatten your lower back into the floor so there is no gap under it. Hold that.",
        doIt: "Slowly lower one arm overhead and the opposite leg toward the floor, straightening the leg as it goes. Stop while your lower back is still flat. Return, then do the other side. Eight each side.",
        feel: "Deep lower stomach working hard. That is the whole point.",
        wrong: "Your lower back lifting off the floor, or any lower back sensation at all. Both mean the leg went too far.",
        mistakes: [
          "Going too far. The moment the back arches, the exercise stops working your core and starts loading your spine. Small range is correct range.",
          "Holding the breath. Breathe out as the limbs go away from you.",
          "Rushing. Three seconds out, three seconds back."
        ],
        easier: "Move only the legs, keeping the arms still. Or keep the moving leg bent instead of straightening it.",
        harder: "Slower, with a two-second pause at the end of each rep.",
        why: "This teaches your core to hold the spine still while your arms and legs move — which is exactly what it has to do during a kick."
      },
      {
        n: "Bird dog",
        setup: "Hands and knees, hands under shoulders, knees under hips. Flatten the back so it is table-top level. Brace the stomach lightly.",
        doIt: "Reach one arm forward and the opposite leg back until both are level with your body, no higher. Hold two seconds, return with control. Eight each side.",
        feel: "Work through the whole back of the body and the side of the trunk fighting to stop you tipping.",
        wrong: "Lower back pinching. Usually because the leg is lifting too high.",
        mistakes: [
          "Lifting the leg above body height, which arches the back. Level is high enough.",
          "Rotating the hips open as the leg goes back. Keep both hip bones pointing at the floor.",
          "Rushing. If you wobble a lot, slow down rather than swing."
        ],
        easier: "Arm only, then leg only, before combining them.",
        harder: "Hold each rep for five seconds. Or balance a light object on your lower back and keep it there."
      },
      {
        n: "Side plank",
        setup: "On your side, elbow directly under the shoulder, forearm flat. Knees bent and stacked, or legs straight and feet stacked for the harder version.",
        doIt: "Lift your hips so your body makes a straight line from knees (or feet) through hips to shoulders. Hold 20 to 30 seconds each side.",
        feel: "Burning down the side of the trunk nearest the floor, and around the hip.",
        wrong: "Shoulder pain, or lower back pain from sagging.",
        mistakes: [
          "Hips sagging toward the floor as you tire. End the hold when the line breaks — a clean 15 seconds beats a collapsed 40.",
          "Rolling forward or backward. Hips stacked directly on top of each other.",
          "Shoulder collapsing into the joint. Push the floor away and keep space under the armpit."
        ],
        easier: "Knees bent. Then shorter holds.",
        harder: "Legs straight, then top arm reaching to the ceiling, then lift the top leg.",
        why: "The side of your trunk is what stops you folding sideways when you kick. Weak here shows up as leaning away to get height."
      },
      {
        n: "Glute bridge",
        setup: "Lie on your back, knees bent, feet flat, heels roughly a hand's length from your bottom. Arms by your sides.",
        doIt: "Tuck the tailbone slightly, then squeeze your glutes and lift your hips until your body is a straight line from knees to shoulders. Pause a second at the top, lower slowly. Twelve reps.",
        feel: "Your glutes doing the work. That is the test of this exercise.",
        wrong: "Feeling it mostly in your lower back or your hamstrings. Both mean the glutes are not switching on.",
        mistakes: [
          "Lifting too high and arching the back at the top. Stop at the straight line.",
          "Not tucking the tailbone first — that tuck is what makes the glutes fire instead of the back.",
          "Feet too far away, which turns it into a hamstring exercise. Bring them closer."
        ],
        easier: "Smaller lift, hold at the top for two seconds.",
        harder: "One leg at a time, with the other knee hugged to your chest.",
        why: "Weak glutes mean the lower back does their job. Given your history, this is one of the more important four minutes in your week."
      }
    ],

    /* ---------------------------------------------------------------- */
    strength: [
      {
        n: "Push-ups",
        setup: "Hands slightly wider than shoulders, fingers forward. Body in one line from head to heels (or head to knees). Brace the stomach and tuck the tailbone slightly so the hips do not sag.",
        doIt: "Lower with the elbows tracking back at about 45 degrees from the body, not flared straight out to the sides. Go down until your chest is a fist's height from the floor, then press up. Three sets, stopping two reps before you would fail.",
        feel: "Chest, front of the shoulders, and triceps. Stomach working to hold the line.",
        wrong: "Front-of-shoulder pinching means the elbows are flaring too wide. Lower back aching means the hips are sagging.",
        mistakes: [
          "Hips sagging or piking up. The body is one plank.",
          "Elbows flared to 90 degrees, which is what makes shoulders sore.",
          "Half reps. A smaller number of full-range reps builds more.",
          "Going to failure every set. Leaving two reps in the tank lets you train again in two days."
        ],
        easier: "Hands on a table, then a chair, then the floor with knees down. Incline push-ups are a real exercise, not a lesser one.",
        harder: "Slow the lowering to three seconds. Then feet elevated."
      },
      {
        n: "Dead hang",
        setup: "A bar you can hang from with feet clear of the floor, or with legs bent if the bar is low. Overhand grip, hands shoulder-width.",
        doIt: "Hang with the arms straight but the shoulders active — not slumped up around your ears. Think of gently pulling your shoulder blades down. Hold as long as you can with good position. Three sets, building toward 45 seconds.",
        feel: "Grip burning first, then lats and shoulders. A pleasant lengthening through the spine.",
        wrong: "Sharp shoulder pain, or any lower back pain. Stop.",
        mistakes: [
          "Hanging completely passively with shoulders jammed up. Some passive hang is fine, but keep the shoulders engaged for most of it.",
          "Dropping off the bar suddenly. Step down under control.",
          "Testing your maximum every session. Stop each set with a few seconds still in you."
        ],
        easier: "Feet on the floor or a box, taking some weight. Or shorter holds.",
        harder: "Longer holds, then one hand lighter than the other.",
        why: "Grip and shoulder strength are the base of a pull-up, and hanging is generally well tolerated by backs. Mention it to your physio anyway."
      },
      {
        n: "Scapular pulls",
        setup: "Hanging from the bar, arms straight, shoulders relaxed upward at the start.",
        doIt: "Without bending your elbows at all, pull your shoulder blades down and together so your whole body rises two or three centimetres. Hold one second, then let the shoulders rise back up slowly. Three sets of six.",
        feel: "Muscles under and around the shoulder blades switching on. It is a tiny movement — two or three centimetres is a full rep.",
        wrong: "Elbows bending. Then it is a partial pull-up, not this exercise.",
        mistakes: [
          "Trying to move too far. This is the smallest exercise in the programme.",
          "Bending the arms.",
          "Rushing. One second up, two seconds down."
        ],
        easier: "Feet lightly on the floor to reduce load.",
        harder: "Pause three seconds at the top of each rep.",
        why: "Almost everyone who cannot do a pull-up cannot initiate it from the shoulder blades. This is the missing piece, not arm strength."
      },
      {
        n: "Negative pull-up",
        setup: "Jump, or step from a chair, so you start at the top of a pull-up with your chin over the bar and elbows bent.",
        doIt: "Lower yourself as slowly as you can — aim for five seconds — until your arms are straight. Step or drop off, reset, repeat. Three sets of three.",
        feel: "Serious work in the back, arms and grip. Expect to be sore for a day or two the first week.",
        wrong: "Elbow pain, or shoulders shrugging up hard at the bottom. Shorten the range.",
        mistakes: [
          "Dropping fast. The slow lowering is the entire exercise — a three-second descent beats ten fast ones.",
          "Doing them when the grip is already exhausted from hangs. Do negatives before hangs if you are fading.",
          "Adding more sets. Three sets of three is enough at this stage."
        ],
        easier: "Lower for three seconds. Or use a band, or keep one foot lightly on a chair.",
        harder: "Eight-second descents, then band-assisted full pull-ups, then the real thing."
      }
    ],

    /* ---------------------------------------------------------------- */
    cooldown: [
      {
        n: "Physio's set — 7 second holds",
        setup: "As prescribed.",
        doIt: "Their programme, before your own stretches. Same 7-second holds.",
        feel: "Mild and specific.",
        wrong: "—",
        mistakes: ["Stretching them out to 30 seconds because the ones below are longer. Theirs stay at 7."]
      },
      {
        n: "Supine hamstring with a towel",
        setup: "Lie on your back. Loop a towel or belt around the arch of one foot. Other knee bent, that foot flat on the floor. Lower back pressed gently into the floor.",
        doIt: "Raise the towel leg toward the ceiling with the knee slightly bent — never locked. Pull gently with the towel until you feel a broad stretch down the back of the thigh. Hold 40 seconds, breathing out slowly. Swap sides.",
        feel: "A wide stretch through the belly of the hamstring, mid-thigh.",
        wrong: "A sharp or pulling feeling right up under the sitting bone, or anything electric or tingling down the leg. Ease off immediately — that is not a hamstring stretch and it is not something to push through.",
        mistakes: [
          "Locking the knee straight. Keep a soft bend; it protects the tendon at the top.",
          "Letting the lower back arch off the floor.",
          "Standing toe touches instead of this. Never — that is the position that hurt your back."
        ],
        easier: "Keep the other knee bent and the range smaller.",
        harder: "Straighten the resting leg along the floor."
      },
      {
        n: "Half-kneeling hip flexor",
        setup: "Kneel on one knee, other foot flat in front, both knees at about 90 degrees. Put a cushion under the down knee.",
        doIt: "Before moving forward: squeeze the glute of the kneeling-side leg and tuck your tailbone under, as if pointing it at the floor. You should already feel the stretch at the front of that hip. Only then shift your weight slightly forward. Hold 40 seconds each side.",
        feel: "A stretch across the front of the hip and the top of the thigh of the kneeling leg.",
        wrong: "Feeling it in your lower back instead of your hip. That means the tailbone is not tucked and you are arching to fake range.",
        mistakes: [
          "Lunging forward without tucking the tailbone first. This is the mistake almost everyone makes, and it stretches the lower back instead of the hip.",
          "Leaning the torso forward. Stay upright, ribs down.",
          "Pushing far forward. With a correct tuck you barely need to move at all."
        ],
        easier: "Do the tuck and squeeze only, with no forward shift.",
        harder: "Raise the arm on the kneeling side overhead and lean slightly away.",
        why: "Tight hip flexors pull the pelvis into a forward tilt, which is the position that stresses a lower back. This one directly addresses the setup that caused your problem."
      },
      {
        n: "Figure-4 glute stretch, lying",
        setup: "Lie on your back, knees bent, feet flat. Cross one ankle over the opposite knee to make a figure 4.",
        doIt: "Reach through the gap and hold behind the thigh of the bottom leg. Pull it gently toward your chest until you feel a stretch in the buttock of the crossed leg. Hold 40 seconds each side.",
        feel: "Deep in the buttock and the outside of the hip.",
        wrong: "Pinching at the front of the crossed hip. Do not pull as far, and let the crossed knee open more.",
        mistakes: [
          "Pulling the head and shoulders off the floor. Keep the head down.",
          "Forcing the crossed knee down with a hand. Let it settle on its own."
        ],
        easier: "Do it seated on a chair, ankle across the opposite knee, leaning forward gently with a flat back."
      },
      {
        n: "Butterfly, gentle",
        setup: "Sit with the soles of your feet together, knees out to the sides. Sit on a cushion so your hips are above your knees.",
        doIt: "Rest your hands on your ankles, sit tall, and let gravity do the work. Hold 60 seconds. If you want more, hinge forward from the hips with a flat back — a small amount.",
        feel: "A broad stretch through the inner thighs and groin.",
        wrong: "Pinching at the front of the hip crease or the knees. Move your feet further away from your body.",
        mistakes: [
          "Pushing the knees down with your elbows or hands. Never. This is exactly the kind of forced stretching that caused your back injury.",
          "Rounding the back to lean forward. If the back rounds, you have gone past the useful range.",
          "Bouncing."
        ],
        easier: "Feet much further from the body, sitting on a higher cushion or against a wall."
      },
      {
        n: "Calf stretch at a wall",
        setup: "Hands on a wall, one foot back, that heel flat on the floor, toes pointing straight at the wall.",
        doIt: "Keep the back leg straight and lean toward the wall until you feel the stretch in the upper calf. Hold 30 seconds. Then bend the back knee slightly while keeping the heel down — that moves the stretch lower, into the Achilles. Another 30 seconds. Swap sides.",
        feel: "Upper calf on the straight-leg version; low near the heel on the bent-knee version. You need both.",
        wrong: "Sharp pain in the Achilles tendon itself. Ease off.",
        mistakes: [
          "Letting the back heel lift. If it lifts, bring the foot closer to the wall.",
          "Letting the back foot turn outward. Toes point at the wall.",
          "Skipping this now that you are running. Calves and Achilles take the biggest new load from running, and this is what keeps them happy."
        ]
      },
      {
        n: "Supported leg hold at a wall",
        setup: "Stand side-on to a wall, a door frame, or a low ledge. Rest the inside of your ankle or heel on it at a height where you feel MILD tension — waist height or lower to start. Not the highest you can reach.",
        doIt: "Turn your standing foot out slightly, the way it pivots in mawashi geri, and turn your body to match. Stand tall and hold for 30 seconds, breathing out slowly. Swap sides.",
        feel: "A broad stretch down the inside of the raised leg and through the groin. Steady and unremarkable — it should not build or bite.",
        wrong: "Pinching at the front of the hip crease. That is the joint, not a muscle. Come down at once and rest the foot lower.",
        mistakes: [
          "Chasing height. The point is a comfortable held position, not a personal best. Waist height done well beats chest height done by cheating.",
          "Letting the standing-side hip hike up to buy extra height. Keep the pelvis level — if one hip rides up, the stretch has become a spine problem.",
          "Doing it cold, before training. This belongs in the cool-down, when you are warm.",
          "Having a partner hold the leg instead of a wall. Never. A partner cannot feel your hip, and forced partner stretching is exactly what injured your back."
        ],
        easier: "Rest the foot on a chair seat instead of a wall, and stand further back.",
        harder: "A few centimetres higher, and only when the current height is completely comfortable across several sessions.",
        why: "A gentle passive stretch is a useful extra, but it is the smaller half of the job. Your kicks are limited more by control than by length, so the 90/90 switches and the chamber holds stay the main work and this rounds it off."
      }
    ],

    /* ---------------------------------------------------------------- */
    easyrun: [
      {
        n: "Walk or jog to start",
        setup: "Outside, shoes on, before you have looked at your watch.",
        doIt: "Three minutes of walking building to a very slow jog. Let your legs come up to speed rather than starting at your target pace.",
        feel: "Sluggish. That is what the first three minutes are supposed to feel like.",
        wrong: "—",
        mistakes: ["Starting at pace from the front door. It is the fastest route to shin and calf trouble in new runners."]
      },
      {
        n: "Easy run",
        setup: "Any route. Flat is better than hilly at this stage.",
        doIt: "Five kilometres at 6:30 to 7:00 per kilometre. Check your pace occasionally; check your breathing constantly.",
        feel: "Easy enough to say a full sentence out loud without gasping. That test beats any watch — if you cannot pass it, slow down regardless of what the pace says.",
        wrong: "Hip pain that builds through the run, or any lower back pain. Walk home and note it.",
        mistakes: [
          "Running it at 5:30 because it feels lazy. This is the mistake that stalls almost everyone at 24 minutes. Easy days build the engine; hard days only test it.",
          "Chasing a faster time every week. The easy run is not a test.",
          "Comparing this pace to your 5k pace and feeling bad. They are different jobs."
        ],
        why: "Around 80% of all running by people who get fast is done at this kind of easy pace. Nearly all of the aerobic adaptation you need for a sub-20 5k comes from here, not from intervals."
      },
      {
        n: "Walk it out, don't stop dead",
        setup: "The last three minutes.",
        doIt: "Walk, do not sit or stand still immediately. Then straight into your cool-down stretches while you are still warm.",
        feel: "Heart rate coming down gradually.",
        wrong: "—",
        mistakes: ["Sitting down straight after finishing, then stretching cold twenty minutes later."]
      }
    ],

    /* ---------------------------------------------------------------- */
    teamrun: [
      {
        n: "Physio's set before the team warm-up",
        setup: "Before you join in.",
        doIt: "Your 7-second holds, then whatever warm-up the team does.",
        feel: "—",
        wrong: "—",
        mistakes: ["Skipping it because the team is already starting. Arrive five minutes early instead."]
      },
      {
        n: "The lap session",
        setup: "Whatever the team does — 2 slow, 1 fast, 2 slow, 1 fast, 3 slow, 1 fast.",
        doIt: "Run the fast laps around 5:00 to 5:15 per kilometre — strong and controlled, not a sprint. Run the slow laps genuinely slowly; they are recovery, not filler.",
        feel: "The fast laps should feel hard but repeatable — you should finish each one believing you could do another. If the last fast lap is much slower than the first, you started too hard.",
        wrong: "Hip pain during the fast laps. Sit out the remaining fast laps and jog the slow ones.",
        mistakes: [
          "Sprinting the fast laps. A sprint is a different training effect and a much higher injury risk.",
          "Running the slow laps at medium pace to keep up socially. That turns the whole session into one long medium effort, which trains very little.",
          "Adding another hard session elsewhere in the week. This is your one hard day."
        ]
      },
      {
        n: "Cool-down walk",
        setup: "After the last lap.",
        doIt: "Five minutes of walking, then your stretches.",
        feel: "—",
        wrong: "—",
        mistakes: ["Going straight home. The cool-down matters more after the hard session than after the easy one."]
      }
    ],

    /* ---------------------------------------------------------------- */
    longrun: [
      {
        n: "Walk or jog to start",
        setup: "Five minutes, same as the easy run but longer.",
        doIt: "Walk into a jog, patiently.",
        feel: "—",
        wrong: "—",
        mistakes: ["Starting fast because you feel fresh. You have a long way to go."]
      },
      {
        n: "Long run, conversational",
        setup: "A route you can shorten if you need to.",
        doIt: "Build toward 7 km at 6:40 to 7:10 per kilometre. Only add distance if last week's felt comfortable, and add roughly 10% at a time — about half a kilometre a week.",
        feel: "Comfortable for the first two thirds, honest work in the last third. Never a struggle.",
        wrong: "Hip or back pain at any point. Walk. Distance is not worth a setback.",
        mistakes: [
          "Jumping the distance because the weather is good. The 10% rule exists because tendons and bones adapt slower than lungs do.",
          "Running it at easy-run pace or faster. Long runs are slower than easy runs, not the same.",
          "Doing the long run the day after the team session. Keep a day between them."
        ],
        why: "The long run is where the aerobic base gets built and where your legs learn to keep good form while tired. It is the run that will eventually make sub-20 possible."
      },
      {
        n: "Walk it out",
        setup: "Five minutes.",
        doIt: "Walk, then stretch while warm. Eat something with carbohydrate and protein within an hour.",
        feel: "—",
        wrong: "—",
        mistakes: ["Skipping the cool-down after the longest run of your week."]
      }
    ],

    /* ---------------------------------------------------------------- */
    dojo: [
      {
        n: "Physio's set before class",
        setup: "Before the class warm-up.",
        doIt: "Your 7-second holds.",
        feel: "—",
        wrong: "—",
        mistakes: ["Arriving with no time to do them."]
      },
      {
        n: "Class",
        setup: "Your normal class.",
        doIt: "Train normally, with two exceptions you hold to regardless of what the group is doing: nothing above chest height, and no partner-assisted stretching.",
        feel: "—",
        wrong: "If a drill hurts your hip or back, step out of that drill. You do not owe anyone an explanation beyond that you are under a physio's care.",
        mistakes: [
          "Accepting a partner stretch because it would be awkward to refuse. This is what caused your back injury. Say no.",
          "Matching the height of kicks around you.",
          "Not telling your instructor. Tell them once, clearly, and they will usually adapt the drill for you."
        ]
      },
      {
        n: "Physio's set after class",
        setup: "Before you leave, or as soon as you get home.",
        doIt: "Their set, then your own longer holds.",
        feel: "—",
        wrong: "—",
        mistakes: ["Doing them the next morning instead. Warm tissue responds better."]
      }
    ]
  }
};
