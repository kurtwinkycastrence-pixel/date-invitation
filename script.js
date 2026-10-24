document.addEventListener("DOMContentLoaded", function () {

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const continueBtn = document.getElementById("continueBtn");

    const hint = document.getElementById("hint");

    const invitationCard =
        document.getElementById("invitationCard");

    const questionsCard =
        document.getElementById("questionsCard");

    const successCard =
        document.getElementById("successCard");

    const dateValue = document.getElementById("dateValue");
    const timeValue = document.getElementById("timeValue");
    const placeValue = document.getElementById("placeValue");
    const dateStyleValue = document.getElementById("dateStyleValue");
    const outfitValue = document.getElementById("outfitValue");
    const celebrationValue = document.getElementById("celebrationValue");

    let noClicks = 0;
    let audioContext;

    function playButtonSound(notes) {
        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) {
            return;
        }

        if (!audioContext) {
            audioContext = new AudioContextClass();
        }

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        const startTime = audioContext.currentTime;

        notes.forEach(function (note) {
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();
            const noteStart = startTime + note.delay;
            const noteEnd = noteStart + note.duration;

            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(note.frequency, noteStart);
            gain.gain.setValueAtTime(0.0001, noteStart);
            gain.gain.exponentialRampToValueAtTime(0.12, noteStart + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);
            oscillator.connect(gain);
            gain.connect(audioContext.destination);
            oscillator.start(noteStart);
            oscillator.stop(noteEnd);
        });
    }

    const messages = [
        "Are you sure? 🥺",
        "Really really sure? 😭",
        "Think again pretty please? 🎀",
        "You might regret that answer... 👀",
        "The YES button looks kinda cute tho... 💗",
        "I'll keep asking hehe 😭💕",
        "One more chance? 🌷",
        "I know you want to say YES! 😭💗"
    ];


    /* =========================
       NO BUTTON
    ========================= */

    noBtn.addEventListener("click", function () {

        playButtonSound([
            { frequency: 560, duration: 0.16, delay: 0 },
            { frequency: 360, duration: 0.2, delay: 0.08 }
        ]);

        noClicks++;

        const messageIndex =
            Math.min(
                noClicks - 1,
                messages.length - 1
            );

        hint.textContent =
            messages[messageIndex];

        const buttons =
            document.querySelector("#invitationCard .buttons");
        buttons.classList.add("no-clicked");

        const desiredScale = Math.pow(1.35, noClicks);
        const yesScale = Math.min(
            desiredScale,
            (window.innerWidth * 0.65) / yesBtn.offsetWidth,
            (window.innerHeight * 0.55) / yesBtn.offsetHeight
        );

        yesBtn.style.transform =
            "translateX(-50%) scale(" + yesScale + ")";

        if (noClicks >= 5) {

            yesBtn.innerHTML =
                "YES PLEASE! 💖";
        }


        /* Make NO button escape */

        if (noClicks >= 10) {
            noBtn.style.display =
                "none";

            hint.textContent =
                "Hehehe... I knew you'd say yes. 💗🎀";
        } else {
            moveNoButton();
        }

    });


    /* =========================
       MOVE NO BUTTON
    ========================= */

    function moveNoButton() {
        const yesRect = yesBtn.getBoundingClientRect();
        const noWidth = noBtn.offsetWidth;
        const noHeight = noBtn.offsetHeight;
        const margin = 12;
        const gap = 10;
        const maxLeft = window.innerWidth - noWidth - margin;
        const maxTop = window.innerHeight - noHeight - margin;
        const positions = [
            { left: yesRect.right + gap, top: yesRect.top + (yesRect.height - noHeight) / 2 },
            { left: yesRect.left - noWidth - gap, top: yesRect.top + (yesRect.height - noHeight) / 2 },
            { left: yesRect.left + (yesRect.width - noWidth) / 2, top: yesRect.bottom + gap },
            { left: yesRect.left + (yesRect.width - noWidth) / 2, top: yesRect.top - noHeight - gap }
        ].map(function (position) {
            return {
                left: Math.max(margin, Math.min(position.left, maxLeft)),
                top: Math.max(margin, Math.min(position.top, maxTop))
            };
        }).filter(function (position) {
            return position.left + noWidth <= yesRect.left ||
                position.left >= yesRect.right ||
                position.top + noHeight <= yesRect.top ||
                position.top >= yesRect.bottom;
        });

        if (positions.length > 0) {
            const position = positions[Math.floor(Math.random() * positions.length)];
            noBtn.style.left = position.left + "px";
            noBtn.style.top = position.top + "px";
        }
    }

    /* =========================
       YES BUTTON
    ========================= */

    yesBtn.addEventListener("click", function () {

        playButtonSound([
            { frequency: 523.25, duration: 0.18, delay: 0 },
            { frequency: 659.25, duration: 0.18, delay: 0.12 },
            { frequency: 783.99, duration: 0.28, delay: 0.24 }
        ]);

        invitationCard.style.display =
            "none";

        questionsCard.style.display =
            "block";

        document.body.style.overflow =
            "auto";

    });

    document.querySelectorAll(".answer-option").forEach(function (option) {
        option.addEventListener("click", function () {
            const group = option.dataset.group;
            const parent = option.closest(".mini-question");
            const options = parent.querySelectorAll(".answer-option");

            options.forEach(function (item) {
                item.classList.remove("selected");
            });

            option.classList.add("selected");

            if (group === "date") {
                dateValue.textContent = option.dataset.value;
            }

            if (group === "vibe") {
                dateStyleValue.textContent = option.dataset.value;
            }

            if (group === "place") {
                placeValue.textContent = option.dataset.value;
            }

            if (group === "theme") {
                outfitValue.textContent = option.dataset.value;
            }

            if (group === "plan") {
                celebrationValue.textContent = option.dataset.value;
            }
        });
    });

    continueBtn.addEventListener("click", function () {
        timeValue.textContent = "1:00 PM";

        questionsCard.style.display = "none";
        successCard.style.display = "block";
        createConfetti();
    });


    /* =========================
       CONFETTI
    ========================= */

    function createConfetti() {

        const symbols = [
            "💗",
            "💕",
            "💖",
            "🎀",
            "🌸",
            "✨",
            "🌷",
            "💐",
            "💞"
        ];

        for (let i = 0; i < 100; i++) {

            const piece =
                document.createElement("div");

            piece.className =
                "confetti";

            piece.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];

            piece.style.left =
                Math.random() * 100 +
                "vw";

            piece.style.fontSize =
                15 +
                Math.random() * 22 +
                "px";

            piece.style.animationDuration =
                2 +
                Math.random() * 3 +
                "s";

            piece.style.animationDelay =
                Math.random() * 1.5 +
                "s";

            document.body.appendChild(piece);

            setTimeout(function () {

                piece.remove();

            }, 6000);
        }
    }

});
