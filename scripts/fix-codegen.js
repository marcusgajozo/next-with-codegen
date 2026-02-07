// scripts/fix-codegen.js
import fs from "node:fs";
import path from "node:path";

const FILE_PATH = path.join(process.cwd(), "src/graphql/generated.ts");

try {
  if (!fs.existsSync(FILE_PATH)) {
    console.warn(`⚠️ Arquivo não encontrado: ${FILE_PATH}`);
    process.exit(0);
  }

  const content = fs.readFileSync(FILE_PATH, "utf8");
  console.log("🔨 [Marreta] Renomeando funções...");

  // REGEX MELHORADO:
  // 1. Pega o nome da função.
  // 2. Pura magia negra de Regex para ignorar quebras de linha ([\s\S]*?) até achar o requester.
  // 3. Captura o Query ou Mutation do tipo genérico.
  const regex =
    /([a-zA-Z0-9_]+)(\(variables[\s\S]*?requester<[a-zA-Z0-9_]+(Query|Mutation))/g;

  // $1 = NomeOriginal (ex: GetCharacterID1)
  // $3 = Sufixo (ex: Query)
  // $2 = O resto do código capturado
  const newContent = content.replace(regex, "$1$3$2");

  fs.writeFileSync(FILE_PATH, newContent);
  console.log("✅ [Marreta] Funções renomeadas com sucesso!");
} catch (err) {
  console.error("❌ Erro no script:", err);
  process.exit(1);
}
