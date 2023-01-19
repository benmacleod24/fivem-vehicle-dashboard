import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@prisma";
import { z } from "zod";
import { stringToNumber } from "../../../utils";
import { updateCreateVehicleValidator } from "../../../types";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case "GET":
			return GET(req, res);
		case "POST":
			return POST(req, res);
		default:
			throw new Error("Method does not exist at this endpoint.");
	}
};

/**
 * @method GET
 * @url /api/vehicles/
 * @description Get a paginated list of all the vehicles.
 */

const searchParams = z.object({
	page: z.ostring().transform(stringToNumber),
	perPage: z.ostring().transform(stringToNumber),
	model: z.ostring(),
	displayName: z.ostring(),
	vehicleBrand: z.ostring(),
	shop: z.ostring(),
	released: z.ostring(),
	seats: z.ostring().transform(stringToNumber),
});

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const params = searchParams.parse(req.query);
	const page: number = Number(params.page) || 1;
	const perPageLimit: number = Number(params.perPage) || 6;
	let where = {};

	if (isNaN(Number(params.page)) || isNaN(Number(params.page))) {
		return res.status(300).json({
			status: 300,
			message: "Data input was incorrect/wrong type.",
		});
	}

	// Vehicle Brand
	if (params.vehicleBrand) {
		where = { ...where, vehicleBrand: { contains: params.vehicleBrand } };
	}

	// Vehicle Model
	if (params.model) {
		where = { ...where, model: { contains: params.model } };
	}

	// Vehicle Model
	if (params.displayName) {
		where = { ...where, displayName: params.displayName };
	}

	// Vehicle Shop
	if (params.shop && params.shop !== "all") {
		where = { ...where, shop: { equals: params.shop } };
	}

	// Vehicle is Released
	if (params.released) {
		if (params.released.toLowerCase() === "not_released") where = { ...where, released: false };
		if (params.released.toLowerCase() === "released") where = { ...where, released: true };
	}

	// Vehicle Seats
	if (params.seats) {
		where = { ...where, seats: params.seats };
	}

	try {
		const totalNumOfVehicles = await prisma.vehiclelist.count({
			where,
		});

		const vehicles = await prisma.vehiclelist.findMany({
			where,
			take: perPageLimit,
			skip: page !== undefined && page !== null ? (page - 1) * perPageLimit : 0,
			orderBy: {
				id: "asc",
			},
		});

		return res.status(200).json({
			status: 200,
			pagination: {
				total: totalNumOfVehicles,
				perPage: perPageLimit,
				page: page,
			},
			data: vehicles,
			timestamp: new Date(),
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			status: 500,
			message: "Some wild shit fucked up.",
			error: e,
		});
	}
};

/**
 * @method POST
 * @url /api/vehicles/
 * @description Create a new vehicle in the database.
 */
const POST = async (req: NextApiRequest, res: NextApiResponse) => {
	const vehicleProperties = updateCreateVehicleValidator.parse(req.body);

	// Make sure correct properties exist.
	if (!vehicleProperties.model || !vehicleProperties) {
		return res.status(404).json({
			code: 404,
			message: "Could not find required properties to create a new vehicle.",
		});
	}

	try {
		// Create the new vehicle in the database.
		const newVehicle = await prisma.vehiclelist.create({
			//@ts-ignore
			data: {
				...vehicleProperties,
			},
		});

		return res.status(200).json({
			status: 200,
			data: newVehicle,
			timestamp: new Date(),
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			status: 500,
			message: "Some wild shit fucked up.",
			error: e,
		});
	}
};

export default handler;
