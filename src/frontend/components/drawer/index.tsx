import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	DrawerProps,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { DrawerConfigOpts, DrawerRouteProps } from "../../../types/vehicle-drawer";
import { stringToBool, toQuery } from "../../../utils";
import AddBody from "./addBody";
import EditBody from "./editBody";

interface VehicleDrawerProps {}

/**
 * @description Wrapper for creating and editing vehicles
 * @return {React.FC<VehicleDrawer>}
 */
const VehicleDrawer: React.FC<VehicleDrawerProps> = (props) => {
	const { query, push, pathname } = useRouter();

	let { isAdding: isA, isEditing: isE } = query as DrawerRouteProps;

	// Drawer State.
	const isEditing = stringToBool(isE);
	const isAdding = stringToBool(isA);
	const isOpen = isEditing || isAdding || false;

	// Close the drawer.
	const onDrawerClose = () => {
		let newQuery = query as DrawerRouteProps;

		// Remove drawer varibles if they exist.
		if (newQuery.isAdding) delete newQuery.isAdding;
		if (newQuery.isEditing) delete newQuery.isEditing;

		// Push the new route to the dom.
		push(`${pathname}`);
	};

	const drawerOptions: DrawerConfigOpts = {
		placement: "left",
		size: "sm",
	};

	return (
		<Drawer isOpen={isOpen} onClose={onDrawerClose} {...drawerOptions}>
			<DrawerOverlay />
			<DrawerContent background={"background.800"}>
				{isEditing && <EditBody />} {isAdding && <AddBody />}
			</DrawerContent>
		</Drawer>
	);
};

export default VehicleDrawer;
