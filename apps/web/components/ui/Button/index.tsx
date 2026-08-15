import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button"; href?: never };

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const base =
  "inline-flex items-center justify-center font-medium tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-accent text-white hover:bg-accent-dim",
  ghost:
    "border border-border text-muted hover:text-foreground hover:border-subtle",
};

const sizes = {
  sm: "h-9 px-4 text-sm rounded-sm",
  md: "h-11 px-6 text-sm rounded-sm",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const classes = [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");

  if (props.as === "a") {
    const { as: _a, variant: _v, size: _s, ...rest } = props as ButtonAsAnchor;
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { as: _a, variant: _v, size: _s, ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
