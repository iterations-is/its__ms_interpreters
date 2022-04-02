import { Router } from 'express';

import {
	epCreateInterpreter,
	epDeleteInterpreter,
	epGetAllInterpreters,
	epGetInterpreter,
} from './external';
import { mwAuthorization } from '@its/ms';

export const externalRouter = Router();

externalRouter.post('/interpreters', mwAuthorization, epCreateInterpreter);
externalRouter.get('/interpreters', mwAuthorization, epGetAllInterpreters);
externalRouter.get(
	'/interpreters/:interpreterName/:interpreterVersion',
	mwAuthorization,
	epGetInterpreter
);
externalRouter.delete('/interpreters/:interpreterId', mwAuthorization, epDeleteInterpreter);
