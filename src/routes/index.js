import Home from '../pages/Home';
import Following from '../pages/Following';
import Upload from '../pages/Upload';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import { HeaderOnly } from '~/components/Layout';
import routesConfig from '~/config/routes';

const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.following, component: Following },
    { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
    { path: routesConfig.search, component: Search },
    { path: routesConfig.profile, component: Profile },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
