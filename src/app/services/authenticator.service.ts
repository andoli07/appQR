import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  connectionStatus: boolean;
  constructor(private storage: StorageService) {
    this.connectionStatus = false;
  }

  loginBDD(user:string,pass:String) : boolean{
    this.storage.get(user).then((val) =>{
      if(val.password == pass) {
        console.log('Usuario encontrado');
        this.connectionStatus = true;
      } else {
        console.log('Error pass')
      }})
      .catch((error) => {
      console.log('Error credenciales'+ error)
      this.connectionStatus = false;
    });
    if (this.connectionStatus) {
      console.log("true")
      return true;
    } else {
      console.log("false")
      return false;
    }
  }

  login(user:String,pass:String): boolean {
    if (user == 'test' && pass == 'test') {
      this.connectionStatus = true;
      return true;
    } else {
      this.connectionStatus = false;
      return false;
    }
  }

  logout() {
    this.connectionStatus = false;
  }

  isConnected(){
    return this.connectionStatus
  }
}
