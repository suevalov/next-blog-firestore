import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Header from "./Header/index";
import MobileMenu from "./MobileMenu";
import Footer from "./Footer/index";
import ScrollToTop from "./ScrollToTop";
import Tracking from "./Tracking";
import Config from "~/utils/config";
import theme from "~/utils/theme";
import fonts from "~/utils/fonts";

const Main = styled.main`
  min-height: 90vh;
`;

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileMenuOpen: false
    };
  }

  componentDidMount() {
    fonts();
  }

  onMobileMenuOpenChange = state => {
    this.setState({ isMobileMenuOpen: state.isOpen });
  };

  onToggleMobileNavigation = () => {
    this.setState(state => ({
      isMobileMenuOpen: !state.isMobileMenuOpen
    }));
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div id="outer-container">
          <MobileMenu
            lang={this.props.lang}
            isOpen={this.state.isMobileMenuOpen}
            onStateChange={this.onMobileMenuOpenChange}
            pageWrapId="main-container"
            outerContainerId="outer-container"
          />
          <Header
            lang={this.props.lang}
            onToggleMobileNavigation={this.onToggleMobileNavigation}
          />
          <Main role="main" id="main-container">
            {this.props.children}
          </Main>
          <ScrollToTop showUnder={150} />
          <Footer copyright={Config.copyright} />
          <Tracking />
        </div>
      </ThemeProvider>
    );
  }
}

export default Page;
