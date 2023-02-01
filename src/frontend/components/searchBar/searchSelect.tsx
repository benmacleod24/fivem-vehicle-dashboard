import React, { useState, useEffect } from "react";
import { useField } from "formik";
import { Fade, Flex, Icon, Text, useId, useOutsideClick } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface SearchSelectProps {
	name: string;
	label?: string;
	data: string[];
	onClick?: (v: string) => void;
	valueParser?: (v?: any) => string;
}

/**
 * @description Select component for database search.
 * @return {React.FC<SearchSelect>}
 */
const SearchSelect: React.FC<SearchSelectProps> = ({ name, label, data, onClick, valueParser }) => {
	const id = useId();
	const [open, setOpen] = useState<boolean>(false);
	const [props, meta, helpers] = useField(name);
	const ref = React.useRef();

	const valueColor =
		(valueParser && valueParser(props.value)) || props.value ? "white" : "whiteAlpha.700";

	useOutsideClick({
		ref: ref as any,
		handler(e) {
			setOpen(false);
		},
	});

	return (
		<Flex flexDir={"column"} my="2">
			<Text
				textTransform={"capitalize"}
				mb="1"
				fontWeight={"semibold"}
				color="whiteAlpha.800"
				zIndex={-2}
			>
				{label || name}
			</Text>
			<Flex pos="relative">
				<Flex
					justify="space-between"
					p="3"
					bg="background.700"
					w="full"
					rounded={"md"}
					boxShadow="base"
					onClick={() => setOpen(true)}
					cursor="pointer"
					align={"center"}
					zIndex={open ? 100 : 0}
				>
					<Text color={valueColor}>
						{(valueParser && valueParser(props.value)) || props.value || label || name}
					</Text>
					<Icon
						as={ChevronDownIcon}
						transform={`rotate(${open ? 180 : 0}deg)`}
						transition="0.2s ease-out"
					/>
				</Flex>

				<Flex
					zIndex={99}
					ref={ref as any}
					w="full"
					pos="absolute"
					top="120%"
					py="3"
					bg="background.700"
					rounded={"md"}
					boxShadow="base"
					opacity={open ? 1.0 : 0.0}
					flexDir="column"
					maxH="sm"
					overflow={"auto"}
					pointerEvents={open ? "all" : "none"}
					transition="0.1s ease-in-out"
					__css={{
						"&::-webkit-scrollbar": {
							width: "2",
						},
						"&::-webkit-scrollbar-track": {
							background: "#2D3039",
							rounded: "md",
						},
						"&::-webkit-scrollbar-thumb": {
							background: "#E1515F",
							rounded: "md",
						},
					}}
				>
					{data.map((s) => (
						<Flex
							cursor={"pointer"}
							w="full"
							py="2"
							px="3"
							transition={"0.2s ease-out"}
							_hover={{
								bg: "whiteAlpha.100",
							}}
							key={s + new Date().toString()}
							onClick={(e) => {
								helpers.setValue(s);
								setOpen(false);
							}}
						>
							<Text>{s}</Text>
						</Flex>
					))}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default SearchSelect;
