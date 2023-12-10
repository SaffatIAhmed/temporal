import { SetStateAction } from "react";
import { UserState } from "../state-management/reducers/UserReducer";

export interface ListingCardData {
	id: number;
	postedBy: number;
	suitNumber: string;
	street: string;
	neighborhood: string;
	city: string;
	state: string;
	zipcode: string;
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
	isSaved?: boolean;
}

export interface UserCardData {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	username: string;
	role: string;
}

export interface ArrayStateHandlers<T> {
	Create?: (data: T) => void;
	Delete?: (index: number, data: T) => void;
	Update?: (index: number, newState: T) => void;
	Set?: (state: T[]) => void;
}

export interface ListingContext {
	state: ListingCardData[];
	handlers: ArrayStateHandlers<ListingCardData>;
	canEdit: (user: UserState, listingCardData: ListingCardData) => boolean;
	canDelete: (user: UserState, listingCardData: ListingCardData) => boolean;
	canCheckout: (user: UserState, listingCardData: ListingCardData) => boolean;
	canSave: (user: UserState, listingCardData: ListingCardData) => boolean;
}
