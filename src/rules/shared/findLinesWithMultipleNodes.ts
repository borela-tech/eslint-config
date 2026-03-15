export function findLinesWithMultipleNodes(
  nodes: {loc: {end: {line: number}, start: {line: number}}}[],
): number[] {
  const lines: number[] = []

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    const nodeLine = node.loc.start.line

    if (i < nodes.length - 1) {
      const nextNode = nodes[i + 1]
      if (nextNode.loc.start.line === nodeLine)
        lines.push(nodeLine)
    }
  }

  return lines
}
