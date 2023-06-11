import express from 'express';
import cors from 'cors';
import { House } from './HouseModel.js';
import { CalculateRisk } from './riskCalc.js';
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


export const app = express();

app.use(cors(corsOptions));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Routes:
app.get('/api/ok', (req, res) => {
    res.send("Yo!");
});
app.get('/api/houses', async (req, res) => {
    const houses = await House.findAll();
    res.json(houses);
});
app.get('/api/houses/:id', async (req, res) => {
    const requestedHouseId = req.params.id;
    const requestedHouseArray = await House.findAll({ where: { id: requestedHouseId } });
    if (!requestedHouseArray.length) {
        res.status(404).send("House doesn't exists.");
    } else {
        const requestedHouse = requestedHouseArray[0];
        res.json(requestedHouse);
    }
});
app.post('/api/houses', async (req, res) => {
    const houseToInsert = req.body;
    const calculatedRisk = CalculateRisk(houseToInsert.currentValue, houseToInsert.loanAmount);
    const newHouse = await House.create({
        address: houseToInsert.address,
        currentValue: houseToInsert.currentValue,
        loanAmount: houseToInsert.loanAmount,
        risk: calculatedRisk,
    });
    res.status(200).send({ newHouseId: newHouse.id });
});
app.put('/api/houses/:id', async (req, res) => {
    const houseIdToUpdate = req.params.id;
    const houseToUpdate = req.body;
    const calculatedRisk = CalculateRisk(houseToUpdate.currentValue, houseToUpdate.loanAmount);
    await House.update(
        {
            address: houseToUpdate.address,
            currentValue: houseToUpdate.currentValue,
            loanAmount: houseToUpdate.loanAmount,
            risk: calculatedRisk
        },
        {
            where: {
                id: houseIdToUpdate
            }
        }
    );
    res.status(200).send(`House ${houseIdToUpdate} updated successfully!`);
});
