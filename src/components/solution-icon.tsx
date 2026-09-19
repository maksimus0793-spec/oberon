import type { SolutionIcon as IconKey } from "@/content/solutions";

const paths: Record<IconKey, string> = {
  shield: "M12 3l7 3v5.5c0 4.4-2.9 8.3-7 9.5-4.1-1.2-7-5.1-7-9.5V6l7-3Zm-3 8.8 2.2 2.2L15.5 10",
  network: "M12 3v5m0 8v5M4.5 20h5m5 0h5M7 8h10v4H7V8ZM4.5 16h5v4h-5v-4Zm10 0h5v4h-5v-4Z",
  wrench: "M14.7 6.3a4 4 0 0 0 5.1 5.1l-8.2 8.2a2.4 2.4 0 0 1-3.4-3.4l8.2-8.2Zm0 0L12.2 3.8m7.6 7.6 2.5 2.5",
  phone: "M7 3h4l1.5 4-2.2 1.6a12 12 0 0 0 5.1 5.1L17 11.5 21 13v4a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 5 5.2 2 2 0 0 1 7 3Z",
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
