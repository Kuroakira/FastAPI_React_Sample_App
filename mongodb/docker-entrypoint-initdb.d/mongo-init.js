db.createUser({user: "dev", pwd: "password", roles: [{role:"readWrite",db: "api_db"}]})
db.createCollection('todo');
db.createCollection('user');