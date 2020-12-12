import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

import indexRouter from './routes/index.js'
import kernelsRouter from './routes/kernels.js'
import fsRouter from './routes/fileSystem.js'
import {dirname} from 'gm_node';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(dirname(), 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/kernels', kernelsRouter);
app.use('/fileSystem', fsRouter);

export default app;
