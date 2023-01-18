import { ColorProps, Editable, EditableInput, EditablePreview, Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface DataLabelProps {
	label?: string;
	value?: any;
	color?: ColorProps["color"];
	isEditing?: boolean;
	validate?: (v: string) => boolean;
}

const DataLabel: React.FC<DataLabelProps> = ({ label, value, color, isEditing }) => {
	return (
		<Flex gap={1.5} align="center">
			{label && <Text fontWeight={"semibold"}>{label}:</Text>}
			<Text as="code" color={color || "whiteAlpha.700"}>
				{value}
			</Text>
		</Flex>
	);
};

export default DataLabel;
