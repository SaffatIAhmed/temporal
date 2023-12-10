import { Formik, FormikHelpers } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import ThemedButton from "../base/ThemedButton";
import { FormStatusData } from "../../utils/FormInterfaces";
import { useContext } from "react";
import { UserDispatchContext } from "../../state-management/contexts/UserContext";
import { type UserState, UserActionKind } from "../../state-management/reducers/UserReducer";
import { RouteNames } from "../../utils/RoutesInfo";
import axios from "axios";

interface SignupFormData {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

function RegisterForm() {
  const dispatch = useContext(UserDispatchContext);

  const initialValues: SignupFormData = {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  };

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const signupSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is requried"),
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
      const { data } = await axios.post("http://localhost:3000/users", {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        username: values.username,
        password: values.password,
      }, { withCredentials: true });
      const payload = data as UserState;
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
                <Form.Label htmlFor="firstname">First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={values.firstname}
                  onChange={(evt) => {
                    handleChange(evt);
                    setFieldValue("firstname", evt.target.value.trim().replace(" ", ""));
                  }}
                  onBlur={handleBlur}
                  isInvalid={!!errors.firstname}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstname}
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Label htmlFor="lastname">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={values.lastname}
                  onChange={(evt) => {
                    handleChange(evt);
                    setFieldValue("lastname", evt.target.value.trim().replace(" ", ""));
                  }}
                  onBlur={handleBlur}
                  isInvalid={!!errors.lastname}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastname}
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
