export function assertNever(msg: string): never {
  throw new Error(msg);
}

export function assertNeverArg(x: never, msg: string = `Unexpected object: ${x}`): never {
  throw new Error(msg);
}
