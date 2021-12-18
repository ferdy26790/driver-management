import React from 'react';
import { shallow } from 'enzyme';

import { StoreProvider, StoreContext } from './context';

export function useStoreFn() {
  const context = React.useContext(StoreContext);
  if (!context) {
    throw new Error('useStoreFn must be used within a StoreProvider');
  }
  return context;
}

const FunctionalComponent = () => {
  useStoreFn();
  return <div />;
};

test('useStoreFn throws error when not wrapped in storeProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow('useStoreFn must be used within a StoreProvider');
});

test('useStoreFn does not throw error when wrapped in StoreProvider', () => {
  expect(() => {
    shallow(
      <StoreProvider>
        <FunctionalComponent />
      </StoreProvider>,
    );
  }).not.toThrow();
});

