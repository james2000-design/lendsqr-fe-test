"use client";

import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import UserImage from "@/../../public/assets/images/image 4.png";
import Logo from "@/../../public/assets/images/logo.png";
import Search from "@/../../public/assets/images/Vector.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <button className={styles.mobileMenuButton} onClick={onMenuClick}>
          <FiMenu size={22} data-testid="mobile-menu-button" />
        </button>
        <Image src={Logo} alt="Logo" />
      </div>

      <div className={styles.searchBar}>
        <input type="text" placeholder="Search for anything" />
        <button>
          <Image src={Search} alt="Search" width={16} height={16} />
        </button>
      </div>

      <div className={styles.navActions}>
        <Link href="#" className={styles.navLink}>
          Docs
        </Link>
        <IoNotificationsOutline
          size={24}
          data-testid="navbar-notification-icon"
        />

        <div className={styles.userMenu}>
          <div className={styles.avatar}>
            <Image src={UserImage} alt="User" width={40} height={40} />
          </div>
          <span className={styles.userName}>Adedeji</span>
          <IoMdArrowDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
