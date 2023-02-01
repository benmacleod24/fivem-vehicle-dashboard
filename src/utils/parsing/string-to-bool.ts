export const stringToBool = (s?: string): boolean | undefined | null => {
	if (s === undefined) return undefined;
	const res = s.toLocaleLowerCase() === "true" ? true : false;
	return res;
};
