import { vehiclelist_shop } from "@prisma/client";

export type VehicleSearchParams = {
	// Vehicle values.
	model: string;
	vehicleBrand: string;
	displayName: string;
	shop: vehiclelist_shop;

	// Vehicle properties.
	seats: number;
	trunk: number;
	released: boolean;
	style: string;

	// These value allow for range searches.
	price: [number, number] | number;
	stock: [number, number] | number;
};
