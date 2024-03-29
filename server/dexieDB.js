import Dexie from "dexie"

const dexieDB = new Dexie('MyDatabase');

	// Declare tables, IDs and indexes
	dexieDB.version(1).stores({
		users: '++id, email, token, checked'
	});

export { dexieDB }