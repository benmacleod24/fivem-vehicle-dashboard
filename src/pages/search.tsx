import { Flex, Grid } from "@chakra-ui/react";
import { vehiclelist } from "@prisma/client";
import React, { useState, useEffect } from "react";
import Layout from "../frontend/components/layout";
import SearchBar from "../frontend/components/searchBar";
import VehicleCard from "../frontend/components/vehicleCard";
import { toQuery } from "../utils";
import useSWR from "swr";
import { VehicleQueryResponse } from "./api/vehicles";

interface SearchProps {}

/**
 * @description Search page.
 * @return {React.FC<Search>}
 */
const Search: React.FC<SearchProps> = (props) => {
	const [params, setParams] = useState<Record<string, string>>({});

	const { data, isLoading } = useSWR<VehicleQueryResponse>(
		`/api/vehicles?page=${1}&${toQuery(params)}`
	);

	return (
		<Layout wrapperSize={"container.xl"}>
			<Flex w="full" h="full" gap={16}>
				{/* Search bar */}
				<Flex maxW="30%" w="full" h="full">
					<SearchBar isLoading={isLoading} setParams={setParams} />
				</Flex>

				{/* Right Half/Vehicles */}
				<Grid gap={5} templateColumns={"repeat(2, 1fr)"}>
					{(data && data.data.map((v) => <VehicleCard vehicle={v} key={v.id} />)) || (
						<></>
					)}
				</Grid>
			</Flex>
		</Layout>
	);
};

export default Search;
