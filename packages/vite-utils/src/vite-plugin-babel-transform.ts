import { BabelFileResult, transformAsync, TransformOptions } from "@babel/core";
import { PluginOption } from "vite";

export default function babelTransform(
  matches: RegExp[],
  options: TransformOptions
): PluginOption {
  return {
    name: "vite-plugin-babel-transform",
    enforce: "pre",
    async transform(src, id) {
      if (matches.some((m) => m.test(id))) {
        const { code, map } = await transformAsyncOrThrow(src, {
          sourceFileName: id,
          sourceMaps: true,
          ...options,
        });

        assertDefined(code);

        return {
          code,
          map: mapBabelSourcemapResultToRollupSouremapResult(map),
        };
      }
    },
  };
}

async function transformAsyncOrThrow(
  code: string,
  opts?: TransformOptions
): Promise<BabelFileResult> {
  const result = await transformAsync(code, opts);

  if (result === null) {
    throw new Error("@babel/core.transformAsync() returned no code");
  }

  return result;
}

function assertDefined<T>(value: T | null | undefined): asserts value is T {
  if (value === undefined || value === null) {
    throw new Error("Expected value to be defined");
  }
}

function mapBabelSourcemapResultToRollupSouremapResult(
  map: BabelFileResult["map"]
): {
  file: string;
  mappings: string;
  names: string[];
  sources: string[];
  sourcesContent: string[];
  version: number;
  toString(): string;
  toUrl(): string;
} | null {
  if (map === undefined || map === null) {
    return null;
  }

  return {
    file: map.file,
    mappings: map.mappings,
    names: map.names,
    sources: map.sources,
    sourcesContent: map.sourcesContent ?? [],
    version: map.version,
    toUrl: () => map.file,
  };
}
