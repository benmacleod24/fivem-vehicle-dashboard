import { Flex, Icon, Text } from "@chakra-ui/react";
import { vehiclelist } from "@prisma/client";
import React, { useState, useEffect } from "react";

interface ValueLabelProps {
	label?: string;
	value: any;
	icon?: any;
}

/**
 * @description Label for a value on the vehicle.
 * @return {React.FC<ValueLabel>}
 */
const ValueLabel: React.FC<ValueLabelProps> = ({ label, value, icon }) => {
	return (
		<Flex align={"center"}>
			{icon && <Icon mr="2" color="red.300" boxShadow={"base"} as={icon} />}
			{label && (
				<Text fontWeight={"medium"} mr="3">
					{label}:
				</Text>
			)}
			<Text color="whiteAlpha.800" textTransform={"capitalize"}>
				{value}
			</Text>
		</Flex>
	);
};

export default ValueLabel;
