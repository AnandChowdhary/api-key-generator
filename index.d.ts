interface Params {
	prefix: string;
	separator?: string;
	checksumLength?: number;
}

export function generate(params: Params): () => string;

export function verify(id: string, params?: Params): () => boolean;
