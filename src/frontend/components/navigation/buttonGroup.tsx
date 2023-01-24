import React, { useState, useEffect } from "react";
import { Button, ButtonGroup as BG, Container, Flex, Icon, Text } from "@chakra-ui/react";
import links from "../../../config/nav.json";
import Link from "next/link";

interface ButtonGroupProps {}

/**
 * @description
 * @return {React.FC<ButtonGroup>}
 */
const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
	return (
		<Flex h="full" align={"center"} ml="14">
			<BG variant={"brand.menu"} gap={5}>
				{Object.values(links).map((l) => (
					<Button as={Link} href={l.url}>
						{l.text}
					</Button>
				))}
			</BG>
		</Flex>
	);
};

export default ButtonGroup;
