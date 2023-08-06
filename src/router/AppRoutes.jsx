import Dashboard from '../containers/Dashboard/Dashboard';
import Contents from '../containers/Contents/Contents';
import Analytics from '../containers/Analytics/Analytics';
import Customisation from '../containers/Customisation/Customisation';
import { Route, Routes } from 'react-router-dom';

function AppRoutes() {
    return (<Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/contents' element={<Contents/>} />
        <Route path='/analytics' element={<Analytics/>} />
        <Route path='/customisation' element={<Customisation/>} />
    </Routes>
    );
}

export default AppRoutes;