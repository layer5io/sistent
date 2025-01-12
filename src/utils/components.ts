export const componentIcon = ({ kind, model, color }) => {
  if (!kind || !model || !color) {
    return null;
  }
  return `/ui/public/static/img/meshmodels/${model}/${color}/${kind.toLowerCase()}-${color}.svg`;
};
