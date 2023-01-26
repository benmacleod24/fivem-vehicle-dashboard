import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@prisma";
import { z } from "zod";
import { stringToNumber } from "../../../utils";
import { updateCreateVehicleValidator } from "../../../types";
import { Prisma } from "@prisma/client";

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

const queryParams = z.object({
	page: z.ostring().transform(stringToNumber),
	perPage: z.ostring().transform(stringToNumber),

	// Direct Search Values
	shop: z.ostring().transform((s) => s?.replaceAll(" ", "")),
	displayName: z.ostring().transform((s) => s?.replaceAll(" ", "")),
	vehicleBrand: z.ostring().transform((s) => s?.replaceAll(" ", "")),
	model: z.ostring(),
	style: z.ostring().transform((s) => s?.replaceAll(" ", "")),
	released: z.ostring().transform((s) => s?.toUpperCase()),

	// Range Values
	priceMin: z.ostring().transform(stringToNumber),
	priceMax: z.ostring().transform(stringToNumber),
	seatsMin: z.ostring().transform(stringToNumber),
	seatsMax: z.ostring().transform(stringToNumber),
	trunkMin: z.ostring().transform(stringToNumber),
	trunkMax: z.ostring().transform(stringToNumber),
	stockMin: z.ostring().transform(stringToNumber),
	stockMax: z.ostring().transform(stringToNumber),
});

export type VehicleQueryResponse = Awaited<ReturnType<typeof GET>>;
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const params = queryParams.parse(req.query);

	// Mutable where clause
	// for building search query.
	let where = {};

	// Determine weather we are using
	// the released params.
	if (params.released && params.released !== "BOTH") {
		where = {
			...where,
			released: params.released === "RELEASED" ? true : false,
		};
	}

	// Simple direct query params.
	if (params.shop && params.shop !== "All") where = { ...where, shop: params.shop };
	if (params.model) where = { ...where, model: { contains: params.model } };
	if (params.style) where = { ...where, style: { contains: params.style } };
	if (params.displayName) where = { ...where, displayName: { contains: params.displayName } };
	if (params.vehicleBrand) where = { ...where, vehicleBrand: { contains: params.vehicleBrand } };

	// Price range clause.
	if (params.priceMax || params.priceMin) {
		where = {
			...where,
			price: {
				lte: params.priceMax,
				gte: params.priceMin,
			},
		};
	}

	// Seats range clause.
	if (params.seatsMax || params.seatsMin) {
		where = {
			...where,
			seats: {
				lte: params.seatsMax,
				gte: params.seatsMin,
			},
		};
	}

	// Stock range clause.
	if (params.stockMax || params.stockMin) {
		where = {
			...where,
			stock: {
				lte: params.stockMax,
				gte: params.stockMin,
			},
		};
	}

	// Trunk size range clause.
	if (params.trunkMax || params.trunkMin) {
		where = {
			...where,
			trunk: {
				lte: params.trunkMax,
				gte: params.trunkMin,
			},
		};
	}

	try {
		// Collect total num of vehicles in where clause.
		const totalNumOfVehicles = await prisma.vehiclelist.count({ where });

		// Collect all where from the search query.
		const vehicles = await prisma.vehiclelist.findMany({
			where,
			take: params.perPage || 6,
			skip:
				(params.page !== undefined && ((params.page || 1) - 1) * (params.perPage || 6)) ||
				0,
			orderBy: {
				id: "asc",
			},
		});

		console.log(where);

		// Response data to be returned.
		const responeData = {
			status: 200,
			pageination: {
				page: params.page || 1,
				perPage: params.perPage || 6,
				total: totalNumOfVehicles,
			},
			data: vehicles,
			timestamp: new Date(),
		};

		res.status(200).json(responeData);
		return responeData;
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
