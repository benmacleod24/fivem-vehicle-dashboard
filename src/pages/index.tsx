import React from "react";

import { Flex } from "@chakra-ui/react";

import VehicleGraphs from "../frontend/components/charts";
import Layout from "../frontend/components/layout";
import VehicleStats from "../frontend/components/stats";

export default function Home() {
	return (
		<Layout wrapperSize={"container.xl"}>
			<VehicleStats />
			<VehicleGraphs />
		</Layout>
	);
}
