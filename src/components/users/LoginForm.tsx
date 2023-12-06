import { useContext } from "react";
import { Form } from "react-bootstrap";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { UserDispatchContext } from "../../state-management/contexts/UserContext";
import { UserActionKind, UserPayload } from "../../state-management/reducers/UserReducer";
import { FormStatusData } from "../../utils/FormInterfaces";
import { RouteNames } from "../../utils/RoutesInfo";
import ThemedButton from "../base/ThemedButton";

interface LoginFormData {
  username: string;
  password: string;
}


function LoginForm() {
  const dispatch = useContext(UserDispatchContext);

  const initialValues: LoginFormData = {
    username: "",
    password: "",
  };

  const signupSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const submitForm = async (values: LoginFormData, { setSubmitting, setStatus }: FormikHelpers<LoginFormData>) => {
    try {
      const result = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password
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
        {({ handleSubmit, handleChange, handleBlur, values, errors, status, isValid }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="false"
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="false"
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
      </Formik>
      <div className="text-center mt-2">
        Don't have an account? <NavLink to={RouteNames.REGISTER} style={{ color: "#154734" }}>Register</NavLink>
      </div>
    </>
  );
}

export default LoginForm;
