import { DiscordApi } from ".";

export const GetRoles = async (discordId: string): Promise<string[]> => {
	const data: { roles: string[] } = await DiscordApi(
		`guilds/${process.env.DISCORD_GUILD_ID}/members/${discordId}`
	);

	return data.roles || [];
};
