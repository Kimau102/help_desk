import express from 'express';

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(express.static('./public'))

const port = 8080;

app.listen(port, () => {
    console.log('Listen port at 8080.')
})