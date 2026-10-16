import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../custom/ErrorBoundary';
import { SistentThemeProvider } from '../theme';

// react-error-boundary renders the fallback for any thrown value, not only an
// `Error`, so the default fallback has to render every one without throwing.
const Thrower = ({ value }: { value: unknown }): JSX.Element => {
  throw value;
};

const renderThrowing = (value: unknown) =>
  render(
    <SistentThemeProvider>
      <ErrorBoundary>
        <Thrower value={value} />
      </ErrorBoundary>
    </SistentThemeProvider>
  );

describe('ErrorBoundary default fallback', () => {
  beforeEach(() => {
    // React logs every caught render error; the boundary is the thing under test.
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => jest.restoreAllMocks());

  it.each([
    ['an Error', new Error('boom'), 'boom'],
    ['a string', 'plain failure', 'plain failure'],
    ['null', null, 'null'],
    ['undefined', undefined, 'undefined']
  ])('shows the message when %s is thrown', (_label, value, shown) => {
    renderThrowing(value);

    expect(screen.getByRole('alert').textContent).toContain(`Error: ${shown}`);
  });
});
