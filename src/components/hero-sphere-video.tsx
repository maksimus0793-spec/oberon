"use client";

import { useEffect, useRef } from "react";

const VIDEO_WIDTH = 1280;
const VIDEO_HEIGHT = 720;
/* Радиус видимой сферы относительно высоты исходного кадра. */
const SPHERE_RADIUS_RATIO = 0.304;
const SPLASH_COUNT = 240;

type ParticleKind = "spark" | "splash" | "ember";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  kind: ParticleKind;
  stretch: number;
  spin: number;
};

const mediaClass =
  "absolute inset-0 h-full w-full object-contain object-center brightness-[1.18] contrast-[1.08] saturate-[1.2] motion-reduce:hidden";

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
      (noise(t * 2.8 + time * 0.38 + seed) - 0.5) * 0.84 +
      (noise(t * 7.1 + time * 0.72 + seed * 1.7) - 0.5) * 0.16;
    const offset = n * amp * envelope;
    pts.push({
      x: x0 + dx * t + nx * offset,
      y: y0 + dy * t + ny * offset,
    });
  }

  return pts;
}

function strokeBoltPath(ctx: CanvasRenderingContext2D, points: { x: number; y: number }[]) {
  if (points.length < 2) return;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  if (points.length === 2) {
    ctx.lineTo(points[1].x, points[1].y);
    return;
  }

  for (let i = 1; i < points.length - 1; i += 1) {
    const midX = (points[i].x + points[i + 1].x) / 2;
    const midY = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
  }

  const last = points[points.length - 1];
  ctx.lineTo(last.x, last.y);
}

function strokeBolt(
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number }[],
  alpha: number,
  scale: number
) {
  if (points.length < 2 || alpha <= 0.02) return;

  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  strokeBoltPath(ctx, points);
  ctx.strokeStyle = `rgba(255, 42, 18, ${0.16 * alpha})`;
  ctx.lineWidth = 7.5 * scale;
  ctx.stroke();

  strokeBoltPath(ctx, points);
  ctx.strokeStyle = `rgba(255, 118, 48, ${0.42 * alpha})`;
  ctx.lineWidth = 2.6 * scale;
  ctx.stroke();

  strokeBoltPath(ctx, points);
  ctx.strokeStyle = `rgba(255, 236, 214, ${0.92 * alpha})`;
  ctx.lineWidth = 0.9 * scale;
  ctx.stroke();
}

function spawnParticle(cx: number, cy: number, radius: number, clusteredAngle?: number): Particle {
  const kindRoll = Math.random();
  const kind: ParticleKind = kindRoll < 0.62 ? "splash" : kindRoll < 0.86 ? "spark" : "ember";
  const angle =
    clusteredAngle == null ? Math.random() * Math.PI * 2 : clusteredAngle + (Math.random() - 0.5) * 0.42;
  const dist = radius * (0.96 + Math.random() * 0.08);
  const outward = (kind === "splash" ? 70 : 44) + Math.random() * (kind === "ember" ? 36 : 78);
  const tangent = (Math.random() - 0.5) * (kind === "splash" ? 38 : 22);
  const maxLife = kind === "splash" ? 0.85 + Math.random() * 0.7 : 1.05 + Math.random() * 1.15;

  return {
    x: cx + Math.cos(angle) * dist,
    y: cy + Math.sin(angle) * dist,
    vx: Math.cos(angle) * outward + Math.cos(angle + Math.PI / 2) * tangent,
    vy: Math.sin(angle) * outward + Math.sin(angle + Math.PI / 2) * tangent,
    size: kind === "splash" ? 2.1 + Math.random() * 3.6 : 0.7 + Math.random() * 2,
    life: maxLife,
    maxLife,
    kind,
    stretch: 2.6 + Math.random() * 3.8,
    spin: (Math.random() - 0.5) * 1.4,
  };
}

function drawParticle(ctx: CanvasRenderingContext2D, particle: Particle, scale: number) {
  const t = Math.max(0, particle.life / particle.maxLife);
  const fade = Math.sin(Math.PI * t);
  const size = particle.size * scale;
  const speed = Math.hypot(particle.vx, particle.vy) || 1;
  const dx = particle.vx / speed;
  const dy = particle.vy / speed;

  if (particle.kind === "splash") {
    const tail = size * particle.stretch * (0.7 + 0.6 * fade);
    ctx.beginPath();
    ctx.moveTo(particle.x - dx * tail, particle.y - dy * tail);
    ctx.lineTo(particle.x + dx * tail * 0.55, particle.y + dy * tail * 0.55);
    ctx.strokeStyle = `rgba(255, ${120 + fade * 90}, 78, ${0.58 * fade})`;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(particle.x + dx * size, particle.y + dy * size, size * 0.95, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 214, 168, ${0.7 * fade})`;
    ctx.fill();
    return;
  }

  const glow = particle.kind === "ember" ? 11 * scale : 5.5 * scale;
  const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, size + glow);
  gradient.addColorStop(0, `rgba(255, 236, 210, ${0.88 * fade})`);
  gradient.addColorStop(0.34, `rgba(255, 92, 40, ${0.5 * fade})`);
  gradient.addColorStop(1, "rgba(255, 40, 16, 0)");
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, size + glow, 0, Math.PI * 2);
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
    let burstIn = 0.18;
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
      const reach = radius * 2.92;
      const pulse = 0.7 + 0.3 * (0.5 + 0.5 * Math.sin(time * 0.72)) * (0.65 + 0.35 * Math.sin(time * 0.31 + 0.8));

      const main = boltPoints(cx - reach, cy, cx + reach, cy, 32, 13 * scale, time, 3.2);
      strokeBolt(ctx, main, pulse, scale);

      const upper = boltPoints(
        cx - reach * 0.96,
        cy - radius * 0.05,
        cx + reach * 0.98,
        cy + radius * 0.03,
        24,
        9 * scale,
        time * 0.94 + 0.4,
        8.1
      );
      strokeBolt(ctx, upper, pulse * 0.48, scale * 0.72);

      const lower = boltPoints(
        cx - reach * 0.9,
        cy + radius * 0.045,
        cx + reach * 0.93,
        cy - radius * 0.025,
        22,
        8 * scale,
        time * 0.88 + 1.1,
        12.4
      );
      strokeBolt(ctx, lower, pulse * 0.36, scale * 0.64);

      const branchAt = [0.14, 0.24, 0.76, 0.86];
      for (let i = 0; i < branchAt.length; i += 1) {
        const t = branchAt[i];
        const origin = main[Math.round(t * (main.length - 1))];
        if (!origin) continue;
        const dir = i % 2 === 0 ? -1 : 1;
        const side = t < 0.5 ? -1 : 1;
        const length = radius * (0.42 + 0.18 * noise(time * 0.45 + i));
        const branch = boltPoints(
          origin.x,
          origin.y,
          origin.x + side * length * 0.85,
          origin.y + dir * length * (0.38 + 0.22 * noise(time * 0.5 + i * 3)),
          9,
          6 * scale,
          time * 0.8,
          20 + i
        );
        strokeBolt(ctx, branch, pulse * 0.42, scale * 0.58);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
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
      const maxDist = radius * 2.15;

      burstIn -= dt;
      if (burstIn <= 0) {
        const cluster = Math.random() * Math.PI * 2;
        const extra = 22 + Math.floor(Math.random() * 14);
        for (let i = 0; i < extra; i += 1) particles.push(spawnParticle(cx, cy, radius, cluster));
        const rim = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5];
        for (const angle of rim) {
          const count = 6 + Math.floor(Math.random() * 5);
          for (let i = 0; i < count; i += 1) particles.push(spawnParticle(cx, cy, radius, angle));
        }
        if (particles.length > SPLASH_COUNT + 140) particles.length = SPLASH_COUNT + 140;
        burstIn = 0.28 + Math.random() * 0.38;
      }

      while (particles.length < SPLASH_COUNT) particles.push(spawnParticle(cx, cy, radius));

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        particle.life -= dt;
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.vx *= 1 - dt * (particle.kind === "splash" ? 0.55 : 0.28);
        particle.vy *= 1 - dt * (particle.kind === "splash" ? 0.4 : 0.22);
        if (particle.kind === "splash") particle.vy += 28 * dt;
        particle.vx += particle.spin * dt * 8;

        const dist = Math.hypot(particle.x - cx, particle.y - cy);
        if (particle.life <= 0 || dist > maxDist) {
          particles[i] = spawnParticle(cx, cy, radius);
          continue;
        }

        if (dist > radius * 0.9) drawParticle(ctx, particle, scale);
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
    <div className="relative min-h-[280px] w-full sm:min-h-[360px] lg:h-full lg:min-h-[560px]">
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
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-navy to-transparent lg:block"
        aria-hidden
      />
    </div>
  );
}
