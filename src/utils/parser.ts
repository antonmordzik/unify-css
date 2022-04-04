import { parse as _parse, Rule, Declaration } from 'css';

type CSS = {
  [prop: string]: string;
};

export type CSSDeclaration = {
  selectors: string[];
  props: CSS;
};

// TODO: simplify rules mapfn
export const parse = (text: string): CSSDeclaration[] => {
  const parsedObj = _parse(text);

  if (!parsedObj.stylesheet) {
    return [];
  }

  const rules: Rule[] = parsedObj.stylesheet.rules.filter((entry) => entry.type === 'rule');
  const declarations: CSSDeclaration[] = rules.map((rule: Rule) => ({
    selectors: rule.selectors as string[],
    props: (rule.declarations || []).filter((dec) => dec.type === 'declaration')
      .map<CSS>((declaration: Declaration) => ({
      [declaration.property as string]: declaration.value as string,
    }))
      .reduce<CSS>((acc, next) => ({ ...acc, ...next }), {}),
  }));
  return declarations;
};
