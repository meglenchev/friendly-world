import express from "express";
import handlebars from "express-handlebars";
import pageHelpers from "../../../Exercise ExpressJS and Templating/Movie-Magic-Workshop/src/helpers/pageHelpers.js";

const app = express();

app.get('/', (req, res) => {
    res.send('Its Work');
})

app.engine('hbs', handlebars.engine({
    extname: 'hbs', 
    runtimeOptions: { // General Fix For Own Property Problem
        allowProtoMethodsByDefault: true, 
        allowProtoPropertiesByDefault: true,
    }, 
    helpers: {
        ...pageHelpers
    },
}));

app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'))