import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/LoginForm.scss";

import { Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";

interface Props {
  welcomeMsg: string;
}

interface FormValues {
  username: string;
  password: string;
}

const initialValues: FormValues = {
  username: "",
  password: "",
};

const signupSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const submitForm = (values: FormValues, actions: FormikHelpers<FormValues>) => {
  console.log(values);
  actions.setSubmitting(false);
};

function LoginForm({ welcomeMsg }: Props) {
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
        } = formikProps;
        return (
          <div>
            <Card className="loginCard">
              <Card.Body>
                <Card.Title>{welcomeMsg}</Card.Title>
                <Form className="form">
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
                  <div className="submit-btn">
                    <Button
                      type="submit"
                      onClick={() => handleSubmit()} // Call handleSubmit when the button is clicked
                    >
                      Sign up
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
