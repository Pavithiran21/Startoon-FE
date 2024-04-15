import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import './App.css';

import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { SignIn } from './Components/Home/SignIn';
import { Signup } from './Components/Home/Signup';
import { UserCountGraph } from './Components/Admin/Graph';
import { EmployeeTable } from './Components/Admin/AdminDashboard';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <ToastContainer/>
       <Routes>
       <Route path='/' element={<SignIn/>}/>
       <Route path='/sign-up' element={<Signup/>}/>
       <Route path='/admin/graph' element={<UserCountGraph/>}/>
       <Route path='/home' element={<EmployeeTable/>}/>

       </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
