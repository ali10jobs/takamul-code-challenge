interface SkeletonProps {
  className?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  variant?: "light" | "dark";
}

const roundedMap = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export default function Skeleton({
  className = "",
  rounded = "sm",
  variant = "light",
}: SkeletonProps) {
  const bg = variant === "dark" ? "bg-white/15" : "bg-divider/80";
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse ${bg} ${roundedMap[rounded]} ${className}`}
    />
  );
}
