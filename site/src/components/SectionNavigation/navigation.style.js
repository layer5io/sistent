import { styled } from 'styled-components';

const SectionNavigationWrapper = styled.div`
  border-bottom: 3px solid ${(props) => props.theme.borderDefault};
  margin-right: -3rem;
  margin-left: -2rem;
  padding-left: 2rem;

  .nav-items {
    padding: 0;
    display: flex;

    .item {
      display: flex;
      justify-content: center;
      padding-top: 1rem;
      padding-bottom: 1rem;
      position: relative;
      cursor: pointer;
      position: relative;
    }

    .active {
      color: ${(props) => props.theme.textBrand};
      font-weight: 600;
    }

    .active-indicator {
      height: 4px;
      background-color: ${(props) => props.theme.backgroundBrandDefault};
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      position: absolute;
      left: 0;
      bottom: -2px;
      transition: transform 0.3s ease;
    }
  }
`;

export default SectionNavigationWrapper;
