// https://www.smashingmagazine.com/2020/10/react-validation-formik-yup/

import React from "react";
import { Formik, FormikHelpers, FormikProps } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/LoginForm.scss";

interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

const initialValues: FormValues = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
};

const validate = (values: FormValues) => {
  let errors: Partial<FormValues> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!values.firstname) {
    errors.firstname = "First name is required";
  }

  if (!values.lastname) {
    errors.lastname = "Last name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Invalid Email";
  }

  if (!values.username) {
    errors.username = "Username is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be more than 8 character";
  } else if (!passwordRegex.test(values.password)) {
    errors.password =
      "Password needs to include at least one uppercase, lowercase, number, and special character";
  }

  return errors;
};

const submitForm = (values: FormValues, actions: FormikHelpers<FormValues>) => {
  console.log(values);
  actions.setSubmitting(false);
};

const SignupForm: React.FC = () => {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitForm}
    >
      {(formikProps: FormikProps<FormValues>) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty,
        } = formikProps;
        return (
          <div className="testing">
            <Card style={{ width: "20rem" }}>
              <Card.Body>
                <Card.Title>Sign up</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Label htmlFor="firstName">First Name</Form.Label>
                      <Form.Control
                        type="firstname"
                        name="firstname"
                        id="firstname"
                        value={values.firstname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.firstname && touched.firstname
                            ? "input-error"
                            : undefined
                        }
                      />
                      {errors.firstname && touched.firstname && (
                        <span className="error">{errors.firstname}</span>
                      )}
                    </Col>
                    <Col>
                      <Form.Label htmlFor="lastname">Last Name</Form.Label>
                      <Form.Control
                        type="lastname"
                        name="lastname"
                        id="lastname"
                        value={values.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.lastname && touched.lastname
                            ? "input-error"
                            : undefined
                        }
                      />
                      {errors.lastname && touched.lastname && (
                        <span className="error">{errors.lastname}</span>
                      )}
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
                      className={
                        errors.email && touched.email
                          ? "input-error"
                          : undefined
                      }
                    />
                    {errors.email && touched.email && (
                      <span className="error">{errors.email}</span>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control
                      type="username"
                      name="username"
                      id="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.username && touched.username
                          ? "input-error"
                          : undefined
                      }
                    />
                    {errors.username && touched.username && (
                      <span className="error">{errors.username}</span>
                    )}
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
                      className={
                        errors.password && touched.password
                          ? "input-error"
                          : undefined
                      }
                    />
                    {errors.password && touched.password && (
                      <span className="error">{errors.password}</span>
                    )}
                  </Form.Group>
                </Form>
                <div className="submit-btn">
                  <Button
                    type="submit"
                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                    disabled={!(dirty && isValid)}
                  >
                    Sign up
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        );
      }}
    </Formik>
  );
};

export default SignupForm;
