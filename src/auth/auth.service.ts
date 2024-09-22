import { Injectable } from '@nestjs/common';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable()
export class AuthService {
  async signIn(email: string, password: string) {
    const auth = getAuth();

    return signInWithEmailAndPassword(auth, email, password);
  }
}
