import { Button, Flex, useRadio } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

interface NavRightSideProps {}

/**
 * @description Right side of the navigation bar.
 * @return {React.FC<NavRightSide>}
 */
const NavRightSide: React.FC<NavRightSideProps> = (props) => {
	const { pathname, push } = useRouter();
	const { status } = useSession();

	// Handle request to add new vehicle.
	const onAddVehicle = () => {
		push(`${pathname}?isAdding=true`);
	};

	return (
		<Flex h="full" align={"center"} gap={5}>
			<Button size="sm" variant={"brand.menu"} onClick={onAddVehicle}>
				Add Vehicle
			</Button>
			<Button variant={"brand"} size="sm" onClick={() => signOut}>
				Sign Out
			</Button>
		</Flex>
	);
};

export default NavRightSide;
