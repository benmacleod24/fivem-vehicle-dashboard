import React, { useState, useEffect } from "react";
import {
	Button,
	Grid,
	Input,
	InputGroup,
	InputLeftElement,
	Select,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { FaHammer } from "react-icons/fa";
import { IoLogoModelS } from "react-icons/io";
import { BiRename } from "react-icons/bi";
import { MdChair } from "react-icons/md";
import { vehiclelist_shop } from "@prisma/client";

interface SearchBarProps {
	setParams: (v: any) => void;
	isLoading: boolean;
}

const initalSearchValues = {
	model: "",
	displayName: "",
	vehicleBrand: "",
	shop: "",
	released: "all",
	seats: "",
};

const SearchBar: React.FC<SearchBarProps> = (props) => {
	return (
		<Formik
			initialValues={initalSearchValues}
			onSubmit={(values, _props) => {
				props.setParams(values);
			}}
		>
			{(_props) => {
				const { values, setFieldValue: setValue } = _props;

				return (
					<Grid
						as={Form}
						templateColumns={"repeat(3, 1fr)"}
						w="full"
						gap={3}
					>
						<InputGroup variant={"filled"}>
							<InputLeftElement children={<IoLogoModelS />} />
							<Input
								placeholder="Vehicle Model"
								value={values.model}
								onChange={(e) =>
									setValue("model", e.target.value)
								}
								_focusVisible={{
									outline: "none",
								}}
							/>
						</InputGroup>
						<InputGroup variant={"filled"}>
							<InputLeftElement children={<FaHammer />} />
							<Input
								placeholder="Vehicle Manufacturer"
								value={values.vehicleBrand}
								onChange={(e) =>
									setValue("vehicleBrand", e.target.value)
								}
								_focusVisible={{
									outline: "none",
								}}
							/>
						</InputGroup>
						<InputGroup variant={"filled"}>
							<InputLeftElement children={<BiRename />} />
							<Input
								placeholder="Display Name"
								value={values.displayName}
								onChange={(e) =>
									setValue("displayName", e.target.value)
								}
								_focusVisible={{
									outline: "none",
								}}
							/>
						</InputGroup>
						<Select
							cursor={"pointer"}
							variant={"filled"}
							value={values.shop}
							onChange={(e) => setValue("shop", e.target.value)}
							_focusVisible={{
								outline: "none",
							}}
						>
							<option value={"all"}>All</option>
							{Object.values(vehiclelist_shop).map((v) => (
								<option value={v} key={v}>
									{v.toUpperCase()}
								</option>
							))}
						</Select>
						<Select
							cursor={"pointer"}
							variant={"filled"}
							value={values.released}
							onChange={(e) =>
								setValue("released", e.target.value)
							}
							_focusVisible={{
								outline: "none",
							}}
						>
							{["All", "Released", "Not_Released"].map((v) => (
								<option value={v} key={v}>
									{v.split("_").join(" ")}
								</option>
							))}
						</Select>
						<Grid templateColumns={"repeat(2, 1fr)"} gap={3}>
							<InputGroup variant={"filled"}>
								<InputLeftElement children={<MdChair />} />
								<Input
									placeholder="Num of Seats"
									value={values.seats}
									onChange={(e) =>
										setValue(
											"seats",
											e.target.value.toLowerCase()
										)
									}
									_focusVisible={{
										outline: "none",
									}}
								/>
							</InputGroup>
							<Button
								type="submit"
								variant={"brand"}
								isLoading={props.isLoading}
							>
								Search Vehicles
							</Button>
						</Grid>
					</Grid>
				);
			}}
		</Formik>
	);
};

export default SearchBar;
