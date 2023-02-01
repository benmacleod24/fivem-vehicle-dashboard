import { z } from "zod";
import { releasedToBool, stringToBool, stringToNumber } from "../../utils";

export const updateCreateVehicleValidator = z.object({
	seats: z.onumber(),
	model: z.ostring(),
	vehicleBrand: z.ostring(),
	displayName: z.ostring(),
	shop: z.ostring(),
	trunk: z.onumber(),
	released: z.oboolean(),
	style: z.ostring(),
	class: z.ostring(),
	price: z.onumber(),
	stock: z.onumber(),
});
