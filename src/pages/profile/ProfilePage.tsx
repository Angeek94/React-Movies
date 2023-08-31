import { useCallback, useState } from "react";
import "./style.css";
import { Col, Modal, Popconfirm, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../interfaces/IUser";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changePassword,
  deleteUser,
  setIsLogged,
} from "../../store/slices/userSlice";
import { IChangePassword } from "../../interfaces/IChangePassword";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userStore: IUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const removeUser = useCallback(() => {
    dispatch(deleteUser());
    navigate("/");
  }, [dispatch, navigate]);

  const handleLogOut = useCallback(() => {
    dispatch(setIsLogged(false));
    navigate("/");
  }, [dispatch, navigate]);

  const confirm = () => {
    removeUser();
    message.success("Account eliminato!");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const changePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .oneOf([userStore.password], "Password deve essere uguale alla vecchia")
      .required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .not([userStore.password], "Password deve essere diversa dalla vecchia")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .required("Required"),
  });

  return (
    <>
      <Row justify={"end"}>
        <img
          src={require("../../images/logout.jpg")}
          onClick={handleLogOut}
          className="image-logout"
          alt=""
        />
      </Row>
      <Row justify={"center"}>
        <img
          src={require("../../images/profile.jpg")}
          className="image-profile"
          alt=""
        />
      </Row>
      <Row justify={"center"}>
        <p style={{ textAlign: "center", fontSize: 25 }}>
          Benvenuto, {userStore.username}
        </p>
      </Row>
      <Row justify={"center"}>{userStore.email}</Row>
      <Row justify={"center"}>
        <Col
          style={{
            width: 200,
            height: 35,
            border: "solid 1px black",
            borderRadius: 5,
            margin: 10,
            textAlign: "center",
          }}
          onClick={showModal}
        >
          <p style={{ margin: 5 }}>Cambia password</p>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Popconfirm
          title="Elimina account"
          description="Sei sicuro di eliminare l'account?"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Row
            justify={"center"}
            align={"middle"}
            style={{
              width: 200,
              height: 35,
              border: "solid 1px black",
              borderRadius: 5,
              margin: 10,
            }}
            onClick={() => {}}
          >
            <img
              src={require("../../images/delete.jpg")}
              className="image-delete"
              alt=""
            />

            <p style={{ margin: 5 }}>Elimina account</p>
          </Row>
        </Popconfirm>
      </Row>

      <Modal
        title="Cambio password"
        open={isModalOpen}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Row justify={"center"}>
          <Formik
            initialValues={{
              oldPassword: "",
              password: "",
              confirmPassword: "",
            }}
            validateOnMount
            validationSchema={changePasswordSchema}
            onSubmit={({ password }: IChangePassword) => {
              dispatch(changePassword(password));
              handleOk();
            }}
          >
            {({ errors, touched, isValid }) => (
              <Form>
                <Row style={{ marginTop: 20, width: "350px" }}>
                  <Field
                    name="oldPassword"
                    type="password"
                    placeholder="Vecchia password"
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
                    id="cancel"
                    style={{
                      width: 80,
                      height: 30,
                      border: "solid 1px black",
                      borderRadius: 5,
                      margin: "20px 5px 5px 5px",
                      textAlign: "center",
                      background: "white",
                    }}
                    onClick={handleCancel}
                  >
                    Annulla
                  </button>
                  <button
                    id="submit"
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
      </Modal>
    </>
  );
};
