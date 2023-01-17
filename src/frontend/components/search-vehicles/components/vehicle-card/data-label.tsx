import {
	ColorProps,
	Editable,
	EditableInput,
	EditablePreview,
	Flex,
	Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface DateLabelProps {
	label?: string;
	value?: any;
	color?: ColorProps["color"];
	isEditing?: boolean;
	validate?: (v: string) => boolean;
}

const DateLabel: React.FC<DateLabelProps> = ({
	label,
	value,
	color,
	isEditing,
}) => {
	return (
		<Flex gap={1.5} align="center">
			{label && <Text fontWeight={"semibold"}>{label}:</Text>}
			<Editable
				value={value}
				color="whiteAlpha.700"
				as="code"
				isPreviewFocusable={isEditing}
				w="full"
				h="full"
			>
				<EditablePreview
					w="full"
					h="full"
					pb="0.5"
					fontSize={"md"}
					bg={isEditing ? "background.600" : "transparent"}
					rounded="sm"
					px={isEditing ? "1.5" : "0"}
				/>
				<EditableInput
					bg="background.600"
					px="1.5"
					rounded={"sm"}
					_focusVisible={{ outline: "none" }}
				/>
			</Editable>
		</Flex>
	);
};

export default DateLabel;
