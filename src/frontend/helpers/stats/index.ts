import useSWR from "swr";

import { vehiclelist_shop } from "@prisma/client";

import { NumOfVehiclesInStock } from "../../../pages/api/stats/numOfVehiclesInStock";
import { NumOfVehiclesBought } from "../../../pages/api/stats/numOfVehiclesPurchased";
import { VehicleCountByReleaseGET } from "../../../pages/api/stats/vehicleCountByRelease";

export const getVehiclesGroupedByRelease = () => {
	const { data, error, isLoading } = useSWR<VehicleCountByReleaseGET>(
		`/api/stats/vehicleCountByRelease`
	);

	//@ts-ignore
	return {
		data: data as VehicleCountByReleaseGET,
		error,
		isLoading,
	};
};

export const getTotalNumOfVehiclesBought = () => {
	const { data, error, isLoading } = useSWR<NumOfVehiclesBought>(
		`/api/stats/numOfVehiclesPurchased`
	);

	//@ts-ignore
	return { data: data, error, isLoading };
};

export const getNumOfVehiclesInStock = () => {
	const { data, error, isLoading } = useSWR<NumOfVehiclesInStock>(
		`/api/stats/numOfVehiclesInStock`
	);

	//@ts-ignore
	return { data: data, error, isLoading };
};

export const getStockAtShop = (shop: vehiclelist_shop) => {
	const { data, error, isLoading } = useSWR<NumOfVehiclesInStock>(
		`/api/stats/stockAtShop?shop=${shop}`
	);

	//@ts-ignore
	return { data: data, error, isLoading };
};

export const useVehicleStats = () => {
	return {
		vehiclesByRelease: getVehiclesGroupedByRelease().data,
		numOfVehiclesBought: getTotalNumOfVehiclesBought().data,
		numOfVehiclesInStock: getNumOfVehiclesInStock().data,
		stockAtPDM: getStockAtShop("pdm").data,
		stockAtDrift: getStockAtShop("driftschool").data,
		stockAtWildT: getStockAtShop("wildthrottle").data,
	};
};
