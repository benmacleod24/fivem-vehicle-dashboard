// TODO: Find a better spot to put this since it's not really parsing anything.
// TODO: Also find a shorter name for this.

export const doesVehicleHaveDupBrandName = (brand: string, displayName: string): boolean => {
	return displayName.toLowerCase().split(" ").includes(brand.toLowerCase());
};
