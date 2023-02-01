import { Flex, Grid } from "@chakra-ui/react";
import { vehiclelist } from "@prisma/client";
import React, { useState, useEffect } from "react";
import Layout from "../frontend/components/layout";
import SearchBar from "../frontend/components/searchBar";
import VehicleCard from "../frontend/components/vehicleCard";
import { stringToBool, toQuery } from "../utils";
import useSWR from "swr";
import { VehicleQueryResponse } from "./api/vehicles";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "./api/auth/[...nextauth]";

interface SearchProps {}

/**
 * @description Search page.
 * @return {React.FC<Search>}
 */
const Search: React.FC<SearchProps> = (props) => {
	const { query, push } = useRouter();
	const [params, setParams] = useState<Record<string, string>>({});

	const { data, isLoading, mutate } = useSWR<VehicleQueryResponse>(
		`/api/vehicles?page=${1}&${toQuery(params)}`
	);

	useEffect(() => {
		if (query && stringToBool(query.revalidate as string)) {
			mutate();
			push("/search");
		}

		if (query && query.findVehicleId) {
			setParams({ vehicleId: query.findVehicleId as string });
		}
	}, [query, query.revalidate, query.vehicleId]);

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
