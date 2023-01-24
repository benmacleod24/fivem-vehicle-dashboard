import React, { useEffect, useState } from "react";

import { Flex, Text } from "@chakra-ui/react";

import { useVehicleStats } from "../../helpers/stats";
import StatWrapper from "./statWrapper";

interface VehicleStatsProps {}

/**
 * @description
 * @return {React.FC<VehicleStats>}
 */
const VehicleStats: React.FC<VehicleStatsProps> = (props) => {
	const stats = useVehicleStats();

	// Because of how prisma groups their data, extract each object
	// from the array.
	const released =
		stats.vehiclesByRelease && stats.vehiclesByRelease.find((v) => v.released)?._count.released;
	const notReleased =
		stats.vehiclesByRelease &&
		stats.vehiclesByRelease.find((v) => !v.released)?._count.released;

	return (
		<Flex flexDir={"column"}>
			<Text fontWeight={"semibold"} color="whiteAlpha.700" mb="1">
				Vehicle Stats
			</Text>
			<Flex gap={4}>
				<StatWrapper label={"Vehicles Released"} data={released} />
				<StatWrapper label={"Vehicles Unreleased"} data={notReleased} />
				<StatWrapper label={"Vehicles Bought"} data={stats.numOfVehiclesBought} />
				<StatWrapper label={"Vehicles In stock"} data={stats.numOfVehiclesInStock} />
				<StatWrapper label={"Stock at PDM"} data={stats.stockAtPDM} />
				<StatWrapper label={"Stock at Drift School"} data={stats.stockAtDrift} />
				<StatWrapper label={"Stock at Wild Throttle"} data={stats.stockAtWildT} />
			</Flex>
		</Flex>
	);
};

export default VehicleStats;
