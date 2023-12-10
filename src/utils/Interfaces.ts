import { StringSchema } from "yup";

export interface ListingCardData {
	_id: string,
	postedBy: string,
	suiteNumber: string,
	street: string,
	neighborhood: string,
	city: string,
	state: string,
	zipcode: string,
	bedrooms: number,
	bathrooms: number,
	rent: number,
	utilities: number,
	prefGender: string,
	privateRoom: boolean,
	heatingCooling: boolean,
	laundryDryer: boolean,
	internet: boolean,
	carParking: boolean,
	tv: boolean,
	gym: boolean,
	pool: boolean,
	patio: boolean,
	bath: boolean,
	allowedPets: boolean,
	allowedSmoking: boolean,
	allowedGuests: boolean,
	quietHoursStart: string,
	quietHoursEnd: string,
	startDate: string,
	endDate: string
}

export interface UserCardData {
	firstName: string;
	lastName: string;
}
