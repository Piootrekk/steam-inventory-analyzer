import React from "react";

type ComponentWithProps = {
  component: React.FC<any>;
  props?: Record<string, any>;
};

type ComponentPaginationProps = {
  page: number;
  components: ComponentWithProps[];
};

export const ComponentPaginationWithSubProps: React.FC<
  ComponentPaginationProps
> = ({ page, components }) => {
  const { component: Component, props } = components[page];
  return <Component {...props} />;
};

const ComponentPagination: React.FC<{
  page: number;
  components: React.FC[];
}> = ({ page, components }) => {
  const Component = components[page];
  return <Component />;
};

export default ComponentPagination;
