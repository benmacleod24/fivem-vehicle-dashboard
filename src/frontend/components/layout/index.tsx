import { Container, Flex, LayoutProps as LP } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import VehicleDrawer from "../drawer";
import Navigation from "../navigation";

interface LayoutProps extends React.PropsWithChildren {
	wrapperSize?: LP["maxW"];
}

const Layout: React.FC<LayoutProps> = (props) => {
	return (
		<Flex w="100vw" h="100vh" flexDir={"column"}>
			<Navigation />
			<VehicleDrawer />
			<Container mx="auto" p="0" flexGrow={1} maxW={props.wrapperSize || "full"} pt="8">
				{props.children}
			</Container>
		</Flex>
	);
};

export default Layout;
