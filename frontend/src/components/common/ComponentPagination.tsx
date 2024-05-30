import React from "react";

type ComponentPaginationPropsInBulk = {
  page: number;
  components: React.ElementType[];
  componentRefs?: React.Ref<any>[];
  commonProps?: Record<string, any>;
};

type ComponentConfig = {
  component: React.ElementType;
  props?: Record<string, any>;
  ref?: React.Ref<any>;
};

type ComponentPaginationProps = {
  page: number;
  components: ComponentConfig[];
};

const ComponentPaginationWithPropsInBulk: React.FC<
  ComponentPaginationPropsInBulk
> = ({ page, components, componentRefs, commonProps = {} }) => {
  const Component = components[page];
  if (componentRefs === undefined) return <Component {...commonProps} />;
  const componentRef = componentRefs[page];
  return <Component ref={componentRef} {...commonProps} />;
};

export default ComponentPaginationWithPropsInBulk;


export const ComponentPagination: React.FC<ComponentPaginationProps> = ({
  page,
  components,
}) => {
  const { component: Component, props = {}, ref } = components[page];
  return <Component ref={ref} {...props} />;
};
