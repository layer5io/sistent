import React from 'react';
import { Card, CardHeader, ContainerCardWrapper, SetupPreReqWrapper } from './style';

// const meshery =
//   require('../../../assets/images/meshery/icon-only/meshery-logo-light.svg') as string;
// const mesheryOperator =
//   require('../../../assets/images/meshery-operator/meshery-operator-dark.svg') as string;
interface SetupItem {
  heading: string;
  description: string;
  Icon: JSX.Element;
  onClick: () => void;
}
interface SetupPreReqProps {
  Steps: SetupItem[];
}
const SetupPreReq: React.FC<SetupPreReqProps> = ({ Steps }) => (
  <SetupPreReqWrapper>
    <div className="get-started-desc" id="pre-requisites">
      <h2>Prerequisites</h2>
      <p>
        In this learning path, we will be using Meshery as the management plane to manage the
        service meshes. Meshery, collaborative Kubernetes manager
      </p>
    </div>
    <ContainerCardWrapper id="Set up">
      {Steps.map((item) => {
        return (
          <Card>
            <CardHeader>
              <h2>{item.heading}</h2>
              {item.Icon}
            </CardHeader>
            <p>{item.description}</p>
          </Card>
        );
      })}
    </ContainerCardWrapper>
  </SetupPreReqWrapper>
);

export default SetupPreReq;
