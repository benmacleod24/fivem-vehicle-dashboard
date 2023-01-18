import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { vehiclelist_shop } from "@prisma/client";
import { Form, Formik, FormikHelpers } from "formik";

interface SearchBarProps {}

/**
 * @description Search bar component for the vehicle search page.
 * @return {React.FC<SearchBarProps>}
 */
const SearchBar: React.FC<SearchBarProps> = (props) => {
	// Handle the form submission and change state as needed.
	const handleFormSubmit = (values: any, helpers: FormikHelpers<{}>) => {};

	return (
		<Flex>
			<Formik initialValues={{}} onSubmit={() => {}}>
				{({ values, setFieldValue: setValue }) => {
					return <Flex as={Form}></Flex>;
				}}
			</Formik>
		</Flex>
	);
};

export default SearchBar;
