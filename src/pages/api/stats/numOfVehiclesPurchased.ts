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
 * @url /api/stats/vehicleCountByRelease
 * @description Collect vehicles by if they have been relased or not.
 */
export type NumOfVehiclesBought = Awaited<ReturnType<typeof GET>>;
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const numOfVehiclesBought = await prisma.playercars.count();

	res.status(200).json(numOfVehiclesBought);
	return numOfVehiclesBought;
};

export default handler;
