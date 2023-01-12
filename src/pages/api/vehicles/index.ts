import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@prisma";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case "GET":
			return GET(req, res);
		default:
			throw new Error("Method does not exist at this endpoint.");
	}
};

/**
 * @method GET
 * @url /api/vehicles/
 * @description Get a paginated list of all the vehicles.
 */
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const page: number = Number(req.query.page) || 1;
	const perPageLimit: number = Number(req.query.perPage) || 10;

	if (isNaN(Number(req.query.page)) || isNaN(Number(req.query.page))) {
		return res.status(300).json({
			status: 300,
			message: "Data input was incorrect/wrong type.",
		});
	}

	try {
		const totalNumOfVehicles = await prisma.vehiclelist.count();

		const vehicles = await prisma?.vehiclelist.findMany({
			take: perPageLimit,
			skip: page * perPageLimit || 0,
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

export default handler;
