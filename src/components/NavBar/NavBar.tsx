import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";
import "./style.css";
export const NavBar = () => {
  return (
    <Row
      style={{ height: 60, borderBottom: "1px solid black" }}
      align={"middle"}
    >
      <Col>
        <p style={{ margin: 20 }}>REACT MOVIES</p>
      </Col>
      <Col>
        <NavLink
          to="dashboard"
          data-testid="dashboard-link"
          className={({ isActive }) =>
            isActive ? "active_navlink" : "inactive"
          }
        >
          Dashboard
        </NavLink>
      </Col>
      <Col>
        <NavLink
          to="search"
          data-testid="search-link"
          className={({ isActive }) =>
            isActive ? "active_navlink" : "inactive"
          }
        >
          Search movie
        </NavLink>
      </Col>
      <Col>
        <NavLink
          to="favorites"
          data-testid="favorites-link"
          className={({ isActive }) =>
            isActive ? "active_navlink" : "inactive"
          }
        >
          Favorites
        </NavLink>
      </Col>
      <Col style={{ position: "absolute", right: "0%" }}>
        <NavLink to="profile" data-testid="profile-link" className={"inactive"}>
          <img
            src={require("../../images/profile.jpg")}
            alt=""
            className="profile"
          />
        </NavLink>
      </Col>
    </Row>
  );
};
