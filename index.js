const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const logger = require('./middleware/logger');
const router = require('./routes/api/members');
const members = require('./members');

const app = express();
//Init middleware
// app.use(logger);

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => res.render('index', {
    title: 'Members App',
    members
}))

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));