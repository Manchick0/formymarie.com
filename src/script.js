import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

import second from "../assets/sheet/second.png";
import third from "../assets/sheet/third.png";
import fourth from "../assets/sheet/fourth.png";

gsap.registerPlugin(SplitText);

const background = document.querySelector(".letter-background");
const content = document.querySelector(".letter-content");
const split = new SplitText(content, { type: "chars", smartWrap: true });

window.addEventListener("load", () => {
    const timeline = gsap.timeline();
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
        .set(content, { display: "flex" })
        .from(split.chars, {
            duration: 0.05,
            opacity: 0,
            stagger: 0.1,
        });
});
