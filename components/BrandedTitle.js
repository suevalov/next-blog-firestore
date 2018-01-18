import styled from "styled-components";

const BrandedTitle = styled.div`
  &,
  & a {
    display: inline-block;
    text-transform: uppercase;
    font-size: 12px;
    transition: all 0.25s ease;
    text-decoration: underline;
  }
`;

export default BrandedTitle;
