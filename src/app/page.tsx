"use client";

import { ListItem } from "@/app/components/list-item";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListItem />
    </Suspense>
  );
}
