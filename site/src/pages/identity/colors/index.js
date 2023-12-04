import { useParams } from 'react-router-dom';
import Navigation from '../Navigation';
import Text from '../Text';
import Code from './code';
import Guidance from './guidance';
import Overview from './overview';

const Color = () => {
  const { id } = useParams();
  return (
    <>
      <Text
        title="Color"
        description="Colors when accurately applied can be a potent tool that enables designers and developers to implement solutions with speed and efficiency. Here are a couple of things to keep in mind."
      />
      <Navigation type="color" />
      {id === 'guidance' ? <Guidance /> : id === 'code' ? <Code /> : <Overview />}
    </>
  );
};

export default Color;
