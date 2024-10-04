import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private bdd: Storage = new Storage();
  private storageReady: Promise<void>;

  constructor(private storage: Storage) {
    this.storageReady = this.init();
  }

  async init(): Promise<void> {
    const storage = await this.storage.create();
    this.bdd = storage;
  }

  async BDDConnected(): Promise<void> {
    await this.storageReady;
  }
  async get(key: string): Promise<any> {
    await this.BDDConnected()
    return this.bdd?.get(key);
  }

  async set(key: string, valor: any) {
    await this.BDDConnected()
    this.bdd.set(key, valor);
    console.log("actualizado con exito")
  }
  async remove(key: string) {
    await this.BDDConnected()
    this.bdd.remove(key);
  }

  async limpiar() {
    await this.BDDConnected()
    this.bdd.clear();
  }
}
