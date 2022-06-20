export async function findLatestVersion() {
  const response = await fetch(`https://deno.land/std/http/file_server.ts`, {
    redirect: "manual",
  });

  const location: string = response.headers.get("location");

  const [_, modPlusVersion, ..._path] = location.split(`/`);
  const [_mod, version] = modPlusVersion.split(`@`);

  console.log(`Found Latest Version for Deno std file_server: ${version}`);

  return version;
}
