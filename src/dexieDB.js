import Dexie from "dexie"

const dexieDB = new Dexie('MyDatabase');

	// Declare tables, IDs and indexes
	dexieDB.version(1).stores({
		users: 'email, token, userId'
	});

export { dexieDB }