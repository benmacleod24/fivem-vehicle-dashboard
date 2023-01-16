export const toQuery = (params: Record<string, string>) => {
	return new URLSearchParams(params).toString();
};
