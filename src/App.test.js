import React from 'react';
import { shallow } from 'enzyme';
import * as storeContext from './context';
import {mockData} from './mockData'
import App from './App';
// import Card from './components/Card';

const Card = React.lazy(() => import('./components/Card'))


describe('App with data', () => {
  const contextValues = {
    handleSearch: jest.fn(),
    handlePagination: jest.fn(),
    drivers:{
      data: mockData,
      pagination: {
        page: 1,
        totalPage: 3
      },
      meta: {
        status: 'SUCCESS',
        error: null
      }
    }
  };
  jest.spyOn(storeContext, 'useStoreContext').mockImplementation(() => contextValues);

  const appWrapper = shallow(<App />);
  it('should render without crashing', () => {
    expect(appWrapper).toHaveLength(1);
  })
  it('should render 5 Card Component', () => {
    expect(appWrapper.find('.card-data-test')).toHaveLength(5)
  })
  it('should render pagination button', () => {
    expect(appWrapper.find('.pagination-data-test')).toHaveLength(1)
  })
});

describe('App without data', () => {
  const contextValues = {
    handleSearch: jest.fn(),
    handlePagination: jest.fn(),
    drivers:{
      data: null,
      pagination: {
        page: 1,
        totalPage: 0
      },
      meta: {
        status: 'SUCCESS',
        error: null
      }
    }
  };
  jest.spyOn(storeContext, 'useStoreContext').mockImplementation(() => contextValues);

  const appWrapper = shallow(<App />);
  it('should render without crashing', () => {
    expect(appWrapper).toHaveLength(1);
  })
  it('should render text no data found', () => {
    expect(appWrapper.find('#not-found').text()).toEqual('DATA NOT FOUND');
  })
});

describe('App witho Error data', () => {
  const contextValues = {
    handleSearch: jest.fn(),
    handlePagination: jest.fn(),
    drivers:{
      data: null,
      pagination: {
        page: 1,
        totalPage: 0
      },
      meta: {
        status: 'ERROR',
        error: null
      }
    }
  };
  jest.spyOn(storeContext, 'useStoreContext').mockImplementation(() => contextValues);

  const appWrapper = shallow(<App />);
  it('should render without crashing', () => {
    expect(appWrapper).toHaveLength(1);
  })
  it('should render text ERROR', () => {
    expect(appWrapper.find('#error').text()).toEqual('ERROR');
  })
});
