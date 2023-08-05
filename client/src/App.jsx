import { Routes, Route } from 'react-router-dom'
import AdminPage from './AdminPage/AdminPage';
import Form from './AdminPage/Form/Form';
import { Dashboard } from './AdminPage/Dashboard';
import Planning from './AdminPage/Planning/Planning';
import Table from './AdminPage/Table/Table';
import './App.css';
import './dist/style.css'


function App() {
  return (
    <>
    <Routes>
      <Route path="/admin" element={<AdminPage />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/formulaire" element={<Form />} />
        <Route path="/admin/planning" element={<Planning />} />
        <Route path="/admin/liste" element={<Table />} />
      </Route>
    </Routes>
    </>
  )

}

export default App;
