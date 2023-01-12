import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Layout from "../frontend/components/layout";
import { Container, Flex, Text, Icon, Button, ButtonGroup } from "@chakra-ui/react";
import { MdOfflineBolt } from "react-icons/md";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return <Layout></Layout>;
}
