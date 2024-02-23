import type { Parser, Printer, Doc, ParserOptions } from "prettier";

import { parseFluent, FluentNode } from './parser';
import { doc, AstPath } from "prettier";
const { line, indent, hardline, join, align, markAsRoot, trim } = doc.builders;
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
      return join('\n', path.map(printFn, 'body'));
    case "Message":
      return [
        node.id.name,
        ' = ',
        path.call(printFn, 'value'),
        path.map(printFn, 'attributes'),
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
      return ['-', node.id.name, ' = ', path.call(printFn, 'value')];
    case "SelectExpression":
      return markAsRoot([
        align(4, [line, path.call(printFn, 'selector'), ' ->']),
        align(6, [line, path.map(printFn, 'variants')]),
        trim
      ]);
    case "Variant":
      return [node.default ? '*' : '', '[', node.key.name, '] ', path.call(printFn, 'value'), line];
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
    case "Comment":
      return ['# ', node.content];
    case "GroupComment":
      return ['## ', node.content];
    case "ResourceComment":
      return ['### ', node.content];
    case "Junk":
      return node.content;
    case undefined:
      return '';
    default:
      throw new Error(`Unknown node type: ${node?.type}`);
  }
}
