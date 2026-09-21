"use client";

import { useEffect, useRef } from "react";

const VIDEO_WIDTH = 1280;
const VIDEO_HEIGHT = 720;
/* Доля высоты кадра, которую занимает радиус сферы в исходном ролике. */
const SPHERE_RADIUS_RATIO = 0.228;
const SPLASH_COUNT = 168;

type ParticleKind = "spark" | "splash" | "ember";

type Particle = {
  angle: number;
  dist: number;
  speed: number;
  size: number;
  life: number;
  maxLife: number;
  kind: ParticleKind;
  drift: number;
  stretch: number;
};

const mediaClass =
  "absolute inset-0 h-full w-full object-contain brightness-[1.18] contrast-[1.08] saturate-[1.2] motion-reduce:hidden";

function hash(n: number) {
  const s = Math.sin(n * 127.1) * 43758.5453123;
  return s - Math.floor(s);
}

function noise(v: number) {
  const i = Math.floor(v);
  const f = v - i;
  const u = f * f * (3 - 2 * f);
  return hash(i) * (1 - u) + hash(i + 1) * u;
}

function containRect(containerW: number, containerH: number) {
  const scale = Math.min(containerW / VIDEO_WIDTH, containerH / VIDEO_HEIGHT);
  const w = VIDEO_WIDTH * scale;
  const h = VIDEO_HEIGHT * scale;
  return {
    x: (containerW - w) / 2,
    y: (containerH - h) / 2,
    w,
    h,
  };
}

function boltPoints(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  segs: number,
  amp: number,
  time: number,
  seed: number
) {
  const pts: { x: number; y: number }[] = [];
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;

  for (let i = 0; i <= segs; i += 1) {
    const t = i / segs;
    const envelope = Math.sin(Math.PI * t);
    const n =
      (noise(t * 7.5 + time * 1.55 + seed) - 0.5) * 0.72 +
      (noise(t * 19 + time * 3.4 + seed * 2.1) - 0.5) * 0.28;
    const offset = n * amp * envelope;
    pts.push({
      x: x0 + dx * t + nx * offset,
      y: y0 + dy * t + ny * offset,
    });
  }

  return pts;
}

function strokeBolt(
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number }[],
  alpha: number,
  scale: number
) {
  if (points.length < 2 || alpha <= 0.02) return;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }

  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  ctx.strokeStyle = `rgba(255, 48, 24, ${0.18 * alpha})`;
  ctx.lineWidth = 16 * scale;
  ctx.stroke();

  ctx.strokeStyle = `rgba(255, 92, 36, ${0.38 * alpha})`;
  ctx.lineWidth = 8 * scale;
  ctx.stroke();

  ctx.strokeStyle = `rgba(255, 168, 92, ${0.7 * alpha})`;
  ctx.lineWidth = 3.2 * scale;
  ctx.stroke();

  ctx.strokeStyle = `rgba(255, 248, 236, ${0.95 * alpha})`;
  ctx.lineWidth = 1.25 * scale;
  ctx.stroke();
}

function spawnParticle(radius: number, clusteredAngle?: number): Particle {
  const kindRoll = Math.random();
  const kind: ParticleKind = kindRoll < 0.5 ? "spark" : kindRoll < 0.82 ? "splash" : "ember";
  const angle =
    clusteredAngle == null ? Math.random() * Math.PI * 2 : clusteredAngle + (Math.random() - 0.5) * 0.55;
  const maxLife = kind === "splash" ? 0.7 + Math.random() * 0.55 : 0.9 + Math.random() * 1.15;

  return {
    angle,
    dist: radius * (0.9 + Math.random() * 0.14),
    speed: (kind === "splash" ? 78 : 52) + Math.random() * (kind === "ember" ? 38 : 90),
    size: kind === "splash" ? 2.4 + Math.random() * 3.2 : 0.8 + Math.random() * 2.1,
    life: maxLife,
    maxLife,
    kind,
    drift: (Math.random() - 0.5) * 0.7,
    stretch: 2.2 + Math.random() * 3.4,
  };
}

function drawParticle(
  ctx: CanvasRenderingContext2D,
  particle: Particle,
  cx: number,
  cy: number,
  scale: number
) {
  const fade = Math.max(0, particle.life / particle.maxLife);
  const x = cx + Math.cos(particle.angle) * particle.dist;
  const y = cy + Math.sin(particle.angle) * particle.dist;
  const size = particle.size * scale;

  if (particle.kind === "splash") {
    const dx = Math.cos(particle.angle);
    const dy = Math.sin(particle.angle);
    ctx.beginPath();
    ctx.moveTo(x - dx * size * particle.stretch, y - dy * size * particle.stretch);
    ctx.lineTo(x + dx * size * particle.stretch * 1.4, y + dy * size * particle.stretch * 1.4);
    ctx.strokeStyle = `rgba(255, ${110 + fade * 80}, 70, ${0.55 * fade})`;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x + dx * size * 1.6, y + dy * size * 1.6, size * 0.85, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 210, 160, ${0.65 * fade})`;
    ctx.fill();
    return;
  }

  const glow = particle.kind === "ember" ? 10 * scale : 5 * scale;
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, size + glow);
  gradient.addColorStop(0, `rgba(255, 236, 210, ${0.9 * fade})`);
  gradient.addColorStop(0.35, `rgba(255, 92, 40, ${0.55 * fade})`);
  gradient.addColorStop(1, "rgba(255, 40, 16, 0)");
  ctx.beginPath();
  ctx.arc(x, y, size + glow, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
}

export function HeroSphereVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncRate = () => {
      video.playbackRate = 1;
    };

    syncRate();
    video.addEventListener("playing", syncRate);
    return () => {
      video.removeEventListener("playing", syncRate);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const particles: Particle[] = [];
    let raf = 0;
    let last = performance.now();
    let burstIn = 0.35;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawLightning = (cx: number, cy: number, radius: number, time: number, scale: number) => {
      const reach = radius * 1.78;
      const pulse =
        0.42 +
        0.58 * (0.5 + 0.5 * Math.sin(time * 1.05)) * (0.55 + 0.45 * Math.sin(time * 0.37 + 1.2));

      const main = boltPoints(cx - reach, cy, cx + reach, cy, 28, 18 * scale, time, 3.2);
      strokeBolt(ctx, main, pulse, scale);

      const upper = boltPoints(
        cx - reach * 0.92,
        cy - radius * 0.08,
        cx + reach * 0.94,
        cy + radius * 0.04,
        22,
        14 * scale,
        time * 1.08,
        8.1
      );
      strokeBolt(ctx, upper, pulse * 0.62, scale * 0.82);

      const lower = boltPoints(
        cx - reach * 0.88,
        cy + radius * 0.07,
        cx + reach * 0.9,
        cy - radius * 0.03,
        20,
        12 * scale,
        time * 0.92,
        12.4
      );
      strokeBolt(ctx, lower, pulse * 0.5, scale * 0.75);

      const branchAt = [0.22, 0.38, 0.62, 0.78];
      for (let i = 0; i < branchAt.length; i += 1) {
        const t = branchAt[i];
        const origin = main[Math.round(t * (main.length - 1))];
        if (!origin) continue;
        const dir = i % 2 === 0 ? -1 : 1;
        const length = radius * (0.28 + 0.12 * noise(time + i));
        const branch = boltPoints(
          origin.x,
          origin.y,
          origin.x + Math.cos(dir * 0.7 + t) * length,
          origin.y + dir * length * (0.45 + 0.25 * noise(time * 0.8 + i * 3)),
          10,
          8 * scale,
          time * 1.3,
          20 + i
        );
        strokeBolt(ctx, branch, pulse * 0.55, scale * 0.7);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const time = now / 1000;

      if (width === 0 || height === 0) resize();

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      const frame = containRect(width, height);
      const cx = frame.x + frame.w / 2;
      const cy = frame.y + frame.h / 2;
      const radius = frame.h * SPHERE_RADIUS_RATIO;
      const scale = Math.max(0.55, frame.h / VIDEO_HEIGHT);

      burstIn -= dt;
      if (burstIn <= 0) {
        const cluster = Math.random() * Math.PI * 2;
        const extra = 18 + Math.floor(Math.random() * 10);
        for (let i = 0; i < extra; i += 1) particles.push(spawnParticle(radius, cluster));
        if (particles.length > SPLASH_COUNT + 90) particles.length = SPLASH_COUNT + 90;
        burstIn = 0.55 + Math.random() * 0.7;
      }

      while (particles.length < SPLASH_COUNT) particles.push(spawnParticle(radius));

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        particle.life -= dt;
        particle.dist += particle.speed * dt;
        particle.angle += particle.drift * dt * 0.28;
        if (particle.kind === "splash") particle.speed *= 1 - dt * 0.35;
        if (particle.kind === "ember") particle.dist += dt * 8;

        if (particle.life <= 0 || particle.dist > radius * 2.35) {
          particles[i] = spawnParticle(radius);
          continue;
        }

        if (particle.dist > radius * 0.86) drawParticle(ctx, particle, cx, cy, scale);
      }

      drawLightning(cx, cy, radius, time, scale);
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(tick);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    raf = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative min-h-[260px] w-full sm:min-h-[340px] lg:h-full lg:min-h-[520px]">
      <video
        ref={videoRef}
        className={mediaClass}
        width={1280}
        height={720}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/media/hero-sphere-poster.jpg"
        aria-hidden
      >
        <source src="/media/hero-sphere.mp4" type="video/mp4" />
      </video>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full motion-reduce:hidden"
        aria-hidden
      />
      <img
        src="/media/hero-sphere-poster.jpg"
        alt=""
        className="absolute inset-0 hidden h-full w-full object-contain brightness-[1.18] contrast-[1.08] saturate-[1.2] motion-reduce:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-12 bg-gradient-to-r from-navy to-transparent lg:block"
        aria-hidden
      />
    </div>
  );
}
