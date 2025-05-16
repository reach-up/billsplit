import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["**/*.eval.ts"],
    setupFiles: ["dotenv/config"],
  },
});
