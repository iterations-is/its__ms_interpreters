import { Router } from 'express';

import {
	epCreateInterpreter,
	epDeleteInterpreter,
	epGetAllInterpreters,
	epGetInterpreter,
} from './external';
import { mwAuthorization as mwA, mwPermissions as mwP } from '@its/ms';

export const externalRouter = Router();

const pAAU = ['admin', 'authority', 'user'];
const pA = ['admin'];

externalRouter.post('/interpreters', mwA, mwP(pA), epCreateInterpreter);
externalRouter.get('/interpreters', mwA, mwP(pAAU), epGetAllInterpreters);
externalRouter.get(
	'/interpreters/:interpreterName/:interpreterVersion',
	mwA,
	mwP(pAAU),
	epGetInterpreter
);
externalRouter.delete('/interpreters/:interpreterId', mwA, mwP(pA), epDeleteInterpreter);
