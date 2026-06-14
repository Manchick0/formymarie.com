import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

import first from "../assets/sheet/first.png";
import second from "../assets/sheet/second.png";
import third from "../assets/sheet/third.png";
import fourth from "../assets/sheet/fourth.png";

gsap.registerPlugin(SplitText);

class Letter {
    static self = document.querySelector(".letter-content");
    static background = document.querySelector(".letter-background");

    #split;

    initializeTemplate(identifier) {
        const template = document.querySelector(`.${CSS.escape(identifier)}`);
        if (template) {
            if (this.#split) this.#split.revert();
            const content = template.content.cloneNode(true);
            Letter.self.replaceChildren(content);
            Letter.background.src = first;
            this.#split = SplitText.create(Letter.self, {
                type: "chars",
                smartWrap: true,
            });
            const timeline = gsap.timeline();
            timeline
                .to(Letter.background, {
                    duration: 0.25,
                    onComplete: () => (Letter.background.src = second),
                })
                .to(Letter.background, {
                    duration: 0.25,
                    onComplete: () => (Letter.background.src = third),
                })
                .to(Letter.background, {
                    duration: 0.25,
                    onComplete: () => (Letter.background.src = fourth),
                })
                .set(Letter.self, { display: "flex" });
            for (let i = 0; i < this.#split.chars.length; i++) {
                const element = this.#split.chars[i];
                const content = element.innerText;
                timeline.from(element, {
                    duration: 0.1,
                    opacity: 0,
                    y: `+=${Math.floor(Math.random() * 5) + 2}`,
                });
                if (
                    content === "." ||
                    content === "?" ||
                    content === "!" ||
                    content === ";"
                ) {
                    timeline.from({}, { duration: 0.5 });
                    continue;
                }
                if (content === "," || content === "—") {
                    timeline.from({}, { duration: 0.1 });
                    continue;
                }
            }
            console.log(
                `Successfully initialized the template '${identifier}'`,
            );
            return;
        }
        console.error(
            `Attempted to display an unrecognized template '${identifier}'.`,
        );
    }
}

class Calendar {
    static self = document.querySelector(".calendar");

    inititalizeEntries() {
        const entries = Calendar.self.querySelectorAll(".calendar-entry");
        for (const entry of entries) {
            const template = entry.getAttribute("data-template");
            if (template) {
                entry.onclick = () => {
                    letter.initializeTemplate(template);
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                    });
                };
                continue;
            }
            entry.classList.add("inactive");
        }
        console.log("Successfully initalized the calendar entries!");
    }

    inititalizeQuickScroll() {
        const scroller = document.querySelector(".calendar-scroller");
        scroller.onclick = () => {
            Calendar.self.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        };
        console.log("Successfully initalized the quick scroll!");
    }
}

const letter = new Letter();
const calendar = new Calendar();

window.addEventListener("load", () => letter.initializeTemplate("greeting"));
calendar.inititalizeEntries();
calendar.inititalizeQuickScroll();
