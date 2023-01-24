import {
	BarControllerChartOptions,
	ChartData,
	CoreChartOptions,
	DatasetChartOptions,
	ElementChartOptions,
	PluginChartOptions,
	ScaleChartOptions,
} from "chart.js";
import { _DeepPartialObject } from "chart.js/dist/types/utils";

export type DataSet = {
	label: string;
	data: any[];
	backgroundColor?: string;
};

export type DataSets = ChartData<"bar", any[], string>["datasets"];

export type GraphData = ChartData<"bar", any[], string>;

export type ChartOptions =
	| _DeepPartialObject<
			CoreChartOptions<"bar"> &
				ElementChartOptions<"bar"> &
				PluginChartOptions<"bar"> &
				DatasetChartOptions<"bar"> &
				ScaleChartOptions &
				BarControllerChartOptions
	  >
	| undefined;
