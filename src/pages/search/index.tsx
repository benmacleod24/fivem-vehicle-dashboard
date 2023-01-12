import React, { useState, useEffect } from "react";
import Layout from "../../frontend/components/layout";
import useSWR from "swr";
import { useRouter } from "next/router";

interface SearchProps {}

const Search: React.FC<SearchProps> = (props) => {
	const { query } = useRouter();
	const { data } = useSWR(`/api/vehicles?page=${query.page || 1}`);
	return (
		<Layout>
			Search Bro! <pre>{JSON.stringify(data, null, 2)}</pre>
		</Layout>
	);
};

export default Search;
