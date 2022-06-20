import { readJson, writeJson } from "https://deno.land/x/jsonfile@1.0.0/mod.ts";
import { join } from "https://deno.land/std@0.144.0/path/mod.ts";
import { findLatestVersion } from "./find-latest-version.ts";

// calculate filepaths
const packagePath = join(Deno.cwd(), "package.json");
const versionPath = join(Deno.cwd(), "VERSION");

// get latest version
const version = await findLatestVersion();

// update package.json
const packageJson = await readJson(packagePath);
packageJson.version = version;
await writeJson(packagePath, packageJson, { spaces: 2 });

// write VERSION file
await Deno.writeTextFile(versionPath, `${version}`);
