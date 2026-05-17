import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);
const letter = new SplitText(".letter", { type: "chars" });
const timeline = gsap.timeline();

timeline
    .to(".letter", {
        duration: 0.5,
        backgroundImage: () => 'url("assets/sheets/first.png")',
    })
    .to(".letter", {
        duration: 0.5,
        backgroundImage: () => 'url("assets/sheets/second.png")',
    })
    .to(".letter", {
        duration: 0.5,
        backgroundImage: () => 'url("assets/sheets/third.png")',
    })
    .to(".letter", {
        duration: 0.5,
        backgroundImage: () => 'url("assets/sheets/fourth.png")',
    })
    .from(letter.chars, {
        duration: 0.05,
        opacity: 0,
        stagger: 0.1,
    });
