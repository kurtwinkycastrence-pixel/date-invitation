document.addEventListener("DOMContentLoaded", function () {

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    const hint = document.getElementById("hint");

    const invitationCard =
        document.getElementById("invitationCard");

    const successCard =
        document.getElementById("successCard");

    let noClicks = 0;

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

        noClicks++;

        const messageIndex =
            Math.min(
                noClicks - 1,
                messages.length - 1
            );

        hint.textContent =
            messages[messageIndex];


        /* Make YES button bigger */

        if (noClicks >= 3) {

            yesBtn.style.transform =
                "scale(1.08)";
        }


        if (noClicks >= 5) {

            yesBtn.innerHTML =
                "YES PLEASE! 💖";

            yesBtn.style.transform =
                "scale(1.15)";
        }


        /* Make NO button escape */

        if (noClicks < 8) {

            moveNoButton();
        }


        /* Eventually remove NO */

        if (noClicks >= 8) {

            noBtn.style.display =
                "none";

            hint.textContent =
                "Hehehe... I knew you'd say yes. 💗🎀";
        }

    });


    /* =========================
       MOVE NO BUTTON
    ========================= */

    function moveNoButton() {

        const buttons =
            document.querySelector(".buttons");

        const buttonWidth =
            noBtn.offsetWidth;

        const containerWidth =
            buttons.offsetWidth;

        const maxX =
            Math.max(
                20,
                (containerWidth - buttonWidth) / 2
            );

        const randomX =
            Math.random() *
            (maxX * 2) -
            maxX;

        const randomY =
            Math.random() * 70 -
            35;

        noBtn.style.transform =
            "translate(" +
            randomX +
            "px, " +
            randomY +
            "px)";
    }


    /* =========================
       YES BUTTON
    ========================= */

    yesBtn.addEventListener("click", function () {

        invitationCard.style.display =
            "none";

        successCard.style.display =
            "block";

        document.body.style.overflow =
            "auto";

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

