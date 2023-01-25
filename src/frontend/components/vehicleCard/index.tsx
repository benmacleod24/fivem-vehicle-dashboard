import {
	Badge,
	Divider,
	Flex,
	Grid,
	IconButton,
	Image,
	Tag,
	TagLabel,
	Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaClipboard } from "react-icons/fa";
import { format } from "../../../utils";

interface VehicleCardProps {}

/**
 * @description Vehicle card for the search page.
 * @return {React.FC<VehicleCard>}
 */
const VehicleCard: React.FC<VehicleCardProps> = (props) => {
	return (
		<Flex
			bg="background.700"
			border="1px solid"
			borderColor={"background.600"}
			rounded={"md"}
			w="fit-content"
			maxW="md"
			boxShadow={"md"}
			overflow="hidden"
			flexDir={"column"}
			minW="sm"
		>
			<Flex
				pos="relative"
				borderBottom={"1px solid"}
				borderColor="brand.700"
				boxShadow={"base"}
			>
				<Image
					w="full"
					maxH="48"
					minH="48"
					objectFit={"cover"}
					objectPosition="center"
					src="https://i.imgur.com/s3ML4lu.jpg"
				/>
				<Flex
					pos="absolute"
					bottom="0"
					w="full"
					h="100%"
					align={"flex-end"}
					backdropFilter="blur(0.2px)"
					p="3"
					bgGradient="-webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.9)), to(rgba(0, 0, 0, 0)));"
				>
					<Flex align={"center"} justify="space-between" w="full">
						<Text fontWeight={"bold"}>Porsche 911 Turbo S</Text>
						<IconButton
							rounded={"full"}
							aria-label="copy-model"
							icon={<FaClipboard />}
							variant="ghost"
						/>
					</Flex>
				</Flex>
			</Flex>
			<Flex p="3" flexDir={"column"}>
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
					>
						<Tag
							colorScheme={"red"}
							variant="solid"
							borderRadius={"sm"}
							minW="fit-content"
						>
							Duplicate Brand Name
						</Tag>
					</Flex>
				</Flex>
				<Flex flexDir={"column"}>
					<Flex align={"center"} gap={5}>
						<Text minW="fit-content" color="whiteAlpha.700" mb="0.5">
							Information
						</Text>
						<Divider />
					</Flex>
					<Grid
						templateColumns={"repeat(1, 1fr)"}
						columnGap={4}
						w="full"
						h="full"
						py="3"
						gap={3}
					>
						<Flex gap={2}>
							<Text fontWeight={"medium"} noOfLines={1}>
								Spawn Code:
							</Text>
							<Text
								as="code"
								noOfLines={1}
								bg="background.600"
								px="2"
								rounded={"md"}
								pt="0.5"
							>
								pors911t
							</Text>
						</Flex>
						<Flex gap={2}>
							<Text fontWeight={"medium"} noOfLines={1}>
								Manufactor:
							</Text>
							<Text
								as="code"
								noOfLines={1}
								bg="background.600"
								px="2"
								rounded={"md"}
								pt="0.5"
							>
								Porsche
							</Text>
						</Flex>
						<Flex gap={2}>
							<Text fontWeight={"medium"} noOfLines={1}>
								Model:
							</Text>
							<Text
								as="code"
								noOfLines={1}
								bg="background.600"
								px="2"
								rounded={"md"}
								pt="0.5"
							>
								Porsche 911 Turbo S
							</Text>
						</Flex>
					</Grid>
				</Flex>
				<Flex flexDir={"column"} mt="5">
					<Flex align={"center"} gap={5}>
						<Text minW="fit-content" color="whiteAlpha.700" mb="0.5">
							Properties
						</Text>
						<Divider />
					</Flex>
					<Grid
						templateColumns={"repeat(3, 1fr)"}
						columnGap={4}
						w="full"
						h="full"
						py="3"
						gap={3}
					>
						<Flex gap={2}>
							<Text fontWeight={"medium"} noOfLines={1}>
								Price:
							</Text>
							<Text
								as="code"
								noOfLines={1}
								bg="background.600"
								px="2"
								rounded={"md"}
								pt="0.5"
							>
								{format.format(340213)}
							</Text>
						</Flex>
						<Flex gap={2}>
							<Text fontWeight={"medium"} noOfLines={1}>
								Seats:
							</Text>
							<Text
								as="code"
								noOfLines={1}
								bg="background.600"
								px="2"
								rounded={"md"}
								pt="0.5"
							>
								2
							</Text>
						</Flex>
						<Flex gap={2}>
							<Text fontWeight={"medium"} noOfLines={1}>
								Style:
							</Text>
							<Text
								as="code"
								noOfLines={1}
								bg="background.600"
								px="2"
								rounded={"md"}
								pt="0.5"
							>
								Sport
							</Text>
						</Flex>
						<Flex gap={2}>
							<Text fontWeight={"medium"} noOfLines={1}>
								Trunk:
							</Text>
							<Text
								as="code"
								noOfLines={1}
								bg="background.600"
								px="2"
								rounded={"md"}
								pt="0.5"
							>
								250
							</Text>
						</Flex>
						<Flex gap={2}>
							<Text fontWeight={"medium"} noOfLines={1}>
								Shop:
							</Text>
							<Text
								as="code"
								noOfLines={1}
								bg="background.600"
								px="2"
								rounded={"md"}
								pt="0.5"
							>
								PDM
							</Text>
						</Flex>
						<Flex gap={2}>
							<Text
								as="code"
								noOfLines={1}
								bg="background.600"
								px="2"
								rounded={"md"}
								pt="0.5"
							>
								Not Released
							</Text>
						</Flex>
					</Grid>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default VehicleCard;
