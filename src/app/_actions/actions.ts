"use server";

import { revalidateTag } from "next/cache";

export async function revalidateCharacters() {
  console.log("Revalidating characters tag...");
  revalidateTag("characters");
}
