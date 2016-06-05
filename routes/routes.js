var main = require('../handlers/main.js');
var synth = require ('../lib/synths.js');

module.exports = function(app){

app.get('/api/synths', function(req,res){
    synths = synth.getAll();
    if (synths){
    res.json(synth.getAll());
    }else {
        res.status(404).send("404 - not found");
    }
});


app.get('/', function(req,res){
    res.type('text/html');
    res.render('home', {synth: synth.getAll()});    
});


app.get('/api/detail/:brand', function(req,res){
   var found = synth.getSynth(req.params.brand);{
            if(found !=''){
                res.json(found);      
              
            }else{
                res.status(404).send("404 - not found");       
            }
    
}
});


app.get('/about', function(req,res){
    res.type('text/html');
    res.render('about');
});

app.get('/detail/:brand', function(req,res){
    res.type('text/html');
    var found = synth.getSynth(req.params.brand);
    if (!found) {
        found = {brand: req.params.brand};
    }
    console.log(found);
    res.render('detail', {synth: found} );
    
});

app.get('/detail', function(req, res) {
    res.type('text/html');
    res.render('detail',{synth: synth.getAll()});
});


app.post('/search', function(req,res){
    res.type('text/html');
    var found = synth.getSynth( req.body.search_term.toLowerCase());
    console.log(found);
    if (found) {
        res.render('search', {synth: found});
    } else {
        res.render('search');
    }
    
});
    

app.post('/add', function(req,res) {
    res.type('text/html');
    var newSynth = {"brand":req.body.brand, "model":req.body.model, "price":req.body.price};
    var result = synth.add(newSynth);
    if (result.added) {
        res.render('add', {result: result.total});
        console.log (result.total);
    } else {
        res.render('updated', {result: result.total});
    }
});

app.post('/delete', function(req,res){
    res.type('text/html');
    var result = synth.delete(req.body.brand);
    if (result.deleted) {
        res.render('deleted', {result: result.total});
        console.log (result.total);
    } else {
        res.send(req.body.brand + ' not found' + back_link);
    }
});


};
