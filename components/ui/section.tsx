import { cn } from "@/lib/utils";

interface SectionProps {
	id?: string;
	className?: string;
	children: React.ReactNode;
}

/** A page section: the outer element owns the block padding, the container the width. */
export function Section({ id, className, children }: SectionProps) {
	return (
		<section id={id} className={cn("container py-16 md:py-24", className)}>
			{children}
		</section>
	);
}
