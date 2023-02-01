import {
	useTotalNumOfVehiclesBought,
	useVehiclesGroupedByRelease,
	useStockAtShop,
	useNumOfVehiclesInStock,
} from ".";

export const useVehicleStats = () => {
	const vehiclesGroupedByRelease = useVehiclesGroupedByRelease().data;
	const totalNumberOfVehiclesPurchased = useTotalNumOfVehiclesBought().data;
	const totalNumberOfVehiclesInStock = useNumOfVehiclesInStock().data;

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
		stockAtPDM: useStockAtShop("pdm").data,
		stockAtDrift: useStockAtShop("driftschool").data,
		stockAtWildT: useStockAtShop("wildthrottle").data,
	};
};
