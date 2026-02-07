import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const API_URL = process.env.API_URL;

if (!API_URL) {
  console.error("API_URL não está definida no .env");
  process.exit(1);
}

const config: CodegenConfig = {
  schema: API_URL,
  documents: ["src/**/*.gql"],
  ignoreNoDocuments: true,
  generates: {
    "src/graphql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-generic-sdk",
      ],
      config: {
        rawRequest: true,
        strictScalars: true,
        scalars: {
          ID: "string",
          Date: "string",
          DateTime: "string",
          Upload: "any",
        },
      },
    },
  },
  hooks: {
    afterAllFileWrite: ["node scripts/fix-codegen.js"],
  },
};

export default config;
