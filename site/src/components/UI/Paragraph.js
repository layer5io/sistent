import { styled } from 'styled-components';

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 28px;
  color: ${(props) => props.theme.textSecondary};
`;

export default Paragraph;
