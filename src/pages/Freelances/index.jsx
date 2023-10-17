import Card from '../../components/Card';
import styled from 'styled-components';
import colors from '../../utils/style/colors';
import { useState, useEffect } from 'react';
import { Loader } from '../../utils/style/Atoms';

const CardContainer = styled.div`
  display: grid;
  gap: 24px;
  justify-items: center;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`;

const PageTitle = styled.h1`
  font-size: 30px;
  color: black;
  text-align: center;
  padding-bottom: 10px;
`;

const PageSubtitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
  color: ${colors.secondary};
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function Freelances() {
  const [freelancersList, setfreelancesList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsDataLoading(true);
    async function fetchFreelances() {
      try {
        const response = await fetch('http://localhost:8000/freelances');
        const { freelancersList } = await response.json();
        setfreelancesList(freelancersList);
      } catch (err) {
        console.log('===== error =====', err);
        setError(true);
      } finally {
        setIsDataLoading(false);
      }
    }
    fetchFreelances();
  }, []);

  if (error) {
    return <span>Oups il y a eu un problème</span>;
  }
  return (
    <div>
      <PageTitle>Trouvez votre prestataire</PageTitle>
      <PageSubtitle>
        Chez Shiny nous réunisson les meilleurs profils pour vous.
      </PageSubtitle>
      {isDataLoading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <CardContainer>
          {freelancersList.map((profile) => (
            <Card
              key={`${profile.name}-${profile.id}`}
              label={profile.job}
              title={profile.name}
              picture={profile.picture}
            />
          ))}
        </CardContainer>
      )}
    </div>
  );
}

export default Freelances;
