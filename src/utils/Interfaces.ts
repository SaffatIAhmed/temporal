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

export interface UserCardData {
	firstName: string;
	lastName: string;
}
