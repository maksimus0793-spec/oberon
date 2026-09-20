import type { CSSProperties, ReactNode } from "react";

import type { SolutionIcon as IconKey } from "@/content/solutions";

const plasma = {
  from: "#ff4a3d",
  mid: "#cc0000",
  to: "#8b0000",
  glow: "rgba(204,0,0,0.48)",
};

const delays: Record<IconKey, string> = {
  shield: "0s",
  network: "-1.4s",
  camera: "-2.2s",
  server: "-0.7s",
  display: "-1.9s",
};

const HEX_OUTER = "M100 30 L160.62 65 L160.62 135 L100 170 L39.38 135 L39.38 65 Z";
const HEX_INNER = "M100 48 L145.15 74 L145.15 126 L100 152 L54.85 126 L54.85 74 Z";
const DIAMOND = "M100 28 L172 100 L100 172 L28 100 Z";

function Node({
  cx,
  cy,
  stroke,
  delay = 0,
  r = 2.55,
}: {
  cx: number;
  cy: number;
  stroke: string;
  delay?: number;
  r?: number;
}) {
  return (
    <circle
      className="circuit-node"
      cx={cx}
      cy={cy}
      r={r}
      fill="#fff"
      stroke={stroke}
      strokeWidth="1.55"
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

function Frame({
  name,
  className,
  children,
}: {
  name: IconKey;
  className: string;
  children: (stroke: string) => ReactNode;
}) {
  const id = `sol-${name}`;
  const stroke = `url(#${id}-g)`;

  return (
    <span
      className={`inline-flex bg-transparent ${className}`}
      style={{ "--circuit-delay": delays[name], "--circuit-glow": plasma.glow } as CSSProperties}
    >
      <svg viewBox="0 0 200 200" className="circuit-icon h-full w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id={`${id}-g`} x1="18%" y1="8%" x2="88%" y2="92%">
            <stop offset="0%" stopColor={plasma.from} />
            <stop offset="42%" stopColor={plasma.mid} />
            <stop offset="100%" stopColor={plasma.to} />
          </linearGradient>
          <filter id={`${id}-neon`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.15" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" filter={`url(#${id}-neon)`}>
          {children(stroke)}
        </g>
      </svg>
    </span>
  );
}

function ShieldMark({ stroke }: { stroke: string }) {
  return (
    <>
      <g className="circuit-orbit">
        <circle cx="100" cy="100" r="82" strokeWidth="1.25" strokeDasharray="20 11 7 16 26 10" opacity="0.7" />
        <circle className="circuit-spark" cx="100" cy="18" r="2.15" fill={stroke} stroke="none" />
      </g>

      <path d={HEX_OUTER} strokeWidth="1.7" />
      <path className="circuit-flow" d={HEX_OUTER} strokeWidth="1.7" />
      <path d={HEX_INNER} strokeWidth="1.25" opacity="0.55" />

      <path d="M100 30 V48" strokeWidth="1.45" />
      <path d="M160.62 65 L145.15 74" strokeWidth="1.45" />
      <path d="M160.62 135 L145.15 126" strokeWidth="1.45" />
      <path d="M100 170 V152" strokeWidth="1.45" />
      <path d="M39.38 135 L54.85 126" strokeWidth="1.45" />
      <path d="M39.38 65 L54.85 74" strokeWidth="1.45" />

      <path d="M54.85 74 L46 80 L46 90" strokeWidth="1.35" className="circuit-flow-slow" />
      <path d="M145.15 74 L154 80 L154 90" strokeWidth="1.35" className="circuit-flow-slow" />
      <path d="M54.85 126 L44 118 L44 108" strokeWidth="1.35" />
      <path d="M145.15 126 L156 118 L156 108" strokeWidth="1.35" />
      <path d="M100 48 L88 56 M100 48 L112 56" strokeWidth="1.25" />

      <rect x="70" y="76" width="60" height="52" rx="6" strokeWidth="1.7" />
      <rect x="76" y="82" width="48" height="40" rx="4" strokeWidth="1.35" />
      <circle cx="100" cy="102" r="13" strokeWidth="1.6" />
      <circle cx="100" cy="102" r="6.5" strokeWidth="1.35" />
      <circle cx="100" cy="102" r="2.1" fill={stroke} stroke="none" />
      <path d="M100 89.5 V92.8 M100 111.2 V114.5 M87.5 102 H90.8 M109.2 102 H112.5" strokeWidth="1.3" />
      <path d="M70 88 H64 M70 116 H64 M130 88 H136 M130 116 H136" strokeWidth="1.7" />

      <Node cx={100} cy={30} stroke={stroke} />
      <Node cx={160.62} cy={65} stroke={stroke} delay={0.4} />
      <Node cx={160.62} cy={135} stroke={stroke} delay={0.8} />
      <Node cx={100} cy={170} stroke={stroke} delay={1.2} />
      <Node cx={39.38} cy={135} stroke={stroke} delay={0.6} />
      <Node cx={39.38} cy={65} stroke={stroke} delay={1} />
      <Node cx={46} cy={90} stroke={stroke} delay={0.3} r={2.1} />
      <Node cx={154} cy={90} stroke={stroke} delay={0.9} r={2.1} />
    </>
  );
}

function NetworkMark({ stroke }: { stroke: string }) {
  const rays = [
    [100, 18],
    [132, 26],
    [158, 48],
    [176, 78],
    [176, 122],
    [158, 152],
    [132, 174],
    [100, 182],
    [68, 174],
    [42, 152],
    [24, 122],
    [24, 78],
    [42, 48],
    [68, 26],
  ] as const;

  return (
    <>
      <g className="circuit-orbit">
        <circle cx="100" cy="100" r="84" strokeWidth="1.2" strokeDasharray="22 10 8 14 18 12" opacity="0.75" />
        <circle className="circuit-spark" cx="100" cy="16" r="2.15" fill={stroke} stroke="none" />
      </g>
      <g className="circuit-orbit-rev">
        <circle cx="100" cy="100" r="72" strokeWidth="1.15" strokeDasharray="14 18 6 12" opacity="0.45" />
      </g>

      {rays.map(([x, y], i) => {
        const dx = x - 100;
        const dy = y - 100;
        const len = Math.hypot(dx, dy);
        const sx = 100 + (dx / len) * 40;
        const sy = 100 + (dy / len) * 40;
        return (
          <path
            key={`${x}-${y}`}
            d={`M${sx.toFixed(1)} ${sy.toFixed(1)} L${x} ${y}`}
            strokeWidth={i % 2 === 0 ? 1.45 : 1.2}
            opacity="0.92"
          />
        );
      })}
      <path className="circuit-flow" d="M100 18 L100 62 M176 78 L138 90 M42 48 L70 70" strokeWidth="1.5" />

      <circle cx="100" cy="100" r="38" strokeWidth="1.75" />
      <ellipse cx="100" cy="100" rx="16" ry="38" strokeWidth="1.25" />
      <ellipse cx="100" cy="100" rx="38" ry="14" strokeWidth="1.25" />
      <path d="M62 100 H138" strokeWidth="1.2" />
      <path d="M88 70 L100 84 L114 68 M86 128 L100 116 L116 132" strokeWidth="1.25" className="circuit-flow-slow" />
      <path d="M74 88 L84 100 L74 112 M126 88 L116 100 L126 112" strokeWidth="1.15" />

      {rays.map(([x, y], i) => (
        <Node key={`n-${x}-${y}`} cx={x} cy={y} stroke={stroke} delay={(i % 7) * 0.28} r={i % 3 === 0 ? 2.7 : 2.2} />
      ))}
      <Node cx={100} cy={62} stroke={stroke} delay={0.2} r={2.1} />
      <Node cx={100} cy={138} stroke={stroke} delay={0.8} r={2.1} />
    </>
  );
}

function CameraMark({ stroke }: { stroke: string }) {
  return (
    <>
      <g className="circuit-orbit">
        <circle cx="100" cy="100" r="82" strokeWidth="1.2" strokeDasharray="16 12 8 20" opacity="0.55" />
        <circle className="circuit-spark" cx="100" cy="18" r="2.15" fill={stroke} stroke="none" />
      </g>

      <path d={DIAMOND} strokeWidth="1.7" />
      <path className="circuit-flow" d={DIAMOND} strokeWidth="1.7" />

      <path d="M100 28 V52 M172 100 H156 M100 172 V156 M28 100 H44" strokeWidth="1.4" />
      <path d="M54 60 L64 50 L76 56" strokeWidth="1.25" className="circuit-flow-slow" />
      <path d="M140 52 L150 62 L160 56" strokeWidth="1.25" />

      <path d="M44 76 V126" strokeWidth="2.2" />
      <path d="M44 84 H56 M44 118 H56" strokeWidth="1.55" />
      <path d="M50 101 H62" strokeWidth="2.3" />
      <path d="M62 88 V114" strokeWidth="1.9" />
      <path d="M62 126 H90 V138 H76" strokeWidth="1.7" />

      <rect x="62" y="72" width="64" height="56" rx="10" strokeWidth="2.2" />
      <path d="M74 92 H96 M74 102 H90 M74 112 H96" strokeWidth="1.4" />
      <circle className="circuit-spark" cx="78" cy="82" r="3.4" fill={stroke} stroke="none" />

      <circle cx="138" cy="100" r="26" strokeWidth="2.3" />
      <circle cx="138" cy="100" r="17" strokeWidth="1.7" />
      <circle cx="138" cy="100" r="9" strokeWidth="1.5" />
      <circle cx="138" cy="100" r="3.8" fill={stroke} stroke="none" />
      <path d="M114 76 Q138 56 162 76" strokeWidth="2.1" />

      <path d="M162 88 L178 74" strokeWidth="1.45" opacity="0.8" />
      <path d="M162 112 L178 126" strokeWidth="1.45" opacity="0.8" />
      <path className="circuit-flow-slow" d="M164 100 H176" strokeWidth="1.3" opacity="0.65" />

      <Node cx={100} cy={28} stroke={stroke} />
      <Node cx={172} cy={100} stroke={stroke} delay={0.5} />
      <Node cx={100} cy={172} stroke={stroke} delay={1} />
      <Node cx={28} cy={100} stroke={stroke} delay={1.4} />
      <Node cx={62} cy={52} stroke={stroke} delay={0.3} r={2.15} />
      <Node cx={158} cy={70} stroke={stroke} delay={0.9} r={2.15} />
      <Node cx={78} cy={138} stroke={stroke} delay={0.6} r={2.1} />
      <Node cx={54} cy={86} stroke={stroke} delay={1.1} r={2.05} />
    </>
  );
}

function ServerMark({ stroke }: { stroke: string }) {
  return (
    <>
      <g className="circuit-orbit-rev">
        <circle cx="100" cy="100" r="82" strokeWidth="1.2" strokeDasharray="18 14 6 16" opacity="0.5" />
      </g>

      <path d={HEX_OUTER} strokeWidth="1.7" />
      <path className="circuit-flow" d={HEX_OUTER} strokeWidth="1.7" />

      <path d="M100 30 V62 M100 170 V150" strokeWidth="1.45" />
      <path d="M39.38 65 L28 72 L28 86 M160.62 65 L172 72 L172 86" strokeWidth="1.3" className="circuit-flow-slow" />
      <path d="M39.38 135 L28 128 L28 116 M160.62 135 L172 128 L172 116" strokeWidth="1.3" />
      <path d="M28 86 H38 M28 116 H38 M172 86 H162 M172 116 H162" strokeWidth="1.25" />
      <path d="M52 88 L62 80 L62 72 M148 88 L138 80 L138 72" strokeWidth="1.25" />
      <path d="M52 120 L62 128 L62 138 M148 120 L138 128 L138 138" strokeWidth="1.25" />

      <ellipse cx="100" cy="70" rx="30" ry="9.5" strokeWidth="1.6" />
      <path d="M70 70 V82" strokeWidth="1.5" />
      <path d="M130 70 V82" strokeWidth="1.5" />
      <ellipse cx="100" cy="82" rx="30" ry="9.5" strokeWidth="1.6" />

      <ellipse cx="100" cy="96" rx="30" ry="9.5" strokeWidth="1.6" />
      <path d="M70 96 V108" strokeWidth="1.5" />
      <path d="M130 96 V108" strokeWidth="1.5" />
      <ellipse cx="100" cy="108" rx="30" ry="9.5" strokeWidth="1.6" />

      <ellipse cx="100" cy="122" rx="30" ry="9.5" strokeWidth="1.6" />
      <path d="M70 122 V134" strokeWidth="1.5" />
      <path d="M130 122 V134" strokeWidth="1.5" />
      <ellipse cx="100" cy="134" rx="30" ry="9.5" strokeWidth="1.6" />

      <g className="circuit-platter" style={{ transformOrigin: "50% 35%" }}>
        <ellipse cx="100" cy="70" rx="6" ry="2.2" strokeWidth="1.2" />
        <path d="M100 70 L114 64" strokeWidth="1.35" />
      </g>
      <g className="circuit-platter-2" style={{ transformOrigin: "50% 48%" }}>
        <ellipse cx="100" cy="96" rx="6" ry="2.2" strokeWidth="1.2" />
        <path d="M100 96 L114 90" strokeWidth="1.35" />
      </g>
      <g className="circuit-platter-3" style={{ transformOrigin: "50% 61%" }}>
        <ellipse cx="100" cy="122" rx="6" ry="2.2" strokeWidth="1.2" />
        <path d="M100 122 L114 116" strokeWidth="1.35" />
      </g>

      <Node cx={100} cy={30} stroke={stroke} />
      <Node cx={160.62} cy={65} stroke={stroke} delay={0.35} />
      <Node cx={160.62} cy={135} stroke={stroke} delay={0.7} />
      <Node cx={100} cy={170} stroke={stroke} delay={1.05} />
      <Node cx={39.38} cy={135} stroke={stroke} delay={0.5} />
      <Node cx={39.38} cy={65} stroke={stroke} delay={0.9} />
      <Node cx={28} cy={86} stroke={stroke} delay={0.2} r={2.1} />
      <Node cx={172} cy={86} stroke={stroke} delay={0.8} r={2.1} />
      <Node cx={62} cy={72} stroke={stroke} delay={0.4} r={2.05} />
      <Node cx={138} cy={72} stroke={stroke} delay={1.1} r={2.05} />
    </>
  );
}

function DisplayMark({ stroke }: { stroke: string }) {
  return (
    <>
      <g className="circuit-orbit">
        <circle cx="100" cy="100" r="82" strokeWidth="1.2" strokeDasharray="20 12 7 18" opacity="0.55" />
        <circle className="circuit-spark" cx="100" cy="18" r="2.15" fill={stroke} stroke="none" />
      </g>

      <path d={HEX_OUTER} strokeWidth="1.7" />
      <path className="circuit-flow" d={HEX_OUTER} strokeWidth="1.7" />
      <path d={HEX_INNER} strokeWidth="1.2" opacity="0.45" />

      <path d="M100 30 V62 M100 170 L100 150" strokeWidth="1.45" />
      <path d="M100 62 H88 M100 62 H112" strokeWidth="1.3" />
      <path d="M39.38 65 L54.85 74 M160.62 65 L145.15 74" strokeWidth="1.4" />
      <path d="M39.38 135 L54.85 126 M160.62 135 L145.15 126" strokeWidth="1.4" />
      <path d="M54.85 74 L46 82 L46 92" strokeWidth="1.25" className="circuit-flow-slow" />
      <path d="M145.15 74 L154 82 L154 92" strokeWidth="1.25" className="circuit-flow-slow" />
      <path d="M54.85 126 L44 118 L44 108" strokeWidth="1.25" />
      <path d="M145.15 126 L156 118 L156 108" strokeWidth="1.25" />

      <rect x="74" y="68" width="52" height="8" rx="3.5" strokeWidth="1.55" />
      <path d="M100 62 V68" strokeWidth="1.45" />

      <rect x="60" y="84" width="80" height="44" rx="7" strokeWidth="1.7" />
      <rect x="66" y="90" width="68" height="32" rx="4" strokeWidth="1.25" />
      <path d="M100 92 V120" strokeWidth="1.35" />
      <path d="M78 98 L78 114 L92 106 Z" strokeWidth="1.45" />
      <circle cx="124" cy="100" r="5" strokeWidth="1.4" />
      <path d="M114 118 C114 110 134 110 134 118" strokeWidth="1.4" />

      <Node cx={100} cy={30} stroke={stroke} />
      <Node cx={160.62} cy={65} stroke={stroke} delay={0.4} />
      <Node cx={160.62} cy={135} stroke={stroke} delay={0.8} />
      <Node cx={100} cy={170} stroke={stroke} delay={1.2} />
      <Node cx={39.38} cy={135} stroke={stroke} delay={0.55} />
      <Node cx={39.38} cy={65} stroke={stroke} delay={0.95} />
      <Node cx={46} cy={92} stroke={stroke} delay={0.25} r={2.1} />
      <Node cx={154} cy={92} stroke={stroke} delay={0.85} r={2.1} />
      <Node cx={88} cy={62} stroke={stroke} delay={0.15} r={2.05} />
      <Node cx={112} cy={62} stroke={stroke} delay={0.7} r={2.05} />
    </>
  );
}

const marks: Record<IconKey, (stroke: string) => ReactNode> = {
  shield: (stroke) => <ShieldMark stroke={stroke} />,
  network: (stroke) => <NetworkMark stroke={stroke} />,
  camera: (stroke) => <CameraMark stroke={stroke} />,
  server: (stroke) => <ServerMark stroke={stroke} />,
  display: (stroke) => <DisplayMark stroke={stroke} />,
};

export function SolutionIcon({ name, className = "h-[180px] w-[180px]" }: { name: IconKey; className?: string }) {
  return (
    <Frame name={name} className={className}>
      {marks[name]}
    </Frame>
  );
}
