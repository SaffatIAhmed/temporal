import { useRef } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import moment from "moment";

import "../../styles/App.scss";
import { ListingCardData } from "../../utils/Interfaces";
import axios from "axios";

interface CreateListingProps {
	data?: ListingCardData;
	showModal: boolean;
	handleClose: () => any;
}

interface CreateListingSchema {
	suiteNumber: string;
	street: string;
	neighborhood: string;
	city: string;
	state: string;
	zipcode: string;
	bedrooms: string;
	bathrooms: string;
	rent: string;
	utilities: string;
	prefGender: string;
	isPrivateRoom: string;
	heatingCooling: string;
	laundryDryer: string;
	internet: string;
	carParking: string;
	tv: string;
	gym: string;
	pool: string;
	patio: string;
	bath: string;
	allowedPets: string;
	allowedSmoking: string;
	allowedGuests: string;
	quietHoursStart: string;
	quietHoursEnd: string;
	moveInDate: string;
	moveOutDate: string;
}

function CreateListingModal(props: CreateListingProps) {
	const formatDate = (date: string | number | Date) => {
		return moment(date).format("MM/DD/YYYY");
	};

	const schema = yup.object().shape({
		street: yup.string().max(64).required("Street is a required field"),
		neigborhood: yup
			.string()
			.max(64)
			.required("Neigborhood is a required field"),
		suiteNumber: yup
			.number()
			.positive()
			.required("Suite Number is a required field"),
		address: yup.string().max(64).required("Address is a required field"),
		city: yup
			.string()
			.matches(/^[a-zA-Z]*$/, "City must only contain alphabet")
			.max(15)
			.required("City is a required field"),
		state: yup
			.string()
			.matches(/^[a-zA-Z]*$/, "State must only contain alphabet")
			.required("State is a required field")
			.length(2),
		zipcode: yup
			.string()
			.required("Zipcode is a required field")
			.matches(/^[0-9]+$/, "Must be only digits")
			.min(5, "Must be exactly 5 digits")
			.max(5, "Must be exactly 5 digits"),
		bedrooms: yup
			.number()
			.required("Bedrooms is a required field")
			.positive(),
		bathrooms: yup
			.number()
			.required("Bathrooms is a required field")
			.positive(),
		rent: yup
			.number()
			.required("Monthly Rent is a required field")
			.positive(),
		utilities: yup
			.number()
			.required("Utilities Amount is a required field")
			.positive(),
		prefGender: yup
			.string()
			.max(64)
			.required("Preferred Gender is a required field"),
		isPrivateRoom: yup
			.boolean()
			.required("Private Room is a required field"),
		heatingCooling: yup
			.boolean()
			.required("Heating & Cooling is a required field"),
		laundryDryer: yup
			.boolean()
			.required("Laundry & Dryer is a required field"),
		internet: yup.boolean().required("Internet is a required field"),
		carParking: yup.boolean().required("Car Parking is a required field"),
		tv: yup.boolean().required("TV is a required field"),
		gym: yup.boolean().required("Gym is a required field"),
		pool: yup.boolean().required("Pool is a required field"),
		patio: yup.boolean().required("Patio is a required field"),
		bath: yup.boolean().required("Bathtub is a required field"),
		allowedPets: yup.boolean().required("Pets Allowed is a required field"),
		allowedSmoking: yup
			.boolean()
			.required("Smoking Allowed is a required field"),
		allowedGuests: yup
			.boolean()
			.required("Guests Allowed is a required field"),
		quietHoursStart: yup
			.string()
			.max(64)
			.required("Quiet Hours Start is a required field"),
		quietHoursEnd: yup
			.string()
			.max(64)
			.required("Quiet Hours End is a required field"),
		moveInDate: yup
			.date()
			.required("Move In Date is a required field")
			.test(
				"test-moveInDate",
				"Move In Date should be today or in future",
				(currDate: Date) => {
					const newDate = new Date();
					newDate.setHours(0, 0, 0, 0);
					const today = moment(newDate, "L", true);
					const parsed = moment(currDate, "L", true);
					return parsed.diff(today) >= 0;
				}
			),
		moveOutDate: yup
			.date()
			.required("Move Out Date is a required field")
			.min(
				yup.ref("moveInDate"),
				({ min }) => `Date needs to be after ${formatDate(min)}`
			),
	});

	const formRef = useRef<FormikProps<CreateListingSchema> | null>();
	const handleFormSubmit = async (values: any) => {
		axios.post("http://localhost:3000/listings", values);
	};

	const listingInitalValues = {
		suiteNumber: props.data?.suitNumber || "",
		street: props.data?.street || "",
		neighborhood: props.data?.neighborhood || "",
		city: props.data?.city || "",
		state: props.data?.state || "",
		zipcode: props.data?.zipcode || "",
		bedrooms: props.data?.bedrooms.toString() || "",
		bathrooms: props.data?.bathrooms.toString() || "",
		rent: props.data?.rent.toString() || "",
		utilities: props.data?.utilities.toString() || "",
		prefGender: props.data?.prefGender || "",
		isPrivateRoom: props.data?.isPrivateRoom.toString() || "",
		heatingCooling: props.data?.heatingCooling?.toString() || "",
		laundryDryer: props.data?.laundryDryer?.toString() || "",
		internet: props.data?.internet?.toString() || "",
		carParking: props.data?.carParking?.toString() || "",
		tv: props.data?.tv?.toString() || "",
		gym: props.data?.gym?.toString() || "",
		pool: props.data?.pool?.toString() || "",
		patio: props.data?.patio?.toString() || "",
		bath: props.data?.bath?.toString() || "",
		allowedPets: props.data?.allowedPets?.toString() || "",
		allowedSmoking: props.data?.allowedSmoking?.toString() || "",
		allowedGuests: props.data?.allowedGuests?.toString() || "",
		quietHoursStart: props.data?.quietHoursStart || "",
		quietHoursEnd: props.data?.quietHoursEnd || "",
		moveInDate: props.data?.moveInDate || "",
		moveOutDate: props.data?.moveOutDate || "",
	};

	return (
		<>
			<Modal show={props.showModal} onHide={props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title
						style={{ marginBlock: -8, fontWeight: "bold" }}
					>
						Create New Listing
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Formik
						innerRef={f => (formRef.current = f)}
						validationSchema={schema}
						onSubmit={handleFormSubmit}
						initialValues={listingInitalValues}
					>
						{({
							handleSubmit,
							handleChange,
							values,
							errors,
							setFieldValue,
							isValid,
						}) => (
							<Form
								noValidate
								onSubmit={handleSubmit}
								style={{ width: 430, paddingLeft: 32 }}
							>
								<div
									style={{
										display: "flex",
										gap: 16,
									}}
								>
									<FloatingLabel
										controlId="floatingStreet"
										label="Street"
										className="mb-3"
									>
										<Form.Control
											type="text"
											name="street"
											placeholder="Street"
											value={values.street}
											onChange={handleChange}
											isInvalid={!!errors.street}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.street}
										</Form.Control.Feedback>
									</FloatingLabel>
									<FloatingLabel
										controlId="floatingSuiteNumber"
										label="Suite Number"
										className="mb-3"
									>
										<Form.Control
											type="text"
											name="suiteNumber"
											placeholder="Suite Number"
											value={values.suiteNumber}
											onChange={event => {
												handleChange(event);
												setFieldValue(
													"suiteNumber",
													event.target.value.replace(
														/\D/g,
														""
													)
												);
											}}
											isInvalid={!!errors.suiteNumber}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.suiteNumber}
										</Form.Control.Feedback>
									</FloatingLabel>
								</div>

								<FloatingLabel
									controlId="floatingNeighborhood"
									label="Neighborhood"
									className="mb-3"
								>
									<Form.Control
										type="text"
										name="neighborhood"
										placeholder="Neighborhood"
										value={values.neighborhood}
										onChange={handleChange}
										isInvalid={!!errors.neighborhood}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.neighborhood}
									</Form.Control.Feedback>
								</FloatingLabel>
								<div
									style={{
										marginBottom: 32,
										display: "flex",
										gap: 16,
									}}
								>
									<FloatingLabel
										controlId="floatingCity"
										label="City"
										className="mb-3"
									>
										<Form.Control
											type="text"
											name="city"
											placeholder="City"
											value={values.city}
											onChange={handleChange}
											isInvalid={!!errors.city}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.city}
										</Form.Control.Feedback>
									</FloatingLabel>
									<FloatingLabel
										controlId="floatingState"
										label="State"
										className="mb-3"
									>
										<Form.Control
											type="text"
											name="state"
											placeholder="State"
											value={values.state}
											onChange={e => {
												handleChange(e);
												setFieldValue(
													"state",
													e.target.value.toUpperCase()
												);
											}}
											isInvalid={!!errors.state}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.state}
										</Form.Control.Feedback>
									</FloatingLabel>
									<FloatingLabel
										controlId="floatingZipcode"
										label="Zipcode"
										className="mb-3"
									>
										<Form.Control
											type="text"
											name="zipcode"
											placeholder="Zipcode"
											value={values.zipcode}
											onChange={event => {
												handleChange(event);
												setFieldValue(
													"zipcode",
													event.target.value.replace(
														/\D/g,
														""
													)
												);
											}}
											isInvalid={!!errors.zipcode}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.zipcode}
										</Form.Control.Feedback>
									</FloatingLabel>
								</div>

								<div
									style={{
										display: "flex",
										gap: 16,
									}}
								>
									<FloatingLabel
										controlId="floatingBedrooms"
										label="Bedrooms"
										className="mb-3"
									>
										<Form.Control
											type="text"
											name="bedrooms"
											placeholder="Bedrooms"
											value={values.bedrooms}
											onChange={event => {
												handleChange(event);
												setFieldValue(
													"bedrooms",
													event.target.value.replace(
														/\D/g,
														""
													)
												);
											}}
											isInvalid={!!errors.bedrooms}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.bedrooms}
										</Form.Control.Feedback>
									</FloatingLabel>
									<FloatingLabel
										controlId="floatingBathrooms"
										label="Bathrooms"
										className="mb-3"
									>
										<Form.Control
											type="text"
											name="bathrooms"
											placeholder="Bathrooms"
											value={values.bathrooms}
											onChange={event => {
												handleChange(event);
												setFieldValue(
													"bathrooms",
													event.target.value.replace(
														/\D/g,
														""
													)
												);
											}}
											isInvalid={!!errors.bathrooms}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.bathrooms}
										</Form.Control.Feedback>
									</FloatingLabel>
								</div>
								<div
									style={{
										marginBottom: 32,
										display: "flex",
										gap: 16,
									}}
								>
									<FloatingLabel
										controlId="floatingRent"
										label="Rent ($)"
										className="mb-3"
									>
										<Form.Control
											type="text"
											name="rent"
											placeholder="Rent"
											value={values.rent}
											onChange={event => {
												handleChange(event);
												setFieldValue(
													"rent",
													event.target.value.replace(
														/\D/g,
														""
													)
												);
											}}
											isInvalid={!!errors.rent}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.rent}
										</Form.Control.Feedback>
									</FloatingLabel>
									<FloatingLabel
										controlId="floatingUtilities"
										label="Utilities ($)"
										className="mb-3"
									>
										<Form.Control
											type="text"
											name="utilities"
											placeholder="Utilities"
											value={values.utilities}
											onChange={event => {
												handleChange(event);
												setFieldValue(
													"utilities",
													event.target.value.replace(
														/\D/g,
														""
													)
												);
											}}
											isInvalid={!!errors.utilities}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.utilities}
										</Form.Control.Feedback>
									</FloatingLabel>
								</div>

								<FloatingLabel
									controlId="floatingPreferredGender"
									label="Preferred Gender"
									className="mb-3"
								>
									<Form.Control
										type="text"
										name="prefGender"
										placeholder="Preferred Gender"
										value={values.prefGender}
										onChange={handleChange}
										isInvalid={!!errors.prefGender}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.prefGender}
									</Form.Control.Feedback>
								</FloatingLabel>
								<div
									style={{
										marginBottom: 16,
										display: "flex",
										justifyContent: "space-around",
									}}
								>
									<div>
										<Form.Check
											name="isPrivateRoom"
											label="Private Room"
											value={values.isPrivateRoom}
											onChange={handleChange}
										/>
										<Form.Check
											name="heatingCooling"
											label="Heating & Cooling"
											value={values.heatingCooling}
											onChange={handleChange}
										/>
										<Form.Check
											name="laundryDryer"
											label="Laundry & Dryer"
											value={values.laundryDryer}
											onChange={handleChange}
										/>
										<Form.Check
											name="internet"
											label="Internet"
											value={values.internet}
											onChange={handleChange}
										/>
										<Form.Check
											name="carParking"
											label="Car Parking"
											value={values.carParking}
											onChange={handleChange}
										/>
									</div>
									<div>
										<Form.Check
											name="tv"
											label="TV"
											value={values.tv}
											onChange={handleChange}
										/>
										<Form.Check
											name="gym"
											label="Gym"
											value={values.gym}
											onChange={handleChange}
										/>
										<Form.Check
											name="pool"
											label="Pool"
											value={values.pool}
											onChange={handleChange}
										/>
										<Form.Check
											name="patio"
											label="Patio"
											value={values.patio}
											onChange={handleChange}
										/>
										<Form.Check
											name="bath"
											label="Bath"
											value={values.bath}
											onChange={handleChange}
										/>
									</div>
									<div>
										<Form.Check
											name="allowedPets"
											label="Pets Allowed"
											value={values.allowedPets}
											onChange={handleChange}
										/>
										<Form.Check
											name="allowedSmoking"
											label="Smoking Allowed"
											value={values.allowedSmoking}
											onChange={handleChange}
										/>
										<Form.Check
											name="allowedGuests"
											label="Guests Allowed"
											value={values.allowedGuests}
											onChange={handleChange}
										/>
									</div>
								</div>
								<div style={{ display: "flex", gap: 16 }}>
									<FloatingLabel
										controlId="floatingQuietHoursStart"
										label="Quiet Hours Start Time"
										className="mb-3"
									>
										<Form.Control
											type="text"
											name="quietHoursStart"
											placeholder="QuietHoursStart"
											value={values.quietHoursStart}
											onChange={handleChange}
											isInvalid={!!errors.quietHoursStart}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.quietHoursStart}
										</Form.Control.Feedback>
									</FloatingLabel>
									<FloatingLabel
										controlId="floatingQuietHoursEnd"
										label="Quiet Hours End Time"
										className="mb-3"
									>
										<Form.Control
											type="text"
											name="quietHoursEnd"
											placeholder="QuietHoursEnd"
											value={values.quietHoursEnd}
											onChange={handleChange}
											isInvalid={!!errors.quietHoursEnd}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.quietHoursEnd}
										</Form.Control.Feedback>
									</FloatingLabel>
								</div>
								<div
									style={{
										display: "flex",
										gap: 16,
									}}
								>
									<FloatingLabel
										controlId="floatingmoveInDate"
										label="Move In Date"
										className="mb-3"
									>
										<Form.Control
											type="date"
											name="moveInDate"
											placeholder="Move In Date"
											value={values.moveInDate}
											onChange={handleChange}
											isInvalid={!!errors.moveInDate}
											pattern="\d{2}/\d{2}/\d{4}"
											style={{ width: 191 }}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.moveInDate}
										</Form.Control.Feedback>
									</FloatingLabel>
									<FloatingLabel
										controlId="floatingmoveOutDate"
										label="Move Out Date"
										className="mb-3"
									>
										<Form.Control
											type="date"
											name="moveOutDate"
											placeholder="Move Out Date"
											value={values.moveOutDate}
											onChange={handleChange}
											isInvalid={!!errors.moveOutDate}
											style={{ width: 191 }}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.moveOutDate}
										</Form.Control.Feedback>
									</FloatingLabel>
								</div>

								<Button
									variant="primary"
									type="submit"
									disabled={!isValid}
								>
									Create {formRef.current?.isValid}
								</Button>
							</Form>
						)}
					</Formik>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default CreateListingModal;
