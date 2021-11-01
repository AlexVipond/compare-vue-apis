export function toCode (code: string) {
  return code
    .split('\n')
    .map(line => line.replace(/\s\/\/\s.+$/, ''))
    .join('\n')
}
