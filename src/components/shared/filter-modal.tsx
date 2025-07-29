"use client";

import { Menu } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
}

export default function FilterModal({
  isOpen,
  onClose,
  onApply,
}: FilterModalProps) {
  const { register, handleSubmit, reset } = useForm();

  const handleApply = (data: any) => {
    onApply(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filter Users</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleApply)}>
            <Select
              placeholder="Organization"
              {...register("organization")}
              mb={3}
            >
              <option value="Lendsqr">Lendsqr</option>
              <option value="Irorun">Irorun</option>
            </Select>

            <Input placeholder="Username" {...register("username")} mb={3} />
            <Input placeholder="Email" {...register("email")} mb={3} />
            <Input
              placeholder="Phone Number"
              {...register("phoneNumber")}
              mb={3}
            />
            <Input type="date" {...register("dateJoined")} mb={3} />

            <Select placeholder="Status" {...register("status")} mb={3}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blacklisted">Blacklisted</option>
              <option value="pending">Pending</option>
            </Select>

            <Button colorScheme="blue" type="submit" w="full" mb={2}>
              Apply Filter
            </Button>
            <Button variant="outline" w="full" onClick={() => reset()}>
              Reset
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
