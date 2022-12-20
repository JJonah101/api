
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Show = require('./models/Show');
const { json } = require('express');

const app = express();
const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August",
"September", "Oktober", "November", "Dezember"];

app.use(express.json());
app.use(cors());

const uri ="mongodb+srv://admin:Stupsi1997@cluster0.ddvuwub.mongodb.net/Showapp?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(3001, () => console.log("Server started on Port 3001")))
  .catch((err) => console.log(err));

app.get('/shows', async (req, res) => {
  var obj = {};

  const shows = await Show.find();

  for(var i = 0;i < shows.length; i++) {
    var year = String(shows[i].date.toLocaleString('default', {year: 'numeric'}));
    if(!obj[year]) {
      obj[year] = [];
    }
    obj[year].push(shows[i]);
  }

  res.json(obj);
});

app.get('/test', async (req, res) => {


});

app.post('/show/new', (req, res) => {
  const show = new Show({
    name: req.body.name,
    date: req.body.date
  })

  show.save();

  res.json(show);
});

app.delete('/show/delete/:id', async (req, res) => {
	const result = await Show.findByIdAndDelete(req.params.id);

	res.json({result});
});

