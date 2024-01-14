import React from 'react';
import styled, { css } from 'styled-components';

const RowWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
  ${(props) =>
    props.Vcenter &&
    css({
      'align-items': 'center'
    })};
  ${(props) =>
    props.Hcenter &&
    css({
      'justify-content': 'center'
    })};

  ${(props) =>
    props.noXMargin &&
    css({
      'margin-left': 0,
      'margin-right': 0
    })}
`;

const Row = ({ children, ...props }) => {
  return <RowWrapper {...props}>{children}</RowWrapper>;
};

export default Row;
