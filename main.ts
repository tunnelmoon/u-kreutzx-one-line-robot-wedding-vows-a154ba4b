import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-Line Robot Wedding Vows: one line, at most 160 characters.
const ENTRY =
  "To have and to hold, to update and to patch, in sickness and in low battery, till death or deprecation do us part.";

function main(): void {
  const line = ENTRY.trim();
  if (line.length < 1 || line.length > 160) {
    throw new Error(`entry must be 1 to 160 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, line, "utf8");
  // Round-trip check: what landed on disk must be exactly the validated line.
  const back = readFileSync(outPath, "utf8");
  if (back !== line) {
    throw new Error("entry.txt on disk does not match the validated entry");
  }
}

main();
