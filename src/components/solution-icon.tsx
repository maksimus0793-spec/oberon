import type { SolutionIcon as IconKey } from "@/content/solutions";

const paths: Record<IconKey, string> = {
  shield: "M12 3l7 3v5.5c0 4.4-2.9 8.3-7 9.5-4.1-1.2-7-5.1-7-9.5V6l7-3Zm-3 8.8 2.2 2.2L15.5 10",
  network: "M12 3v5m0 8v5M4.5 20h5m5 0h5M7 8h10v4H7V8ZM4.5 16h5v4h-5v-4Zm10 0h5v4h-5v-4Z",
  camera: "M4 8h11v10H4V8Zm14 3 3-2v8l-3-2v-4ZM8 5h5l1.5 3",
  display: "M4 5h16v11H4V5Zm4 14h8M12 16v3",
  server: "M4 5h16v5H4V5Zm0 9h16v5H4v-5Zm3.5-6.5h.01M7.5 16.5h.01M16 7.5h2M16 16.5h2",
};

export function SolutionIcon({ name, className = "" }: { name: IconKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d={paths[name]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
