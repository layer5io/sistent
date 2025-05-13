import { KANVAS_MODE,ResourceType,RESOURCE_TYPE } from "../constants/constants";


type PathParams = {
  id:string
  name: string
}

export const viewPath = ({ id, name }:PathParams) => {
  const currentRoute = new URL(window.location.href);
  const currentURI = currentRoute.origin + currentRoute.pathname;
  const newParams = new URLSearchParams({
    mode: KANVAS_MODE.OPERATOR,
    type: RESOURCE_TYPE.VIEW,
    ...(id ? { id } : {}),
    ...(name ? { name } : {})
  });
  const newURI = currentURI + "?" + newParams.toString();
  return newURI;
};

export const catalogPath = ({ id, name }:PathParams) => {
  const currentRoute = new URL(window.location.href);
  const currentURI = currentRoute.origin + currentRoute.pathname;
  const newParams = new URLSearchParams({
    mode: KANVAS_MODE.DESIGN,
    type: RESOURCE_TYPE.CATALOG,
    ...(id ? { id } : {}),
    ...(name ? { name } : {})
  });
  const newURI = currentURI + "?" + newParams.toString();
  return newURI;
};

export const getRouteParams = () => {
  const currentRoute = new URL(window.location.href);
  const params = currentRoute.searchParams;
  return params;
};

export const getDesignPath = (id?: string) => {
  const currentRoute = new URL(window.location.href);
  const currentURI = currentRoute.origin + currentRoute.pathname;

  const newParams = new URLSearchParams({
    mode: KANVAS_MODE.DESIGN,
    ...(id ? { design: id } : {})
  });
  const newURI = currentURI + "?" + newParams.toString();
  return newURI;
};

export const getShareableResourceRoute = (
  type: ResourceType,
  id: string,
  name: string
) => {
  if (type === RESOURCE_TYPE.DESIGN) {
    return getDesignPath(id);
  }

  if (type === RESOURCE_TYPE.VIEW) {
    return viewPath({ id, name });
  }

  if (type === RESOURCE_TYPE.CATALOG) {
    return catalogPath({ id, name });
  }

  throw new Error(`Unknown resource type ${type}`);
};

export const emptyViewPath = () => {
  return viewPath({id:"",name:""});
};

export const getEmptyDesignPath = () => {
  return getDesignPath();
};
