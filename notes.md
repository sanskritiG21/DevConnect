## Database connection

- once your database connection is stablished succesfully then you should do app.listen
- Right way of connecting to the database. because if your do not follow the sequence then if there might be somecase where you haven't connected to your database and you start the server and listen the request that would be a big fail.

1. connect to your database
2. Then start your application
3. Then listen to the request

### What is schema in database

- Schema defines the structure of a document.
- before you create the collection you need to create the schema of the database.
- Schema is the identity for that collection documents.
- Schema is basically, you are telling what are all the things that you have to store in the specific collection.
- Here we will create the schema using mongoose.

### Model in datbase

- model is basically a wrapper around a mongo db collection
- model is a instance of the schema. allowing you to interact with the collection
- Whenever you are refrencing a model [naming a model] then you Should start the name with capital letters.
- after creating the schema then we will create the model out of it
- With this model we will create the new new instances and we will put that into the database

- whenever you are doing some db operation, try to wrap it in the try catch block.

### password - encrypted format

1. validation of the api
2. encrypt the password
3. then store the data into the database

-- bcrypt is the package used for encrypting the password
