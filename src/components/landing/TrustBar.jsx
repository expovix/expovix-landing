import { useEffect, useRef } from "react";

const logos = [
"World Expo Group",
"ExCeL London",
"Messe Frankfurt",
"Fira Barcelona",
"Singapore Expo",
"Reed Exhibitions",
"Tokyo Big Sight",
"Informa Markets",
"University of London",
"Stanford School",
"MIT Expo Center"];


export default function TrustBar() {
  const ref = useRef(null);
  const x = useRef(0);
  const raf = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    const step = () => {
      x.current -= 0.5;
      if (Math.abs(x.current) >= half) x.current = 0;
      el.style.transform = `translateX(${x.current}px)`;
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const doubled = [...logos, ...logos];

  return (
    <section className="bg-white border-y border-gray-100 py-4 overflow-hidden">
      <p className="text-center text-[13px] font-inter text-[#0D0D0D] mb-6">
        Trusted by <span className="font-semibold text-[hsl(var(--foreground))]">2,400+</span> Event Organizers Worldwide
      </p>
      <div className="relative">
        <div ref={ref} className="flex items-center gap-0 w-max">
          {doubled.map((name, i) =>
          <div key={i} className="flex items-center">
              <span className="text-[14px] font-inter font-semibold text-[#0D0D0D] tracking-tight whitespace-nowrap px-8">
                {name}
              </span>
              <div className="w-px h-5 bg-gray-200 flex-shrink-0" />
            </div>
          )}
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
    </section>);

}