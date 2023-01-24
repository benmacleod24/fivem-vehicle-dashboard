import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@prisma";
import { vehiclelist_shop } from "@prisma/client";

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
 * @url /api/stats/vehiclePriceByStyle
 * @description Collect average vehicle of every vehicle style.
 */
export type StockAtShop = Awaited<ReturnType<typeof GET>>;
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const { shop } = req.query;
	// Group data by vehicle style and average style price.
	const stockAtShop = await prisma.vehiclelist.count({
		where: {
			shop: shop as vehiclelist_shop,
			released: true,
		},
	});

	res.status(200).json(stockAtShop);
	return stockAtShop;
};

export default handler;
