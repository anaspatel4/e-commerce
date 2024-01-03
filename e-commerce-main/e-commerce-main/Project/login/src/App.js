import React from 'react';
import Loginpage from './main/Loginpage';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import "antd/dist/reset.css"
import Home from './Homepage/Home';
import Create from './Createnew/Create';
import Edit from './Editdata/Edit';
import Protected from './Protected/Protected';
import Description from './Preview/Description'




function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/' element={<Protected Component={Home}/>}/>
        <Route path='/create' element={<Protected Component={Create}/>}/>
        <Route path='/edit/:id' element={<Protected Component={Edit}/>}/>
        <Route path='/description/:id' element={<Protected Component={Description} />}/>
       </Routes>
       </BrowserRouter>  
  </div>
  );
}
export default App;