import * as runtime from "react/jsx-runtime";
import { Callout } from "./callout";
import { CopyButton } from "./copy-button";

const mdxComponents = {
	Callout,
	pre: ({
		children,
		...props
	}: React.ComponentPropsWithoutRef<"pre"> & {
		"data-language"?: string;
		"data-raw-code"?: string;
	}) => {
		const language = props["data-language"] ?? "";
		const rawCode = props["data-raw-code"] ?? "";

		return (
			<div className="group relative my-6 border border-[--border] bg-[--bg-raised]">
				<div className="flex items-center justify-between border-b border-[--border] px-4 py-2">
					{language ? (
						<span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[--text-faint]">
							{language}
						</span>
					) : (
						<span />
					)}
					<CopyButton text={rawCode} />
				</div>
				<pre {...props} className="overflow-x-auto p-4 font-mono text-sm">
					{children}
				</pre>
			</div>
		);
	},
};

function useMDXComponent(code: string) {
	const fn = new Function(code);
	return fn({ ...runtime }).default;
}

export function MDXContent({ code }: { code: string }) {
	const Component = useMDXComponent(code);
	return <Component components={mdxComponents} />;
}
