const fs = require('fs');

let rawdata = fs.readFileSync('database.json');
let json = JSON.parse(rawdata);

var tm = require('text-miner');
let descriptions = json.map(e => {
    return e.describe_sound.replace(/(\.|:|\(|\)|\\|\/|\-|<|>|"|'|\&)/g, " ");
});

var myCorpus = new tm.Corpus([]);
myCorpus.addDocs(descriptions);
myCorpus.clean().trim().removeInterpunctuation().removeNewlines().removeInvalidCharacters().stem()
myCorpus.removeWords( tm.STOPWORDS.EN )
var terms = new tm.DocumentTermMatrix( myCorpus );
console.log(terms.findFreqTerms(100));