import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

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
 * @url /api/cdn/vehicles/[model]
 * @description
 */
const GET = (req: NextApiRequest, res: NextApiResponse) => {
	let filePath = path.join(path.resolve("./src/frontend/assets/cars"), `${req.query.model}.jpg`);

	if (!fs.existsSync(filePath)) {
		filePath = path.join(path.resolve("./src/styles/assets/cars"), `no-image.jpg`);
	}

	const stat = fs.statSync(filePath);
	res.writeHead(200, {
		"Content-Type": "image/jpeg",
		"Content-Length": stat.size,
	});

	var readStream = fs.createReadStream(filePath);

	// We replaced all the event handlers with a simple call to readStream.pipe()
	readStream.pipe(res);
};

export default handler;
