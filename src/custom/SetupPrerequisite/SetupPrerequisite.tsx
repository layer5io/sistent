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
  url: string;
}
interface SetupPreReqProps {
  Steps: SetupItem[];
  PrerequisiteLine?: string;
}
const SetupPreReq: React.FC<SetupPreReqProps> = ({ Steps, PrerequisiteLine }) => (
  <SetupPreReqWrapper>
    <div className="get-started-desc" id="pre-requisites">
      <h2>Prerequisites</h2>
      <p>{PrerequisiteLine}</p>
    </div>
    <ContainerCardWrapper id="Set up">
      {Steps.map((item) => {
        return (
          <Card href={item.url} target="_blank">
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
