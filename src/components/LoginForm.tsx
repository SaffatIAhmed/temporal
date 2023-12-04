import { useContext } from "react";
import { Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import ThemedButton from "./ThemedButton";
import { UserDispatchContext } from "../state-management/contexts/UserContext";
import { UserActionKind } from "../state-management/reducers/UserReducer";

interface LoginFormProps {
  moderator?: boolean;
}

interface LoginFormData {
  username: string;
  password: string;
}

function LoginForm({ moderator }: LoginFormProps) {
  const dispatch = useContext(UserDispatchContext);

  const initialValues: LoginFormData = {
    username: "",
    password: "",
  };

  const signupSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const submitForm = async (values: LoginFormData) => {
    console.log(values);
    dispatch({
      type: UserActionKind.LOGIN,
      payload: {
        username: values.username,
        password: values.password,
        role: moderator ? "moderator" : "user",
        userID: null,
        isLoggedIn: false
      }
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={submitForm}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, isValid }) => (
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
                Sign in
              </ThemedButton>
            </div>
          </Form>
        )}
      </Formik>

      {moderator
        ? null
        : (
          <div className="text-center mt-2">
            Don't have an account? <NavLink to={"/signup"} style={{ color: "#154734" }}>Sign Up</NavLink>
          </div>
        )
      }
    </>
  );
}

export default LoginForm;
