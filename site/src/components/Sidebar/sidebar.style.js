import { styled } from 'styled-components';
import { Col } from '../reuse/Layout';

const SidebarWrapper = styled(Col)`
  padding-left: 0;
  padding-right: 0;
  padding-top: 2rem;

  .list {
    display: flex;
    flex-direction: column;
    font-size: 16px;
  }

  .item {
    padding: 0.8rem 0.5rem;

    &.active {
      color: ${(props) => props.theme.textBrand};
    }
  }
`;

export default SidebarWrapper;
