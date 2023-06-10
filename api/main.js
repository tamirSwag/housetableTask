import express from 'express';
import cors from 'cors';
import { Sequelize, DataTypes } from 'sequelize';
const UNIQUE_ERROR_NAME = "SequelizeUniqueConstraintError";
const PORT = 8080;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const House = defineSequelizeHouseModel();
House.sync();


// Express:
const app = express()

app.use(cors(corsOptions));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// Routes:
app.get('/api/ok', (req, res) => {
    res.send("Yo!")
});

app.get('/api/houses', async (req, res) => {
    const houses = await House.findAll();
    res.json(houses);
});


app.get('/api/houses/:id', async (req, res) => {
    const requestedHouseId = req.params.id;
    const requestedHouse = (await House.findAll({ where: { id: requestedHouseId } }))[0];
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

app.post('/api/houses', async (req, res) => {
    const houseToInsert = req.body;
    const newHouse = await House.create({
        address: houseToInsert.address,
        currentValue: houseToInsert.currentValue,
        loanAmount: houseToInsert.loanAmount,
        risk: houseToInsert.risk,
    });
    res.status(200).send({ newHouseId: newHouse.id });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});


function defineSequelizeHouseModel() {
    const sequelize = new Sequelize('sqlite::memory:');
    return sequelize.define('House', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        address: DataTypes.STRING,
        currentValue: DataTypes.FLOAT,
        loanAmount: DataTypes.FLOAT,
        risk: DataTypes.FLOAT,
    });
}


