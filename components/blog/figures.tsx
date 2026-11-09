// Figures for the essays, in the Newsprint material: ink and rules, one brick series that the
// argument rests on, every other mark in muted ink. Each chart draws only figures the essay states,
// and its caption says so; where the line between two stated points is a shape rather than data,
// the caption says that too. Marks carry an SVG <title>, so hovering a point or bar names it.

type FigureProps = {
	title: string;
	/** What the figure is drawn from, and what it is not. Shown under the figure. */
	note?: string;
	children: React.ReactNode;
};

/** A ruled figure in the prose column: the drawing, then a caption with its title and source. */
export function Figure({ title, note, children }: FigureProps) {
	return (
		<figure className="figure">
			{children}
			<figcaption className="mt-4">
				<span className="font-display text-base text-ink">{title}</span>
				{note && <span className="byline mt-1 block">{note}</span>}
			</figcaption>
		</figure>
	);
}

type Series = {
	name: string;
	/** Value at the start and at the end of the period. */
	from: number;
	to: number;
	/** "compound" draws a curve that grows by a constant factor; "flat" a straight line. */
	shape: "compound" | "flat";
	/** The series the argument rests on is drawn in brick; the rest in muted ink. */
	emphasis?: boolean;
	/** Short label at the line's end. */
	label: string;
};

type TrajectoryProps = {
	title: string;
	note: string;
	series: Series[];
	months: number;
	unit: string;
	max: number;
	ticks: number[];
};

type Frame = { w: number; h: number; left: number; right: number; text: number; label: number };

// Two drawings of one chart: the wide one for the prose column, the narrow one sized close to a
// phone's pixels, so the axis and end labels stay at a readable size on both.
const WIDE: Frame = { w: 640, h: 320, left: 44, right: 150, text: 14, label: 16 };
const NARROW: Frame = { w: 340, h: 260, left: 30, right: 118, text: 13, label: 14 };

function TrajectorySvg({
	f,
	className,
	title,
	series,
	months,
	unit,
	max,
	ticks,
}: Omit<TrajectoryProps, "note"> & { f: Frame; className: string }) {
	const top = 16;
	const bottom = 36;
	const plotW = f.w - f.left - f.right;
	const plotH = f.h - top - bottom;
	const x = (m: number) => f.left + (m / months) * plotW;
	const y = (v: number) => top + plotH - (v / max) * plotH;
	const value = (s: Series, m: number) =>
		s.shape === "flat" ? s.from : s.from * (s.to / s.from) ** (m / months);
	const steps = Array.from({ length: months + 1 }, (_, m) => m);

	return (
		<svg
			viewBox={`0 0 ${f.w} ${f.h}`}
			className={`chart ${className}`}
			role="img"
			aria-label={`${title}. ${series.map((s) => `${s.name}: ${s.from} to ${s.to} ${unit} over ${months} months.`).join(" ")}`}
		>
			{ticks.map((t) => (
				<g key={t}>
					<line className="grid" x1={f.left} x2={f.left + plotW} y1={y(t)} y2={y(t)} />
					<text className="tick" fontSize={f.text} x={f.left - 8} y={y(t) + 5} textAnchor="end">
						{t}
					</text>
				</g>
			))}
			<line className="axis" x1={f.left} x2={f.left + plotW} y1={y(0)} y2={y(0)} />
			<text className="tick" fontSize={f.text} x={f.left} y={f.h - 8}>
				Start
			</text>
			<text className="tick" fontSize={f.text} x={f.left + plotW} y={f.h - 8} textAnchor="end">
				{months} months
			</text>

			{series.map((s) => {
				const d = steps
					.map((m, i) => `${i === 0 ? "M" : "L"} ${x(m).toFixed(1)},${y(value(s, m)).toFixed(1)}`)
					.join(" ");
				const cls = s.emphasis ? "series series--emph" : "series series--ctx";
				return (
					<g key={s.name} className={cls}>
						<path className="line" d={d} />
						<circle className="dot" cx={x(0)} cy={y(s.from)} r="5">
							<title>{`${s.name} at the start: ${s.from} ${unit}`}</title>
						</circle>
						<circle className="dot" cx={x(months)} cy={y(s.to)} r="5">
							<title>{`${s.name} at ${months} months: ${s.to} ${unit}`}</title>
						</circle>
						<text className="end-label" fontSize={f.label} x={x(months) + 10} y={y(s.to) - 2}>
							{s.name}
						</text>
						<text
							className="end-note"
							fontSize={f.text}
							x={x(months) + 10}
							y={y(s.to) + f.text + 4}
						>
							{s.label}
						</text>
					</g>
				);
			})}
		</svg>
	);
}

/** Two or three lines over time on one axis, labelled at their ends. */
export function Trajectory({ note, ...props }: TrajectoryProps) {
	return (
		<Figure title={props.title} note={note}>
			<TrajectorySvg {...props} f={WIDE} className="hidden sm:block" />
			<TrajectorySvg {...props} f={NARROW} className="sm:hidden" />
		</Figure>
	);
}

type Bar = { label: string; value: number; display: string; emphasis?: boolean };

/** Horizontal bars of one measure, the emphasised one in brick, each labelled with its value. */
export function Bars({
	title,
	note,
	bars,
	unit,
}: {
	title: string;
	note: string;
	bars: Bar[];
	unit: string;
}) {
	const max = Math.max(...bars.map((b) => b.value));
	return (
		<Figure title={title} note={note}>
			<ul className="bars" aria-label={`${title}, in ${unit}`}>
				{bars.map((b) => (
					<li key={b.label} className={b.emphasis ? "bars__row bars__row--emph" : "bars__row"}>
						<span className="bars__label">{b.label}</span>
						<span className="bars__track">
							<span
								className="bars__bar"
								style={{ width: `${Math.max(2, (b.value / max) * 100)}%` }}
								title={`${b.label}: ${b.display} (${b.value} ${unit})`}
							/>
							<span className="bars__value">{b.display}</span>
						</span>
					</li>
				))}
			</ul>
		</Figure>
	);
}

/** The theme's box score: the essay's own numbers at display size between two double rules. */
export function BoxScore({
	items,
	note,
}: {
	items: { figure: string; label: string }[];
	note?: string;
}) {
	return (
		<figure className="figure">
			<div className="box-score">
				{items.map((item) => (
					<div key={item.label} className="box-score__cell">
						<p className="font-display text-section leading-none tracking-[-0.02em] text-ink">
							{item.figure}
						</p>
						<p className="mt-3 text-base leading-snug text-ink-2">{item.label}</p>
					</div>
				))}
			</div>
			{note && <figcaption className="byline mt-3">{note}</figcaption>}
		</figure>
	);
}

/** A line from the essay set large between rules, for the reader who is skimming. */
export function PullQuote({ children }: { children: React.ReactNode }) {
	return (
		<aside className="pull-quote" aria-hidden="true">
			<p>{children}</p>
		</aside>
	);
}

type Row = { id: string; title: string; mature: string };

/** An index of a list-shaped essay: each item, what mature looks like, a link to the section. */
export function SignalIndex({ rows, title }: { rows: Row[]; title: string }) {
	return (
		<figure className="figure">
			<table className="signal-index">
				<caption className="mb-4 text-left font-display text-base text-ink">{title}</caption>
				<thead>
					<tr>
						<th scope="col" className="w-10">
							<span className="visually-hidden">Number</span>
						</th>
						<th scope="col">Signal</th>
						<th scope="col">Mature when</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row, i) => (
						<tr key={row.id}>
							<td className="agate text-ink">{i + 1}</td>
							<td>
								<a href={`#${row.id}`}>{row.title}</a>
							</td>
							<td>{row.mature}</td>
						</tr>
					))}
				</tbody>
			</table>
		</figure>
	);
}
