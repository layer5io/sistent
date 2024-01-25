import { styled } from 'styled-components';

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-right: -4rem;

  .container {
    border-top: 1px solid ${(props) => props.theme.borderDefault};
    padding: 0px 5rem 0px 2.5rem;
    padding-top: 5rem;
    padding-bottom: 5rem;
  }

  .text {
    line-height: 1.8rem;
    padding-right: 2rem;
    margin-right: 4rem;
  }

  .about {
    display: flex;
  }

  .links {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
  }
`;

export default FooterWrapper;
