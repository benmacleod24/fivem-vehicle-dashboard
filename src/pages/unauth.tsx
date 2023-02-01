import { Button, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";

interface UnauthProps {}

/**
 * @description
 * @return {React.FC<Unauth>}
 */
const Unauth: React.FC<UnauthProps> = (props) => {
	return (
		<Flex>
			Get the fuck out, give it a try bud.{" "}
			<Button
				onClick={() =>
					signIn("discord", {
						callbackUrl: "/",
					})
				}
			>
				Sign In
			</Button>
		</Flex>
	);
};

export default Unauth;
