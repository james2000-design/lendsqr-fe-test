"use client";

import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";
import { PiUserBold } from "react-icons/pi";
import { User } from "@/types/users";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
interface UserDetailsProps {
  id: string;
}
const UserDetails = ({ id }: UserDetailsProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem(`user_${id}`);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const allUsers = JSON.parse(localStorage.getItem("all_users") || "[]");
      const found = allUsers.find(
        (user: User) => String(user.id) === String(id)
      );
      if (found) setUser(found);
    }
  }, [id]);

  if (!user) {
    return (
      <div className={styles.content}>
        <p>User data not found. Please return to the user list.</p>
        <button
          onClick={() => router.push("/users")}
          className={styles.backButton}
        >
          ← Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <button
        className={styles.backButton}
        onClick={() => router.push("/users")}
      >
        <IoIosArrowRoundBack /> Back to Users
      </button>

      <div className={styles.header}>
        <h1>User Details</h1>
        <div className={styles.actionButtons}>
          <button className={styles.blacklistButton}>BLACKLIST USER</button>
          <button className={styles.activateButton}>ACTIVATE USER</button>
        </div>
      </div>

      <div className={styles.userProfile}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>
            <PiUserBold size={46} />
          </div>
          <div className={styles.nameSection}>
            <h2>{user.fullName}</h2>
            <p>{user.referral}</p>
          </div>
          <div className={styles.userTier}>
            <p>User&apos;s Tier</p>
            <div className={styles.stars}>
              <FaStar />
              <FaRegStar />
              <FaRegStar />
            </div>
          </div>
          <div className={styles.bankInfo}>
            <h3>{user.accountBalance}</h3>
            <p>{user.accountNumber}/Providus Bank</p>
          </div>
        </div>

        <div className={styles.tabs}>
          <button className={styles.activeTab}>General Details</button>
          <button>Documents</button>
          <button>Bank Details</button>
          <button>Loans</button>
          <button>Savings</button>
          <button>App and System</button>
        </div>
      </div>

      <div className={styles.detailsSection}>
        <div className={styles.section}>
          <h4>Personal Information</h4>
          <div className={styles.detailsGrid}>
            <Detail label="FULL NAME" value={user.fullName} />
            <Detail label="PHONE NUMBER" value={user.phoneNumber} />
            <Detail label="EMAIL ADDRESS" value={user.email} />
            <Detail label="BVN" value={user.bvn} />
            <Detail label="GENDER" value={user.gender} />
            <Detail
              label="MARITAL STATUS"
              value={user.maritalStatus || "Single"}
            />
            <Detail label="CHILDREN" value={user.children || "None"} />
            <Detail
              label="TYPE OF RESIDENCE"
              value={user.residenceType || "Parent's Apartment"}
            />
          </div>
        </div>

        <div className={styles.section}>
          <h4>Education and Employment</h4>
          <div className={styles.detailsGrid}>
            <Detail
              label="LEVEL OF EDUCATION"
              value={user.educationLevel || "B.Sc"}
            />
            <Detail
              label="EMPLOYMENT STATUS"
              value={user.employmentStatus || "Employed"}
            />
            <Detail
              label="SECTOR OF EMPLOYMENT"
              value={user.employmentSector || "FinTech"}
            />
            <Detail
              label="DURATION OF EMPLOYMENT"
              value={user.employmentDuration || "2 years"}
            />
            <Detail
              label="OFFICE EMAIL"
              value={user.officeEmail || `${user.username}@lendsqr.com`}
            />
            <Detail
              label="MONTHLY INCOME"
              value={user.monthlyIncome || "₦200,000.00 - ₦400,000.00"}
            />
            <Detail
              label="LOAN REPAYMENT"
              value={user.loanRepayment || "40,000"}
            />
            <Detail
              label="LOAN DURATION IN MONTHS"
              value={user.duration_in_month || "12"}
            />
          </div>
        </div>

        <div className={styles.section}>
          <h4>Socials</h4>
          <div className={styles.detailsGrid}>
            <Detail
              label="TWITTER"
              value={user.twitter || `@${user.username.toLowerCase()}`}
            />
            <Detail label="FACEBOOK" value={user.facebook || user.fullName} />
            <Detail
              label="INSTAGRAM"
              value={user.instagram || `@${user.username.toLowerCase()}`}
            />
            <Detail
              label="LINKEDIN"
              value={user.linkedin || `@${user.username.toLowerCase()}`}
            />
          </div>
        </div>

        <div className={styles.section}>
          <h4>Guarantor</h4>
          <div className={styles.detailsGrids}>
            <Detail
              label="FULL NAME"
              value={user.guarantor?.fullName || "Debby Ogana"}
            />
            <Detail
              label="PHONE NUMBER"
              value={user.guarantor?.phoneNumber || "07060780922"}
            />
            <Detail
              label="EMAIL ADDRESS"
              value={user.guarantor?.email || "debby@gmail.com"}
            />
            <Detail
              label="RELATIONSHIP"
              value={user.guarantor?.relationship || "Sister"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Detail = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className={styles.detailItem}>
    <p className={styles.detailLabel}>{label}</p>
    <p className={styles.detailValue}>{value}</p>
  </div>
);

export default UserDetails;
