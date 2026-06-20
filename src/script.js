import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

import first from "../assets/sheet/first.png";
import second from "../assets/sheet/second.png";
import third from "../assets/sheet/third.png";
import fourth from "../assets/sheet/fourth.png";

const interactions = new Map([
    [
        "cookie",
        () => {
            const state = localStorage.getItem("cookies");
            const cookie = document.querySelector(".cookie");
            const tableau = document.querySelector(".tableau");
            let amount = state ? Number.parseInt(state) : 0;
            cookie.addEventListener("click", () => {
                tableau.innerText = `${++amount}`;
                localStorage.setItem("cookies", `${amount}`);
            });
            tableau.innerText = `${amount}`;
        },
    ],
]);

gsap.registerPlugin(SplitText);

class Letter {
    initializeTemplate(identifier) {
        const self = document.querySelector(".letter-content");
        const background = document.querySelector(".letter-background");
        const template = document.querySelector(
            `template.${CSS.escape(identifier)}`,
        );
        if (template) {
            const timeline = gsap.timeline();
            const content = template.content.cloneNode(true);
            self.replaceChildren(content);
            background.src = first;
            timeline
                .to(background, {
                    duration: 0.25,
                    onComplete: () => (background.src = second),
                })
                .to(background, {
                    duration: 0.25,
                    onComplete: () => (background.src = third),
                })
                .to(background, {
                    duration: 0.25,
                    onComplete: () => (background.src = fourth),
                })
                .set(self, { display: "flex" });
            this.animateContent(self, timeline);
            console.log(`Successfully initialized template '${identifier}'`);
            return;
        }
        console.error(
            `Attempted to display an unrecognized template '${identifier}'.`,
        );
    }

    animateContent(letter, timeline) {
        for (const child of letter.children) {
            const numb = child.hasAttribute("data-numb");
            if (numb) {
                timeline.from(child, {
                    duration: 0.25,
                    opacity: 0,
                    y: `+=50`,
                });
                continue;
            }
            const split = SplitText.create(child, {
                type: "chars",
                smartWrap: true,
            });
            for (let i = 0; i < split.chars.length; i++) {
                const element = split.chars[i];
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
        }
    }
}

class Calendar {
    static self = document.querySelector(".calendar");

    initializeEntries() {
        const entries = Calendar.self.querySelectorAll(".calendar-entry");
        for (const entry of entries) {
            const interaction = entry.getAttribute("data-interaction");
            const template = entry.getAttribute("data-template");
            const delayed = entry.hasAttribute("data-delayed");
            if (delayed) {
                entry.addEventListener("click", () => {
                    letter.initializeTemplate("delayed");
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                    });
                });
                entry.classList.add("delayed");
                continue;
            }
            if (template) {
                entry.onclick = () => {
                    letter.initializeTemplate(template);
                    if (interaction) interactions.get(interaction)();
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                    });
                };
                if (interaction) entry.classList.add("interactive");
                continue;
            }
            entry.classList.add("inactive");
        }
        console.log("Successfully initalized the calendar entries!");
    }

    initializeQuickScroll() {
        const scroller = document.querySelector(".calendar-scroller");
        scroller.addEventListener("click", () => {
            Calendar.self.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        });
        console.log("Successfully initalized the quick scroll!");
    }
}

const letter = new Letter();
const calendar = new Calendar();

window.addEventListener("load", () => letter.initializeTemplate("greeting"));
calendar.initializeEntries();
calendar.initializeQuickScroll();
