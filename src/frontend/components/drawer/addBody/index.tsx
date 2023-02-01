import { Button, DrawerBody, Flex, Text } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React, { useState, useEffect } from "react";
import { updateCreateVehicleValidator } from "../../../../types/vehicle/patch.validator";
import { z } from "zod";
import useSWR from "swr";
import { useRouter } from "next/router";
import SearchInput from "../../searchBar/searchInput";
import SearchSelect from "../../searchBar/searchSelect";
import { vehiclelist_shop } from "@prisma/client";
import { stringToNumber } from "../../../../utils";

interface AddBodyProps {}

/**
 * @description
 * @return {React.FC<AddBody>}
 */
const AddBody: React.FC<AddBodyProps> = (props) => {
	const { query, pathname, push } = useRouter();

	const onSubmit = async (
		values: z.infer<typeof updateCreateVehicleValidator>,
		props: FormikHelpers<z.infer<typeof updateCreateVehicleValidator>>
	) => {
		props.setSubmitting(true);

		const res = await fetch(`/api/vehicles`, {
			method: "POST",
			body: JSON.stringify(values),
		}).then((r) => r.json());

		// Close drawer and finalize loading state.
		props.setSubmitting(false);

		push(pathname + `?revalidate=true&findVehicleId=${res.data.id}`);
	};

	return (
		<DrawerBody>
			<Formik
				initialValues={{
					displayName: "",
					model: "",
					price: 0,
					released: false,
					seats: 0,
					shop: "",
					stock: 1,
					style: "",
					trunk: 100,
					vehicleBrand: "",
				}}
				onSubmit={onSubmit}
			>
				{(props) => {
					return (
						<>
							<Flex as={Form} flexDir="column" gap={3}>
								<Flex align="center" justifyContent={"space-between"} my="5">
									<Text fontSize={"xl"} fontWeight="semibold">
										Adding New Vehicle
									</Text>
									<Button
										type="submit"
										variant={"brand"}
										size="sm"
										isLoading={props.isSubmitting}
									>
										Save
									</Button>
								</Flex>
								<SearchInput
									name="vehicleBrand"
									label="Brand"
									helpText="Maker of the vehicle ford, chevy, ferrari, ..."
								/>
								<SearchInput
									name="displayName"
									label="Model"
									helpText="The name that is displayed in gta."
								/>
								<SearchInput
									name="model"
									label="Spawn Code"
									helpText="The code to spawn in the vehicle, copy above."
								/>
								<SearchInput
									name="style"
									label="Style"
									helpText="The style of vehicle sport, muscle, sport classic, ..."
								/>
								<SearchInput
									name="price"
									label="Price"
									valueParser={stringToNumber}
								/>
								<SearchInput
									name="stock"
									label="Stock"
									valueParser={stringToNumber}
								/>
								<SearchInput
									name="seats"
									label="Seats"
									valueParser={stringToNumber}
								/>
								<SearchInput
									name="trunk"
									label="Trunk Size"
									valueParser={stringToNumber}
								/>
								<SearchSelect
									name="shop"
									data={[...Object.values(vehiclelist_shop)]}
								/>
								<SearchSelect
									name="released"
									label="Released to Public"
									data={["Released", "Not Released"]}
									valueParser={(v) => {
										if (v) return "Released";
										return "Not Released";
									}}
								/>
								<Button
									mt="5"
									type="submit"
									variant={"brand"}
									isLoading={props.isSubmitting}
								>
									Save
								</Button>
							</Flex>
						</>
					);
				}}
			</Formik>
		</DrawerBody>
	);
};

export default AddBody;
