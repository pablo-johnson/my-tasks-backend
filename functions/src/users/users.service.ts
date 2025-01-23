import { Injectable } from '@nestjs/common';
import { firestore } from '../firebase/firebase.config';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  private usersCollection = firestore.collection('users');

  async createUser(data: CreateUserDto) {
    const user = await this.usersCollection.add(data);
    return { id: user.id, ...data };
  }

  async getUser(id: string) {
    const userDoc = await this.usersCollection.doc(id).get();
    if (!userDoc.exists) throw new Error('User not found');
    return { id, ...userDoc.data() };
  }

  async updateUser(id: string, data: UpdateUserDto) {
    await this.usersCollection.doc(id).update({...data});
    return { id, ...data };
  }

  async deleteUser(id: string) {
    await this.usersCollection.doc(id).delete();
    return { message: 'User deleted successfully' };
  }
}
