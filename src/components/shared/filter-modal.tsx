"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Popover,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { IoFilterOutline } from "react-icons/io5";
import { useForm, SubmitHandler } from "react-hook-form";

export interface FilterFormValues {
  organization?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  dateJoined?: string;
  status?: string;
}

interface FilterDropdownProps {
  readonly onApply: (filters: FilterFormValues) => void;
}

export default function FilterDropdown({ onApply }: FilterDropdownProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { register, handleSubmit, reset } = useForm<FilterFormValues>();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  const onSubmit: SubmitHandler<FilterFormValues> = (data) => {
    onApply(data);
    handleClose();
  };

  const handleReset = () => {
    reset();
    onApply({});
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick} aria-label="filter">
        <IoFilterOutline />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            sx: {
              padding: 2,
              width: 300,
              borderRadius: 3,
            },
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel id="org-label">Organization</InputLabel>
              <Select
                labelId="org-label"
                {...register("organization")}
                defaultValue=""
                label="Organization"
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Lendsqr">Lendsqr</MenuItem>
                <MenuItem value="Irorun">Irorun</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              label="Username"
              placeholder="username"
              {...register("username")}
            />
          </Box>

          <Box mb={3}>
            <TextField fullWidth label="Email" {...register("email")} />
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              label="Phone Number"
              {...register("phoneNumber")}
            />
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              label="Date Joined"
              type="date"
              {...register("dateJoined")}
              sx={{
                "& .MuiInputLabel-root": {
                  transform: "translate(14px, -9px) scale(0.75)",
                },
              }}
            />
          </Box>

          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                {...register("status")}
                defaultValue=""
                label="Status"
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="blacklisted">Blacklisted</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box mt={3} display="flex" justifyContent="space-around">
            <Button
              variant="outlined"
              onClick={handleReset}
              sx={{
                color: "#000",
                fontSize: "1rem",
                px: 4,
                py: 1,
              }}
            >
              Reset
            </Button>

            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#39CDCC",
                color: "#fff",
                fontSize: "1rem",
                px: 4,
                py: 1,
                "&:hover": {
                  backgroundColor: "#115293",
                },
              }}
            >
              Apply
            </Button>
          </Box>
        </form>
      </Popover>
    </>
  );
}
