import { styled } from 'styled-components';
import { Col } from '../reuse/Layout';

const SidebarWrapper = styled(Col)`
  padding-left: 0;
  padding-right: 0;
  padding-top: 2rem;
  border-right: 1px solid ${(props) => props.theme.borderDefault};

  .list {
    display: flex;
    flex-direction: column;
    font-size: 16px;
  }

  .item {
    padding: 0.8rem 3rem 0.8rem 0.5rem;

    &.active {
      color: ${(props) => props.theme.textBrand};
      font-weight: 600;
    }
  }

  .dropdown {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }

  .children {
    display: flex;
    flex-direction: column;
  }

  .child-item {
    padding-top: 0.9rem;
    padding-left: 0.7rem;
  }
`;

export default SidebarWrapper;
