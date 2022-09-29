const fs = require('fs');

let rawdata = fs.readFileSync('database.json');
let json = JSON.parse(rawdata);

var tm = require('text-miner');
let descriptions = json.map(e => {
    return e.describe_sound.replace(/(\.|:|\(|\)|\\|\/|\-|<|>|"|'|\&)/g, " ");
});

const { SimilarSearch } = require('node-nlp');

const similar = new SimilarSearch({ normalize: true });


descriptions.forEach(desc => {
    let sim = similar.getSimilarity(descriptions[0], desc) / Math.max(descriptions[0].length, desc.length);
    if (sim < 0.6) {
        console.log('\n');
        console.log("desc 1 : ", descriptions[0]);
        console.log("desc 2 : ", desc);
    }
});
