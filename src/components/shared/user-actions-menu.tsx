"use client";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Divider,
  IconButton,
  Portal,
} from "@chakra-ui/react";
import { IoIosMore } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";
import { LuUserRoundCheck } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { User } from "@/types/users";
import styles from "./menu.module.scss";

interface UserActionsProps {
  readonly user: User;
  readonly onBlacklist?: () => void;
  readonly onActivate?: () => void;
}
export default function UserActionsMenu({
  user,
  onBlacklist,
  onActivate,
}: UserActionsProps) {
  const router = useRouter();

  const handleViewDetails = (user: User) => {
    localStorage.setItem(`user_${user.id}`, JSON.stringify(user));
    router.push(`/users/${user.id}`);
  };

  return (
    <Menu placement="bottom-start" isLazy>
      <MenuButton
        as={IconButton}
        icon={<IoIosMore />}
        className={styles.menuButton}
      />
      <Portal>
        <MenuList className={styles.menuList}>
          <MenuItem
            onClick={() => handleViewDetails(user)}
            className={styles.menuItem}
          >
            <FaEye className={styles.menuIcon} />
            <span>View Details</span>
          </MenuItem>

          <Divider className={styles.divider} />

          <MenuItem
            onClick={onBlacklist}
            className={`${styles.menuItem} ${styles.blacklist}`}
          >
            <FaUserXmark className={styles.menuIcon} />
            <span>Blacklist User</span>
          </MenuItem>

          <Divider className={styles.divider} />

          <MenuItem
            onClick={onActivate}
            className={`${styles.menuItem} ${styles.activate}`}
          >
            <LuUserRoundCheck className={styles.menuIcon} />
            <span>Activate User</span>
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
}
