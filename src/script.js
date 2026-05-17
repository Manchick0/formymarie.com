import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

import first from "../assets/sheet/first.png";
import second from "../assets/sheet/second.png";
import third from "../assets/sheet/third.png";
import fourth from "../assets/sheet/fourth.png";

gsap.registerPlugin(SplitText);
const letter = document.querySelector(".letter");
const background = document.querySelector(".letter-background");
const content = new SplitText(letter, { type: "chars" });
const timeline = gsap.timeline();

timeline
    .to(background, {
        duration: 0.25,
        attr: {
            src: first,
        },
    })
    .to(background, {
        duration: 0.25,
        attr: {
            src: second,
        },
    })
    .to(background, {
        duration: 0.25,
        attr: {
            src: third,
        },
    })
    .to(background, {
        duration: 0.25,
        attr: {
            src: fourth,
        },
    })
    .from(content.chars, {
        duration: 0.05,
        opacity: 0,
        stagger: 0.1,
    });
