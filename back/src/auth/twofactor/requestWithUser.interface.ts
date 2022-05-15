import { Request } from 'express';
import { User } from 'src/entities/user.entity';
 
interface RequestWithUser extends Request {
  userId: User;
  Email: string;
}
 

export default RequestWithUser;