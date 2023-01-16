import React, { useState, useEffect } from "react";
import Layout from "../../frontend/components/layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import {
	Code,
	Divider,
	Flex,
	Grid,
	IconButton,
	Image,
	Text,
	Tooltip,
	useToast,
} from "@chakra-ui/react";
import { toQuery } from "../../utils";
import SearchBar from "../../frontend/components/search-vehicles/search-bar";
import { vehiclelist } from "@prisma/client";
import { MdModeEditOutline } from "react-icons/md";
import Pagination from "../../frontend/components/pagination";

const format = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0,
});

interface SearchProps {}

const Search: React.FC<SearchProps> = (props) => {
	const toast = useToast();
	const { query } = useRouter();
	const [params, setParams] = useState<Record<string, string>>({});
	const [page, setPage] = useState<number>(1);
	const { data, isLoading } = useSWR(
		`/api/vehicles?page=${query.page || page || 1}&${toQuery(params)}&perPage=8`
	);

	return (
		<Layout wrapperSize={"container.xl"}>
			<Flex mt="10" flexDir={"column"}>
				<SearchBar setParams={setParams} isLoading={isLoading} />

				<Grid templateColumns={"repeat(2, 1fr)"} gap={3} mt="10">
					{data &&
						data.data.map((v: vehiclelist) => {
							const brandInDisplayName = v.displayName
								.split(" ")
								.includes(v.vehicleBrand);

							return (
								<Flex
									w="full"
									p="3"
									bg="background.700"
									rounded={"md"}
									boxShadow="base"
									border="1px solid"
									borderColor={brandInDisplayName ? "red.300" : "rgba(0,0,0,0.0)"}
								>
									<Flex
										w="30%"
										rounded={"md"}
										h="28"
										backgroundImage={`url(/api/cdn/vehicle/${v.model})`}
										bgPos="center"
										bgSize={"cover"}
										bgRepeat="no-repeat"
									/>
									<Flex w="full" p="3" flexDir={"column"}>
										<Flex justifyContent={"space-between"}>
											<Text fontWeight={"semibold"}>
												{v.vehicleBrand} {v.displayName}
											</Text>
											<Flex gap={2}>
												<IconButton
													aria-label="edit"
													size="sm"
													rounded={"full"}
													variant="ghost"
													icon={<MdModeEditOutline />}
												/>
												<Tooltip
													label="Click to Copy"
													color="white"
													bg="background.500"
													placement={"left"}
													fontWeight="normal"
													rounded={"md"}
													hasArrow
												>
													<Flex
														alignItems={"center"}
														cursor={"pointer"}
														px="2"
														bg="background.500"
														boxShadow={"base"}
														rounded="md"
														onClick={() => {
															{
															}
															navigator.clipboard.writeText(v.model);
															toast({
																position: "bottom-right",
																title: "Successfully Copied",
																description: `Copied model name to clipboard.`,
																size: "sm",
																status: "success",
															});
														}}
													>
														<code>{v.model}</code>
													</Flex>
												</Tooltip>
											</Flex>
										</Flex>

										<Divider my="2" />

										<Grid
											templateColumns={"repeat(3, 1fr)"}
											fontSize="sm"
											gap={1}
										>
											<Text>Stock: {v.stock}</Text>
											<Text>{v.released ? "Released" : "Not Released"}</Text>
											<Text># of Seats: {v.seats}</Text>
											<Text>MSRP: {format.format(v.price)}</Text>
											<Text>Style: {v.style}</Text>
											<Text>Class: S+</Text>
										</Grid>
									</Flex>
								</Flex>
							);
						})}
				</Grid>
				<pre>
					{data && data.pagination && JSON.stringify(data.pagination.page, null, 2)}
				</pre>
			</Flex>
		</Layout>
	);
};

export default Search;
