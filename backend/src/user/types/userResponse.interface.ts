import { UserType } from './user.types';

export interface UserResponseInterface {
  user: UserType & { access_token: string };
}
