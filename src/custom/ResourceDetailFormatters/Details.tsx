/* eslint-disable @typescript-eslint/no-explicit-any */
import { OperatorDataContainer } from './styles';
import { isEmptyAtAllDepths } from './utils';

interface OperatorDataFormatterProps {
  data: any;
  FormatStructuredData: any;
  propertyFormatter: any;
}

export const OperatorDataFormatter = ({
  data,
  FormatStructuredData,
  propertyFormatter
}: OperatorDataFormatterProps) => {
  if (!data || isEmptyAtAllDepths(data)) {
    return null;
  }

  return (
    <OperatorDataContainer>
      <FormatStructuredData data={data} propertyFormatters={propertyFormatter} isLevel={false} />
    </OperatorDataContainer>
  );
};
