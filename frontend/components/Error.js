import styled from 'styled-components';
import React from 'react';

import PropTypes from 'prop-types';

const ErrorStyles = styled.div`
`;

const Error = ({ error }) => {
  if (!error || !error.message) return null;
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorStyles key={i}>
        <p data-test="graphql-error">
          <strong>Error: </strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    ));
  }
  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong>Error: </strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  );
};

Error.defaultProps = {
  error: {},
};

Error.propTypes = {
  error: PropTypes.object,
};

export default Error;
