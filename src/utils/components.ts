export const componentIcon = ({
  kind,
  model,
  color
}: {
  kind: string;
  model: string;
  color: 'white' | 'color' | 'complete';
}) => {
  if (!kind || !model || !color) {
    return null;
  }
  return `/ui/public/static/img/meshmodels/${model}/${color}/${kind.toLowerCase()}-${color}.svg`;
};
