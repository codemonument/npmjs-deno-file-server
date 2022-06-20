#!/usr/bin/env node

import { execa } from "execa";
import { join, resolve } from "node:path";

// Possible values: https://nodejs.org/api/process.html#process_process_platform
const os = process.platform;

// Possible values: https://nodejs.org/api/process.html#processarch
const arch = process.arch;

const hostPlatform = `${os}-${arch}`;
const [_1, _2, ...params] = process.argv;

const binPath = join(__dirname, "bin");

let myproc;

switch (hostPlatform) {
  case `win32-x32`:
  case `win32-x64`:
    myproc = execa(`${binPath}/win32.exe`, params);
    break;
  case `linux-x32`:
  case `linux-x64`:
    myproc = execa(`${binPath}/linux`, params);
    break;
  case `darwin-x64`:
  case `darwin-arm64`:
    myproc = execa(`${binPath}/${hostPlatform}`, params);
    break;
  default:
    console.error(
      `Unsupported host platform: ${hostPlatform}. Please contact the maintainer of this package about this. `
    );
}

myproc.stdout.pipe(process.stdout);

await myproc;
