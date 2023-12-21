import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import Mainlayout from './Component/Mainlayout';
import User from './pages/User';
import Categorylist from './pages/Categorylist';
import Courselist from './pages/Courselist';
import Lessonlist from './pages/Lessonlist';
import Addlesson from './pages/Addlesson';
import Addcourse from './pages/Addcourse';
import AddCategory from './pages/AddCategory';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<Login/>}/>
      <Route  path='/reset-password' element={<Resetpassword/>}/>
      <Route  path='/forgot-password' element={<Forgotpassword/>}/>
      <Route path='/admin' element={<Mainlayout/>}>
      <Route  index element={<Dashboard/>}/>
      <Route  path='user' element={<User/>}/>
      <Route  path='list-category' element={<Categorylist/>}/>
      <Route  path='list-course' element={<Courselist/>}/>
      <Route  path='list-lesson' element={<Lessonlist/>}/>
      <Route  path='lesson' element={<Addlesson/>}/>
      <Route  path='lesson/:id' element={<Addlesson/>}/>
      <Route  path='course' element={<Addcourse/>}/>
      <Route  path='course/:id' element={<Addcourse/>}/>
      <Route  path='category' element={<AddCategory/>}/>
      <Route  path='category/:id' element={<AddCategory/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
