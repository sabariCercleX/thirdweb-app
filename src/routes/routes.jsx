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
const Donor = Loadable(lazy(()=> import('../pages/Donor')))
const CreateDonor = Loadable(lazy(()=> import('../pages/CreateDonor')))
const BloodRequest = Loadable(lazy(()=> import('../pages/BloodRequest')))
const BloodBank = Loadable(lazy(()=> import('../pages/BloodBank')))
const CreateBloodBank = Loadable(lazy(() => import('../pages/CreateBloodBank')))
export default function Router() {
    return useRoutes([
    {path:'dashboard', element:<MenubarLayout/>, children:[
        {path:'loading', element:<LoadingScreen/>},
        {path:'donor', element:<Donor/>},
        {path:'createdonor', element:<CreateDonor/>},
        {path:'bloodRequest', element:<BloodRequest/>},
        {path:'bloodbank', element:<BloodBank/>},
        {path:'createbloodbank', element:<CreateBloodBank/>}
    ]}
  ])
  }