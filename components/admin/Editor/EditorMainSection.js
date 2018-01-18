import styled from "styled-components";

export default styled.section`
  width: 1px;
  position: relative;
  flex-grow: 1;
  -webkit-box-direction: normal;
  display: flex;
  flex-direction: column;
  -webkit-box-orient: vertical;

  .markdown-editor {
    height: calc(100vh - 46px);
    overflow-y: auto;
    position: relative;
    width: 100%;
    z-index: 0;
  }

  .markdown-editor-inner {
    padding: 10vw 4vw;
    padding-bottom: 66px;
    max-width: 1000px;
    margin: 0 auto;
  }

  footer {
    align-items: center;
    border-top: 1px solid #e5eff5;
    display: flex;
    flex-direction: row;
    height: 46px;
    justify-content: space-between;
    min-height: 46px;
    -webkit-box-direction: normal;
    -webkit-box-orient: horizontal;
  }
`;
