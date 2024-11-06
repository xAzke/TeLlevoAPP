import { Injectable } from "@angular/core";
import { IonicStorageModule, Storage } from "@ionic/storage-angular";

@Injectable({
    providedIn: "root",
})
export class StorageService {
    private localStorage: Storage | null = null;

    fullArray: any[] = [];
    singleObject: any = {};

    constructor(private storageInstance: Storage) {
        this.initLocalStorage();
    }

    async initLocalStorage() {
        if (!this.localStorage) {
            this.localStorage = await this.storageInstance.create();
            // this.localStorage.setEncryptionKey("mySecret");
        }
    }

    async setItem(dataKey: string, jsonData: any) {
        console.log("setItem", dataKey, jsonData);
        this.fullArray = (await this.localStorage?.get(dataKey)) || [];
        this.fullArray.push(jsonData);
        await this.localStorage?.set(dataKey, this.fullArray);
        return true;
    }

    async getItem(dataKey: string, dataIdentifier: string) {
        this.fullArray = (await this.localStorage?.get(dataKey)) || [];
        this.singleObject = this.fullArray.find(
            (value) => value.usuario == dataIdentifier
        );
        return this.singleObject;
    }

    async updateItem(dataKey: string, jsonData: any) {}
    async deleteItem(dataKey: string, dataIdentifier: string) {}

    async getAllItems(dataKey: string) {}
}
