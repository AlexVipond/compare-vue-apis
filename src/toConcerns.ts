export type Concern = {
  name: string,
  classes: string,
  lines: number[],
}

export function toConcerns<Names extends string> ({ code, meta }: { code: string, meta: Record<Names, string> }): Concern[] {
  return Object.keys(meta)
    .map(name => ({
      name,
      classes: meta[name],
      lines: toLines({ code, name }),
    }))
}

function toLines ({ code, name }: { code: string, name: string }): Concern['lines'] {
  const blockRE = new RegExp(` // ${name}$`),
        inlineRE = new RegExp(` // ${name.toLowerCase()}$`),
        anyConcernRE = / \/\/ .+$/,
        split = code.split('\n')

  let lines: number[] = []
  let isInBlock = false

  for (let i = 0; i < split.length; i++) {
    const line = split[i]

    if (isInBlock) {
      if (!blockRE.test(line) && !inlineRE.test(line) && anyConcernRE.test(line)) {
        isInBlock = false
        continue
      }

      lines.push(i)
      continue
    }

    if (blockRE.test(line)) {
      isInBlock = true
      lines.push(i)
      continue
    }

    if (inlineRE.test(line)) {
      lines.push(i)
      continue
    }
  }

  return lines
}
