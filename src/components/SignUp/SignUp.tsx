import { Col, Row } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useOnSubmit } from "./utils/useOnSubmit";

export const SignUp = () => {
  const handleSubmitLogin = useOnSubmit();

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required username"),
    email: Yup.string().email("Invalid email").required("Required e-mail"),
    password: Yup.string()
      .min(8, "Too Short!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-.!@#$%^&*])/,
        "One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Required password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .required("Required confirm password"),
  });

  return (
    <>
      <Row justify={"center"} style={{ margin: 20, fontSize: 30 }}>
        Iscriviti:
      </Row>
      <Row justify={"center"} style={{ marginTop: "42.5vh" }}>
        <Col span={3}>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              isLogged: false,
            }}
            isInitialValid={true}
            validateOnMount
            validationSchema={SignupSchema}
            onSubmit={handleSubmitLogin}
          >
            {({ errors, touched, isValid }) => (
              <Form>
                <Row style={{ marginTop: 20, width: "auto" }}>
                  <Field
                    name="username"
                    type="username"
                    placeholder="Username"
                    data-testid="username"
                    style={{ width: "auto" }}
                  />
                  <div style={{ width: "100%", height: 15 }}>
                    {errors.username && touched.username ? (
                      <p style={{ margin: 0, marginBottom: 10, padding: 0 }}>
                        {errors.username.toString()}
                      </p>
                    ) : null}
                  </div>
                </Row>
                <Row style={{ marginTop: 20, width: "auto" }}>
                  <Field
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    data-testid="email"
                    style={{ width: "auto" }}
                  />
                  <div style={{ width: "100%", height: 15 }}>
                    {errors.email && touched.email ? (
                      <p style={{ margin: 0, marginBottom: 10, padding: 0 }}>
                        {errors.email.toString()}
                      </p>
                    ) : null}
                  </div>
                </Row>
                <Row style={{ marginTop: 20, width: "auto" }}>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    data-testid="password"
                    style={{ width: "auto" }}
                  />
                  <div style={{ width: "100%", height: 15 }}>
                    {errors.password && touched.password ? (
                      <p style={{ margin: 0, marginBottom: 10, padding: 0 }}>
                        {errors.password.toString()}
                      </p>
                    ) : null}
                  </div>
                </Row>
                <Row style={{ marginTop: 20, width: "auto" }}>
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Conferma password"
                    data-testid="confirmPassword"
                    style={{ width: "auto" }}
                  />
                  <div style={{ width: "100%", height: 15 }}>
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <p style={{ margin: 0, marginBottom: 10, padding: 0 }}>
                        {errors.confirmPassword.toString()}
                      </p>
                    ) : null}
                  </div>
                </Row>
                <button
                  id="submit"
                  type="submit"
                  disabled={!isValid}
                  style={{ marginTop: 20 }}
                >
                  Iscriviti
                </button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </>
  );
};
