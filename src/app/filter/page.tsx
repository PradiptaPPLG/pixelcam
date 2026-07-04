import { redirect } from "next/navigation";

/**
 * The filter step now lives at /film-lab (Film Lab). This legacy route and
 * the Preview's "Back to Filters" link forward there so navigation never
 * dead-ends. The selected filter persists in session storage.
 */
export default function FilterPage() {
  redirect("/film-lab");
}
