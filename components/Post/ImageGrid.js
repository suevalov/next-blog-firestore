import React from "react";
import { Grid, Row, Col } from "react-styled-flexboxgrid";

const Two = ({ first, second }) => (
  <Row>
    <Col xs={12} sm={6}>
      {first}
    </Col>
    <Col xs={12} sm={6}>
      {second}
    </Col>
  </Row>
);

export default ({ children }) => {
  const images = [];
  React.Children.forEach(children, child => {
    if (child.props && child.props.url) {
      images.push(child);
    }
  });
  return (
    <Grid fluid style={{ padding: 0 }}>
      {images.length === 1 && images[0]}
      {images.length === 2 && <Two first={images[0]} second={images[1]} />}
      {images.length === 3 && (
        <div>
          {images[0]}
          <Two first={images[1]} second={images[2]} />
        </div>
      )}
      {images.length === 4 && (
        <div>
          <Two first={images[0]} second={images[1]} />
          <Two first={images[2]} second={images[3]} />
        </div>
      )}
    </Grid>
  );
};
