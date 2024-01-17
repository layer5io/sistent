import { styled } from 'styled-components';

const ColorStylesWrapper = styled.div`
  width: 85%;
  p {
    margin: 1rem 0;
  }

  h1,
  h2 {
    margin: 0.5rem 0;
  }

  .section {
    padding: 1rem 0;
    border-bottom: 1px solid ${(props) => props.theme.borderDefault};

    h1 {
      margin: 0.6rem 0;
    }
    h2 {
      margin: 0.4rem 0;
    }
    p {
      margin: 0.5rem 0;
      ul {
        list-style: disc inside;
      }
      a {
        color: ${(props) => props.theme.textBrand};
        text-decoration: underline;
      }
    }
  }

  .note {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 700;
    color: ${(props) => props.theme.textSecondary};
  }

  .image {
    margin: 1rem 0;
    & img {
      display: block;
      margin: auto;
      width: 70%;
    }
  }
`;

export default ColorStylesWrapper;
