export interface ListingCardData {
	id: number;
	address: {
		street: string;
		neighborhood: string;
		city: string;
		state: string;
	};
	rent: number;
	isAvaliable: boolean;
}
