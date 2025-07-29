import React from "react";
import styles from "./style.module.scss";
import Image, { StaticImageData } from "next/image";

interface UserCardProps {
  title: string;
  value: string;
  icon: string | StaticImageData;
}

const UserCard: React.FC<UserCardProps> = ({ title, value, icon }) => {
  return (
    <div className={styles.userCard}>
      <div className={styles.cardHeader}>
        <Image src={icon} alt={title} width={40} height={40} />
        <h3>{title}</h3>
      </div>
      <p className={styles.cardValue}>{value}</p>
    </div>
  );
};

export default UserCard;
