import React, { useState, useEffect } from "react";
import Layout from "../../frontend/components/layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Divider, Flex, Grid } from "@chakra-ui/react";
import { toQuery } from "../../utils";
import SearchBar from "../../frontend/components/search-vehicles/search-bar";
import { vehiclelist } from "@prisma/client";
import VehicleCard from "../../frontend/components/search-vehicles/components/vehicle-card";
import { z } from "zod";

interface SearchProps {}

const queryParams = z.object({
	page: z.ostring(),
	perPage: z.ostring(),
});

const Search: React.FC<SearchProps> = (props) => {
	const { page, perPage } = queryParams.parse(useRouter().query);
	const [searchParams, setSearchParams] = useState<Record<string, string>>({});

	// Data Fetching.
	const { data, isLoading } = useSWR(
		`/api/vehicles?page=${page}&perPage=${perPage}&${toQuery(searchParams)}`
	);

	return (
		<Layout wrapperSize={"container.xl"}>
			<Flex flexDir={"column"}>
				<SearchBar setParams={setSearchParams} isLoading={isLoading} />

				{/* Vehicle List */}
				<Divider my="7" />
				<Grid templateColumns={"repeat(2, 1fr)"} gap={3}>
					{data &&
						data.data.map((v: vehiclelist) => {
							return <VehicleCard key={v.id} vehicle={v} />;
						})}
				</Grid>
			</Flex>
		</Layout>
	);
};

export default Search;
