import Link from "next/link";
import { cn } from "@/lib/utils";

interface CtaButtonProps {
	href: string;
	className?: string;
	children?: React.ReactNode;
}

export function CtaButton({ href, className, children }: CtaButtonProps) {
	return (
		<Link
			href={href}
			className={cn(
				"flex w-full items-center justify-center bg-[--accent] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[--bg] transition-opacity duration-200 hover:opacity-[0.88]",
				className,
			)}
		>
			{children ?? "Book a discovery call"}
		</Link>
	);
}
