// https://www.smashingmagazine.com/2020/10/react-validation-formik-yup/

import { Formik } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import * as Yup from "yup";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

function SignupForm() {
  const initialValues: SignupFormData = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
  const signupSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is requried"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(8, "Password needs at least 8 characters")
      .matches(
        passwordRegex,
        "Password requires at least one uppercase, lowercase, number, and special character"
      )
      .required("Password is required"),
  });

  const submitForm = (values: SignupFormData) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={submitForm}
    >
      {({ handleSubmit, handleChange, handleBlur, values, errors, isValid, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Label htmlFor="firstName">First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                id="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Label htmlFor="lastName">Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                id="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              type="username"
              name="username"
              id="username"
              value={values.username}
              onChange={(evt) => {
                handleChange(evt);
                setFieldValue('username', evt.target.value.replace(" ", "_"));
              }}
              onBlur={handleBlur}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-grid gap-2 mt-2">
            <Button variant="primary" type="submit" disabled={!isValid}>
              Sign Up
            </Button>
          </div>
        </Form>
      )}
    </Formik >
  );
};

export default SignupForm;
