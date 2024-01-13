import { styled } from 'styled-components';

const LayoutWrapper = styled.div`
  overflow: hidden;
  font-family: 'Open Sans';
  font-size: 16px;
  color: ${(props) => props.theme.textDefault};
  font-weight: 400;
  @media only screen and (min-width: 1200px) {
    padding-left: 36px;
    padding-right: 36px;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .main-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default LayoutWrapper;
