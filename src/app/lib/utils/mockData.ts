import { faker } from "@faker-js/faker";

interface User {
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
  officeEmail?: string;
  monthlyIncome?: string;
  loanRepayment?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  guarantor?: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
}

export const generateMockUsers = (
  page: number,
  pageSize: number
): { users: User[]; total: number } => {
  const total = 500;
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);

  const organizations = ["Lendstar", "Lendsqr", "Irorun", "Lendagr"];
  const statuses: ("active" | "inactive" | "pending" | "blacklisted")[] = [
    "active",
    "inactive",
    "pending",
    "blacklisted",
  ];

  const users: User[] = [];

  for (let i = startIndex; i < endIndex; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const username = faker.internet
      .username({ firstName, lastName })
      .toLowerCase();
    const email = faker.internet.email({ firstName, lastName });

    users.push({
      id: faker.string.uuid(),
      organization: organizations[i % organizations.length],
      username,
      email,
      phoneNumber: faker.helpers.replaceSymbols("080########"),
      dateJoined: faker.date.past({ years: 2 }).toISOString(),
      status: statuses[i % statuses.length],
      fullName,
      accountBalance: faker.finance.amount({
        min: 200000,
        max: 5000000,
        dec: 2,
        symbol: "₦",
      }),
      accountNumber: faker.finance.accountNumber(10),
      bvn: faker.finance.accountNumber(11),
      gender: faker.person.sex(),
      maritalStatus: faker.helpers.arrayElement([
        "Single",
        "Married",
        "Divorced",
      ]),
      children: faker.helpers.arrayElement(["None", "1", "2", "3+"]),
      residenceType: faker.helpers.arrayElement([
        "Parent's Apartment",
        "Rented",
        "Owned",
      ]),
      educationLevel: faker.helpers.arrayElement([
        "B.Sc",
        "M.Sc",
        "PhD",
        "HND",
        "OND",
      ]),
      employmentStatus: faker.helpers.arrayElement([
        "Employed",
        "Unemployed",
        "Self-employed",
      ]),
      employmentSector: faker.helpers.arrayElement([
        "FinTech",
        "Health",
        "Education",
        "Agriculture",
      ]),
      employmentDuration: faker.helpers.arrayElement([
        "1 year",
        "2 years",
        "3+ years",
      ]),
      officeEmail: faker.internet.email({
        firstName,
        lastName,
        provider: `${organizations[i % organizations.length]}.com`,
      }),
      monthlyIncome: `₦${faker.finance.amount({
        min: 200000,
        max: 400000,
        dec: 2,
      })} - ₦${faker.finance.amount({
        min: 400000,
        max: 800000,
        dec: 2,
      })}`,
      loanRepayment: faker.finance.amount({
        min: 20000,
        max: 100000,
        dec: 0,
      }),
      twitter: `@${username}`,
      facebook: fullName,
      instagram: `@${username}`,
      guarantor: {
        fullName: `${faker.person.firstName()} ${faker.person.lastName()}`,
        phoneNumber: faker.phone.number({ style: "national" }),
        email: faker.internet.email(),
        relationship: faker.helpers.arrayElement([
          "Sister",
          "Brother",
          "Friend",
          "Colleague",
        ]),
      },
    });
  }

  return { users, total };
};
