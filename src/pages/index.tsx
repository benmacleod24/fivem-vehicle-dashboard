import React from "react";

import { Flex } from "@chakra-ui/react";

import VehicleGraphs from "../frontend/components/charts";
import Layout from "../frontend/components/layout";
import VehicleStats from "../frontend/components/stats";

export default function Home() {
	return (
		<Layout>
			<Flex maxW="container.xl" mx="auto" pt="10" flexDir={"column"}>
				<VehicleStats />
				<VehicleGraphs />
			</Flex>
		</Layout>
	);
}
