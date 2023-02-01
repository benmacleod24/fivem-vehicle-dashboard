import React, { useState, useEffect } from "react";
import { Flex, Text, Divider, Tag } from "@chakra-ui/react";
import { vehiclelist } from "@prisma/client";
import { doesVehicleHaveDupBrandName } from "../../../utils";

interface QuickTagsProps {
	vehicle: vehiclelist;
}

/**
 * @description Tags for vehicles that need action.
 * @return {React.FC<QuickTags>}
 */
const QuickTags: React.FC<QuickTagsProps> = ({ vehicle }) => {
	return (
		<Flex flexDir={"column"} mb="6">
			<Flex align={"center"} gap={5}>
				<Text minW="fit-content" color="whiteAlpha.700" mb="0.5">
					Quick Tags
				</Text>
				<Divider />
			</Flex>

			<Flex
				mt="5px"
				overflowY={"hidden"}
				overflowX="auto"
				gap={3}
				css={{
					"&::-webkit-scrollbar": {
						display: "none",
					},
				}}
				visibility={
					doesVehicleHaveDupBrandName(vehicle.vehicleBrand, vehicle.displayName)
						? "visible"
						: "hidden"
				}
			>
				<Tag colorScheme={"red"} variant="solid" borderRadius={"sm"} minW="fit-content">
					Duplicate Brand Name
				</Tag>
			</Flex>
		</Flex>
	);
};

export default QuickTags;
