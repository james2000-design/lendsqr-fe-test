import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import BriefCase from "../../../public/assets/images/briefcase 1.png";
import Guarantor from "../../../public/assets/images/users 1.png";
import SackLoan from "../../../public/assets/images/sack 1.png";
import homeIcon from "../../../public/assets/images/home 1.png";
import Users from "../../../public/assets/images/user-friends 1.png";
import Handshake from "../../../public/assets/images/handshake-regular 1.png";
import Savings from "../../../public/assets/images/piggy-bank 1.png";
import LoanRequest from "../../../public/assets/images/Group 104.png";
import UserCheck from "../../../public/assets/images/user-check 1.png";
import Karma from "../../../public/assets/images/user-times 1.png";
import Product from "../../../public/assets/images/Group 1014.png";
import SavingsProduct from "../../../public/assets/images/np_bank_148501_000000 1.png";
import Fees from "../../../public/assets/images/coins-solid 1.png";
import Transaction from "../../../public/assets/images/icon2.png";
import Services from "../../../public/assets/images/galaxy 1.png";
import Account from "../../../public/assets/images/user-cog 1.png";
import Settlement from "../../../public/assets/images/scroll 1.png";
import Report from "../../../public/assets/images/chart-bar 2.png";
import Preference from "../../../public/assets/images/sliders-h 1.png";
import Pricing from "../../../public/assets/images/badge-percent 1.png";
import Audit from "../../../public/assets/images/clipboard-list 1.png";
import { RiArrowDropDownLine } from "react-icons/ri";

const Sidebar = () => {
  const menuItems = [
    { icon: Users, label: "Users", path: "/users" },
    { icon: Guarantor, label: "Guarantors", path: "#" },
    { icon: SackLoan, label: "Loans", path: "#" },
    {
      icon: Handshake,
      label: "Decision Models",
      path: "#",
    },
    { icon: Savings, label: "Savings", path: "#" },
    {
      icon: LoanRequest,
      label: "Loan Requests",
      path: "#",
    },
    { icon: UserCheck, label: "Whitelist", path: "#" },
    { icon: Karma, label: "Karma", path: "#" },
    { icon: BriefCase, label: "Organization", path: "#" },
    {
      icon: Product,
      label: "Loan Products",
      path: "#",
    },
    {
      icon: SavingsProduct,
      label: "Savings Products",
      path: "#",
    },
    {
      icon: Fees,
      label: "Fees and Charges",
      path: "#",
    },
    { icon: Transaction, label: "Transactions", path: "#" },
    { icon: Services, label: "Services", path: "#" },
    {
      icon: Account,
      label: "Service Account",
      path: "#",
    },
    { icon: Settlement, label: "Settlements", path: "#" },
    { icon: Report, label: "Reports", path: "#" },
    { icon: Preference, label: "Preferences", path: "#" },
    {
      icon: Pricing,
      label: "Fees and Pricing",
      path: "#",
    },
    { icon: Audit, label: "Audit Logs", path: "#" },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.organization}>
        <Image src={BriefCase} alt="Organization" width={16} height={16} />
        <span>Switch Organization</span>
        <RiArrowDropDownLine size={24} />
      </div>

      <div className={styles.dashboardLink}>
        <Image src={homeIcon} alt="Dashboard" width={16} height={16} />
        <Link href={"/dashboard"}>Dashboard</Link>
      </div>

      <div className={styles.menuSection}>
        <h4>CUSTOMERS</h4>
        <ul className={styles.menuList}>
          {menuItems.slice(0, 8).map((item) => (
            <li key={item.label} className={styles.menuItem}>
              <Link href={item.path}>
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={16}
                  height={16}
                />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.menuSection}>
        <h4>BUSINESSES</h4>
        <ul className={styles.menuList}>
          {menuItems.slice(8, 15).map((item) => (
            <li key={item.label} className={styles.menuItem}>
              <Link href={item.path}>
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={16}
                  height={16}
                />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.menuSection}>
        <h4>SETTINGS</h4>
        <ul className={styles.menuList}>
          {menuItems.slice(15).map((item) => (
            <li key={item.label} className={styles.menuItem}>
              <Link href={item.path}>
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={16}
                  height={16}
                />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
