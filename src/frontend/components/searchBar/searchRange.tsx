import React, { useState, useEffect } from "react";
import { useField } from "formik";
import {
	Divider,
	Flex,
	RangeSlider,
	RangeSliderTrack,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	Text,
} from "@chakra-ui/react";
import SearchInput from "./searchInput";
import { format } from "../../../utils";

interface SearchRangeProps {
	name: string;
	label?: string;
	minMax: [number, number];
	isCurrency?: boolean;
}

/**
 * @description Search range for database search.
 * @return {React.FC<SearchRange>}
 */
const SearchRange: React.FC<SearchRangeProps> = ({ name, label, minMax, isCurrency }) => {
	const [minProps, __, minHelpers] = useField(`${name}Min`);
	const [maxProps, _, maxHelpers] = useField(`${name}Max`);
	return (
		<Flex flexDir="column" my="2">
			<Text
				textTransform={"capitalize"}
				mb="1"
				fontWeight={"semibold"}
				color="whiteAlpha.800"
			>
				{label || name}
			</Text>
			<Flex justify={"space-between"} w="full" fontSize={"sm"} mb="1">
				<Text>
					Min {label || name} (
					{isCurrency ? format.format(minProps.value) : minProps.value})
				</Text>
				<Text>
					Max {label || name} (
					{isCurrency ? format.format(maxProps.value) : maxProps.value})
				</Text>
			</Flex>
			<RangeSlider
				ringColor={"brand.600"}
				aria-label={["min", "max"]}
				defaultValue={[minMax[0], minMax[1]]}
				min={minMax[0]}
				max={minMax[1]}
				onChange={(v) => {
					minHelpers.setValue(v[0]);
					maxHelpers.setValue(v[1]);
				}}
			>
				<RangeSliderTrack>
					<RangeSliderFilledTrack bg="brand.600" />
				</RangeSliderTrack>
				<RangeSliderThumb
					_focusVisible={{
						boxShadow: "0 0 0 3px rgba(225, 81, 95, 0.5)",
					}}
					index={0}
				/>
				<RangeSliderThumb
					index={1}
					_focusVisible={{
						boxShadow: "0 0 0 3px rgba(225, 81, 95, 0.5)",
					}}
				/>
			</RangeSlider>
		</Flex>
	);
};

export default SearchRange;
