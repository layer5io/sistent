import { useDispatch } from 'react-redux';
import { updatePathTitle } from '@/lib/redux/features/page/page.slice';
import { useEffect, Fragment } from 'react';
import Provider from '@/components/ProviderLogin';

export default function ProviderPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const newTitle = 'Provider';

    dispatch(updatePathTitle(newTitle));

    document.title = `${newTitle} | Meshery`;
  });

  return (
    <Fragment>
      <Provider />
    </Fragment>
  );
}
