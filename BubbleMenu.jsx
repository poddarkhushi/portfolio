import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function BubbleMenu({
  logo,
  items = [],
  menuAriaLabel = "Toggle menu",
  menuBg = "#fff",
  menuContentColor = "#111",
  useFixedPosition = true,
  animationEase = "back.out(1.5)",
  animationDuration = 0.4,
  staggerDelay = 0.08
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);

  const DEFAULT_ITEMS = [
    { label: "home", href: "#hero" },
    { label: "about", href: "#about" },
    { label: "projects", href: "#projects" },
    { label: "contact", href: "#contact" }
  ];

  const menuItems = items.length ? items : DEFAULT_ITEMS;

  const containerClassName = [
    "bubble-menu",
    useFixedPosition ? "fixed" : "absolute",
    "top-6 left-1/2 -translate-x-1/2",
    "flex items-center justify-between",
    "gap-4 px-4",
    "pointer-events-auto",
    "z-[2000]"
  ].join(" ");

  const toggleMenu = () => {
    const next = !isMenuOpen;
    if (next) setShowOverlay(true);
    setIsMenuOpen(next);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: "flex" });
      gsap.set(bubbles, { scale: 0 });
      gsap.set(labels, { y: 10, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        gsap.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase,
          delay: i * staggerDelay
        });

        gsap.to(labels[i], {
          y: 0,
          autoAlpha: 1,
          duration: animationDuration * 0.8,
          ease: "power3.out",
          delay: i * staggerDelay + 0.05
        });
      });
    } else if (showOverlay) {
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: "power3.in"
      });

      gsap.to(labels, {
        y: 10,
        autoAlpha: 0,
        duration: 0.2
      });

      setTimeout(() => {
        gsap.set(overlay, { display: "none" });
        setShowOverlay(false);
      }, 200);
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* TOP BAR */}
      <nav className={containerClassName}>
        {/* LOGO BUBBLE */}
        <div
          className="rounded-full shadow-md flex items-center justify-center h-12 w-12 text-black font-semibold"
          style={{ background: menuBg }}
        >
          {logo}
        </div>

        {/* TOGGLE BUTTON */}
        <button
          className="h-12 w-12 rounded-full bg-white shadow-md flex items-center justify-center"
          onClick={toggleMenu}
          aria-label={menuAriaLabel}
        >
          <div className="flex flex-col gap-1">
            <span
              className="block h-[2px] w-6 rounded bg-black transition"
              style={{
                transform: isMenuOpen ? "rotate(45deg) translateY(5px)" : "none"
              }}
            ></span>
            <span
              className="block h-[2px] w-6 rounded bg-black transition"
              style={{
                transform: isMenuOpen ? "rotate(-45deg) translateY(-5px)" : "none"
              }}
            ></span>
          </div>
        </button>
      </nav>

      {/* OVERLAY MENU */}
      {showOverlay && (
        <div
          ref={overlayRef}
          className="fixed inset-0 flex flex-col items-center justify-center gap-4 z-[1900]"
          style={{
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(6px)"
          }}
        >
          {menuItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="rounded-full bg-white text-black font-medium shadow-md flex items-center justify-center"
              style={{
                minHeight: 60,
                padding: "0.75rem 2rem",
                fontSize: "1.1rem",
                borderRadius: 9999
              }}
              ref={(el) => (bubblesRef.current[i] = el)}
            >
              <span ref={(el) => (labelRefs.current[i] = el)}>{item.label}</span>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
