import { useEffect, useRef } from 'react';

type Props = { words: string[]; className?: string };

// SEO terms laid out on a slowly turning sphere (Fibonacci spiral so they
// space evenly), drawn on a canvas. Decorative only: pauses off-screen and
// in background tabs, and renders a still frame for reduced-motion users.
export default function KeywordGlobe({ words, className = '' }: Props): JSX.Element {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !words.length) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const font = getComputedStyle(document.documentElement).getPropertyValue('--font-poppins') || 'sans-serif';
    const n = words.length;
    const points = words.map((text, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      return { text, x: Math.cos(theta) * r, y, z: Math.sin(theta) * r, big: i % 4 === 0 };
    });

    let w = 0;
    let h = 0;
    let angle = 0.6;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const radius = Math.min(w * 0.3, h * 0.4);
      const tilt = -0.35;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);
      const projected = points.map((p) => {
        const x1 = p.x * cosA + p.z * sinA;
        const z1 = -p.x * sinA + p.z * cosA;
        const y2 = p.y * cosT - z1 * sinT;
        const z2 = p.y * sinT + z1 * cosT;
        const scale = 2.6 / (2.6 - z2);
        return { ...p, sx: w / 2 + x1 * radius * scale, sy: h / 2 + y2 * radius * scale, z: z2, scale };
      });
      projected.sort((a, b) => a.z - b.z);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      projected.forEach((p) => {
        const depth = (p.z + 1) / 2; // 0 = back, 1 = front
        const size = (p.big ? 17 : 12.5) * p.scale;
        ctx.font = `${p.big ? 600 : 400} ${size.toFixed(1)}px ${font}`;
        ctx.fillStyle = p.big
          ? `rgba(238, 187, 195, ${(0.18 + depth * 0.8).toFixed(3)})`
          : `rgba(184, 193, 236, ${(0.1 + depth * 0.6).toFixed(3)})`;
        ctx.fillText(p.text, p.sx, p.sy);
      });
    };

    const loop = () => {
      angle += 0.0032;
      draw();
      frame = visible ? requestAnimationFrame(loop) : 0;
    };

    resize();
    draw();
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);

    let io: IntersectionObserver | undefined;
    const onVisibility = () => {
      visible = !document.hidden && visible;
      if (!document.hidden && !frame && !reduce) frame = requestAnimationFrame(loop);
    };
    if (!reduce) {
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting && !document.hidden;
        if (visible && !frame) frame = requestAnimationFrame(loop);
      });
      io.observe(canvas);
      document.addEventListener('visibilitychange', onVisibility);
    }

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [words]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
