import { expectType } from "tsd";
import { generate, verify } from "./index.js";

expectType<
	(params: {
		prefix: string;
		separator?: string;
		checksumLength?: number;
	}) => () => string
>(generate);
generate({ prefix: "test" })();

expectType<
	(
		id: string,
		params?: {
			prefix: string;
			separator?: string;
			checksumLength?: number;
		}
	) => () => boolean
>(verify);
verify("test_4BP40dTTCPL0mtPqxrExF7710b84e7d");
