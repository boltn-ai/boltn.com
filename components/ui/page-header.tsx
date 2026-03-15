import { Section } from "@/components/ui/section";

interface PageHeaderProps {
	headline: string;
	subtitle?: string;
}

export function PageHeader({ headline, subtitle }: PageHeaderProps) {
	return (
		<Section className="py-12 md:py-16">
			<h1 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">
				{headline}
			</h1>
			{subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
		</Section>
	);
}
