
/* =========================================================
   PORTFOLIO JAVASCRIPT
   Mobile navigation, footer year, and interactive flip cards
   ========================================================= */

(() => {
    "use strict";

    /* ===== MOBILE NAVIGATION MENU ===== */

    const toggle = document.querySelector(".menu-toggle");
    const links = document.querySelector(".nav-links");

    if (toggle && links) {
        toggle.addEventListener("click", () => {
            const isOpen =
                toggle.getAttribute("aria-expanded") === "true";

            toggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            toggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Open navigation menu"
                    : "Close navigation menu"
            );

            links.classList.toggle("open", !isOpen);
        });

        // Close the mobile menu after clicking a navigation link
        links.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                links.classList.remove("open");

                toggle.setAttribute("aria-expanded", "false");
                toggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });
        });
    }

    /* ===== AUTOMATIC COPYRIGHT YEAR ===== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    /* ===== INTERACTIVE PROJECT FLIP CARDS ===== */

    document.querySelectorAll(".flip-card").forEach((card, index) => {
        // Make cards accessible using a keyboard
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "group");

        card.setAttribute(
            "aria-label",
            `Project card ${index + 1}. Press Enter or Space to flip.`
        );

        card.setAttribute("aria-expanded", "false");

        /* Flip back button */

        const flipBackButton =
            card.querySelector(".flip-back-btn");

        if (flipBackButton) {
            flipBackButton.setAttribute("type", "button");

            flipBackButton.addEventListener("click", (event) => {
                event.stopPropagation();

                card.classList.remove("is-flipped");

                card.setAttribute("aria-expanded", "false");
            });
        }

        /* Function to flip the card */

        function toggleCard() {
            const flipped =
                card.classList.toggle("is-flipped");

            card.setAttribute(
                "aria-expanded",
                String(flipped)
            );
        }

        /* Flip when clicking the card */

        card.addEventListener("click", (event) => {
            // Keep links and buttons working normally
            if (event.target.closest("a, button")) {
                return;
            }

            toggleCard();
        });

        /* Keyboard support: Enter and Space */

        card.addEventListener("keydown", (event) => {
            // Ignore keyboard events originating inside other elements
            if (event.target !== card) {
                return;
            }

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                toggleCard();
            }
        });
    });

})();
