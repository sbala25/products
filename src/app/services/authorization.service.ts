import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor( private auth: Auth) { }
  currentUser = authState(this.auth);

  login(username: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  logout(){
    return from(this.auth.signOut());
  }
  
  signup( name: string, username: string, password: string){
    return from(createUserWithEmailAndPassword(this.auth, username, password)).pipe(switchMap(({user})=>updateProfile(user,{displayName: name})))
  }

}
