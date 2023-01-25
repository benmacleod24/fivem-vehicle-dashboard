import React, { useState, useEffect } from "react";
import Layout from "../frontend/components/layout";
import VehicleCard from "../frontend/components/vehicleCard";

interface SearchProps {}

/**
 * @description Search page.
 * @return {React.FC<Search>}
 */
const Search: React.FC<SearchProps> = (props) => {
	return (
		<Layout wrapperSize={"container.xl"}>
			<VehicleCard />
		</Layout>
	);
};

export default Search;
