import { redirect } from "next/navigation";

/**
 * The old /session route has been merged into /camera.
 * This redirect keeps any existing links working.
 */
export default function SessionPage() {
  redirect("/camera");
}
