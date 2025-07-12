import { useState } from "react";
import classnames from "classnames";
import styled, { ThemeProvider } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";
import { themes } from "../../theme";

const routes = [
  { title: "Home", icon: "fas-solid fa-house", path: "/" },
  { title: "Sales", icon: "chart-line", path: "/sales" },
  { title: "Costs", icon: "chart-column", path: "/costs" },
  { title: "Payments", icon: "wallet", path: "/payments" },
  { title: "Finances", icon: "chart-pie", path: "/finances" },
  { title: "Messages", icon: "envelope", path: "/messages" },
];

const bottomRoutes = [
  { title: "Settings", icon: "sliders", path: "/settings" },
  { title: "Support", icon: "phone-volume", path: "/support" },
];

const SidebarContainer = styled.div`
  position: relative;
  background: ${(props) => props.theme.sidebarBg};
  color: ${(props) => props.theme.text};
  width: min-content;
  height: 100vh;
  padding: ${(props) => (props.opened ? "15px 25px" : "15px 10px")};
  border: 2px solid ${(props) => props.theme.sidebarBgActive};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  transition:
    width 0.3s,
    padding 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    background 0.2s,
    color 0.2s;
  box-shadow: 0 0 0 1px ${(props) => props.theme.sidebarBg};
  z-index: 10;
`;

const LogoBlock = styled.div`
  position: relative;
  display: flex;
  padding: 10px 0;
`;

const LogoImg = styled.img`
  width: 35px;
  height: 35px;
  object-fit: contain;
  margin: 0 ${(props) => (props.opened ? "0" : "auto")};
  transition: margin 0.3s;
`;

const LogoText = styled.span`
  color: ${(props) => props.theme.logo};
  font-size: 1.3rem;
  font-weight: 700;
  width: ${(props) => (props.opened ? "100%" : "0")};
  overflow: hidden;
  margin: 0 ${(props) => (props.opened ? "10px" : "0")};
  transition: margin 0.3s;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: ${(props) => (props.opened ? "-10px" : "-50%")};
  top: 50%;
  transform: translateX(100%) translateY(-50%);
  margin-left: auto;
  color: ${(props) => props.theme.text};
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  transition: background 0.2s;
  background: ${(props) =>
    props.opened ? props.theme.sidebarBgActive : props.theme.sidebarBg};
  transition:
    background 0.2s,
    color 0.2s;
`;

const ThemeButton = styled.button`
  margin: 10px auto;
  padding: 15px;
  font-size: 1rem;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
`;

const NavBlock = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 1rem;
  color: ${(props) =>
    props.active ? props.theme.textActive : props.theme.text};
  background: ${(props) =>
    props.active ? props.theme.sidebarBgActive : "transparent"};
  &:hover {
    background: ${(props) => props.theme.sidebarBgHover};
    color: ${(props) => props.theme.textHover};
  }
  transition:
    background 0.2s,
    color 0.2s;
  span {
    width: ${(props) => (props.opened ? "100%" : "0")};
    overflow: hidden;
    transition: margin 0.3s;
    margin-left: ${(props) => (props.opened ? "15px" : "0")};
    white-space: nowrap;
  }
`;

const BottomBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Sidebar = (props) => {
  const { color } = props;
  const [isOpened, setIsOpened] = useState(true);
  const [theme, setTheme] = useState(color === "dark" ? "dark" : "light");
  const [activePath, setActivePath] = useState("/");
  const containerClassnames = classnames("sidebar", { opened: isOpened });

  const goToRoute = (path) => {
    setActivePath(path);
    console.log(`going to "${path}"`);
  };

  const toggleSidebar = () => {
    setIsOpened((v) => !v);
  };

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={themes[theme]}>
      <SidebarContainer opened={isOpened} className={containerClassnames}>
        <LogoBlock>
          <LogoImg src={logo} opened={isOpened} alt="TensorFlow logo" />
          <LogoText opened={isOpened}>TensorFlow</LogoText>
          <ToggleButton opened={isOpened} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={isOpened ? "angle-left" : "angle-right"} />
          </ToggleButton>
        </LogoBlock>
        <ThemeButton onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme === "dark" ? "sun" : "moon"} />
        </ThemeButton>
        <NavBlock>
          {routes.map((route) => (
            <NavItem
              key={route.title}
              onClick={() => goToRoute(route.path)}
              active={activePath === route.path}
              opened={isOpened}
            >
              <FontAwesomeIcon icon={route.icon} />
              <span>{route.title}</span>
            </NavItem>
          ))}
        </NavBlock>
        <BottomBlock>
          {bottomRoutes.map((route) => (
            <NavItem
              key={route.title}
              onClick={() => goToRoute(route.path)}
              active={activePath === route.path}
              opened={isOpened}
            >
              <FontAwesomeIcon icon={route.icon} />
              <span>{route.title}</span>
            </NavItem>
          ))}
        </BottomBlock>
      </SidebarContainer>
    </ThemeProvider>
  );
};

Sidebar.propTypes = {
  color: PropTypes.string,
};

export default Sidebar;
