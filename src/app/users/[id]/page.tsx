import React from "react";
import styles from "./style.module.scss";
import Sidebar from "@/components/sidebar/side-bar";
import Navbar from "@/components/navbar/navbar";
import { useLocalStorage } from "@/app/lib/hooks/useLocalStorage";
import { useRouter } from "next/router";
import StatusBadge from "@/components/stausBadge/status-badge";
import Image from "next/image";
import { User } from "@/types/users";

const UserDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useLocalStorage<User | null>(`user_${id}`, null);

  // In a real app, you would fetch the user data here if not in localStorage
  // useEffect(() => {
  //   if (!user) {
  //     fetchUser(id).then(data => setUser(data));
  //   }
  // }, [id, user, setUser]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.userDetailsContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Navbar />
        <div className={styles.content}>
          <button
            className={styles.backButton}
            onClick={() => router.push("/users")}
          >
            ← Back to Users
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
                <Image
                  src={user.avatar || "/images/default-avatar.png"}
                  alt="User Avatar"
                />
              </div>
              <div className={styles.nameSection}>
                <h2>{user.fullName}</h2>
                <p>{user.userId}</p>
              </div>
              <div className={styles.userTier}>
                <p>User&apos;s Tier</p>
                <div className={styles.stars}>
                  <span>★</span>
                  <span>☆</span>
                  <span>☆</span>
                </div>
              </div>
              <div className={styles.bankInfo}>
                <h3>₦{user.accountBalance}</h3>
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
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>FULL NAME</p>
                  <p className={styles.detailValue}>{user.fullName}</p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>PHONE NUMBER</p>
                  <p className={styles.detailValue}>{user.phoneNumber}</p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>EMAIL ADDRESS</p>
                  <p className={styles.detailValue}>{user.email}</p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>BVN</p>
                  <p className={styles.detailValue}>{user.bvn}</p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>GENDER</p>
                  <p className={styles.detailValue}>{user.gender}</p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>MARITAL STATUS</p>
                  <p className={styles.detailValue}>
                    {user.maritalStatus || "Single"}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>CHILDREN</p>
                  <p className={styles.detailValue}>
                    {user.children || "None"}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>TYPE OF RESIDENCE</p>
                  <p className={styles.detailValue}>
                    {user.residenceType || "Parent's Apartment"}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h4>Education and Employment</h4>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>LEVEL OF EDUCATION</p>
                  <p className={styles.detailValue}>
                    {user.educationLevel || "B.Sc"}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>EMPLOYMENT STATUS</p>
                  <p className={styles.detailValue}>
                    {user.employmentStatus || "Employed"}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>SECTOR OF EMPLOYMENT</p>
                  <p className={styles.detailValue}>
                    {user.employmentSector || "FinTech"}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>DURATION OF EMPLOYMENT</p>
                  <p className={styles.detailValue}>
                    {user.employmentDuration || "2 years"}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>OFFICE EMAIL</p>
                  <p className={styles.detailValue}>
                    {user.officeEmail || `${user.username}@lendsqr.com`}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>MONTHLY INCOME</p>
                  <p className={styles.detailValue}>
                    {user.monthlyIncome || "₦200,000.00 - ₦400,000.00"}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>LOAN REPAYMENT</p>
                  <p className={styles.detailValue}>
                    {user.loanRepayment || "40,000"}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h4>Socials</h4>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>TWITTER</p>
                  <p className={styles.detailValue}>
                    {user.twitter || `@${user.username.toLowerCase()}`}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>FACEBOOK</p>
                  <p className={styles.detailValue}>
                    {user.facebook || user.fullName}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>INSTAGRAM</p>
                  <p className={styles.detailValue}>
                    {user.instagram || `@${user.username.toLowerCase()}`}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h4>Guarantor</h4>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>FULL NAME</p>
                  <p className={styles.detailValue}>
                    {user.guarantor?.fullName || "Debby Ogana"}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>PHONE NUMBER</p>
                  <p className={styles.detailValue}>
                    {user.guarantor?.phoneNumber || "07060780922"}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>EMAIL ADDRESS</p>
                  <p className={styles.detailValue}>
                    {user.guarantor?.email || "debby@gmail.com"}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>RELATIONSHIP</p>
                  <p className={styles.detailValue}>
                    {user.guarantor?.relationship || "Sister"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
