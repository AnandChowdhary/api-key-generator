import checksum from "checksum";
import { randomBytes } from "node:crypto";
import baseX from "base-x";

const base62 = baseX(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
);
const DEFAULT_CHECKSUM_LENGTH = 9;
const DEFAULT_SEPARATOR = "_";

/**
 * Generate a unique ID
 * @param {Object} params - Parameters used to generate the ID
 * @param {string} params.prefix - Prefix used to generate the ID
 * @param {string} [params.separator] - Separator used to generate the ID, default is "_"
 * @param {number} [params.checksumLength] - Checksum length, default is 9
 * @returns {string} - Generated ID
 */
export const generate = (params) => {
  const sep = params.separator ?? DEFAULT_SEPARATOR;
  const length = params.checksumLength ?? DEFAULT_CHECKSUM_LENGTH;
  const id = base62.encode(randomBytes(16));
  const result = `${params.prefix}${sep}${id}`;
  const check = checksum(result).substring(0, length);
  return `${result}${check}`;
};

/**
 * Verify if an ID is valid
 * @param {string} id - ID to check
 * @param {Object} [params] - Optional parameters used to generate the ID
 * @param {string} params.prefix - Prefix used to generate the ID
 * @param {string} [params.separator] - Separator used to generate the ID, default is "_"
 * @param {number} [params.checksumLength] - Checksum length, default is 9
 * @returns {boolean}
 */
export const verify = (id, params) => {
  const sep = params?.separator ?? DEFAULT_SEPARATOR;
  const length = params?.checksumLength ?? DEFAULT_CHECKSUM_LENGTH;

  if (params && typeof params.prefix === "string")
    if (!id.startsWith(`${params.prefix}${sep}`)) return false;

  const check = id.slice(-1 * length);
  const idWithoutCheck = id.substring(0, id.length - length);
  const correctChecksum = checksum(idWithoutCheck).substring(0, length);
  return correctChecksum === check;
};
