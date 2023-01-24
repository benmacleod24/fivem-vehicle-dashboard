import { Flex, Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface StatWrapperProps {
	data?: any;
	label: any;
	helper?: string;
}

/**
 * @description Wrapper for the stat component
 * @return {React.FC<StatWrapper>}
 */
const StatWrapper: React.FC<StatWrapperProps> = (props) => {
	return (
		<Flex
			bg="background.700"
			border="1px solid"
			borderColor={"background.600"}
			rounded="md"
			p="3"
			px="4"
			boxShadow={"base"}
			h="fit-content"
		>
			<Stat>
				<StatLabel>{props.label}</StatLabel>
				<StatNumber>{props.data !== undefined ? props.data : "N/A"}</StatNumber>
				{props.helper && <StatHelpText>{props.helper}</StatHelpText>}
			</Stat>
		</Flex>
	);
};

export default StatWrapper;
