export async function findLatestVersion() {
  const response = await fetch(`https://deno.land/std/http/file_server.ts`, {
    redirect: "manual",
  });

  const location: string = response.headers.get("location");

  const [_, modPlusVersion, ..._path] = location.split(`/`);
  const [_mod, version] = modPlusVersion.split(`@`);

  return version;
}

await Deno.stdout.write(new TextEncoder().encode(await findLatestVersion()));
await Deno.writeTextFile(`${Deno.cwd()}/VERSION`, `${version}`);
