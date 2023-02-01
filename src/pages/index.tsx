import React from "react";

import { Flex } from "@chakra-ui/react";

import VehicleGraphs from "../frontend/components/charts";
import Layout from "../frontend/components/layout";
import VehicleStats from "../frontend/components/stats";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { nextAuthConfig } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
export default function Home() {
	return (
		<Layout wrapperSize={"container.xl"}>
			<VehicleStats />
			<VehicleGraphs />
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	ctx: GetServerSidePropsContext<ParsedUrlQuery>
) => {
	const session = await getServerSession(ctx.req, ctx.res, nextAuthConfig);

	if (!session || !session.user) {
		return {
			props: {},
			redirect: {
				destination: "/unauth",
			},
		};
	}

	return { props: { session } };
};
