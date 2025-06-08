import { redirect } from "next/navigation";
import { redirectToUnderConstruction } from "./actions/redirect-actions";

// This is a template file for pages that are under construction.
// Copy this file to your new page location (e.g., app/new-feature/page.tsx)
// and modify the pagePath constant to match your page's URL.

// Set this to your page's intended URL path (e.g., "/new-feature")
const pagePath = "/template-path";

export default async function UnderConstructionTemplate() {
  // This will redirect to the under-construction page
  return redirectToUnderConstruction(pagePath);
} 