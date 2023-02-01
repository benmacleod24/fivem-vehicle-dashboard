import { DrawerProps } from "@chakra-ui/react";

export type DrawerConfigOpts = Omit<DrawerProps, "isOpen" | "onClose" | "children">;

export type DrawerRouteProps = {
	isEditing?: string;
	isAdding?: string;
};
