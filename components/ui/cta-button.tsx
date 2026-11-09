import Link from "next/link";
import { cn } from "@/lib/utils";

interface CtaButtonProps {
	href: string;
	className?: string;
	/** "primary" is ink-filled, "secondary" ruled top and bottom, "paper" the primary on an ink band. */
	variant?: "primary" | "secondary" | "paper";
	children?: React.ReactNode;
}

export function CtaButton({ href, className, variant = "primary", children }: CtaButtonProps) {
	return (
		<Link href={href} className={cn("btn", `btn--${variant}`, className)}>
			{children ?? "Get in touch"}
		</Link>
	);
}
