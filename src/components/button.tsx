import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-300 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white border border-primary hover:bg-primary-hover hover:border-primary-hover",
  secondary:
    "bg-transparent text-ink border border-ink-muted hover:bg-primary hover:border-primary hover:text-white",
  ghost: "bg-white/10 text-white border border-white/30 hover:bg-white hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-14 px-8 text-base",
  sm: "h-11 px-6 text-sm",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md") {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  onClick,
}: ButtonLinkProps) {
  return (
    <Link href={href} onClick={onClick} className={`${buttonClass(variant, size)} ${className}`}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant = "primary", size = "md", className = "", ...props }: ButtonProps) {
  return <button {...props} className={`${buttonClass(variant, size)} ${className}`} />;
}
