import styled from "styled-components";

export default styled.article`
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  word-break: break-word;
  word-wrap: break-word;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  text-align: left;
  line-height: 1.7em;
  letter-spacing: -0.003em;

  strong {
    font-weight: 700;
  }

  ol,
  ul {
    padding: 0;
    padding-left: 15px;
  }

  ul li,
  ol li {
    margin-bottom: 15px;
  }

  p {
    margin: 0;
    padding: 0;
    margin-bottom: 26px;
  }

  a,
  a:hover,
  a:focus,
  a:visited {
    color: ${props => props.theme.colors.text};
    text-decoration: underline;
    transition: color 0.25s ease;
  }

  a:hover {
    color: ${props => props.theme.colors.inversedLinkHover};
  }

  table {
    /* Remove spacing between table cells (from Normalize.css) */
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #cbcbcb;
    margin: 0 auto 26px auto;
  }

  table caption {
    color: #000;
    font: italic 85%/1 arial, sans-serif;
    padding: 1em 0;
    text-align: center;
  }

  table td,
  table th {
    border-left: 1px solid #cbcbcb; /*  inner column border */
    border-width: 0 0 0 1px;
    font-size: inherit;
    margin: 0;
    overflow: visible; /*to make ths where the title is really long work*/
    padding: 0.5em 1em; /* cell padding */
  }

  /* Consider removing this next declaration block, as it causes problems when
there's a rowspan on the first cell. Case added to the tests. issue#432 */
  table td:first-child,
  table th:first-child {
    border-left-width: 0;
  }

  table thead {
    background-color: #e0e0e0;
    color: #000;
    text-align: left;
    vertical-align: bottom;
  }
`;
