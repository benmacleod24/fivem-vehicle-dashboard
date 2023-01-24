import {
	getTotalNumOfVehiclesBought,
	getVehiclesGroupedByRelease,
	getStockAtShop,
	getNumOfVehiclesInStock,
} from ".";

export const useVehicleStats = () => {
	const vehiclesGroupedByRelease = getVehiclesGroupedByRelease().data;
	const totalNumberOfVehiclesPurchased = getNumOfVehiclesInStock().data;
	const totalNumberOfVehiclesInStock = getNumOfVehiclesInStock().data;

	// Total count of released vehicles
	const vehiclesReleased =
		vehiclesGroupedByRelease &&
		vehiclesGroupedByRelease.find((v) => v.released)?._count.released;

	// Total count of unreleased vehicles.
	const vehiclesUnreleased =
		vehiclesGroupedByRelease &&
		vehiclesGroupedByRelease.find((v) => !v.released)?._count.released;

	// Build an object of basic stats.
	const objectOfStats = {
		vehiclesReleased,
		vehiclesUnreleased,
		totalNumberOfVehiclesPurchased,
		totalNumberOfVehiclesInStock,
	};

	return {
		...objectOfStats,
		stockAtPDM: getStockAtShop("pdm").data,
		stockAtDrift: getStockAtShop("driftschool").data,
		stockAtWildT: getStockAtShop("wildthrottle").data,
	};
};
