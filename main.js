







// TODO: upload to git repo








import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';


const House = defineSequelizeHouseModel();
House.sync();

var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/api/ok', (req, res) => {
    res.send("Yo!")
});

app.get('/api/houses', async (req, res) => {
    const houses = await House.findAll();
    res.json(houses);
});

app.post('/api/houses', async (req, res) => {
    console.log(req.body);
    console.log(req.body.address);
    await House.create({
        id: req.body.id,
        address: req.body.address,
        currentValue: req.body.currentValue,
        loanAmount: req.body.loanAmount,
        risk: req.body.risk,
    });
    res.json(req.body)
})

const port = 8080;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


function defineSequelizeHouseModel() {
    const sequelize = new Sequelize('sqlite::memory:');
    return sequelize.define('House', {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        address: DataTypes.STRING,
        currentValue: DataTypes.FLOAT,
        loanAmount: DataTypes.FLOAT,
        risk: DataTypes.FLOAT,
    });
}


