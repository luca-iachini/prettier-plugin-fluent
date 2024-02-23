import { Parser } from "prettier";
import { parse, Resource, Message, Attribute, Pattern, TextElement, Entry, Junk, Term, CallArguments, FunctionReference } from "@fluent/syntax";

export type FluentNode = Resource | Entry | Message | Attribute | Pattern | TextElement | Junk | Term | FunctionReference | CallArguments;

export const parseFluent: Parser<FluentNode>["parse"] = (text, _options) => {
  return parse(text, {});
}

