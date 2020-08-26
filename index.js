const express = require('express');

const app = express();
app.use(express.json());

var sertis_cards = [
    {
        id: 0,
        name: "Blog1",
        status: "published",
        content: "Hello this is blog one",
        author: "kukkui"
    },
    {
        id: 1,
        name: "Blog2",
        status: "published",
        content: "Hello this is blog two",
        author: "sertis"
    },
    {
        id: 2,
        name: "Blog3",
        status: "published",
        content: "Hello this is blog three",
        author: "punyawee"
    }
];

app.get('/listCards', (req, res) => {
    res.send(sertis_cards);

    //List all blog cards via GET
    //Activate on url : http://localhost:[port]/listCards
});

app.get('/', (req, res) => {
    res.send('<h1>Hello Sertis.Corp! My name is Punyawee Pos(KUKKUI)</h1>');
});
app.post('/addCard', (req, res) => {
    
    const new_card = {
        id: sertis_cards.length + 1,
        name: req.body.name,
        status: req.body.status,
        content: req.body.content,
        author: req.body.author
    };
    sertis_cards.push(new_card);
    res.send(new_card);

    //Add new blog card via POST 
    //Activate on url : http://[localhost]:[port]/addCard
    
});


app.put('/updateCard/:id', (req, res) => {
    const new_card = sertis_cards.find(m => m.id === parseInt(req.body.id));
    if(!new_card) {
    res.status(404).send('The new_card with the given ID was not found ')
    }else {
    new_card.name = req.body.name;
    new_card.status = req.body.status;
    new_card.content = req.body.content;
    new_card.author = req.body.author;
    
    res.send(new_card);
    };

    //Update existing blog card via PUT 
    //Activate on url : http://[localhost]:[port]/updateCard/[id]

 });



app.delete('/deleteCard/:id', (req, res) => {
    const new_card = sertis_cards.find(m => m.id === parseInt(req.params.id));
    if(!new_card) {
    res.status(404).send('The new_card with the given ID was not found ')
    }else {
    
    const index = sertis_cards.indexOf(new_card);
    sertis_cards.splice(index, 1);
    
    res.send(new_card);
    };

    //Remove existing blog card via PUT 
    //Activate on url : http://[localhost]:[port]/deleteCard/[id]
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port${port}...`) );