import { AddIcon } from '@layer5/sistent';
import CreateDesignButton from '@/styles/CreateDesignButton';
import Link from 'next/link';

function CreateDesignBtn() {
  return (
    <Link href="/configuration/design">
      <CreateDesignButton type="submit" variant="contained" color="primary" size="large">
        <AddIcon />
        Create Design
      </CreateDesignButton>
    </Link>
  );
}

export default CreateDesignBtn;
