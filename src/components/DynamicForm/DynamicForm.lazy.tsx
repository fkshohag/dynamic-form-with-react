import React, { lazy, Suspense } from 'react';

const LazyDynamicForm = lazy(() => import('./DynamicForm'));

const DynamicForm = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDynamicForm {...props} />
  </Suspense>
);

export default DynamicForm;
