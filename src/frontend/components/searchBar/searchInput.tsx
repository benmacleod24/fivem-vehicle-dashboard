import {
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useField } from "formik";

interface SearchInputProps {
	name: string;
	label?: string;
	helpText?: string;
}

/**
 * @description Search input component.
 * @return {React.FC<SearchInput>}
 */
const SearchInput: React.FC<SearchInputProps> = ({ name, label, helpText }) => {
	const [props, meta, helpers] = useField(name);

	return (
		<Flex flexDir={"column"}>
			<Text fontWeight={"semibold"} mb="1" color="whiteAlpha.800">
				{label || name}
			</Text>
			<InputGroup variant={"filled"}>
				<Input
					focusBorderColor="brand.600"
					value={props.value}
					onChange={(e) => helpers.setValue(e.target.value)}
				/>
			</InputGroup>
			{helpText && (
				<Text fontSize={"sm"} color="whiteAlpha.600" mt="1">
					{helpText}
				</Text>
			)}
		</Flex>
	);
};

export default SearchInput;
