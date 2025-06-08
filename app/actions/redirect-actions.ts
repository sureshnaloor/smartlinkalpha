"use server";

import { redirect } from "next/navigation";

/**
 * Redirects to the under-construction page
 * Use this for links that point to pages that aren't implemented yet
 */
export async function redirectToUnderConstruction() {
  return redirect("/under-construction");
} 