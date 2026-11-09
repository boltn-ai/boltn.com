interface PageHeaderProps {
	headline: string;
	subtitle?: string;
}

/** The Banner hero every inner page opens with: the head, one line, a double rule. */
export function PageHeader({ headline, subtitle }: PageHeaderProps) {
	return (
		<header className="container pt-20 pb-12 md:pt-24 md:pb-16">
			<h1 className="text-ink">{headline}</h1>
			{subtitle && <p className="lead mt-6 text-ink-2">{subtitle}</p>}
			<hr className="rule--double mt-12 md:mt-16" />
		</header>
	);
}
