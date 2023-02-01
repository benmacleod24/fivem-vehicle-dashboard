import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@prisma";
import { nextAuthConfig } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

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
export type VehicleCountByReleaseGET = Awaited<ReturnType<typeof GET>>;
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const vehicleCountGroupedByRelease = await prisma.vehiclelist.groupBy({
		by: ["released"],
		_count: {
			released: true,
		},
	});

	res.status(200).json(vehicleCountGroupedByRelease);
	return vehicleCountGroupedByRelease;
};

export default handler;
