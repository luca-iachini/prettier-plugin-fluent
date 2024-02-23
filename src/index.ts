import type { Parser, Printer, Doc, ParserOptions } from "prettier";

import { parseFluent, FluentNode } from './parser';
import { doc, AstPath } from "prettier";
const { line, indent, hardline, join } = doc.builders;
export const defaultOptions = {};

export const languages = [
  {
    name: "Fluent",
    parsers: ["fluent"],
    extensions: [".ftl"],
  },
];

export const parsers: Record<string, Parser<FluentNode>> = {
  fluent: {
    parse: parseFluent,
    astFormat: "fluent-ast",
    locStart: (node) => {
      return node.span?.start || 0;
    },
    locEnd: (node) => {
      return node.span?.end || 1;
    },
  },
};

export const printers: Record<string, Printer<FluentNode>> = {
  "fluent-ast": {
    print,
  },
};

function print(
  path: AstPath,
  _options: ParserOptions<object>,
  printFn: (selector: AstPath) => Doc,
): Doc {
  const node = path.node;

  switch (node.type) {
    case "Resource":
      return [path.map(printFn, 'body')];
    case "Message":
      return [
        node.id.name,
        ' = ',
        path.call(printFn, 'value'),
        path.map(printFn, 'attributes'),
        hardline
      ];
    case "Attribute":
      return indent([line,
        '.',
        node.id.name,
        ' = ',
        path.call(printFn, 'value'),
      ]);
    case "Pattern":
      return path.map(printFn, 'elements');
    case "Placeable":
      return ['{ ', path.call(printFn, 'expression'), ' }'];
    case "Term":
      return ['-', node.id.name, ' = ', path.call(printFn, 'value'), hardline];
    case "VariableReference":
      return ['$', node.id.name];
    case "MessageReference":
      return [node.id.name];
    case "TermReference":
      return ['-', node.id.name];
    case "FunctionReference":
      return [node.id.name, '(', path.call(printFn, 'arguments'), ')'];
    case "CallArguments":
      let args = [];
      if (node.positional.length > 0) {
        args.push(join(', ', path.map(printFn, 'positional')));
      }
      if (node.named.length > 0) {
        args.push(join(', ', path.map(printFn, 'named')));
      }
      return join(', ', args);
    case "NamedArgument":
      return [node.name.name, ": ", path.call(printFn, 'value')];
    case "StringLiteral":
      return ['"', node.value, '"'];
    case "TextElement":
      return indent(join(line, node.value.split("\n")));
    case "Junk":
      return node.content;
    case undefined:
      return '';
    default:
      throw new Error(`Unknown node type: ${node?.type}`);
  }
}
