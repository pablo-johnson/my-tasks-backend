import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase-auth.guard';

interface FirebaseUser {
  uid: string;
  email: string;
  // other properties specific to your Firebase user
}

@Controller('auth')
export class AuthController {
  @Get('test')
  @UseGuards(FirebaseAuthGuard)
  testAuth(@Req() req: { user: FirebaseUser }) {
    return { message: 'Authentication successful!', user: req.user };
  }
}