interface User {
  id: number;
  avatar?: string;
  fullName: string;
  email: string;
  password: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
}
