import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AdminPage from './AdminPage/AdminPage';
import './dist/style.css'
import Form from './Components/Form/Form';

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />}>
        <Route path="/admin/formulaire" element={<Form />} />
      </Route>
    </Routes>
  )

}

export default App;
