import fetch from "node-fetch";

export const DiscordApi = async (endpoint: string, body?: any, method?: string) => {
	const data: any = await fetch(`https://discordapp.com/api/${endpoint}`, {
		headers: {
			["Content-Type"]: "application/json",
			["Authorization"]: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
		},
		method: method || "GET",
		// body: JSON.stringify(body || {}),
	})
		.then((data) => data.json())
		.catch((err) => console.log(err));

	return data;
};
