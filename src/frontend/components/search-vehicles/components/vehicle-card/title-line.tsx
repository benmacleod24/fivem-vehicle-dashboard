import { Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import CopyValue from "./copy-value";
import DataLabel from "./data-label";

interface TitleLineProps {
	brand: string;
	displayName: string;
	model: string;
}

const TitleLine: React.FC<TitleLineProps> = (props) => {
	const { brand, displayName, model } = props;

	return (
		<Flex justifyContent={"space-between"}>
			<Flex flexGrow={1} mr="5" gap={2} justifyContent={"flex-start"}>
				<DataLabel value={brand} />
				<DataLabel value={displayName} />
			</Flex>
			<Flex gap={2} h="fit-content" align={"center"}>
				<CopyValue value={model} />
			</Flex>
		</Flex>
	);
};

export default TitleLine;
