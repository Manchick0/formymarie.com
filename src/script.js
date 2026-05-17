import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

import first from "../assets/sheet/first.png";
import second from "../assets/sheet/second.png";
import third from "../assets/sheet/third.png";
import fourth from "../assets/sheet/fourth.png";

gsap.registerPlugin(SplitText);
const letter = document.querySelector(".letter");
const content = new SplitText(letter, { type: "chars" });
const timeline = gsap.timeline();

timeline
    .set(letter, {
        backgroundImage: `url(${first})`,
    })
    .to(letter, {
        duration: 0.5,
        onComplete: () => (letter.style.backgroundImage = `url(${second})`),
    })
    .to(letter, {
        duration: 0.5,
        onComplete: () => (letter.style.backgroundImage = `url(${third})`),
    })
    .to(letter, {
        duration: 0.5,
        onComplete: () => (letter.style.backgroundImage = `url(${fourth})`),
    })
    .from(content.chars, {
        duration: 0.05,
        opacity: 0,
        stagger: 0.1,
    });
