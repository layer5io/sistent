import Dashboard from '@/components/Dashboard';
import { useDispatch } from 'react-redux';
import { updatePathTitle } from '@/lib/redux/features/page/page.slice';
import { useEffect } from 'react';

function IndexPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const newTitle = 'Dashboard';

    dispatch(updatePathTitle(newTitle));

    document.title = `${newTitle} | Meshery`;
  }, []);

  return <Dashboard />;
}

export default IndexPage;
