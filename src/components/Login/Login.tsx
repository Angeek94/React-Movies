import { Col, Row } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useOnSubmit } from "./utils/useOnSubmit";
import { useAppSelector } from "../../store/hooks";
import { IUser } from "../../interfaces/IUser";
export const Login = () => {
  const userData: IUser = useAppSelector((state) => state.user);
  console.log(userData);
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid e-mail")
      .required("Required e-mail")
      .oneOf([userData.email], "email must match"),
    password: Yup.string()
      .min(8, "Too Short!")
      .required("Required password")
      .oneOf([userData.password], "password must match"),
  });
  const handleSubmitLogin = useOnSubmit();
  return (
    <>
      <Row justify={"center"} style={{ marginTop: "42.5vh" }}>
        <Col span={3}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validateOnMount
            isInitialValid={false}
            validationSchema={SignupSchema}
            onSubmit={handleSubmitLogin}
          >
            {({ errors, touched, isValid }) => (
              <Form>
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

                <button
                  id="submit"
                  type="submit"
                  data-testid="login-button"
                  disabled={!isValid}
                  style={{ marginTop: 20 }}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </>
  );
};
