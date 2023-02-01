import { vehiclelist_shop } from "@prisma/client";
import { NumOfVehiclesInStock } from "../../../pages/api/stats/numOfVehiclesInStock";
import useSWR from "swr";
import { useNumOfVehiclesInStock } from ".";

export const useStockAtShop = (shop: vehiclelist_shop) => {
	const { data, error, isLoading } = useSWR<NumOfVehiclesInStock>(
		`/api/stats/stockAtShop?shop=${shop}`
	);

	//@ts-ignore
	return { data: data, error, isLoading };
};

export const useShopPercentageOfTotalStock = (shopAmount: number, totalStock?: number) => {
	totalStock = useNumOfVehiclesInStock().data || 1;
	if (!shopAmount) return 0;

	return Math.ceil((shopAmount / totalStock) * 100);
};
