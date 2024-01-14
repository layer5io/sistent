import { styled } from 'styled-components';

const Heading = styled.h1`
  align-self: stretch;
  color: ${(props) => props.theme.textDefault};
  font-size: 52px;
  font-weight: bold;
  font-family: 'Qanelas Soft', sans-serif;
  line-height: 64px;
  text-transform: capitalize;
`;

export default Heading;
