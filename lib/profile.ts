// Facts about Steve that appear in more than one place: the bio page, the post author box, the
// footer and the JSON-LD. Keep them here so a change of title or link is made once.

/** How Steve introduces himself. Kept in step with the LinkedIn headline. */
export const ROLE = "principal platform engineer";
export const FOCUS = "developer platforms, CI/CD and AI enablement";
/** The one-line headline: role and focus, sentence case. */
export const HEADLINE = `${ROLE[0].toUpperCase()}${ROLE.slice(1)}: ${FOCUS}.`;

/** The quiet job-search line, shown on About and Contact only. */
export const OPEN_TO =
	"I am open to Principal-level roles in platform engineering and AI enablement, remote in the UK or hybrid in London.";

export const LINKEDIN_URL = "https://www.linkedin.com/in/spbolton/";

export const LATEST_ROLE = "Lead Architect for Platform and Developer Enablement at dotCMS";

/** Third-person bio for recruiters, conference organisers and anyone introducing Steve. */
export const SHORT_BIO =
	"Steve Bolton is a principal platform engineer based in the UK, working on developer platforms, CI/CD and AI enablement. In thirty years he has moved from test automation and systems programming to chief architect of a content management platform. Most recently he was Lead Architect for Platform and Developer Enablement at dotCMS, where he cut the full build from three hours to one and designed the context architecture that lets AI coding agents work in a multi-million-line monorepo. He writes about engineering maturity and what AI-assisted development does to the systems and teams it lands in.";
