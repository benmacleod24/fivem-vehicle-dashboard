import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "../../../types";
import { DataSet } from "../../../types";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	Colors,
	ChartData,
} from "chart.js";
import { format } from "../../../utils";
import { Flex, Text } from "@chakra-ui/react";

// Register ChatJS Components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Colors);

interface BarChartProps {
	title: string;
	labels: string[];
	data: ChartData<"bar", any[], string>["datasets"];
	stepSize?: number;
	tickCallback?: (v: any) => string;
	yAxisLabel?: string;
}

/**
 * @description
 * @return {React.FC<BarChart>}
 */
const BarChart: React.FC<BarChartProps> = (props) => {
	const options: ChartOptions = {
		responsive: true,

		scales: {
			x: {
				grid: {
					display: false,
				},
			},
			y: {
				grid: {
					color: "#363A45",
				},
				title: {
					text: props.yAxisLabel,
					display: Boolean(props.yAxisLabel),
				},
				ticks: {
					stepSize: props.stepSize || 40000,
					callback: props.tickCallback || ((v: any) => v),
				},
				border: {
					color: "#363A45",
				},
			},
		},

		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
		},
	};

	const graphData: ChartData<"bar", any[], string> = {
		labels: props.labels,
		datasets: props.data,
	};

	return (
		<Flex
			flexDir={"column"}
			align="center"
			gap={5}
			p="5"
			bg="background.700"
			border="1px solid"
			borderColor={"background.600"}
			borderRadius="md"
			boxShadow={"base"}
		>
			<Text fontSize="lg" fontWeight={"semibold"} color="whiteAlpha.800">
				{props.title}
			</Text>
			{/* @ts-ignore */}
			<Bar options={options} data={graphData} />
		</Flex>
	);
};

export default BarChart;
