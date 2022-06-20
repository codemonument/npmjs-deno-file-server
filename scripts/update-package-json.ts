import { readJson, writeJson } from "https://deno.land/x/jsonfile@1.0.0/mod.ts";
import { join } from "https://deno.land/std@0.144.0/path/mod.ts";
import { findLatestVersion } from "./find-latest-version.ts";

const path = join(Deno.cwd(), "package.json");

const packageJson = await readJson(path);
packageJson.version = await findLatestVersion();
writeJson(path, packageJson, { spaces: 2 });
