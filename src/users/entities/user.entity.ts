import { $Enums, User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  email: string;
  username: string;
  password: string;
  refreshToken: string;
  image: string;
  role: $Enums.Role;
}
