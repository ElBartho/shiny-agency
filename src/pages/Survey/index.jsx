import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../utils/style/colors';
import { Loader } from '../../utils/style/Atoms';

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`;

const QuestionContent = styled.span`
  margin: 30px;
`;

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: black;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`;

function Survey() {
  const { questionNumber } = useParams();
  const questionNumberInt = parseInt(questionNumber);
  const prevQuestionNumber =
    questionNumberInt === 1 ? 1 : questionNumberInt - 1;
  const nextQuestionNumber = questionNumberInt + 1;
  const [surveyData, setSurveyData] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   setIsDataLoading(true);
  //   fetch(`http://localhost:8000/survey`).then((response) =>
  //     response
  //       .json()
  //       .then(({ surveyData }) => {
  //         setSurveyData(surveyData);
  //         setIsDataLoading(false);
  //       })
  //       .catch((error) => console.log(error))
  //   );
  // }, []);

  useEffect(() => {
    async function fetchSurvey() {
      setIsDataLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/survey`);
        const { surveyData } = await response.json();
        setSurveyData(surveyData);
      } catch (err) {
        console.log('===== error =====', err);
        setError(true);
      } finally {
        setIsDataLoading(false);
      }
    }
    fetchSurvey();
  }, []);

  if (error) {
    return <span>Oups il y a eu un problème</span>;
  }

  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumberInt}</QuestionTitle>
      {isDataLoading ? (
        <Loader />
      ) : (
        <QuestionContent>{surveyData[questionNumberInt]}</QuestionContent>
      )}
      <LinkWrapper>
        <Link to={`/survey/${prevQuestionNumber}`}>précédent</Link>
        {surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
        ) : (
          <Link to='/results'>Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  );
}

export default Survey;
