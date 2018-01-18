import React from "react";
import styled from "styled-components";

const AdminPageSection = styled.section`
  position: relative;
  margin: 0 auto;
  max-width: 1200px;
  padding: 24px 4vw 3vw;
`;

const AdminPageHeaderContainer = styled.div`
  -webkit-box-pack: justify;
  flex-shrink: 0;
  justify-content: space-between;
  margin: 0 0 2vw;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  letter-spacing: 0.4px;
  margin: 0;
  min-height: 35px;
  padding: 0;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;

AdminPageSection.Header = ({ children, renderActions }) => (
  <AdminPageHeaderContainer>
    <Title>{children}</Title>
    {renderActions ? <Actions>{renderActions()}</Actions> : null}
  </AdminPageHeaderContainer>
);

export default AdminPageSection;
