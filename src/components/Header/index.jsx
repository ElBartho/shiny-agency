import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../utils/style/colors';
// import lightLogo from '../../assets/light-logo.png';
import darkLogo from '../../assets/dark-logo.png';

const StyledLink = styled(Link)`
  padding: 15px 30px 15px 30px;
  color: #8186a0;
  text-decoration: none;
  font-size: 18px;
  ${(props) =>
    props.$isFullLink &&
    `color: white; border-radius: 30px; background-color: ${colors.primary}`}
`;

const HomeLogo = styled.img`
  height: 70px;
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

function Header() {
  return (
    <NavContainer>
      <HomeLogo src={darkLogo} />
      <div>
        <StyledLink to='/'>Acceuil</StyledLink>
        <StyledLink to='freelances'>Profils</StyledLink>
        <StyledLink to='/survey/1' $isFullLink>
          Faire le test
        </StyledLink>
      </div>
    </NavContainer>
  );
}

export default Header;
