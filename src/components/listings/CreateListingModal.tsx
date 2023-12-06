import { useRef, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import moment from 'moment'

import "../../styles/App.scss";

interface CreateListingSchema {
    title: string,
    apartmentNumber: string,
    address: string,
    city: string,
    state: string,
    zipcode: string,
    bedrooms: string,
    bathrooms: string,
    monthlyRent: string,
    utilitiesAmt: string,
    listingType: string,
    startDate: string,
    endDate: string,
};

function CreateListingModal() {
    const formatDate = (date: string | number | Date) => {
        return moment(date).format("MM/DD/YYYY");
    }
    const schema = yup.object().shape({
        title: yup.string().matches(/^[a-zA-Z0-9 ,\-\(\)]*$/, "Title can contain only alphabet, digits, ',' ,'-', '(', ')'").max(60).required("Title is a required field"),
        apartmentNumber: yup.number().positive().required("Apartment Number is a required field"),
        address: yup.string().max(64).required("Address is a required field"),
        city: yup.string().matches(/^[a-zA-Z]*$/, "City must only contain alphabet").max(15).required("City is a required field"),
        state: yup.string().matches(/^[a-zA-Z]*$/, "State must only contain alphabet").required("State is a required field").length(2),
        zipcode: yup.string().required("Zipcode is a required field")
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(5, 'Must be exactly 5 digits')
            .max(5, 'Must be exactly 5 digits'),
        bedrooms: yup.number().required("Bedrooms is a required field").positive(),
        bathrooms: yup.number().required("Bathrooms is a required field").positive(),
        monthlyRent: yup.number().required("Monthly Rent is a required field").positive(),
        utilitiesAmt: yup.number().required("Utilities Amount is a required field").positive(),
        listingType: yup.string().required("Listing Type is a required field").oneOf(["Temporary", "Permanent"]),
        startDate: yup.date().required("Start Date is a required field").test('test-startDate', 'Start Date should be today or in future', (currDate: Date) => {
            const newDate = new Date();
            newDate.setHours(0, 0, 0, 0);
            const today = moment(newDate, "L", true);
            const parsed = moment(currDate, "L", true);
            return parsed.diff(today) >= 0;
        }),
        endDate: yup.date().required("End Date is a required field").min(yup.ref('startDate'), ({ min }) => `Date needs to be after ${formatDate(min)}`)
    });

    const formRef = useRef<FormikProps<CreateListingSchema> | null>();
    const [show, setShow] = useState(false);
    const handleFormSubmit = async (values: any) => {
        console.log(values);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
        const data = await response.json();
        console.log(data);
        setShow(false);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Add New Listing
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Listing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        innerRef={(f) => (formRef.current = f)}
                        validationSchema={schema}
                        onSubmit={handleFormSubmit}
                        initialValues={{
                            title: "",
                            apartmentNumber: "",
                            address: "",
                            city: "",
                            state: "",
                            zipcode: "",
                            bedrooms: "",
                            bathrooms: "",
                            monthlyRent: "",
                            utilitiesAmt: "",
                            listingType: "Permanent",
                            startDate: "",
                            endDate: "",
                        }}
                    >
                        {({ handleSubmit, handleChange, values, errors, setFieldValue, isValid }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <FloatingLabel controlId="floatingTitle" label="Title" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        value={values.title}
                                        onChange={handleChange}
                                        isInvalid={!!errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.title}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingApartmentNumber" label="Apartment Number" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="apartmentNumber"
                                        placeholder="Apartment Number"
                                        value={values.apartmentNumber}
                                        onChange={(event) => {
                                            handleChange(event);
                                            setFieldValue("apartmentNumber", event.target.value.replace(/\D/g, ''));
                                        }}
                                        isInvalid={!!errors.apartmentNumber}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.apartmentNumber}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingAddress" label="Address" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        value={values.address}
                                        onChange={handleChange}
                                        isInvalid={!!errors.address}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.address}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingCity" label="City" className="mb-3">
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
                                <FloatingLabel controlId="floatingState" label="State" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        value={values.state}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setFieldValue("state", e.target.value.toUpperCase());
                                        }}
                                        isInvalid={!!errors.state}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.state}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingZipcode" label="Zipcode" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="zipcode"
                                        placeholder="Zipcode"
                                        value={values.zipcode}
                                        onChange={(event) => {
                                            handleChange(event);
                                            setFieldValue("zipcode", event.target.value.replace(/\D/g, ''));
                                        }}
                                        isInvalid={!!errors.zipcode}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.zipcode}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingBedrooms" label="Bedrooms" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="bedrooms"
                                        placeholder="Bedrooms"
                                        value={values.bedrooms}
                                        onChange={(event) => {
                                            handleChange(event);
                                            setFieldValue("bedrooms", event.target.value.replace(/\D/g, ''));
                                        }}
                                        isInvalid={!!errors.bedrooms}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.bedrooms}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingBathrooms" label="Bathrooms" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="bathrooms"
                                        placeholder="Bathrooms"
                                        value={values.bathrooms}
                                        onChange={(event) => {
                                            handleChange(event);
                                            setFieldValue("bathrooms", event.target.value.replace(/\D/g, ''));
                                        }}
                                        isInvalid={!!errors.bathrooms}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.bathrooms}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingMonthlyRent" label="Monthly Rent($)" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="monthlyRent"
                                        placeholder="Monthly Rent"
                                        value={values.monthlyRent}
                                        onChange={(event) => {
                                            handleChange(event);
                                            setFieldValue("monthlyRent", event.target.value.replace(/\D/g, ''));
                                        }}
                                        isInvalid={!!errors.monthlyRent}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.monthlyRent}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingUtilitiesAmount" label="Utilities Amount($)" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="utilitiesAmt"
                                        placeholder="Utilities Amount"
                                        value={values.utilitiesAmt}
                                        onChange={(event) => {
                                            handleChange(event);
                                            setFieldValue("utilitiesAmt", event.target.value.replace(/\D/g, ''));
                                        }}
                                        isInvalid={!!errors.utilitiesAmt}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.utilitiesAmt}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingListingType" label="Listing Type" className="mb-3">
                                    <Form.Select>
                                        <option value="Temporary">Temporary</option>
                                        <option value="Permanent">Permanent</option>
                                    </Form.Select>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingStartDate" label="Start Date" className="mb-3">
                                    <Form.Control
                                        type="date"
                                        name="startDate"
                                        placeholder="Start Date"
                                        value={values.startDate}
                                        onChange={handleChange}
                                        isInvalid={!!errors.startDate}
                                        pattern='\d{2}/\d{2}/\d{4}'
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.startDate}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingEndDate" label="End Date" className="mb-3">
                                    <Form.Control
                                        type="date"
                                        name="endDate"
                                        placeholder="End Date"
                                        value={values.endDate}
                                        onChange={handleChange}
                                        isInvalid={!!errors.endDate}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.endDate}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                                <Button variant="primary" type="submit" disabled={!isValid}
                                >
                                    Create {formRef.current?.isValid}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal >
        </>
    );
}

export default CreateListingModal;