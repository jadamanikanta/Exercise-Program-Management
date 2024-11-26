import express, { response } from 'express'
import {Request,Response} from 'express'
import cors from 'cors'
import Routers from './src/routes';
import mongoose from 'mongoose';
import serverless from 'serverless-http'
import axios from 'axios'
// import {Server} from 'socket.io'
import http from 'http'
import helmet from 'helmet';
import connectDB from './src/dbconfig';


const app = express();
const port = 3000;


app.use(helmet())



connectDB()



app.use(cors())

  
app.use(express.json())
app.use('/api/v1',Routers)
const server:any = http.createServer(app)


server.listen(3000,() => {console.log('server')})

const handler = serverless(server)

module.exports.handler = handler;