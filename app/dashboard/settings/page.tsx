import { redirectToUnderConstruction } from "../../actions/redirect-actions";

export default async function SettingsPage() {
  // This demo page is under construction, so we redirect to the under-construction page
  return redirectToUnderConstruction();
} 