import { Parser } from "prettier";
import { parse, Resource } from "@fluent/syntax";

export type FluentNode = Resource;

export const parseFluent: Parser<FluentNode>["parse"] = (text, _options) => {
  return parse(text, {});
}

