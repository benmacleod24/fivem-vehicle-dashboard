import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@prisma";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "../auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	const session = await getServerSession(req, res, nextAuthConfig);
	if (!session || !session.user) throw new Error("Aint got access bro.");

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
export type NumOfVehiclesInStock = Awaited<ReturnType<typeof GET>>;
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const numOfVehiclesInStock = await prisma.vehiclelist.count({
		where: {
			released: true,
		},
	});

	res.status(200).json(numOfVehiclesInStock);
	return numOfVehiclesInStock;
};

export default handler;
