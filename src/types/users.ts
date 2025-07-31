export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "active" | "inactive" | "pending" | "blacklisted";
  fullName: string;
  accountBalance: string;
  accountNumber: string;
  bvn: string;
  gender: string;
  maritalStatus?: string;
  children?: string;
  residenceType?: string;
  educationLevel?: string;
  employmentStatus?: string;
  employmentSector?: string;
  employmentDuration?: string;
  duration_in_month?: string;
  officeEmail?: string;
  monthlyIncome?: string;
  loanRepayment?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  guarantor?: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
  referral?: string;
  avatar?: string;
  userId?: string;
}
