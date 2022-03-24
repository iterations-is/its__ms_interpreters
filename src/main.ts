import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';

import { aboutRouter, runBroker } from '../src-ms';
import { MS_EXPRESS_PORT } from './constants';
import { externalRouter, internalRouter } from './routes';
import { channelConsumers, channelProducers } from './broker';

// RMQ
runBroker(channelProducers, channelConsumers);

// Express
const app = express();

app.use(cors());
app.use(json());

app.use('/interpreters-service', aboutRouter);
app.use('/interpreters-service', externalRouter);
app.use('/interpreters-service', internalRouter);

app.listen(MS_EXPRESS_PORT, () => {
	console.log('http://localhost:' + MS_EXPRESS_PORT);
});
