import React from 'react';

import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';

import DefaultLayout from '../pages/_layouts/Default';

interface RouteProps extends ReactDOMRouteProps {
  component: React.ComponentType;
  layout?: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  component: Component,
  layout: Layout = DefaultLayout,
  ...rest
}: RouteProps) => {

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return (
          <Layout>
            <Component />
          </Layout>
        );
      }}
    />
  );
};

export default Route;
