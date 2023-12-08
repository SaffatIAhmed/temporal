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

export interface UserCardData {
	firstName: string;
	lastName: string;
}
