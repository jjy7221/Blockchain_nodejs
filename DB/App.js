const morgan = require(`morgan`);
require(`dotenv`).config();

const express = require(`express`);
const app = new express();

app.set(`port`, process.env.PORT || 4000);

app.use(morgan(`dev`));
app.use(express.json());
app.use(express.urlencoded({ extended:false}));

// routes/index.js
const routerindex = require(`./routes`);
const routeruser = require(`./routes/user`);
const routerjin = require(`./routes/jin`);



app.use(`/`, routerindex);
app.use(`/user`, routeruser);
app.use(`/jin`, routerjin);

const port = app.get(`port`);

app.listen(port,() =>{
    console.log(`waiting for ${port}...`);
});