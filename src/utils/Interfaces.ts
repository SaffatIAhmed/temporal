export interface ListingCardData {
	id: number;
	postedBy: number;
	suitNumber: string;
	street: string;
	neighborhood: string;
	city: string;
	state: string;
	zipcode: number;
	bedrooms: number;
	bathrooms: number;
	rent: number;
	utilities: number;
	privateRoom: boolean;
	prefGender: "male" | "female" | "other" | "any";
	moveInDate: string;
	moveOutDate: string;
	// TODO
	heatingCooling?: boolean;
	laundryDryer?: boolean;
	internet?: boolean;
	carParking?: boolean;
	tv?: boolean;
	gym?: boolean;
	pool?: boolean;
	patio?: boolean;
	bath?: boolean;
	allowedPets?: boolean;
	allowedSmoking?: boolean;
	allowedGuests?: boolean;
	quietHoursStart?: string;
	quietHoursEnd?: string;
}

export interface UserCardData {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	username: string;
	role: string;
}
