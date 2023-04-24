import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
// layouts
import LoadingScreen from '../pages/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

const MenubarLayout = Loadable(lazy(()=> import('../layouts/MenubarLayout')))

export default function Router() {
    return useRoutes([
    {path:'dashboard', element:<MenubarLayout/>, children:[
        {path:'loading', element:<LoadingScreen/>}
    ]}
  ])
  }