import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "default" | "white";
  className?: string;
}

export function Logo({ variant = "default", className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src={variant === "white" ? "/white.svg" : "/logo.svg"}
        alt="Priority Flyers"
        width={150}
        height={20}
        priority
      />
    </Link>
  );
}
