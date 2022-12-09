import assert from "node:assert";
import { describe, it } from "node:test";
import { generate, verify } from "./index.js";

describe("Generate and verify keys with prefix", () => {
	const key = generate({ prefix: "test" });

	it("should contain prefix", () => {
		assert.strictEqual(key.startsWith("test"), true);
	});

	it("should contain prefix", () => {
		assert.strictEqual(key.length, 36);
	});

	it("should verify", () => {
		assert.strictEqual(verify(key), true);
	});

	it("should verify with prefix", () => {
		assert.strictEqual(verify(key, { prefix: "test" }), true);
	});
});

describe("Generate and verify keys with separator", () => {
	const opts = { prefix: "test", separator: "-" };
	const key = generate(opts);

	it("should contain prefix", () => {
		assert.strictEqual(key.startsWith("test-"), true);
	});

	it("should be of specified length", () => {
		assert.strictEqual(key.length, 36);
	});

	it("should verify", () => {
		assert.strictEqual(verify(key), true);
	});

	it("should verify with prefix", () => {
		assert.strictEqual(verify(key, opts), true);
	});
});

describe("Generate and verify keys with checksum length", () => {
	const opts = { prefix: "test", checksumLength: 20 };
	const key = generate(opts);

	it("should be of specified length", () => {
		assert.strictEqual(key.length, 47);
	});

	it("should verify", () => {
		assert.strictEqual(verify(key, opts), true);
	});
});

describe("Generate and verify keys with checksum length and separator", () => {
	const opts = { prefix: "test", checksumLength: 20, separator: "~" };
	const key = generate(opts);

	it("should contain prefix", () => {
		assert.strictEqual(key.startsWith("test~"), true);
	});

	it("should be of specified length", () => {
		assert.strictEqual(key.length, 47);
	});

	it("should verify", () => {
		assert.strictEqual(verify(key, opts), true);
	});
});
