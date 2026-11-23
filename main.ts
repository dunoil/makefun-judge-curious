// make-the-ai-judge-feel-curious-20261122-2311
//
// Writes one short text to /output/entry.txt: a lighthouse keeper's log
// that opens a question and never answers it. The program reads the text
// from entry.txt next to this file, validates it against the competition
// gate (UTF-8, 1 to 280 Unicode code points, not only whitespace), checks
// it against a small list of stock wellness phrases so the entry keeps its
// own voice, writes it to the output directory, and reads it back to
// verify the written file is byte-identical to the source text.
//
// Runs on Node 22 with no dependencies and no network access.
// The output directory is taken from MAKEFUN_OUTPUT_DIR when set,
// otherwise /output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MIN_CODE_POINTS = 1;
const MAX_CODE_POINTS = 280;

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

// Stock wellness and meditation-script phrases the entry must avoid.
// The judge rewards freshness: its own voice and images, not a familiar
// meditation script reworded. Any match here fails the run loudly so a
// stale phrase can never reach the gate by accident.
const STOCK_PHRASES = [
  "breathe in",
  "breathe out",
  "take a deep breath",
  "close your eyes",
  "let go",
  "find your calm",
  "inner peace",
  "be present",
  "mindful moment",
  "slow down and",
  "you are enough",
  "in this moment",
];

function codePointCount(text) {
  return [...text].length;
}

function validate(text) {
  const count = codePointCount(text);
  if (count < MIN_CODE_POINTS || count > MAX_CODE_POINTS) {
    throw new Error(
      `entry must be ${MIN_CODE_POINTS} to ${MAX_CODE_POINTS} code points, got ${count}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  const lower = text.toLowerCase();
  const hits = STOCK_PHRASES.filter((phrase) => lower.includes(phrase));
  if (hits.length > 0) {
    throw new Error(`entry contains stock phrases: ${hits.join(", ")}`);
  }
  return count;
}

function main() {
  const here = dirname(fileURLToPath(import.meta.url));
  const sourcePath = join(here, "entry.txt");
  const source = readFileSync(sourcePath, "utf8");
  const text = source.replace(/\r\n/g, "\n").replace(/\n+$/, "");

  const count = validate(text);

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, text, "utf8");

  // Read the file back and verify it is byte-identical to the source text.
  // The gate counts bytes and code points, so a silent write difference
  // (a trailing newline, a different encoding) must fail here, not later.
  const written = readFileSync(OUTPUT_FILE, "utf8");
  if (written !== text) {
    throw new Error(
      `read-back mismatch: wrote ${Buffer.byteLength(text)} bytes, ` +
        `read back ${Buffer.byteLength(written)} bytes`,
    );
  }
  const writtenCount = codePointCount(written);
  if (writtenCount !== count) {
    throw new Error(
      `read-back count mismatch: expected ${count} code points, got ${writtenCount}`,
    );
  }

  console.log(`wrote ${OUTPUT_FILE} (${count} code points)`);
  console.log(`verified: read-back matches source byte for byte`);
}

main();
