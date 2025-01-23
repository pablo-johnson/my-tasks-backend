import { Injectable, UnauthorizedException } from '@nestjs/common';
import { firebaseAuth } from '../firebase/firebase.config';

@Injectable()
export class AuthService {
  async verifyToken(token: string) {
    try {
      const decodedToken = await firebaseAuth.verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      console.error('Error while verifying Firebase ID token:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}