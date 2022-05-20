const {MongoClient} = require('mongodb');

const user_name = 'ander' ;
const pass = 'anderson123' ;

const uri = `mongodb+srv://${user_name}:${pass}@andersoncluster.b7ib6.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);



module.exports.connector = async function connect(data){
"Insertar datos usando esta base de datos"

    try{
        await client.connect();

        const db = client.db('warehouse');

        const items = db.collection('notebooks');

        await items.insertMany(data);
        
    } 
    catch(e){
        console.log(e);
    }
    finally{
        await client.close();
    }
}

