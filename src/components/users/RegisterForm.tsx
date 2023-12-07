import { Formik, FormikHelpers } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import ThemedButton from "../base/ThemedButton";
import { FormStatusData } from "../../utils/FormInterfaces";
import { useContext } from "react";
import { UserDispatchContext } from "../../state-management/contexts/UserContext";
import { UserPayload, UserActionKind } from "../../state-management/reducers/UserReducer";
import { RouteNames } from "../../utils/RoutesInfo";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

function RegisterForm() {
  const dispatch = useContext(UserDispatchContext);

  const initialValues: SignupFormData = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  };

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const signupSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is requried"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .matches(
        passwordRegex,
        "Password requires at least one uppercase, lowercase, number, and\
        special character and should be at least 8 characters long"
      )
      .required("Password is required"),
  });

  const submitForm = async (values: SignupFormData, { setStatus, setSubmitting }: FormikHelpers<SignupFormData>) => {
    try {
      const result = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          username: values.username,
          password: values.password,
        })
      });
      if (!result.ok) {
        throw new Error(`${result.status} ${result.statusText}`);
      }
      const data = await result.json();
      const payload = data as UserPayload;
      if (payload) {
        dispatch({
          type: UserActionKind.LOGIN,
          payload
        });
        setStatus({ message: 'Login Success!', error: false });
      } else {
        setStatus({ message: 'Something went wrong', error: true });
      }
      setSubmitting(false);
    } catch (err) {
      setStatus({ message: `${err}`, error: true });
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={submitForm}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, isValid, status, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Label htmlFor="firstName">First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={values.firstName}
                  onChange={(evt) => {
                    handleChange(evt);
                    setFieldValue("firstName", evt.target.value.trim().replace(" ", ""));
                  }}
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
                  onChange={(evt) => {
                    handleChange(evt);
                    setFieldValue("lastName", evt.target.value.trim().replace(" ", ""));
                  }}
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
                onChange={(evt) => {
                  handleChange(evt);
                  setFieldValue("email", evt.target.value.trim().replace(" ", ""));
                }}
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
              <ThemedButton type="submit" disabled={!isValid}>
                Submit
              </ThemedButton>
            </div>
            {
              ((status as FormStatusData)?.message) &&
              (<div className={`text-center ${status.error ? "text-danger" : "text-success"}`}>
                {status.message}
              </div>)
            }
          </Form>
        )}
      </Formik >
      <div className="text-center mt-2">
        Already Registered? <NavLink to={RouteNames.LOGIN} style={{ color: "#154734" }}>Login</NavLink>
      </div>
    </>
  );
};

export default RegisterForm;
