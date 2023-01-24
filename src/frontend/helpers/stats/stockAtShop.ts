import { vehiclelist_shop } from "@prisma/client";
import { NumOfVehiclesInStock } from "../../../pages/api/stats/numOfVehiclesInStock";
import useSWR from "swr";
import { getNumOfVehiclesInStock } from ".";

export const getStockAtShop = (shop: vehiclelist_shop) => {
	const { data, error, isLoading } = useSWR<NumOfVehiclesInStock>(
		`/api/stats/stockAtShop?shop=${shop}`
	);

	//@ts-ignore
	return { data: data, error, isLoading };
};

export const shopPercentageOfTotalStock = (shopAmount: number, totalStock?: number) => {
	if (!shopAmount) return 0;
	if (!totalStock) {
		totalStock = getNumOfVehiclesInStock().data || 1;
	}

	return Math.ceil((shopAmount / totalStock) * 100);
};
