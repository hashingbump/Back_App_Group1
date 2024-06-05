import express from 'express';
import staffRouter from './routes/staff.js';
import connectDatabase from './database/connectDB.js';
import staffsController from './controllers/staff.js';
import authMiddleware from './middlewares/auth.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

connectDatabase.DB();

app.use('/users/add', staffsController.createNewUser);

app.use('/users/login', authMiddleware.loginUser);

app.use('/users', authMiddleware.authenticate, staffRouter);

app.use((req, res) => {
    res.status(404).send("Url không đúng!");
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});
