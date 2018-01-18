import styled from "styled-components";

const PreviewRibbon = styled.div`
  width: 200px;
  position: absolute;
  text-align: center;
  line-height: 50px;
  letter-spacing: 1px;
  color: #f0f0f0;
  background: #e43;
  top: 25px;
  left: -50px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
`;

export default PreviewRibbon;
