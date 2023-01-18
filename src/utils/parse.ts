export const stringToNumber = (s?: string): number | undefined | null => {
	if (s === undefined) return undefined;
	const res = Number(s);
	if (isNaN(res)) return null;
	return res;
};

export const doesVehicleHaveDupBrandName = (brand: string, displayName: string) => {
	return displayName.toLowerCase().split(" ").includes(brand.toLowerCase());
};
