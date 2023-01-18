export const validators = {
	seats: (v: string) => {
		const valueAsNumber = Number(v);
		return isNaN(valueAsNumber);
	},
};
