const functions = require('firebase-functions');

const admin= require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.onTaskCreate= functions
	.database
	.ref('tasks/{taskId}')
	.onCreate((snapshot, context) => {
		
		const json= snapshot.val();
		const key= context.params.taskId;
		
		const log= Object.assign({createdAt: context.timestamp }, json);

		return admin
			.database()
			.ref(`/Createlogs/${key}`)
			.set(log);
	
	});

	exports.onTaskUpdate= functions
	.database
	.ref('tasks/{taskId}')
	.onUpdate((snapshot, context) => {
		
		const json= snapshot.val();
		const key= context.params.taskId;
		
		const log= Object.assign({updatedAt: context.timestamp }, json);

		return admin
			.database()
			.ref(`/Updatelogs/${key}`)
			.set(log);
	
	});

exports.onTaskDelete= functions
	.database
	.ref('tasks/{taskId}')
	.onDelete((snapshot, context) => {
		
		const json= snapshot.val();
		const key= context.params.taskId;
		
		const log= Object.assign({deletedAt: context.timestamp }, json);

		return admin
			.database()
			.ref(`/Deletelogs/${key}`)
			.set(log);
	
	});