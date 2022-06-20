#!/usr/bin/env node

import { execa } from "execa";

// Possible values: https://nodejs.org/api/process.html#process_process_platform
const os = process.platform;

// Possible values: https://nodejs.org/api/process.html#processarch
const arch = process.arch;

const hostPlatform = `${os}-${arch}`;
const [_1, _2, ...params] = process.argv;

let myproc;

switch (hostPlatform) {
  case `win32-x32`:
  case `win32-x64`:
    myproc = execa(`./bin/win32.exe`, params);
    break;
  case `linux-x32`:
  case `linux-x64`:
    myproc = execa(`./bin/linux`, params);
    break;
  case `darwin-x64`:
    myproc = execa(`./bin/darwin-x64`, params);
    break;
  case `darwin-arm64`:
    myproc = execa(`./bin/darwin-x64`, params);
    break;
  default:
    console.error(
      `Unsupported host platform: ${hostPlatform}. Please contact the maintainer of this package about this. `
    );
}

myproc.stdout.pipe(process.stdout);

await myproc;
