import express from "express";
import handlebars from "express-handlebars";
import { routes } from "./routes.js";

const app = express();

// Setup Handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
}));

app.set('view engine', 'hbs');
app.set('views', 'src/views');

// Setup Static Middleware - Specify the location of static files for the project
app.use(express.static('src/public'));

// Middleware that will Parse Form Data from request
app.use(express.urlencoded({ extended: false }));

// Middleware JSON Parser
app.use(express.json());

// Routs
app.use(routes); // Calling The Global Routs controller

app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'))