import { NextApiRequest, NextApiResponse } from "next";
import { updateCreateVehicleValidator } from "../../../types";
import { prisma } from "@prisma";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "../auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	const session = await getServerSession(req, res, nextAuthConfig);
	if (!session || !session.user) throw new Error("Aint got access bro.");

	switch (method) {
		case "PATCH":
			return PATCH(req, res);
		case "GET":
			return GET(req, res);
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
	console.log(req.body);
	let vehicleParams = updateCreateVehicleValidator.parse(JSON.parse(req.body));

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

/**
 * @method GET
 * @url /api/vehicles/[id]
 * @description Get a vehicle by their id.
 */
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const { id } = req.query;

	// Make sure the vehicle id exist.
	if (!id) {
		return res.status(404).json({
			code: 404,
			message: "Could not find the vehicle id or params to update.",
		});
	}

	// Collect vehicle from the database
	const vehicle = await prisma.vehiclelist.findUnique({
		where: {
			id: Number(id),
		},
	});

	return res.status(200).json(vehicle);
};

export default handler;
