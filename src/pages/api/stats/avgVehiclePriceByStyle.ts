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
 * @url /api/stats/vehiclePriceByStyle
 * @description Collect average vehicle of every vehicle style.
 */
export type AvgVehiclePriceByStyle = Awaited<ReturnType<typeof GET>>;
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	// Group data by vehicle style and average style price.
	const vehiclePriceByStyle = await prisma.vehiclelist.groupBy({
		by: ["style"],
		_avg: {
			price: true,
		},
		_max: {
			price: true,
		},
		_min: {
			price: true,
		},
		orderBy: {
			_avg: {
				price: "desc",
			},
		},
		where: {
			NOT: {
				OR: [
					{
						style: "Command",
					},
					{
						style: "Emergency",
					},
					{
						style: "Remote Control",
					},
				],
			},
		},
	});

	res.status(200).json(vehiclePriceByStyle);
	return vehiclePriceByStyle;
};

export default handler;
