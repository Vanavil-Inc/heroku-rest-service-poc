const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


const { Pool, Client } = require('pg')
const connectionString = 'postgres://tghowiiwbpkukb:26c4126838e723431a8a6a3dac211499d3eb54da7f47892f71128ba21f5b610a@ec2-107-21-233-72.compute-1.amazonaws.com:5432/d4ut0e04d25haa?ssl=true'
// const connectionString = "postgres://wokerthrhwtzyd:d93e77c58348fbf78cc8ed742efd9c36c999ab4d5d2381e353c3ec888d801ec4@ec2-184-72-219-186.compute-1.amazonaws.com:5432/d8hl88n5fq5dmk?ssl=true"

const client = new Client({
  connectionString: connectionString,
})
client.connect(err => {
    if (err) {
        throw err;
    } else {
        // createContact();
        // readContact();
        // updateContact();
        // deleteContact();
       
        
    }
})

function createContact() {
    const query = `
        DROP TABLE IF EXISTS shashi.CallCenter;
        CREATE TABLE shashi.CallCenter (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
        INSERT INTO shashi.CallCenter (name, quantity) VALUES ('banana', 150);
        INSERT INTO shashi.CallCenter (name, quantity) VALUES ('orange', 154);
        INSERT INTO shashi.CallCenter (name, quantity) VALUES ('apple', 100);
    `;

    client
        .query(query)
        .then(() => {
            console.log('Table created successfully!');
            client.end(console.log('Closed client connection'));
        })
        .catch(err => console.log(err))
        .then(() => {
            console.log('Finished execution, exiting now');
            process.exit();
        });
}


function readContact() {

    console.log(`Running query to PostgreSQL server: ${connectionString}`);

    const query = 'SELECT * FROM salesforce.Account;';

    client.query(query)
        .then(res => {
            const rows = res.rows;

            rows.map(row => {
                console.log(`Read: ${JSON.stringify(row)}`);
            });

            process.exit();
        })
        .catch(err => {
            console.log(err);
        });
}


function updateContact() {
    const query = `
        UPDATE salesforce.Account 
        SET shippingcountry='America' WHERE Id = '2';
    `;

    client
        .query(query)
        .then(result => {
            console.log('Update completed');
            console.log(`Rows affected: ${result.rowCount}`);
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}



function deleteContact() {
    const query = `
        DELETE FROM salesforce.Account 
        WHERE Id = '1';
    `;

    client
        .query(query)
        .then(result => {
            console.log('Delete completed');
            console.log(`Rows affected: ${result.rowCount}`);
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}