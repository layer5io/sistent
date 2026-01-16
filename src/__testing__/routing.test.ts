import { RESOURCE_TYPE } from '../constants/constants';
import {
  catalogPath,
  emptyViewPath,
  getDesignPath,
  getEmptyDesignPath,
  getRouteParams,
  getShareableResourceRoute,
  viewPath
} from '../utils/routing';

const setLocation = (path: string) => {
  window.history.pushState({}, '', path);
};

describe('routing utilities', () => {
  beforeEach(() => {
    setLocation('/workspace');
  });

  it('builds operator view paths with id and name', () => {
    const result = viewPath({ id: '123', name: 'alpha' });
    expect(result).toBe('http://localhost/workspace?mode=operator&type=view&id=123&name=alpha');
  });

  it('builds catalog paths omitting empty id', () => {
    const result = catalogPath({ id: '', name: 'catalog-one' });
    expect(result).toBe('http://localhost/workspace?mode=design&type=catalog&name=catalog-one');
  });

  it('builds design paths with and without ids', () => {
    expect(getDesignPath('d1')).toBe('http://localhost/workspace?mode=design&design=d1');
    expect(getEmptyDesignPath()).toBe('http://localhost/workspace?mode=design');
  });

  it('routes shareable resources based on type', () => {
    expect(getShareableResourceRoute(RESOURCE_TYPE.VIEW, 'v1', 'view')).toBe(
      'http://localhost/workspace?mode=operator&type=view&id=v1&name=view'
    );
    expect(getShareableResourceRoute(RESOURCE_TYPE.CATALOG, 'c1', 'catalog')).toBe(
      'http://localhost/workspace?mode=design&type=catalog&id=c1&name=catalog'
    );
    expect(getShareableResourceRoute(RESOURCE_TYPE.DESIGN, 'd2', 'design')).toBe(
      'http://localhost/workspace?mode=design&design=d2'
    );
    expect(() => getShareableResourceRoute('filter' as unknown as RESOURCE_TYPE, 'f1', 'filter')).toThrow(
      'Unknown resource type filter'
    );
  });

  it('returns current route search params', () => {
    setLocation('/workspace?foo=bar');
    const params = getRouteParams();
    expect(params.get('foo')).toBe('bar');
  });

  it('generates empty view path without params', () => {
    const result = emptyViewPath();
    expect(result).toBe('http://localhost/workspace?mode=operator&type=view');
  });
});
