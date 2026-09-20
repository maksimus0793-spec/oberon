import type { CSSProperties, ReactNode } from "react";

import type { ServiceIcon as IconKey } from "@/content/services";

const delays: Record<IconKey, string> = {
  shield: "0s",
  rack: "-1.1s",
  siren: "-2s",
  conference: "-0.6s",
};

const SHIELD = "M100 28 L162 50 L162 108 Q162 154 100 176 Q38 154 38 108 L38 50 Z";
const SHIELD_INNER = "M100 44 L146 60 L146 108 Q146 142 100 160 Q54 142 54 108 L54 60 Z";

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
      fill="var(--node-fill, #fff)"
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
  const id = `svc-${name}`;
  const stroke = `url(#${id}-g)`;

  return (
    <span
      className={`service-circuit-icon inline-flex bg-transparent ${className}`}
      style={{ "--circuit-delay": delays[name] } as CSSProperties}
    >
      <svg viewBox="0 0 200 200" className="circuit-icon service-circuit-icon h-full w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id={`${id}-g`} x1="18%" y1="8%" x2="88%" y2="92%">
            <stop offset="0%" stopColor="var(--svc-from)" />
            <stop offset="42%" stopColor="var(--svc-mid)" />
            <stop offset="100%" stopColor="var(--svc-to)" />
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

function GuardMark({ stroke }: { stroke: string }) {
  return (
    <>
      <g className="circuit-orbit">
        <circle cx="100" cy="100" r="84" strokeWidth="1.15" strokeDasharray="12 16 6 14" opacity="0.5" />
        <circle className="circuit-spark" cx="100" cy="16" r="2.15" fill={stroke} stroke="none" />
      </g>

      <path d={SHIELD} strokeWidth="1.9" />
      <path className="circuit-flow" d={SHIELD} strokeWidth="1.9" />
      <path d={SHIELD_INNER} strokeWidth="1.3" opacity="0.55" />

      <path d="M100 28 V44 M162 50 L146 60 M38 50 L54 60" strokeWidth="1.4" />
      <path d="M162 108 L146 108 M38 108 L54 108" strokeWidth="1.35" className="circuit-flow-slow" />
      <path d="M100 176 V160" strokeWidth="1.4" />

      <path d="M84 96 V78 Q84 62 100 62 Q116 62 116 78 V96" strokeWidth="2" />
      <rect x="76" y="94" width="48" height="40" rx="7" strokeWidth="2" />
      <circle cx="100" cy="110" r="6" strokeWidth="1.55" />
      <path d="M100 116 V126" strokeWidth="1.7" />

      <Node cx={100} cy={28} stroke={stroke} />
      <Node cx={162} cy={50} stroke={stroke} delay={0.35} />
      <Node cx={38} cy={50} stroke={stroke} delay={0.75} />
      <Node cx={162} cy={108} stroke={stroke} delay={0.55} />
      <Node cx={38} cy={108} stroke={stroke} delay={1.05} />
      <Node cx={100} cy={176} stroke={stroke} delay={0.9} />
      <Node cx={84} cy={78} stroke={stroke} delay={0.25} r={2.1} />
      <Node cx={116} cy={78} stroke={stroke} delay={0.65} r={2.1} />
    </>
  );
}

function RackMark({ stroke }: { stroke: string }) {
  const bays = [62, 88, 114, 140];

  return (
    <>
      <g className="circuit-orbit-rev">
        <circle cx="100" cy="100" r="84" strokeWidth="1.15" strokeDasharray="18 12 7 16" opacity="0.45" />
      </g>

      <path d="M100 22 V40 M64 40 H48 M136 40 H152 M64 168 H48 M136 168 H152" strokeWidth="1.4" />
      <path d="M48 56 L58 64 M152 56 L142 64 M48 150 L58 142 M152 150 L142 142" strokeWidth="1.3" className="circuit-flow-slow" />

      <rect x="64" y="40" width="72" height="128" rx="8" strokeWidth="1.95" />
      <path d="M64 52 H50 M64 156 H50 M136 52 H150 M136 156 H150" strokeWidth="1.7" />
      <path className="circuit-flow" d="M76 40 V168" strokeWidth="1.25" opacity="0.7" />

      {bays.map((y) => (
        <g key={y}>
          <rect x="76" y={y} width="48" height="20" rx="3.5" strokeWidth="1.55" />
          <path d={`M80 ${y + 6} H98 M80 ${y + 14} H92`} strokeWidth="1.25" />
          <circle className="circuit-spark" cx="114" cy={y + 7} r="2.1" fill={stroke} stroke="none" />
          <circle cx="114" cy={y + 14} r="2.1" strokeWidth="1.2" />
        </g>
      ))}

      <path d="M78 168 V176 H90 M122 168 V176 H110" strokeWidth="1.7" />

      <Node cx={100} cy={22} stroke={stroke} />
      <Node cx={48} cy={40} stroke={stroke} delay={0.3} r={2.1} />
      <Node cx={152} cy={40} stroke={stroke} delay={0.7} r={2.1} />
      <Node cx={48} cy={168} stroke={stroke} delay={0.5} r={2.1} />
      <Node cx={152} cy={168} stroke={stroke} delay={0.95} r={2.1} />
      <Node cx={50} cy={52} stroke={stroke} delay={0.2} r={2.05} />
      <Node cx={150} cy={52} stroke={stroke} delay={0.8} r={2.05} />
    </>
  );
}

function SirenMark({ stroke }: { stroke: string }) {
  return (
    <>
      <g className="circuit-orbit">
        <circle cx="100" cy="100" r="84" strokeWidth="1.15" strokeDasharray="14 12 6 16" opacity="0.5" />
        <circle className="circuit-spark" cx="100" cy="16" r="2.15" fill={stroke} stroke="none" />
      </g>

      <path d="M100 22 V38 M48 38 H36 M48 166 H36 M168 70 L156 78 M168 140 L156 132" strokeWidth="1.4" />
      <path d="M36 56 L46 64 M36 148 L46 140" strokeWidth="1.3" className="circuit-flow-slow" />

      <rect x="48" y="38" width="70" height="128" rx="7" strokeWidth="2" />
      <rect x="56" y="48" width="54" height="108" rx="4" strokeWidth="1.3" opacity="0.65" />
      <path d="M48 52 H40 M48 154 H40" strokeWidth="1.7" />
      <circle cx="108" cy="108" r="5.5" strokeWidth="1.6" />
      <path d="M108 108 H94" strokeWidth="1.8" />

      <rect x="132" y="78" width="32" height="48" rx="5" strokeWidth="1.9" />
      <rect x="138" y="86" width="20" height="14" rx="2.5" strokeWidth="1.3" />
      <circle className="circuit-spark" cx="148" cy="93" r="2.6" fill={stroke} stroke="none" />
      <circle cx="140" cy="110" r="2" strokeWidth="1.2" />
      <circle cx="148" cy="110" r="2" strokeWidth="1.2" />
      <circle cx="156" cy="110" r="2" strokeWidth="1.2" />
      <circle cx="140" cy="118" r="2" strokeWidth="1.2" />
      <circle cx="148" cy="118" r="2" strokeWidth="1.2" />
      <circle cx="156" cy="118" r="2" strokeWidth="1.2" />
      <path className="circuit-flow" d="M118 102 H132" strokeWidth="1.55" />

      <g transform="rotate(-22 150 58)">
        <rect x="132" y="44" width="40" height="26" rx="4" strokeWidth="1.8" />
        <rect x="138" y="50" width="12" height="9" rx="1.5" strokeWidth="1.25" />
        <path d="M154 52 H166 M154 58 H162" strokeWidth="1.2" />
      </g>

      <Node cx={100} cy={22} stroke={stroke} />
      <Node cx={36} cy={38} stroke={stroke} delay={0.3} r={2.1} />
      <Node cx={36} cy={166} stroke={stroke} delay={0.75} r={2.1} />
      <Node cx={40} cy={52} stroke={stroke} delay={0.5} r={2.05} />
      <Node cx={168} cy={70} stroke={stroke} delay={0.4} r={2.1} />
      <Node cx={168} cy={140} stroke={stroke} delay={0.95} r={2.1} />
      <Node cx={148} cy={93} stroke={stroke} delay={0.2} r={2.05} />
      <Node cx={108} cy={108} stroke={stroke} delay={0.65} r={2.1} />
    </>
  );
}

function ConferenceMark({ stroke }: { stroke: string }) {
  return (
    <>
      <g className="circuit-orbit">
        <circle cx="100" cy="100" r="84" strokeWidth="1.15" strokeDasharray="22 10 8 14" opacity="0.5" />
        <circle className="circuit-spark" cx="100" cy="16" r="2.15" fill={stroke} stroke="none" />
      </g>

      <rect x="36" y="46" width="128" height="108" rx="28" strokeWidth="1.7" />
      <path className="circuit-flow" d="M64 46 H136 M64 154 H136" strokeWidth="1.5" />
      <path d="M36 78 V122 M164 78 V122" strokeWidth="1.4" />

      <path d="M34 70 L88 80 L88 128 L34 138 Z" strokeWidth="1.95" />
      <path d="M42 82 L80 90 L80 118 L42 126 Z" strokeWidth="1.3" opacity="0.7" />
      <circle cx="61" cy="100" r="7" strokeWidth="1.45" />
      <path d="M50 118 Q61 108 72 118" strokeWidth="1.4" />

      <path d="M166 70 L112 80 L112 128 L166 138 Z" strokeWidth="1.95" />
      <path d="M158 82 L120 90 L120 118 L158 126 Z" strokeWidth="1.3" opacity="0.7" />
      <circle cx="139" cy="100" r="7" strokeWidth="1.45" />
      <path d="M128 118 Q139 108 150 118" strokeWidth="1.4" />

      <path className="circuit-flow-slow" d="M88 104 H112" strokeWidth="1.7" />
      <ellipse cx="100" cy="150" rx="40" ry="9" strokeWidth="1.55" />
      <path d="M100 138 V150" strokeWidth="1.4" />

      <Node cx={36} cy={78} stroke={stroke} delay={0.2} r={2.1} />
      <Node cx={164} cy={78} stroke={stroke} delay={0.6} r={2.1} />
      <Node cx={36} cy={122} stroke={stroke} delay={1} r={2.1} />
      <Node cx={164} cy={122} stroke={stroke} delay={0.4} r={2.1} />
      <Node cx={100} cy={46} stroke={stroke} />
      <Node cx={100} cy={154} stroke={stroke} delay={0.8} />
      <Node cx={61} cy={100} stroke={stroke} delay={0.35} r={2.05} />
      <Node cx={139} cy={100} stroke={stroke} delay={0.9} r={2.05} />
    </>
  );
}

const marks: Record<IconKey, (stroke: string) => ReactNode> = {
  shield: (stroke) => <GuardMark stroke={stroke} />,
  rack: (stroke) => <RackMark stroke={stroke} />,
  siren: (stroke) => <SirenMark stroke={stroke} />,
  conference: (stroke) => <ConferenceMark stroke={stroke} />,
};

export function ServiceIcon({ name, className = "h-[180px] w-[180px]" }: { name: IconKey; className?: string }) {
  return (
    <Frame name={name} className={className}>
      {marks[name]}
    </Frame>
  );
}
