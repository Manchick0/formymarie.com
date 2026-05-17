import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

import first from "../assets/sheet/first.png";
import second from "../assets/sheet/second.png";
import third from "../assets/sheet/third.png";
import fourth from "../assets/sheet/fourth.png";

gsap.registerPlugin(SplitText);
const content = new SplitText(".letter", { type: "chars" });
const timeline = gsap.timeline();

timeline
    .from(".letter", {
        duration: 0.5,
        backgroundImage: () => `url(${first})`,
    })
    .to(".letter", {
        duration: 0.5,
        backgroundImage: () => `url(${second})`,
    })
    .to(".letter", {
        duration: 0.5,
        backgroundImage: () => `url(${third})`,
    })
    .to(".letter", {
        duration: 0.5,
        backgroundImage: () => `url(${fourth})`,
    })
    .from(content.chars, {
        duration: 0.05,
        opacity: 0,
        stagger: 0.1,
    });
