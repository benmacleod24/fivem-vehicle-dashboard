import { Flex, Input, InputGroup } from "@chakra-ui/react";
import { useField } from "formik";
import React, { useState, useEffect, ChangeEventHandler, ChangeEvent } from "react";

interface TextInputProps {
	name: string;
	placeholder?: string;
}

/**
 * @description Input search value for vehicle searching.
 * @return {React.FC<TextInput>}
 */
const TextInput: React.FC<TextInputProps> = ({ placeholder, name }) => {
	const [props, meta, helpers] = useField(name);

	const handleInputChange = (e?: ChangeEvent<HTMLInputElement>) => {};

	return (
		<Flex>
			<InputGroup>
				<Input
					placeholder={placeholder || "Type..."}
					value={props.value}
					onChange={handleInputChange}
				/>
			</InputGroup>
		</Flex>
	);
};

export default TextInput;
