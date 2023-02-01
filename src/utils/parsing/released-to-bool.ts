export const releasedToBool = (s?: string): boolean | undefined | null => {
	if (s === undefined) return undefined;
	const res = s.toLocaleLowerCase() === "released" ? true : false;
	return res;
};
