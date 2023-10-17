import { useContext } from 'react';
import { useFetch } from '../../utils/hooks';
import styled from 'styled-components';
import colors from '../../utils/style/colors';
import { StyledLink, Loader } from '../../utils/style/Atoms';
import { SurveyContext, ThemeContext } from '../../utils/context';

function formatFetchParams(answers) {
  const answerNumbers = Object.keys(answers);

  return answerNumbers.reduce((previousParams, answerNumber, index) => {
    const isFirstAnswer = index === 0;
    const separator = isFirstAnswer ? '' : '&';
    return `${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}`;
  });
}

function Results() {
  const { theme } = useContext(ThemeContext);
  const { answers } = useContext(SurveyContext);
  const fetchParams = formatFetchParams(answers);

  const { data, isLoading, error } = useFetch(
    `http://localhost:8000/results?${fetchParams}`
  );

  console.log('===== data =====', data);

  if (error) {
    return <span>Il y a un problème</span>;
  }

  const { resultsData } = data;

  return isLoading ? (
    <div></div>
  ) : (
    <div>
      <h2>Les compétences dont vous avez besoins: </h2>
      <StyledLink $isFullLink to='/freelances'>
        Découvrez nos profils
      </StyledLink>
    </div>
  );
}

export default Results;
