import { openDB, deleteDB } from 'idb';
import { initReceiveData } from './idb/receiveData';
import { initOfflineOrders } from './idb/offlineOrders';
import { SingletonStore } from '../singleton/store';
export let db = undefined
export let start = async () => {
    if (window.indexedDB) {
        if(new SingletonStore().getStore()&&new SingletonStore().getStore().getState().user.profile.role&&new SingletonStore().getStore().getState().user.profile.role.includes('агент')) {
            db = await openDB('b10b11bd-ab56-46e2-99b3-58d4be94a882', 1, {
                upgrade(db) {
                    initReceiveData(db)
                    initOfflineOrders(db)
                },
            });
        }
        else {
            db = await openDB('b10b11bd-ab56-46e2-99b3-58d4be94a882', 1, {});
            if(db) {
                await deleteDB('b10b11bd-ab56-46e2-99b3-58d4be94a882', {});
            }
        }
    }
}


