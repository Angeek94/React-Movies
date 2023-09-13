import { Row } from "antd";
import { useAppSelector } from "../../store/hooks";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { IUser } from "../../interfaces/IUser";
import { IFormChangePassword } from "../../interfaces/IFormChangePassword";
import { useOnSubmitChangePassword } from "./utils/useOnSubmitChangePassword";

export const FormChangePassword: React.FC<IFormChangePassword> = ({
  handleOnCancel,
  handleOnOk,
}) => {
  const userStore: IUser = useAppSelector((state) => state.user);
  const changePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .oneOf([userStore.password], "Password deve essere uguale alla vecchia")
      .required("Required old password"),
    password: Yup.string()
      .min(8, "Too Short!")
      .not([userStore.password], "Password deve essere diversa dalla vecchia")
      .required("Required password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .required("Required confirm password"),
  });

  const handleOnSubmit = useOnSubmitChangePassword(handleOnOk);
  return (
    <Row justify={"center"}>
      <Formik
        initialValues={{
          oldPassword: "",
          password: "",
          confirmPassword: "",
        }}
        data-testid="form"
        validateOnMount
        validationSchema={changePasswordSchema}
        onSubmit={handleOnSubmit}
      >
        {({ errors, touched, isValid }) => (
          <Form>
            <Row style={{ marginTop: 20, width: "350px" }}>
              <Field
                name="oldPassword"
                type="password"
                placeholder="Vecchia password"
                data-testid="oldPassword"
                style={{ width: "350px" }}
              />
              <div style={{ width: "100%", height: 15 }}>
                {errors.oldPassword && touched.oldPassword ? (
                  <p style={{ margin: 0, marginBottom: 10, padding: 0 }}>
                    {errors.oldPassword.toString()}
                  </p>
                ) : null}
              </div>
            </Row>
            <Row style={{ marginTop: 20, width: "350px" }}>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                data-testid="password"
                style={{ width: "350px" }}
              />
              <div style={{ width: "100%", height: 15 }}>
                {errors.password && touched.password ? (
                  <p style={{ margin: 0, marginBottom: 10, padding: 0 }}>
                    {errors.password.toString()}
                  </p>
                ) : null}
              </div>
            </Row>
            <Row style={{ marginTop: 20, width: "350px" }}>
              <Field
                name="confirmPassword"
                type="password"
                data-testid="confirmPassword"
                placeholder="Conferma password"
                style={{ width: "350px" }}
              />
              <div style={{ width: "100%", height: 15 }}>
                {errors.confirmPassword && touched.confirmPassword ? (
                  <p style={{ margin: 0, marginBottom: 10, padding: 0 }}>
                    {errors.confirmPassword.toString()}
                  </p>
                ) : null}
              </div>
            </Row>
            <Row justify={"end"}>
              <button
                data-testid="cancelButton"
                style={{
                  width: 80,
                  height: 30,
                  border: "solid 1px black",
                  borderRadius: 5,
                  margin: "20px 5px 5px 5px",
                  textAlign: "center",
                  background: "white",
                }}
                onClick={handleOnCancel}
              >
                Annulla
              </button>
              <button
                data-testid="changeButton"
                type="submit"
                disabled={!isValid}
                style={{
                  width: 80,
                  height: 30,
                  border: "solid 1px black",
                  borderRadius: 5,
                  margin: "20px 0px 5px 5px",
                  textAlign: "center",
                  background: "white",
                }}
              >
                Cambia
              </button>
            </Row>
          </Form>
        )}
      </Formik>
    </Row>
  );
};
