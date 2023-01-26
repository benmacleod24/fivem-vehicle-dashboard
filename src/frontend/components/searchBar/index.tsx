import { Button, Flex, Input, InputGroup, Text } from "@chakra-ui/react";
import { vehiclelist_shop } from "@prisma/client";
import { Formik, Form } from "formik";
import React, { useState, useEffect } from "react";
import { toQuery } from "../../../utils";
import SearchInput from "./searchInput";
import SearchRange from "./searchRange";
import SearchSelect from "./searchSelect";

interface SearchBarProps {
	setParams: any;
	isLoading: boolean;
}

const initalSearchParams = {
	priceMin: 0,
	priceMax: 1000000,
	seatsMin: 0,
	seatsMax: 16,
	trunkMin: 0,
	trunkMax: 650,
	stockMin: 0,
	stockMax: 2000,
	shop: "pdm",
	released: "Both",
	displayName: "",
	vehicleBrand: "",
	model: "",
	style: "",
	perPage: 6,
};

/**
 * @description Search bar for vehicle database
 * @return {React.FC<SearchBar>}
 */
const SearchBar: React.FC<SearchBarProps> = (props) => {
	const [query, setQuery] = useState<any>("");
	const handleFormSubmit = (values: any, helpers: any) => {
		setQuery(values);
		props.setParams(values);
	};

	return (
		<Flex flexDir={"column"} maxW="100%" w="full">
			<Formik initialValues={initalSearchParams} onSubmit={handleFormSubmit}>
				{({ values, setFieldValue: SetValue }) => {
					return (
						<Flex as={Form} flexDir="column" w="full" gap={2}>
							<SearchInput
								name="vehicleBrand"
								label="Brand"
								helpText="Maker of the vehicle ford, chevy, ferrari, ..."
							/>
							<SearchInput
								name="displayName"
								label="Model"
								helpText="The name that is displayed in gta."
							/>
							<SearchInput
								name="model"
								label="Spawn Code"
								helpText="The code to spawn in the vehicle, copy above."
							/>
							<SearchInput
								name="style"
								label="Style"
								helpText="The style of vehicle sport, muscle, sport classic, ..."
							/>
							<SearchRange name="price" isCurrency minMax={[150, 1000000]} />
							<SearchRange name="stock" minMax={[0, 2000]} />
							<SearchRange name="seats" minMax={[0, 16]} />
							<SearchRange name="trunk" minMax={[0, 1000]} />
							<SearchSelect
								name="shop"
								data={["All", ...Object.values(vehiclelist_shop)]}
							/>
							<SearchSelect
								name="released"
								label="Released to Public"
								data={["Both", "Released", "Not Released"]}
							/>
							<Button
								type="submit"
								variant={"brand"}
								mt="5"
								isLoading={props.isLoading}
							>
								Search Vehicles
							</Button>
						</Flex>
					);
				}}
			</Formik>
		</Flex>
	);
};

export default SearchBar;
