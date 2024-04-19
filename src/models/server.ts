import express, { Application, Request, Response}from 'express';
import cors from 'cors';
import  routesProducto from '../routes/producto'; 
import  routesUser from '../routes/user';
import db from '../db/connection';
import { User } from './user';

class Server{

    private app: Application;
    private port: string;
      
    constructor(){
    this.app = express();
    this.port= process.env.PORT ||'3000';
    this.listen();
    this.midlewares();
    this.routes();
    this.dbConnect();
    }
    listen(){

        this.app.listen(this.port,() =>{

            console.log(`Aplicaion corriendo en el puerto ${this.port}`)
        })
    }


    routes(){

        this.app.get('/', (req: Request, res: Response) => {
            res.json({

                msg: 'API working'
            })
        
        })
        
        this.app.use('/api/productos', routesProducto);
        this.app.use('/api/users',routesUser);
    
    }


midlewares(){

    //parseamos el body
    this.app.use(express.json());

    //cors
    this.app.use(cors());
}

 async dbConnect(){
    
   await db.authenticate();
   await User.sync();
   console.log('Base de datos conectada');
}



}

export default Server;