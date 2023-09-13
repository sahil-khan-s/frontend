// components/Sidebar.js

import React from 'react';
import Link from 'next/link';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListIcon from '@mui/icons-material/List';
import HistoryIcon from '@mui/icons-material/History';
import FolderIcon from '@mui/icons-material/Folder';

const Sidebar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/dashboardLayout/dashboard">
            <h1>
              <DashboardIcon />
              Dashboard
            </h1>
          </Link>
        </li>
        <li>
          <Link href="/dashboardLayout/templates">
            <h1>
              <ListIcon />
              Templates
            </h1>
          </Link>
        </li>
        <li>
          <Link href="/dashboardLayout/history">
            <h1>
              <HistoryIcon />
              History
            </h1>
          </Link>
        </li>
        <li>
          <Link href="/dashboardLayout/resources">
            <h1>
              <FolderIcon />
              Resources
            </h1>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
