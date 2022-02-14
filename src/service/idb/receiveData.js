import { db } from '../idb'

export let initReceiveData = (db) => {
    try {
        db.deleteObjectStore('receiveData');
    }
    catch (error){
        console.error(error)
    }
    const store = db.createObjectStore('receiveData', {
        keyPath: 'id',
        autoIncrement: true,
    });
    store.createIndex('name', 'name', { unique: true });
}

export let getReceiveDataByIndex = async(index) => {
    if(db!==undefined){
        return (await db.getFromIndex('receiveData', 'name', index)).data
    }
}

export let putReceiveDataByIndex = async(index,  data) => {
    if(db!==undefined){
        let res = await db.getFromIndex('receiveData', 'name', index)
        if(res===undefined){
            await db.add('receiveData', {
                name: index,
                data: data
            });
        } else {
            res.data = data
            await db.put('receiveData', res);
        }
    }
}
