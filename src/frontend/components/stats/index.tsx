import React, { useEffect, useState } from "react";

import { Flex, Grid, Text } from "@chakra-ui/react";

import { useVehicleStats } from "../../helpers/stats";
import StatWrapper from "./statWrapper";
import { shopPercentageOfTotalStock } from "../../helpers/stats/stockAtShop";

interface VehicleStatsProps {}

/**
 * @description
 * @return {React.FC<VehicleStats>}
 */
const VehicleStats: React.FC<VehicleStatsProps> = (props) => {
	const { totalNumberOfVehiclesInStock, ...stats } = useVehicleStats();

	return (
		<Flex flexDir={"column"}>
			<Text fontWeight={"semibold"} color="whiteAlpha.700" mb="1">
				Vehicle Stats
			</Text>
			<Grid gap={4} templateColumns="repeat(4, 1fr)">
				<StatWrapper label={"Vehicles Released"} data={stats.vehiclesReleased} />
				<StatWrapper label={"Vehicles Unreleased"} data={stats.vehiclesUnreleased} />
				<StatWrapper label={"Vehicles Bought"} data={totalNumberOfVehiclesInStock} />
				<StatWrapper label={"Vehicles In stock"} data={totalNumberOfVehiclesInStock} />
				<StatWrapper
					label={"Stock at PDM"}
					data={stats.stockAtPDM}
					helper={`${shopPercentageOfTotalStock(
						stats.stockAtPDM as number,
						totalNumberOfVehiclesInStock
					)}% of Total Stock`}
				/>
				<StatWrapper
					label={"Stock at Drift School"}
					data={stats.stockAtDrift}
					helper={`${shopPercentageOfTotalStock(
						stats.stockAtDrift as number,
						totalNumberOfVehiclesInStock
					)}% of Total Stock`}
				/>
				<StatWrapper
					label={"Stock at Wild Throttle"}
					data={stats.stockAtWildT}
					helper={`${shopPercentageOfTotalStock(
						stats.stockAtWildT as number,
						totalNumberOfVehiclesInStock
					)}% of Total Stock`}
				/>
			</Grid>
		</Flex>
	);
};

export default VehicleStats;
