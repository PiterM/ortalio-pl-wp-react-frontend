import * as React from 'react'
import styled from '@emotion/styled'
import { colors, fonts } from '../../Common/variables';
import './Header.scss';

const StyledHeaderDiv = styled.div`
  text-align: center;
  position: relative;
  padding: 20px;
`

const HeaderWrapperDiv = styled.div``;

const StyledHeaderWeatherForcastBox = styled.div`
  position: relative;
  width: 18%;
  left: 10px;
  padding: 10px 15px 10px 15px;
  line-height: 20px;
  display: inline-block;
  margin: 0 50px 20px -360px;
`;

const StyledHeaderTitle = styled.header`
  font-family: ${fonts.headline}, serif;
  font-weight: 900;
  font-size: 80px;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: 20px;
  letter-spacing: 6px;
`;

const StyledHomePageLink = styled.a`
  color: ${colors.newspaperText};
  outline: none;

  &:hover {
    text-decoration: none;
  }
`;

const StyledSubHeader = styled.div`
  text-transform: uppercase;
  border-bottom: 2px solid #2f2f2f;
  border-top: 2px solid #2f2f2f;
  padding: 12px 0 12px 0;
`;

interface HeaderProps {
  intro: string;
  title: string;
  description: string;
}

const Header: React.FC<HeaderProps> = ({ description, intro, title }) => (
  <StyledHeaderDiv>
    <HeaderWrapperDiv>
      <StyledHeaderWeatherForcastBox>
        <div dangerouslySetInnerHTML={{ __html: intro }} />
      </StyledHeaderWeatherForcastBox>
      <StyledHeaderTitle>
        <StyledHomePageLink 
          href="/" 
          className="site-header"
          data-text={title}
        >
          {title}
        </StyledHomePageLink>
      </StyledHeaderTitle>
    </HeaderWrapperDiv>
    <StyledSubHeader>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </StyledSubHeader>
  </StyledHeaderDiv>
)

export default Header
