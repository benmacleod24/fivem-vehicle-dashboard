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
 * @url /api/stats/mostCommenVehicleBought
 * @description Collect average vehicle of every vehicle style.
 */
export type MostCommonVehicleBought = Awaited<ReturnType<typeof GET>>;
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	// Group data by vehicle style and average style price.
	const mostCommonVehicleBought = await prisma.playercars.groupBy({
		by: ["model"],
		_count: {
			model: true,
		},
		orderBy: {
			_count: {
				model: "desc",
			},
		},
		take: 10,
	});

	res.status(200).json(mostCommonVehicleBought);
	return mostCommonVehicleBought;
};

export default handler;
