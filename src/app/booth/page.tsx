import { redirect } from "next/navigation";

/**
 * The landing page's "Start Session" links (and 404 "Open Booth") point at
 * /booth. The camera experience lives at /camera, so this route simply
 * forwards there — keeping the locked landing components untouched.
 */
export default function BoothPage() {
  redirect("/camera");
}
