const response = await fetch(`https://deno.land/std/http/file_server.ts`, {
  redirect: "manual",
});

const location: string = response.headers.get("location");

const [_, modPlusVersion, ...path] = location.split(`/`);
const [mod, version] = modPlusVersion.split(`@`);

await Deno.stdout.write(new TextEncoder().encode(version));
