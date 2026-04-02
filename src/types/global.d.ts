// React 19 removed the global JSX namespace; re-declare it for backward compatibility
declare namespace JSX {
  type Element = React.JSX.Element;
  type ElementType = React.JSX.ElementType;
  type ElementClass = React.JSX.ElementClass;
  type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<C, P>;
  type ElementAttributesProperty = React.JSX.ElementAttributesProperty;
  type ElementChildrenAttribute = React.JSX.ElementChildrenAttribute;
  type IntrinsicAttributes = React.JSX.IntrinsicAttributes;
  type IntrinsicClassAttributes<T> = React.JSX.IntrinsicClassAttributes<T>;
  type IntrinsicElements = React.JSX.IntrinsicElements;
}
