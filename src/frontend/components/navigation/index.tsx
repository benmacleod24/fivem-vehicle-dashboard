import {
	Button,
	ButtonGroup,
	Container,
	Flex,
	Icon,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { MdOfflineBolt } from "react-icons/md";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = (props) => {
	return (
		<Flex h="20" bg="background.700">
			<Container maxW="container.xl" as={Flex}>
				<Flex h="full" align="center">
					<Icon
						as={MdOfflineBolt}
						fontSize="6xl"
						color="brand.700"
					/>

					<Flex flexDir={"column"} fontSize="sm" ml="2.5">
						<Text fontSize={"sm"} color="whiteAlpha.700">
							@bolt-labs/project
						</Text>
						<Text
							fontSize={"md"}
							fontWeight="semibold"
							color="whiteAlpha.800"
						>
							Infinite FiveM Vehicle Dashboard
						</Text>
					</Flex>
				</Flex>
				<Flex h="full" align={"center"} ml="14">
					<ButtonGroup variant={"brand.menu"} gap={5}>
						<Link href={"/"}>
							<Button>Home</Button>
						</Link>
						<Link href="/search">
							<Button>Vehicle Search</Button>
						</Link>
					</ButtonGroup>
				</Flex>
			</Container>
		</Flex>
	);
};

export default Navigation;
