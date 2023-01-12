import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
	variants: {
		brand: {
			bg: "brand.800",
			_hover: {
				bg: "brand.700",
			},
			_focus: {
				bg: "brand.900",
			},
			borderColor: "brand.600",
			border: "1px solid",
		},
		"brand.menu": {
			variant: "unstyled",
			fontWeight: "medium",
			w: "20",
			h: "7",
			_hover: { color: "whiteAlpha.700" },
			outline: "none",
			borderColor: "rgba(0,0,0,0.0)",
		},
	},
	baseStyle: {
		fontWeight: "medium",
	},
};
