import { api } from "@/lib/api";

export async function ListItem() {
  const { data } = await api.GetCharactersQuery(
    {},
    {
      next: { tags: ["characters"] },
    },
  );

  console.log(data);

  return (
    <div>
      <p className="text-gray-400 text-sm mb-4">
        Last updated: {new Date().toLocaleTimeString()}
      </p>
      {data?.characters?.results?.map((character) => (
        <div key={character?.id}>
          <h1 className="text-2xl text-white">{character?.name}</h1>
        </div>
      ))}
    </div>
  );
}
