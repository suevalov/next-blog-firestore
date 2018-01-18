import React from "react";
import styled, { css } from "styled-components";
import VisibilitySensor from "react-visibility-sensor";

const BasicItemImage = styled.div`
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.05);
  ${props =>
    props.visible
      ? css`
          background-image: url(${props => props.src});
        `
      : ""} display: block;
`;

const DefaultItemImage = styled(BasicItemImage)`
  height: 200px;
  @media screen and (max-width: ${props =>
      props.theme.flexboxgrid.breakpoints.sm + "em"}) {
    heigth: 250px;
  }
  @media screen and (min-width: ${props =>
      props.theme.flexboxgrid.breakpoints.sm + "em"}) and (max-width: ${props =>
      props.theme.flexboxgrid.breakpoints.md + "em"}) {
    height: 140px;
  }
`;

const FeaturedItemImage = styled(BasicItemImage)`
  height: 250px;
  width: 100%;
  @media screen and (max-width: ${props =>
      props.theme.flexboxgrid.breakpoints.sm + "em"}) {
    heigth: 250px;
  }
  @media screen and (min-width: ${props =>
      props.theme.flexboxgrid.breakpoints.sm + "em"}) and (max-width: ${props =>
      props.theme.flexboxgrid.breakpoints.md + "em"}) {
    height: 200px;
  }
`;

export default class ItemImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: props.lazy ? false : true
    };
  }

  onChangeVisibility = isVisible => {
    if (isVisible) {
      this.setState({ isVisible: true });
    }
  };

  render() {
    const { featured, ...rest } = this.props;
    const Component = featured ? FeaturedItemImage : DefaultItemImage;

    return (
      <VisibilitySensor partialVisibility onChange={this.onChangeVisibility}>
        <Component {...rest} visible={this.state.isVisible} />
      </VisibilitySensor>
    );
  }
}
