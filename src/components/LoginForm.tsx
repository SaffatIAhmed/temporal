import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

interface LoginFormData {
  username: string;
  password: string;
}

function LoginForm() {
  const initialValues: LoginFormData = {
    username: "",
    password: "",
  };

  const signupSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const submitForm = (values: LoginFormData, actions: FormikHelpers<LoginFormData>) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
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
            <Button variant="primary" type="submit" disabled={!isValid}>
              Sign in
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
