const express = require('express')
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));

function generateRandomUrl() {
    let url = ''
    let chars = 'abcdefghijklmnopqrestuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 5; i++) {
        url += chars[Math.floor((Math.random() * chars.length))]
    }
    return url
}

app.get('/', (req, res) => {
    res.send('server is running');
});

app.post('/create', (req, res) => {
    try {
        const url = req.body.url;
        let alias = req.body.alias;

        if (!url) {
            return res.json({
                status: false
            });
        } else {
            if(!alias)
                alias = generateRandomUrl();

            return res.json({
                status: true,
                url: alias
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3000, (r) => {
    console.log('server is running')
});