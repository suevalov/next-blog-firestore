import React from "react";
import styled from "styled-components";
import values from "lodash.values";
import { Link } from "~/utils/routes";
import Config from "~/utils/config";
import BrandedTitle from "~/components/BrandedTitle";

const LanguageSelectorItem = styled(BrandedTitle)`
  font-size: 13px;
  cursor: pointer;

  a {
    opacity: ${props => (props.selected ? 1 : 0.3)};

    &,
    &:visited {
      color: ${props => props.theme.colors.text};
    }

    &:hover,
    &:focus {
      opacity: 1;
      color: ${props => props.theme.colors.inversedLinkHover};
    }
  }
`;

const LanguageSelectorContainer = styled.div`
  margin: 0 auto;
  margin-bottom: 30px;
  width: 210px;
  text-align: center;

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    display: inline-block;
    margin-right: 20px;
  }

  li:last-item {
    margin-right: 0;
  }
`;

class LanguageSelector extends React.Component {
  render() {
    const languages = values(Config.languages);
    if (languages.length < 2) {
      return null;
    }
    const { getLink, current } = this.props;
    return (
      <LanguageSelectorContainer>
        <ul>
          {languages.map(language => (
            <li key={language.id}>
              <LanguageSelectorItem selected={current === language.id}>
                <Link {...getLink(language)}>
                  <a>{language.shortTitle}</a>
                </Link>
              </LanguageSelectorItem>
            </li>
          ))}
        </ul>
      </LanguageSelectorContainer>
    );
  }
}

export default LanguageSelector;
