import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
const UNIQUE_ERROR_NAME = "SequelizeUniqueConstraintError";
const PORT = 8080;


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


app.get('/api/houses/:id', async (req, res) => {
    const requestedHouseId = req.params.id;
    const requestedHouse = await House.findAll({ where: { id: requestedHouseId } });
    res.json(requestedHouse);
});


app.put('/api/houses/:id', async (req, res) => {
    // TODO: What if the house doesn't exist?
    const houseIdToUpdate = req.params.id;
    const houseToUpdate = req.body;
    await House.update(
        {
            address: houseToUpdate.address,
            currentValue: houseToUpdate.currentValue,
            loanAmount: houseToUpdate.loanAmount,
            risk: houseToUpdate.risk,
        },
        {
            where: {
                id: houseIdToUpdate 
            }
        }
    );
    res.status(200).send(`House ${houseIdToUpdate} updated successfully!`);
});

app.post('/api/houses', async (req, res, next) => {
    const houseToInsert = req.body;
    try {
        await House.create({
            id: houseToInsert.id,
            address: houseToInsert.address,
            currentValue: houseToInsert.currentValue,
            loanAmount: houseToInsert.loanAmount,
            risk: houseToInsert.risk,
        });
    } catch (error) {
        if (error.name === UNIQUE_ERROR_NAME) {
            return res.status(500).send(`Can't create object with id ${houseToInsert.id} since it already exists.`);
        } else {
            next(error);
        }
    }
    res.status(200).send(`House ${houseToInsert.id} created successfully!`);
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});


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


