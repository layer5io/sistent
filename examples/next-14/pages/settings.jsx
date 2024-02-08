import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { updatePathTitle } from '@/lib/redux/features/page/page.slice';

function SettingsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const newTitle = 'Settings';

    dispatch(updatePathTitle(newTitle));

    document.title = `${newTitle} | Meshery`;
  }, []);

  return <div>Settings</div>;
}

export default SettingsPage;
