import ErrorImage from '../../assets/404.svg';
import styled from 'styled-components';
import colors from '../../utils/style/colors';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.backgroundLight};
  margin: 30px;
`;

const ErrorTitle = styled.h1`
  font-weight: 300;
`;

const ErrorSubTitle = styled.h2`
  font-weight: 300;
  color: ${colors.secondary};
`;

const Illustration = styled.img`
  max-width: 800px;
`;

function Error() {
  return (
    <ErrorContainer>
      <ErrorTitle>Oups...</ErrorTitle>
      <Illustration src={ErrorImage} />
      <ErrorSubTitle>Il semblerait qu'il y ait un problème</ErrorSubTitle>
    </ErrorContainer>
  );
}

export default Error;
