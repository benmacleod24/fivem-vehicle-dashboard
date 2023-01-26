import { Divider, Flex, Grid, Text } from "@chakra-ui/react";
import { vehiclelist } from "@prisma/client";
import React, { useState, useEffect } from "react";
import { FaDollarSign, FaIndustry, FaCheck, FaMinus } from "react-icons/fa";
import { format } from "../../../utils";
import DataWrapper from "./dataWrapper";
import ImageCard from "./imageCard";
import QuickTags from "./quickTags";
import ValueLabel from "./valueLabel";
import { BsFillDisplayFill } from "react-icons/bs";
import { IoLogoModelS } from "react-icons/io";

interface VehicleCardProps {
	vehicle: vehiclelist;
}

/**
 * @description Vehicle card for the search page.
 * @return {React.FC<VehicleCard>}
 */
const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
	return (
		<Flex
			bg="background.700"
			border="1px solid"
			borderColor={"background.600"}
			rounded={"md"}
			w="fit-content"
			maxW="md"
			boxShadow={"md"}
			h="fit-content"
			overflow="hidden"
			flexDir={"column"}
			minW="sm"
		>
			<ImageCard vehicle={vehicle} />
			<Flex p="3" flexDir={"column"}>
				<QuickTags vehicle={vehicle} />

				{/* Vehicle Information */}
				<DataWrapper title="Information">
					<Grid
						templateColumns={"repeat(1, 1fr)"}
						columnGap={4}
						w="full"
						h="full"
						py="3"
						gap={3}
					>
						<ValueLabel
							icon={FaIndustry}
							label="Manufacturer"
							value={vehicle.vehicleBrand}
						/>
						<ValueLabel
							icon={BsFillDisplayFill}
							label="Display Name"
							value={vehicle.displayName}
						/>
						<ValueLabel icon={IoLogoModelS} label="Model" value={vehicle.model} />
					</Grid>
				</DataWrapper>

				{/* Vehicle Properties */}
				<DataWrapper title="Properties">
					<Grid
						templateColumns={"repeat(2, 1fr)"}
						columnGap={4}
						w="full"
						h="full"
						py="3"
						gap={3}
						alignItems={"flex-end"}
					>
						<ValueLabel
							icon={FaDollarSign}
							label="Price"
							value={format.format(vehicle.price)}
						/>
						<ValueLabel icon={FaDollarSign} label="Seats" value={vehicle.seats} />
						<ValueLabel icon={FaDollarSign} label="Style" value={vehicle.style} />
						<ValueLabel icon={FaDollarSign} label="Trunk" value={vehicle.trunk} />
						<ValueLabel
							icon={FaDollarSign}
							label="Shop"
							value={vehicle.shop.toUpperCase()}
						/>
						<ValueLabel
							icon={vehicle.released ? FaCheck : FaMinus}
							value={vehicle.released ? "Released" : "Not Released"}
						/>
					</Grid>
				</DataWrapper>
			</Flex>
		</Flex>
	);
};

export default VehicleCard;
