import express, { Application } from "express";
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import path from 'path';
import cookieParser from 'cookie-parser';
import i18n from "./i18n";
import indexRoutes from '../routes/index'

class Server {
    public app: Application;
    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings(): void {
        this.app.set('port', process.env.PORT || 5000);
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(express.static(path.join(__dirname, '../../client')));
        this.app.use('/public', express.static(path.resolve('public')));
        this.app.use('/uploads', express.static(path.resolve('uploads')));
        this.app.use(i18n.init)
        this.app.use(cookieParser())
    }
    middlewares(): void {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }
    routes(): void {
        this.app.use('/api', indexRoutes);
        this.// SPA
            app.get('/*', function (req, res) {
                res.sendFile(path.join(__dirname, '../../client/index.html'), (err) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                   
                });
            });
    }
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port`, this.app.get('port'))
        });
    }

}
export default Server;