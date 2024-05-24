import './App.css'
//DEFAULT PROFILE TAB
import Dashboard from './Components/Dashboard/Dashboard'
//UNDER PROFILETAB
import LogInCredentials from './Components/Dashboard/ProfileTab/LogInCredentials/LogInCredentials'
import DocumentsUploaded from './Components/Dashboard/ProfileTab/DocumentsUploaded/DocumentsUploaded'
import MyColleges from './Components/Dashboard/ProfileTab/MyColleges/MyColleges'
import EducationalBackground from './Components/Dashboard/ProfileTab/EducationalBackground/EducationalBackground.jsx'
//UNDER DASHBOARD
import Colleges from './Components/Dashboard/Colleges/Colleges'
import Scholarships from './Components/Dashboard/Scholarships/Scholarships'

//DISREGARD
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
//TABS
import Compare from './Components/Dashboard/Colleges/Compare/Compare.jsx'
//Under view tab for colleges
import CollegeView from './Components/Dashboard/Colleges/CollegeView/CollegeView'

// CONTEXT PROVIDER
import { CollegeProvider } from './Components/Dashboard/Colleges/CollegeContext.jsx'

// ROUTING
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element:  <div><Login/></div>
  },
  {
    path: '/register',
    element:  <div><Register/></div>
  },
  {
    path: '/Dashboard',
    element:  <div><Dashboard/></div>
  },
  {
    path: '/Colleges',
    element:  <div><Colleges/></div>
  },
  {
    path: '/LogInCredentials',
    element: <div><LogInCredentials/></div>
  },
  {
    path: '/MyColleges',
    element: <div><MyColleges/></div>
  },
  {
    path: '/Scholarships',
    element: <div><Scholarships/></div>
  },
  {
    path: '/CollegeView',
    element: <div><CollegeView/></div>
  },
  {
    path: '/DocumentsUploaded',
    element: <div><DocumentsUploaded/></div>
  },
  {
    path: '/EducationalBackground',
    element: <div><EducationalBackground/></div>
  },
  {
    path: '/Compare',
    element: <div><Compare/></div>
  },

])



function App() {
  return (
    // Providing the College context to all components within the RouterProvider
    <CollegeProvider>
      <div>
        <RouterProvider router={router}/>
      </div>
    </CollegeProvider>
  );
}

export default App;