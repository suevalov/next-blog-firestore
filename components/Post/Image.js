import React from "react";
import VisibilitySensor from "react-visibility-sensor";
import ImageZoom from "react-medium-image-zoom";
import styled, { css } from "styled-components";
import Media from "~/utils/media";

const ImageContainer = styled.figure`
  padding: 0;
  margin: 0;
  margin-bottom: 26px;
  position: relative;
  height: auto;
  overflow: hidden;

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
    transition: opacity 0.4s linear;
    opacity: 0;
  }

  img.small {
    transition: opacity 0.1s linear;
  }

  img.loaded,
  .loaded img {
    opacity: 1;
  }

  img.small {
    filter: blur(50px);
    /* this is needed so Safari keeps sharp edges */
    transform: scale(1);
  }

  ${props =>
    props.position === "fullscreen" &&
    css`
      display: block;
      width: 100%;
    `};

  ${props =>
    props.position === "left" &&
    css`
      display: inline-block;
      float: left;
      width: 50%;
      margin-right: 26px;
      ${Media.sm`
        float: none;
        width: 100%;
        margin-right: 0;
      `};
    `};

  ${props =>
    props.position === "right" &&
    css`
      display: inline-block;
      float: right;
      width: 50%;
      margin-left: 26px;
      ${Media.sm`
        float: none;
        width: 100%;
        margin-left: 0;
      `};
    `};
`;

const ImageCaption = styled.figcaption`
  margin-top: 10px;
  font-size: 0.9em;
  text-align: center;
  color: #b4b4b4;
`;

class DelayedImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    const defaultImage = new Image();
    defaultImage.src = this.props.src;
    defaultImage.onload = () => {
      this.setState({ isLoaded: true });
    };
  }

  render() {
    const { zoomSrc, src, caption, ...rest } = this.props;

    const img = zoomSrc ? (
      <ImageZoom
        image={{
          ...rest,
          src
        }}
        zoomImage={{
          ...rest,
          src: zoomSrc
        }}
      />
    ) : (
      <img alt={caption} {...rest} src={src} />
    );

    return <div className={this.state.isLoaded ? "loaded" : ""}>{img}</div>;
  }
}

class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  onChangeVisibility = isVisible => {
    if (isVisible && this.props.lazy) {
      this.setState({ isVisible: true });
    }
  };

  render() {
    const {
      children,
      className,
      placeholderHeight,
      position,
      lazy,
      offset,
      caption,
      previewSrc,
      zoomSrc,
      width,
      height,
      src,
      ...rest
    } = this.props;

    return (
      <VisibilitySensor partialVisibility onChange={this.onChangeVisibility}>
        <ImageContainer position={position}>
          {previewSrc && <DelayedImage className="small" src={previewSrc} />}
          {!lazy && <DelayedImage src={src} zoomSrc={zoomSrc} {...rest} />}
          {lazy &&
            this.state.isVisible && (
              <DelayedImage
                caption={caption}
                src={src}
                zoomSrc={zoomSrc}
                {...rest}
              />
            )}
          <div
            style={{
              paddingBottom: `${100 * height / width}%`,
              backgroundColor: "rgba(0, 0, 0, 0.05)"
            }}
          />
          {caption && <ImageCaption>{caption}</ImageCaption>}
        </ImageContainer>
      </VisibilitySensor>
    );
  }
}

ImageComponent.defaultProps = {
  lazy: true,
  width: 1000,
  height: 600,
  position: "fullscreen"
};

export default ImageComponent;
