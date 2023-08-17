import Dashboard from '../containers/Dashboard/Dashboard';
import EmailScanDropzone from '../containers/Scan/Scan';
import ThreatIndicatorsPage from '../containers/Threats/Threats';
import SettingsPage from '../containers/Settings/Settings';
import { Route, Routes } from 'react-router-dom';

function AppRoutes() {
    return (<Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/scan' element={<EmailScanDropzone/>} />
        <Route path='/threats' element={<ThreatIndicatorsPage/>} />
        <Route path='/settings' element={<SettingsPage/>} />
    </Routes>
    );
}

export default AppRoutes;