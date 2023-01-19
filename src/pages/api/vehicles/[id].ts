import { NextApiRequest, NextApiResponse } from "next";
import { updateCreateVehicleValidator } from "../../../types";
import { prisma } from "@prisma";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case "PATCH":
			return PATCH(req, res);
		default:
			throw new Error("Method does not exist at this endpoint.");
	}
};

/**
 * @method PATCH
 * @url /api/vehicles/[id]
 * @description Update a vehicle by it's database id.
 */
const PATCH = async (req: NextApiRequest, res: NextApiResponse) => {
	const { id } = req.query;
	let vehicleParams = updateCreateVehicleValidator.parse(req.body);

	// Make sure the vehicle id exist.
	if (!id || !vehicleParams) {
		return res.status(404).json({
			code: 404,
			message: "Could not find the vehicle id or params to update.",
		});
	}

	// For whatever reason I had to put a ts-ignore here
	// because prisma did not like what I inputed.
	const updateSuccess = await prisma.vehiclelist.update({
		where: {
			id: Number(req.query.id),
		},
		//@ts-ignore
		data: vehicleParams,
	});

	return res.status(200).json(updateSuccess);
};

export default handler;
