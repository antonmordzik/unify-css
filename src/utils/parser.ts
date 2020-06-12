import { parse, Rule, Declaration } from 'css';

interface ICSS {
  [prop: string]: string;
}

interface IDeclaration {
  selectors: string[];
  props: ICSS;
}

export const process = (text: string): IDeclaration[] => {
  const parsedObj = parse(text);

  if (parsedObj.stylesheet) {
    const rules: Rule[] = parsedObj.stylesheet.rules.filter(entry => entry.type === 'rule');
    const declarations: IDeclaration[] = rules.map((rule: Rule) => ({
      selectors: rule.selectors as string[],
      props: (rule.declarations || []).filter(dec => dec.type === 'declaration')
        .map((declaration: Declaration) => ({
          [declaration.property as string]: declaration.value as string
        }))
        .reduce((acc: ICSS, next: ICSS): ICSS => ({ ...acc, ...next }), {})
    }));
    return declarations;
  }

  return [];
}