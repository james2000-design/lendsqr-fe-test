"use client";

import React, { useState } from "react";
import styles from "./style.module.scss";
import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar/navbar";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={styles.pageLayout}>
      <Navbar onMenuClick={toggleSidebar} />

      <div className={styles.layoutBody}>
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
};

export default PageLayout;
