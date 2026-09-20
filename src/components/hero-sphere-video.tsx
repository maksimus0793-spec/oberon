"use client";

const mediaClass =
  "absolute inset-0 h-full w-full object-cover opacity-100 brightness-[1.28] contrast-[1.12] saturate-[1.25] motion-reduce:hidden";

export function HeroSphereVideo() {
  return (
    <video
      className={mediaClass}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster="/media/hero-sphere-poster.jpg"
      aria-hidden
      ref={(video) => {
        if (!video) return;
        video.playbackRate = 1.4;
      }}
      onPlaying={(event) => {
        event.currentTarget.playbackRate = 1.4;
      }}
    >
      <source src="/media/hero-sphere.mp4" type="video/mp4" />
    </video>
  );
}
