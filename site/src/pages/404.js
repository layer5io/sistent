import React from 'react';
import { Link } from 'gatsby';

const pageStyles = {
  color: '#232129',
  padding: '96px',
  fontFamily: '-apple-system, Roboto, sans-serif, serif'
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320
};

const paragraphStyles = {
  marginBottom: 48
};
const codeStyles = {
  color: '#8A6534',
  padding: 4,
  backgroundColor: '#FFF4DB',
  fontSize: '1.25rem',
  borderRadius: 4
};

const NotFoundPage = () => {
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>Page not found</h1>
      <p style={paragraphStyles}>Sorry 😔, we couldn’t find what you were looking for.</p>
      <p>
        Any questions? Ask on{' '}
        <a href="https://discuss.layer5.io" className="rounded border-2 border-gray-500">
          Layer5 Discussion Forum
        </a>{' '}
        or open an issue on <a href="https://github.com/layer5io/sistent">GitHub</a>.
      </p>
      <Link to="/">Go home</Link>.
    </main>
  );
};

export default NotFoundPage;

export const Head = () => <title>What a mesh!</title>;
