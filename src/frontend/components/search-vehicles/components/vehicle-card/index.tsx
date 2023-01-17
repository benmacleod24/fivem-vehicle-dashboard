import React, { useState, useEffect } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { IoSaveSharp } from "react-icons/io5";
import { vehiclelist } from "@prisma/client";
import {
	Divider,
	Flex,
	Grid,
	IconButton,
	Text,
	Tooltip,
	Image,
} from "@chakra-ui/react";
import DateLabel from "./data-label";
import CopyValue from "./copy-value";

const { format } = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0,
});

interface VehicleCardProps {
	vehicle: vehiclelist;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
	const [editing, setEditing] = useState<boolean>(false);

	const {
		model,
		vehicleBrand,
		displayName,
		stock,
		price,
		released,
		seats,
		style,
	} = vehicle;

	// Vehicle Params.
	const imageUrl: string = `/api/cdn/vehicle/${model}`;
	const isReleased: string = released ? "Released" : "Not Released";
	const isDupBrandName = displayName
		.toUpperCase()
		.split(" ")
		.includes(vehicleBrand.toUpperCase());
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
				src={imageUrl}
				w="30%"
				h="28"
				objectFit={"cover"}
				rounded="md"
				boxShadow={"base"}
				border="2px solid"
				borderColor={"background.500"}
			/>
			<Flex w="full" p="3" flexDir={"column"}>
				<Flex justifyContent={"space-between"}>
					<Flex
						flexGrow={1}
						mr="5"
						gap={2}
						justifyContent={"flex-start"}
						flexDir={editing ? "column" : "row"}
					>
						<DateLabel isEditing={editing} value={vehicleBrand} />
						<DateLabel isEditing={editing} value={displayName} />
					</Flex>
					<Flex gap={2} h="fit-content" align={"center"}>
						<IconButton
							aria-label="edit"
							size="sm"
							rounded={"full"}
							variant="ghost"
							onClick={() => setEditing(!editing)}
							icon={
								editing ? (
									<IoSaveSharp />
								) : (
									<MdModeEditOutline />
								)
							}
						/>
						<CopyValue value={model} />
					</Flex>
				</Flex>

				<Divider my="2" />

				<Grid templateColumns={"repeat(3, 1fr)"} fontSize="sm" gap={1}>
					<DateLabel
						isEditing={editing}
						label="Stock"
						value={stock}
					/>
					<DateLabel isEditing={editing} label="Class" value={"A"} />
					<DateLabel
						isEditing={editing}
						label="Seats"
						value={seats}
					/>
					<DateLabel
						isEditing={editing}
						label="Price"
						value={format(price)}
					/>
					<DateLabel
						isEditing={editing}
						label="Style"
						value={style}
					/>
					<DateLabel
						isEditing={editing}
						value={isReleased}
						color={released ? "green.300" : "red.200"}
					/>
				</Grid>
			</Flex>
		</Flex>
	);
};

export default VehicleCard;
