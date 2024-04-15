import React from 'react';
import { MesheryOperator, TerminalIcon } from '../../icons';
import { Card, CardHeader, ContainerCardWrapper, SetupPreReqWrapper } from './style';

// const meshery =
//   require('../../../assets/images/meshery/icon-only/meshery-logo-light.svg') as string;
// const mesheryOperator =
//   require('../../../assets/images/meshery-operator/meshery-operator-dark.svg') as string;

const SetupPreReq: React.FC = () => (
  <SetupPreReqWrapper>
    <div className="get-started-desc" id="pre-requisites">
      <h2>Prerequisites</h2>
      <p>
        In this learning path, we will be using Meshery as the management plane to manage the
        service meshes. Meshery, collaborative Kubernetes manager
      </p>
    </div>
    <ContainerCardWrapper id="Set up">
      <a href="/cloud-native-management/meshery" target="_blank">
        <Card>
          <CardHeader>
            <h2>Install Meshery</h2>
            <TerminalIcon className="setup-imgs" width={'40px'} height={'40px'} />
          </CardHeader>
          <p>
            Meshery provides you with a clean, robust, streamlined command-line interface to manage
            your service meshes: 'mesheryctl'.
          </p>
        </Card>
      </a>
      <a href="/cloud-native-management/meshery/getting-started" id="Run Meshery" target="_blank">
        <Card>
          <CardHeader>
            <h2>Run Meshery</h2>
            <MesheryOperator className="setup-imgs" width={'40px'} height={'40px'} />
          </CardHeader>
          <p>
            With 'mesheryctl', not only you can manage your service meshes, but also manage their
            workloads, measure their performance, verify conformance to service mesh standards.
          </p>
        </Card>
      </a>
      <a
        href="/cloud-native-management/meshery/operating-service-meshes"
        id="Manage Meshery"
        target="_blank"
      >
        <Card>
          <CardHeader>
            <h2>Manage Meshery</h2>
            <MesheryOperator className="setup-imgs" width={'40px'} height={'40px'} />
          </CardHeader>
          <p>Wrangle your mesh with Meshery Operator and MeshSync.</p>
        </Card>
      </a>
    </ContainerCardWrapper>
  </SetupPreReqWrapper>
);

export default SetupPreReq;
