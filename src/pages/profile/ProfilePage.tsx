import { useState } from "react";
import "./style.css";
import { Col, Popconfirm, Row } from "antd";
import { IUser } from "../../interfaces/IUser";
import { useAppSelector } from "../../store/hooks";
import { useModal } from "./utils/useModal";
import { useDeleteUser } from "./utils/useDeleteUser";
import { useLogOut } from "./utils/useLogOut";
import { ModalChangePassword } from "../../components/ModalChangePassword/ModalChangePassword";

export const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userStore: IUser = useAppSelector((state) => state.user);
  const { showModal } = useModal();
  const handleConfirmDeleteUser = useDeleteUser();
  const handleLogOut = useLogOut();

  return (
    <>
      <Row justify={"end"}>
        <img
          src={require("../../images/logout.jpg")}
          onClick={handleLogOut}
          data-testid="logout"
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
          data-testid="changePassword"
          onClick={() => showModal(setIsModalOpen)}
        >
          <p style={{ margin: 5 }}>Cambia password</p>
        </Col>
      </Row>
      <ModalChangePassword
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Row justify={"center"}>
        <Popconfirm
          title="Elimina account"
          description="Sei sicuro di eliminare l'account?"
          onConfirm={handleConfirmDeleteUser}
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
    </>
  );
};
