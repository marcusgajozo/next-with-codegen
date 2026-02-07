"use client";

import { revalidateCharacters } from "@/app/_actions/actions";

export function ButtonRevalidate() {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      onClick={() => revalidateCharacters()}
    >
      Revalidate Characters
    </button>
  );
}
