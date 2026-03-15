import { permanentRedirect } from "next/navigation";

export default function LegalRoot() {
	permanentRedirect("/legal/privacy");
}
