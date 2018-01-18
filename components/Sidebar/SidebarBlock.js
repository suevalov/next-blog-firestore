import React from "react";
import { clearFix } from "polished";
import styled from "styled-components";
import BrandedTitle from "~/components/BrandedTitle";

const SidebarBlock = styled.div`
  display: block;
  margin-bottom: 30px;
  ${clearFix()};
`;

const SidebarTitle = styled(BrandedTitle)`
  display: block;
  margin-bottom: 10px;
`;

export default ({ className, title, children }) => (
  <SidebarBlock className={className}>
    <SidebarTitle>{title}</SidebarTitle>
    {children}
  </SidebarBlock>
);
