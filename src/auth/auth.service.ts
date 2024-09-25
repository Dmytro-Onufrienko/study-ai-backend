import { Injectable } from '@nestjs/common';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { firebaseAuth } from 'src/firebase/config/firebase';

@Injectable()
export class AuthService {
  async signIn(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const user = userCredential.user;

    const idToken = await user.getIdToken();
    const refreshToken = user.refreshToken;

    return { idToken, refreshToken };
  }

  async signOut() {
    return signOut(firebaseAuth );
  }

  async signUp(email: string, password: string) {
    return await createUserWithEmailAndPassword(firebaseAuth , email, password);
  }
}
