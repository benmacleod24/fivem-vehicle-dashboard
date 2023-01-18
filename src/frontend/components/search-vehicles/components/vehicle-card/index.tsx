import React, { useState } from "react";
import { vehiclelist } from "@prisma/client";
import { Divider, Flex, Grid, Image } from "@chakra-ui/react";
import DateLabel from "./data-label";
import TitleLine from "./title-line";
import { doesVehicleHaveDupBrandName, format } from "../../../../../utils";

interface VehicleCardProps {
	vehicle: vehiclelist;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
	const { model, vehicleBrand, displayName, stock, price, released, seats, style } = vehicle;

	// Vehicle Params.
	const imageSource: string = `/api/cdn/vehicle/${model}`;
	const isReleased: string = released ? "Released" : "Not Released";
	const isDupBrandName = doesVehicleHaveDupBrandName(vehicleBrand, displayName);
	const borderColor = isDupBrandName ? "red.300" : "rgba(0,0,0,0.0)";

	return (
		<Flex
			w="full"
			p="3"
			bg="background.700"
			rounded={"md"}
			boxShadow="base"
			border="1px solid"
			borderColor={borderColor}
			align="center"
		>
			<Image
				src={imageSource}
				w="30%"
				h="28"
				objectFit={"cover"}
				rounded="md"
				boxShadow={"base"}
				border="2px solid"
				borderColor={"background.500"}
			/>
			<Flex w="full" p="3" px="5" flexDir={"column"}>
				{/* Title Line */}
				<TitleLine brand={vehicleBrand} displayName={displayName} model={model} />

				{/* Divider */}
				<Divider my="3" mt="4" />

				{/* Data Values */}
				<Grid templateColumns={"repeat(3, 1fr)"} fontSize="sm" gap={1.5}>
					<DateLabel label="Stock" value={stock} />
					<DateLabel label="Class" value={"A"} />
					<DateLabel label="Seats" value={seats} />
					<DateLabel label="Price" value={format.format(price)} />
					<DateLabel label="Style" value={style} />
					<DateLabel value={isReleased} color={released ? "green.300" : "red.200"} />
				</Grid>
			</Flex>
		</Flex>
	);
};

export default VehicleCard;
