gsap.to("#planet4", {
  rotation: -5,
  yoyo: true,
  repeat: -1,
  duration: 1,
  ease: "sine.inOut",
  transformOrigin: "50% 50%",
});

gsap.fromTo(
  "#stars g, #flash, #flash1",
  { opacity: 0 },
  {
    opacity: 1,
    rotation: "random(-1,1)",
    transformOrigin: "50% 50%",
    yoyo: true,
    repeat: -1,
    ease: "circ.inOut",
    duration: 1,
  }
);

gsap.fromTo(
  "#small-cloud",
  {
    x: "40px",
  },
  { x: "-70px", repeat: -1, yoyo: true, ease: "ease.inOut", duration: 1 }
);

gsap.fromTo(
  "#right-cloud",
  { x: "-80px" },
  { x: "0px", repeat: -1, yoyo: true, ease: "ease.inOut", duration: 1 }
);

gsap.fromTo("#error-404",{
  y: "-=20px",
  x: "-=20px",
  opacity: "0.5"
},{
  opacity: "1",
  y: "+=20px",
  x: "+=20",
  repeat: -1,
  duration: 2,
  yoyo: true,
  ease: "ease.inOut",
  delay: 1
});
