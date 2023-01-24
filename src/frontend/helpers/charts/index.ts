import React from "react";
import useSWR from "swr";
import { AvgVehiclePriceByStyle } from "../../../pages/api/stats/avgVehiclePriceByStyle";
import { MostCommonVehicleBought } from "../../../pages/api/stats/mostCommonVehicleBought";
import { DataSets } from "../../../types";

export const getAvgVehPricePerClass = () => {
	const { data, error, isLoading } = useSWR<AvgVehiclePriceByStyle>(
		`/api/stats/avgVehiclePriceByStyle`
	);

	// Memoize each label.
	const graphLabels = React.useMemo(() => {
		if (!data) return [];

		// Return each style.
		return data.map((v) => v.style);
	}, [data]);

	const graphData = React.useMemo<DataSets>(() => {
		return [
			{
				label: "Vehicles",
				data: (data && data.map((v) => v._avg.price)) || [],
				borderRadius: 4,
				backgroundColor: "#E1515F",
				hoverBackgroundColor: "#E4626F",
			},
		];
	}, [data]);

	//@ts-ignore
	return {
		graphLabels,
		graphData,
		data,
	};
};

export const getMostCommenVehicleBought = () => {
	const { data, error, isLoading } = useSWR<MostCommonVehicleBought>(
		`/api/stats/mostCommonVehicleBought`
	);

	// Memoize each label.
	//@ts-ignore
	const graphLabels = React.useMemo<string[]>(() => {
		if (!data) return [];

		// Return each style.
		return data.map((v) => v.model);
	}, [data]);

	const graphData = React.useMemo<DataSets>(() => {
		return [
			{
				label: "Vehicles",
				data: (data && data.map((v) => v._count.model)) || [],
				borderRadius: 4,
				backgroundColor: "#E1515F",
				hoverBackgroundColor: "#E4626F",
			},
		];
	}, [data]);

	//@ts-ignore
	return {
		graphLabels,
		graphData,
		data,
	};
};
