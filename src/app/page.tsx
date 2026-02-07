import { ListItem } from "@/app/_components/list-item";
import { Suspense } from "react";
import { ButtonRevalidate } from "./_components/button-revalidate";

export default function HomePage() {
  return (
    <div>
      <ButtonRevalidate />
      <Suspense fallback={<div>Loading...</div>}>
        <ListItem />
      </Suspense>
    </div>
  );
}
