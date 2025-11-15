import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import { useSelector } from 'react-redux';
import useCurrentUser from './hooks/useCurrentUser';
import { ClipLoader } from 'react-spinners';
import useSuggestedUsers from './hooks/useSuggestedUsers';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Upload from './pages/Upload';

const App = () => {
  useCurrentUser();
  useSuggestedUsers();
  const {userData,loading} = useSelector(state=>state.user)
  if (loading) {
    return <div className="flex justify-center items-center h-screen"><ClipLoader color='blue' size={60}/></div>
  }
  return (
    <Router>
      <Routes>
        <Route path='/' element={userData?<Home/>:<Navigate to={'/login'}/>}/>
        <Route path="/signup" element={!userData?<Signup />:<Navigate to={'/'}/>} />
        <Route path="/login" element={!userData?<Login />:<Navigate to={'/'}/>} />
        <Route path='/forgot-password' element={!userData?<ForgotPassword/>:<Navigate to={'/'}/>}/>
        <Route path='/profile/:username' element={userData?<Profile/>:<Navigate to={'/login'}/>}/>
        <Route path='/editprofile' element={userData?<EditProfile/>:<Navigate to={'/login'}/>}/>
        <Route path='/upload' element={userData?<Upload/>:<Navigate to={'/login'}/>}/>
      </Routes>
    </Router>
  );
};

export default App;