import {
  Declaration, parse as _parse, Rule, Stylesheet,
} from 'css';

// Map property -> className[]
export type CSS = Map<string, string[]>;

export class Parser {
  private map: CSS = new Map();

  private otherCss: string[] = []; // Animations, variable declarations, etc.

  constructor(private readonly files: Record<string, string>) {}

  public parse(): CSS {
    for (const [path, file] of Object.entries(this.files)) {
      const parsed = _parse(file, { source: path });
      this.processParsed(parsed);
    }

    return this.map;
  }

  private processParsed(parsed: Stylesheet): void {
    if (!parsed.stylesheet) {
      throw new Error('No stylesheet found.');
    }

    const { rules } = parsed.stylesheet;

    for (let i = 0; i < rules.length; i += 1) {
      const rule = rules[i] as Rule;

      // TODO: switch types to process animations and variables
      if (rule.type !== 'rule') {
        continue;
      }

      const { selectors, declarations } = rule;

      if (!declarations || !selectors) {
        continue;
      }

      for (let j = 0; j < declarations.length; j += 1) {
        const declaration = declarations[j] as Declaration;

        if (!declaration.property || !declaration.value) {
          continue;
        }

        const mapKey = `${declaration.property}: ${declaration.value}`;

        if (!this.map.has(mapKey)) {
          this.map.set(mapKey, selectors);
        } else {
          this.map.set(mapKey, (this.map.get(mapKey) as string[]).concat(selectors));
        }
      }
    }
  }
}
