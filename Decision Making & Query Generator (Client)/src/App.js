
import React from 'react';
import { Route,  Routes } from 'react-router-dom';
import HomePage from './Components/HomePage'
import RuleBuilderPage from './Components/RuleBuilderPage';
import RuleManagementPage from './Components/RuleManagementPage';
import DebuggingPage from './Components/DebuggingPage';
import AddFilePage from './Components/AddFilePage';
import LoginPage from './Components/LoginPage';
import DecisionMakingPage from './Components/DecisionMaking';


const App = () => {
  return (
      <Routes>
        <Route path="/"  element={<HomePage/>} />
        <Route path="/rule-builder" element={<RuleBuilderPage/>} />
        <Route path="/rule-management" element={<RuleManagementPage/>} />
        <Route path="/debugging" element={<DebuggingPage/>} />
        <Route path="/add-file" element={<AddFilePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/decision-making" element={<DecisionMakingPage/>} />
    </Routes>
  );
};

export default App;
