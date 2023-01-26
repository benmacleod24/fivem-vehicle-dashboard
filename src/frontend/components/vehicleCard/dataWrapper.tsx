import { Flex, Text, Grid, Divider } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface DataWrapperProps {
	title: string;
}

/**
 * @description Wrapper for groups of data
 * @return {React.FC<DataWrapper>}
 */
const DataWrapper: React.FC<React.PropsWithChildren<DataWrapperProps>> = ({ children, title }) => {
	return (
		<Flex flexDir={"column"}>
			<Flex align={"center"} gap={5}>
				<Text minW="fit-content" color="whiteAlpha.700" mb="0.5">
					{title}
				</Text>
				<Divider />
			</Flex>
			{children}
		</Flex>
	);
};

export default DataWrapper;
