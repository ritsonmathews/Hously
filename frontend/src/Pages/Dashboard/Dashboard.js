import React, { useState } from 'react';
import './Dashboard.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import Services from '../AdminServices/Services';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Add a logout function
  const handleLogout = () => {
    
    setActiveTab('logout'); 
  };

  //data for the charts
  const newUserStatsData = [
    { name: 'Jan', users: 10 },
    { name: 'Feb', users: 20 },
    { name: 'Mar', users: 15 },
   
  ];

  const transactionData = [
    { name: 'Jan', transactions: 100, revenue: 500 },
    { name: 'Feb', transactions: 120, revenue: 600 },
    { name: 'Mar', transactions: 90, revenue: 450 },
    
  ];

  const servicesData = [
    { service: 'Cleaning', count: 30 },
    { service: 'Cooking', count: 25 },
    { service: 'Electrician', count: 15 },
    { service: 'Grass Cutting', count: 40 },
   
  ];

  const visitorData = [
    { name: 'Jan', visitors: 500 },
    { name: 'Feb', visitors: 600 },
    { name: 'Mar', visitors: 550 },

  ];

  return (
    <div className="Dashboard">
      <div className="sidebar">
        <h1>Admin Dashboard</h1>
        <ul>
          <li
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => handleTabClick('dashboard')}
          >
            Dashboard
          </li>
          <li
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => handleTabClick('User ')}
          >
            Users
          </li>
          <li
            className={activeTab === 'services' ? 'active' : ''}
            onClick={() => handleTabClick('Services')}
          >
            Services
          </li>
          <li
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => handleTabClick('settings')}
          >
            Settings
          </li>
          <li
            className={activeTab === 'logout' ? 'active' : ''}
            onClick={handleLogout}  // Call the handleLogout function when clicking "Log Out"
          >
            Log Out
          </li>
        </ul>
      </div>
      <div className="content">
        {/* Content for each tab goes here */}
        {activeTab === 'dashboard' && (
  <div>
    {/* New User Stats Chart */}
    <h3>New User Stats</h3>
    <LineChart width={400} height={300} data={newUserStatsData}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
    
    {/* Transaction and Revenue Stats Chart */}
    <h3>Transaction and Revenue Stats</h3>
    <BarChart width={400} height={300} data={transactionData}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Bar dataKey="transactions" fill="#8884d8" />
      <Bar dataKey="revenue" fill="#82ca9d" />
    </BarChart>
  </div>
)}
        {activeTab === 'services' && (
          <div>
            <Services />
          </div>
        )}
        {/* Add conditions for other tabs */}
      </div>
    </div>
  );
}

export default Dashboard;
