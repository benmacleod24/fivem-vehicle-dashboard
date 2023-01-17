import { Flex, Tooltip } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface CopyValueProps {
	value: any;
}

const CopyValue: React.FC<CopyValueProps> = (props) => {
	// Helpers
	const copy = () => navigator.clipboard.writeText(props.value);

	return (
		<Tooltip
			label="Click to Copy"
			color="white"
			bg="background.500"
			placement={"left"}
			fontWeight="normal"
			rounded={"md"}
			hasArrow
		>
			<Flex
				alignItems={"center"}
				cursor={"pointer"}
				px="2"
				bg="background.500"
				boxShadow={"base"}
				rounded="md"
				onClick={copy}
			>
				<code>{props.value}</code>
			</Flex>
		</Tooltip>
	);
};

export default CopyValue;
