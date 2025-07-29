import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  IconButton,
} from "@chakra-ui/react";
import { IoIosMore } from "react-icons/io";
import { useRouter } from "next/navigation";

interface UserActionsProps {
  userId: string;
  onBlacklist: () => void;
  onActivate: () => void;
}

export default function UserActionsMenu({
  userId,
  onBlacklist,
  onActivate,
}: UserActionsProps) {
  const router = useRouter();

  return (
    <Menu>
      <MenuButton as={IconButton} icon={<IoIosMore />} variant="ghost" />
      <MenuList>
        <MenuItem onClick={() => router.push(`/users/${userId}`)}>
          View Details
        </MenuItem>
        <MenuItem onClick={onBlacklist}>Blacklist User</MenuItem>
        <MenuItem onClick={onActivate}>Activate User</MenuItem>
      </MenuList>
    </Menu>
  );
}
