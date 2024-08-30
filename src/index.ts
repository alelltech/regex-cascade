export type RegExprCascade = {
  name: any;
  regex: RegExp;
  cascade?: Array<RegExprCascade>;
};
export type CascadeResult = { match: RegExpMatchArray; name: any };

export function cascadeMatch(expressions: RegExprCascade[], str: string) {
  const results: CascadeResult[] = [];
  for (const { regex, name, cascade: submatches } of expressions) {
    let m: RegExpMatchArray = null;
    if (regex.flags.indexOf("g") != -1) {
      while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) regex.lastIndex++;
        results.push({ name, match: m });
        if (submatches) results.push(...cascadeMatch(submatches, m[0]));
      }
    } else {
      m = regex.exec(str);
      if (!m) continue;
      results.push({ name, match: m });
      if (submatches) results.push(...cascadeMatch(submatches, m[0]));
    }
  }
  return results;
}
