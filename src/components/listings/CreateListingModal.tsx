import { useRef, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import moment from "moment";

import "../../styles/App.scss";
import { ListingCardData } from "../../utils/Interfaces";

interface CreateListingSchema {
  suit_number: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  bedrooms: string;
  bathrooms: string;
  rent: string;
  utilities: string;
  pref_gender: string;
  is_private_room: string;
  move_in_date: string;
  move_out_date: string;
}

interface CreateListingProps {
  data?: ListingCardData;
  showModal: boolean;
  handleClose: () => any;
}

function CreateListingModal(props: CreateListingProps) {
  const formatDate = (date: string | number | Date) => {
    return moment(date).format("MM/DD/YYYY");
  };
  const schema = yup.object().shape({
    //title: yup.string().matches(/^[a-zA-Z0-9 ,\-\(\)]*$/, "Title can contain only alphabet, digits, ',' ,'-', '(', ')'").max(60).required("Title is a required field"),
    suit_number: yup
      .number()
      .positive()
      .required("Suite Number is a required field"),
    //address: yup.string().max(64).required("Address is a required field"),
    street: yup.string().max(64).required("Street is a required field"),
    neighborhood: yup
      .string()
      .max(64)
      .required("Neighborhood is a required field"),
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
    bedrooms: yup.number().required("Bedrooms is a required field").positive(),
    bathrooms: yup
      .number()
      .required("Bathrooms is a required field")
      .positive(),
    rent: yup.number().required("Monthly Rent is a required field").positive(),
    utilities: yup
      .number()
      .required("Utilities Amount is a required field")
      .positive(),
    //listingType: yup.string().required("Listing Type is a required field").oneOf(["Temporary", "Permanent"]),
    pref_gender: yup
      .string()
      .required("Preffered Gender is a required field")
      .oneOf(["Male", "Female", "Any"]),
    is_private_room: yup
      .string()
      .required("Is Private Room is a required field")
      .oneOf(["Yes", "No"]),
    move_in_date: yup
      .date()
      .required("Start Date is a required field")
      .test(
        "test-startDate",
        "Start Date should be today or in future",
        (currDate: Date) => {
          const newDate = new Date();
          newDate.setHours(0, 0, 0, 0);
          const today = moment(newDate, "L", true);
          const parsed = moment(currDate, "L", true);
          return parsed.diff(today) >= 0;
        }
      ),
    move_out_date: yup
      .date()
      .required("End Date is a required field")
      //.min(
        //yup.ref("startDate"),
        //({ min }) => `Date needs to be after ${formatDate(min)}`
      //),
  });

  const formRef = useRef<FormikProps<CreateListingSchema> | null>(); //| null
  const [show, setShow] = useState(false);
  const handleFormSubmit = async (values: any) => {
    console.log("Values: " + values);
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const data = await response.json();
    console.log(data);
    setShow(false);
  };

  var listingInitalValues = {
    suit_number: "",
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    zipcode: "",
    bedrooms: "",
    bathrooms: "",
    rent: "",
    utilities: "",
    pref_gender: "",
    is_private_room: "",
    move_in_date: "",
    move_out_date: "",
  };

  if ("data" in props) {
    console.log("yay data is here");
    listingInitalValues = {
      suit_number: "3526",
      street: "800 W Renner Rd",
      neighborhood: "Marquis at waterview",
      city: "Richardson",
      state: "TX",
      zipcode: "75080",
      bedrooms: "2",
      bathrooms: "2",
      rent: "450",
      utilities: "50",
      pref_gender: "Male",
      is_private_room: "false",
      move_in_date: "2024-01-01T00:00:00.000Z",
      move_out_date: "2024-03-01T00:00:00.000Z",
    };
  } else {
    console.log("Aw no data");
  }

  //const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);
  return (
    <Modal show={props.showModal} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Listing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          innerRef={(f) => (formRef.current = f)}
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
            <Form noValidate onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="floatingSuitNumber"
                label="Suit Number"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="suit_number"
                  placeholder="Suit Number"
                  value={values.suit_number}
                  onChange={(event) => {
                    handleChange(event);
                    setFieldValue(
                      "suit_number",
                      event.target.value.replace(/\D/g, "")
                    );
                  }}
                  isInvalid={!!errors.suit_number}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.suit_number}
                </Form.Control.Feedback>
              </FloatingLabel>
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
                  onChange={(event) => {
                    handleChange(event);
                    setFieldValue(
                      "zipcode",
                      event.target.value.replace(/\D/g, "")
                    );
                  }}
                  isInvalid={!!errors.zipcode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.zipcode}
                </Form.Control.Feedback>
              </FloatingLabel>
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
                  onChange={(event) => {
                    handleChange(event);
                    setFieldValue(
                      "bedrooms",
                      event.target.value.replace(/\D/g, "")
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
                  onChange={(event) => {
                    handleChange(event);
                    setFieldValue(
                      "bathrooms",
                      event.target.value.replace(/\D/g, "")
                    );
                  }}
                  isInvalid={!!errors.bathrooms}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.bathrooms}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingRent"
                label="Monthly Rent($)"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="rent"
                  placeholder="Rent"
                  value={values.rent}
                  onChange={(event) => {
                    handleChange(event);
                    setFieldValue(
                      "rent",
                      event.target.value.replace(/\D/g, "")
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
                label="Utilities Amount($)"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="utilities"
                  placeholder="Utilities"
                  value={values.utilities}
                  onChange={(event) => {
                    handleChange(event);
                    setFieldValue(
                      "utilities",
                      event.target.value.replace(/\D/g, "")
                    );
                  }}
                  isInvalid={!!errors.utilities}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.utilities}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPrefGender"
                label="Listing Type"
                className="mb-3"
              >
                <Form.Select>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Any">Any</option>
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPrivateRoom"
                label="Listing Type"
                className="mb-3"
              >
                <Form.Select>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingStartDate"
                label="Start Date"
                className="mb-3"
              >
                <Form.Control
                  type="date"
                  name="move_in_date"
                  placeholder="Move In Date"
                  value={values.move_in_date}
                  onChange={handleChange}
                  isInvalid={!!errors.move_in_date}
                  pattern="\d{2}/\d{2}/\d{4}"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.move_in_date}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingEndDate"
                label="End Date"
                className="mb-3"
              >
                <Form.Control
                  type="date"
                  name="move_out_date"
                  placeholder="Move Out Date"
                  value={values.move_out_date}
                  onChange={handleChange}
                  isInvalid={!!errors.move_out_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.move_out_date}
                </Form.Control.Feedback>
              </FloatingLabel>
              <Button variant="primary" type="submit" onClick={handleFormSubmit}>
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default CreateListingModal;
