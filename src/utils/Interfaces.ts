export interface ListingCardData {
	id: string,
	posted_by: string,
	suit_number: string,
	street: string,
	neighborhood: string,
	city: string,
	state: string,
	zipcode: string,
	bedrooms: number,
	bathrooms: number,
	rent: number,
	utilities: number,
	pref_gender: string,
	is_private_room: string,
	move_in_date: string,
	move_out_date: string
}

export interface UserCardData {
	firstName: string;
	lastName: string;
}
