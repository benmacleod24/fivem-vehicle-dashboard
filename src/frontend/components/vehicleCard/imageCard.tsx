import React, { useState, useEffect } from "react";
import { Flex, Image, Text, IconButton } from "@chakra-ui/react";
import { FaClipboard } from "react-icons/fa";
import { vehiclelist } from "@prisma/client";

interface ImageCardProps {
	vehicle: vehiclelist;
}

/**
 * @description
 * @return {React.FC<ImageCard>}
 */
const ImageCard: React.FC<ImageCardProps> = ({ vehicle }) => {
	const imageSource: string = `/api/cdn/vehicle/${vehicle.model}`;

	// Copy the model to the clipboard
	const copyModelToClipboard = () => {
		navigator.clipboard.writeText(vehicle.model);
	};

	return (
		<Flex pos="relative" borderBottom={"1px solid"} borderColor="brand.700" boxShadow={"base"}>
			<Image
				w="full"
				maxH="48"
				minH="48"
				objectFit={"cover"}
				objectPosition="center"
				src={imageSource}
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
					<Text fontWeight={"bold"}>
						{vehicle.vehicleBrand} {vehicle.displayName}
					</Text>
					<IconButton
						rounded={"full"}
						aria-label="copy-model"
						icon={<FaClipboard />}
						variant="ghost"
						onClick={copyModelToClipboard}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default ImageCard;
