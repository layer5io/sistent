import React from 'react';
import { Typography } from '../../base';
import { Card, CardHeader, ContainerCardWrapper, SetupPreReqWrapper } from './style';

interface SetupItem {
  heading: string;
  description: string;
  Icon: JSX.Element | string; // Updated to allow string (image source)
  url: string;
}
interface SetupPreReqProps {
  Steps: SetupItem[];
  PrerequisiteLine?: string;
}
const SetupPreReq: React.FC<SetupPreReqProps> = ({ Steps, PrerequisiteLine }) => (
  <SetupPreReqWrapper>
    <div className="get-started-desc" id="pre-requisites">
      <Typography variant="h2">Prerequisites</Typography>
      <p>{PrerequisiteLine}</p>
    </div>
    <ContainerCardWrapper id="Set up">
      {Steps.map((item, index) => {
        return (
          <Card key={index} href={item.url} target="_blank">
            <CardHeader>
              <Typography variant="h2">{item.heading}</Typography>
              {typeof item.Icon === 'string' ? (
                <img src={item.Icon} alt={item.heading} width={'40px'} height={'40px'} />
              ) : (
                item.Icon
              )}
            </CardHeader>
            <p>{item.description}</p>
          </Card>
        );
      })}
    </ContainerCardWrapper>
  </SetupPreReqWrapper>
);

export default SetupPreReq;
