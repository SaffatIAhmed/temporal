/*
export interface ListingCardData {
	_id: string,
	postedBy: string,
	title: string,
	apartmentNumber: string,
	address: string,
	city: string,
	state: string,
	zipcode: number,
	bedrooms: number,
	bathrooms: number,
	monthlyRent: number,
	utilitiesAmt: number,
	listingType: string,
	startDate: string,
	endDate: string
}
*/

export interface ListingCardData {
	_id: string,
	postedBy: string,
	title: string,
	apartmentNumber: string,
	address: string,
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
