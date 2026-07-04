import { redirect } from "next/navigation";

/**
 * The photo session navigates here on completion. The next stage in the flow
 * is now the Theme Studio, so this route forwards there — keeping the locked
 * session engine untouched. Captured photos persist in session storage and
 * are read directly by /theme.
 */
export default function ReviewPage() {
  redirect("/theme");
}
