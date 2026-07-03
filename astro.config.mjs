import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const isUserPage = repo.endsWith(".github.io");

// In GitHub Actions, set base for project pages; locally keep it "/"
const base =
  process.env.GITHUB_ACTIONS
    ? (isUserPage ? "/" : `/${repo}/`)
    : "/";

// Always keep a valid URL here (this is fine even locally)
const owner = process.env.GITHUB_REPOSITORY_OWNER || "SaitejaGarlapati";
const site = `https://${owner}.github.io`;

export default defineConfig({
  site,
  base,
  integrations: [tailwind()],
});
