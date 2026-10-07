import './App.css';
import { useState, useRef } from "react";
import gsap from "gsap";
import pink from './assets/pink.png';
import oreo from './assets/oreo.png';
import brown from './assets/brown.png';

const donuts = [
  {
    id: "strawberry",
    name: "Strawberry Bliss",
    desc: "Light ring donut topped with rich strawberry frosting & rainbow crunch sprinkles",
    color: "#FDE2E4",
    accent: "#E63946",
    shadowColor: "rgba(230, 57, 70, 0.65)",
    image: pink,
  },
  {
    id: "chocolate",
    name: "Chocolate Velvet",
    desc: "Classic raised donut drizzled in deep dark chocolate frosting & rainbow crunch",
    color: "#E2ECE9",
    accent: "#5C3D2E",
    shadowColor: "rgba(92, 61, 46, 0.7)", // Dark Brown Radial Shadow
    image: brown,
  },
  {
    id: "oreo",
    name: "Oreo Crunch",
    desc: "Decadent dark chocolate glazed donut loaded with crushed Oreo cookies & cream drizzle",
    color: "#E5E5E5",
    accent: "#1E1E24",
    shadowColor: "rgba(0, 0, 0, 0.75)", // Dark Black Radial Shadow
    image: oreo,
  },
];

export default function DonutHero() {
  const [active, setActive] = useState(0);
  const container = useRef();
  const bigDonutRef = useRef();
  const textRef = useRef();
  const glowRef = useRef();

  const changeDonut = (index) => {
    if (index === active) return;

    const next = donuts[index];
    const tl = gsap.timeline();

    // 1. Text animate out
    tl.to(textRef.current.children, {
      y: 30,
      opacity: 0,
      stagger: 0.04,
      duration: 0.35,
      ease: "power3.in"
    })
    // 2. Main Donut & Glow scale down
    .to(bigDonutRef.current, {
      scale: 0.4,
      rotation: -120,
      y: 80,
      opacity: 0,
      duration: 0.45,
      ease: "power3.in",
      onComplete: () => setActive(index)
    }, "<")
    .to(glowRef.current, {
      scale: 0.3,
      opacity: 0,
      duration: 0.45,
      ease: "power3.in"
    }, "<")
    // 3. Background morphing
    .to(container.current, {
      backgroundColor: next.color,
      duration: 0.6,
      ease: "power2.inOut"
    }, "<")
    // 4. Main Donut & Glow enters
    .fromTo(bigDonutRef.current,
      { scale: 0.4, rotation: 120, y: -80, opacity: 0 },
      { scale: 1, rotation: 0, y: 0, opacity: 1, duration: 0.7, ease: "back.out(1.5)" }
    )
    .fromTo(glowRef.current,
      { scale: 0.3, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: "power2.out" },
      "-=0.7"
    )
    // 5. Text animates back in
    .fromTo(textRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out" },
      "-=0.4"
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-sans selection:bg-pink-300">
      
      {/* Dynamic Background Container */}
      <div 
        ref={container} 
        className="min-h-screen transition-colors duration-500 flex flex-col justify-between"
        style={{ backgroundColor: donuts[active].color }}
      >
        
        {/* Transparent Aesthetic Navbar */}
        <header className="w-full relative z-30 pt-6 px-6 md:px-16">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <a href="#" className="flex items-center gap-2 group focus:outline-none">
              <span className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 font-serif italic">
                Donut<span className="text-rose-500 not-italic font-sans">.</span>Diary
              </span>
            </a>

            <ul className="hidden md:flex items-center gap-10 font-semibold text-sm tracking-wide text-slate-800/80">
              <li><a href="#" className="hover:text-slate-950 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-slate-950 transition-colors">Flavors</a></li>
              <li><a href="#" className="hover:text-slate-950 transition-colors">Our Story</a></li>
            </ul>

            <button 
              style={{ backgroundColor: donuts[active].accent }}
              className="text-white px-7 py-2.5 rounded-full text-sm font-semibold tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Order Online
            </button>
          </nav>
        </header>

        {/* Hero Section Content */}
        <main className="max-w-7xl mx-auto w-full px-6 md:px-16 py-8 flex flex-col lg:flex-row items-center justify-between gap-12 my-auto">
          
          {/* Left Text Block */}
          <div ref={textRef} className="z-10 max-w-lg text-center lg:text-left">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/50 backdrop-blur-md text-slate-800 mb-4 shadow-sm">
              Freshly Baked Daily
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
              {donuts[active].name}
            </h1>

            <p className="mt-5 text-slate-700 text-base md:text-lg font-medium leading-relaxed opacity-85 max-w-md mx-auto lg:mx-0">
              {donuts[active].desc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-8">
              <button 
                style={{ backgroundColor: donuts[active].accent }}
                className="text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                Buy Now
              </button>
              <button className="bg-white/40 hover:bg-white/60 backdrop-blur-md border border-slate-900/10 text-slate-900 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all shadow-sm">
                Explore Menu
              </button>
            </div>

            {/* Aesthetic Flavor Selector */}
            <div className="mt-12">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-800/60 mb-3 text-center lg:text-left">
                Select Flavor:
              </p>
              
              <div className="flex items-center justify-center lg:justify-start gap-3">
                {donuts.map((d, i) => {
                  const isSelected = i === active;
                  return (
                    <button 
                      key={d.id} 
                      onClick={() => changeDonut(i)}
                      className={`relative flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-300 backdrop-blur-md cursor-pointer ${
                        isSelected 
                          ? "bg-white shadow-xl scale-105 z-10 text-slate-900" 
                          : "bg-white/30 hover:bg-white/50 text-slate-700 scale-95 opacity-80"
                      }`}
                    >
                      <img 
                        src={d.image} 
                        alt={d.name}
                        className={`w-8 h-8 object-contain transition-transform duration-300 ${
                          isSelected ? "scale-125 rotate-12" : ""
                        }`} 
                      />
                      <span className="text-xs font-bold tracking-wide">
                        {d.name.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Hero Image Block with Reference-style Dark Radial Shadow */}
          <div className="relative flex items-center justify-center w-full lg:w-1/2">
            
            {/* EXACT REFERENCE MATCH: Dark Soft Radial Shadow Ring behind Donut */}
            <div 
              ref={glowRef}
              className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full transition-all duration-500 -z-0"
              style={{
                background: `radial-gradient(circle, ${donuts[active].shadowColor} 0%, rgba(0,0,0,0.15) 55%, transparent 75%)`,
                filter: "blur(25px)",
              }}
            />

            {/* Main Donut Image */}
            <img 
              ref={bigDonutRef} 
              src={donuts[active].image}
              alt={donuts[active].name}
              className="w-72 h-72 sm:w-96 sm:h-96 lg:w-[460px] lg:h-[460px] object-contain relative z-10 select-none drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]" 
            />

          </div>

        </main>

        <footer className="w-full text-center py-4 text-xs font-medium text-slate-800/40">
          © {new Date().getFullYear()} Donut Diary. All rights reserved.
        </footer>
      </div>
    </div>
  );
}