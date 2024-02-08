import Link from 'next/link';
import ConnectClustersButton from '@/styles/ConnectClustersButton';
import { AddIcon } from '@layer5/sistent';

export function ConnectClustersBtn() {
  return (
    <Link href="/settings">
      <ConnectClustersButton type="submit" variant="contained" color="primary" size="large">
        <AddIcon />
        Connect Clusters
      </ConnectClustersButton>
    </Link>
  );
}

export default ConnectClustersBtn;
