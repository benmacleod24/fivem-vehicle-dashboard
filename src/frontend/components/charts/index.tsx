import React, { useEffect, useState } from "react";

import { Flex, Grid, Text } from "@chakra-ui/react";

import { format } from "../../../utils";
import { getAvgVehPricePerClass, getMostCommenVehicleBought } from "../../helpers/charts";
import BarChart from "./Bar";

interface VehicleGraphsProps {}

/**
 * @description
 * @return {React.FC<VehicleGraphs>}
 */
const VehicleGraphs: React.FC<VehicleGraphsProps> = (props) => {
	const { graphLabels: priceLabels, graphData: priceData } = getAvgVehPricePerClass();
	const { graphLabels: commenLabels, graphData: commenData } = getMostCommenVehicleBought();

	return (
		<Flex flexDir={"column"} mt="5">
			<Text fontWeight={"semibold"} color="whiteAlpha.700" mb="1">
				Vehicle Graphs
			</Text>
			<Grid w="full" templateColumns={"repeat(2, 1fr)"} gap={4}>
				<BarChart
					title="Average Price By Style"
					labels={priceLabels}
					data={priceData}
					tickCallback={(v) => format.format(v)}
				/>
				<BarChart
					title="Top 10 Purchased Models"
					labels={commenLabels}
					data={commenData}
					stepSize={10}
				/>
			</Grid>
		</Flex>
	);
};

export default VehicleGraphs;
