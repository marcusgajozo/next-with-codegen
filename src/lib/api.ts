import { API_URL } from "@/constants/env";
import { getSdk, Requester } from "@/graphql/generated";
import { print, ExecutionResult, DocumentNode } from "graphql";

// Tipo para as opções extras do Next.js (cache, tags, revalidate)
type NextFetchOptions = RequestInit & {
  next?: {
    tags?: string[];
    revalidate?: number | false;
  };
};

const requester: Requester<NextFetchOptions> = async <R, V>(
  doc: DocumentNode,
  vars?: V,
  options?: NextFetchOptions,
): Promise<ExecutionResult<R>> => {
  // O Codegen passa o documento como objeto, convertemos para string
  // Nota: Se o 'doc' já vier como string no seu setup, remova o .loc.source.body
  const query = doc.loc?.source?.body || print(doc);

  const response = await fetch(API_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': 'Bearer ...' // Adicione seu token aqui se precisar
      ...options?.headers,
    },
    body: JSON.stringify({ query, variables: vars }),
    // Aqui injetamos as configs do Next (tags, revalidate)
    next: options?.next,
    cache: options?.cache,
  });

  const json = await response.json();

  if (json.errors) {
    const errorMessage = json.errors[0].message;
    console.error("GraphQL Error:", errorMessage);
    throw new Error(errorMessage);
  }

  return { data: json.data };
};

// Exportamos o objeto 'api' que contém todas as suas funções prontas
export const api = getSdk(requester);
