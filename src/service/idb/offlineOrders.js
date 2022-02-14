import { db } from '../idb'

export let initOfflineOrders = (db) => {
    try {
        db.deleteObjectStore('offlineOrders');
    }
    catch (error){
        console.error(error)
    }
    db.createObjectStore('offlineOrders', {
        keyPath: 'id',
        autoIncrement: true,
    });
}

export let clearAllOfflineOrders = async() => {
    if(db!==undefined){
        await db.clear('offlineOrders')
    }
}

export let deleteOfflineOrderByKey = async(key) => {
    if(db!==undefined){
        await db.delete('offlineOrders', key)
    }
}

export let getAllOfflineOrders = async() => {
    if(db!==undefined){
        let res = await db.getAll('offlineOrders')
        return res.map(res=>{return {...res.data, key: res.id}})
    }
}

export let putOfflineOrders = async(data) => {
    if(db!==undefined){
        await db.add('offlineOrders', {
            data: data
        });
    }
}
