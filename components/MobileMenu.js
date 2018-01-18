import React from "react";
import styled from "styled-components";
import Menu from "react-burger-menu/lib/menus/slide";
import Config from "~/utils/config";
import { Link } from "~/utils/routes";

const styles = {
  bmCrossButton: {
    height: "24px",
    width: "24px"
  },
  bmCross: {
    background: "#000"
  },
  bmMenu: {
    background: "#FFF",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em"
  },
  bmMorphShape: {
    fill: "#FFF"
  },
  bmItemList: {
    color: "#000",
    padding: 0
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)"
  }
};

const MenuList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const MenuListItem = styled.li`
  margin-bottom: 15px;
  font-size: 20px;
  color: ${props => props.theme.colors.black};

  a,
  a:visited {
    color: inherit;
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.25s ease;
  }
`;

export default ({
  pageWrapId,
  outerContainerId,
  isOpen,
  onStateChange,
  lang
}) => (
  <Menu
    pageWrapId={pageWrapId}
    outerContainerId={outerContainerId}
    styles={styles}
    customBurgerIcon={false}
    isOpen={isOpen}
    onStateChange={onStateChange}
  >
    <MenuList>
      {Config.menu.map(({ text, route, params }, index) => (
        <MenuListItem key={index}>
          <Link
            route={route}
            params={{
              ...params,
              lang
            }}
          >
            <a>{text}</a>
          </Link>
        </MenuListItem>
      ))}
    </MenuList>
  </Menu>
);
