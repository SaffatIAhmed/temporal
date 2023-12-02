// https://www.smashingmagazine.com/2020/10/react-validation-formik-yup/

import React from "react";
import { Formik, FormikHelpers, FormikProps } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/LoginForm.scss";
import * as Yup from "yup";

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

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
const signupSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is requried"),
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

const submitForm = (values: FormValues, actions: FormikHelpers<FormValues>) => {
  console.log("Testing");
  console.log(values);
  actions.setSubmitting(false);
};

const SignupForm: React.FC = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupSchema}
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
          //isValid,
          //dirty,
        } = formikProps;
        return (
          <div className="testing">
            <Card style={{ width: "20rem" }}>
              <Card.Body>
                <Card.Title>Sign up</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Label htmlFor="firstname">First Name</Form.Label>
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
                    onClick={() => handleSubmit()} // Call handleSubmit when the button is clicked
                    className={
                      !(formikProps.dirty && formikProps.isValid)
                        ? "disabled-btn"
                        : ""
                    }
                    disabled={!(formikProps.dirty && formikProps.isValid)}
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
