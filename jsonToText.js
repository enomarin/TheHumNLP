const fs = require("fs");


let rawdata = fs.readFileSync('database.json');
let json = JSON.parse(rawdata);
let descriptions = json.map(e => {
    return e.describe_sound.replace(/(\.|:|\(|\)|\\|\/|\-|<|>|"|'|\&)/g, " ");
});

descriptions.every((element, i) => {
    fs.writeFile(`descriptions/description-${i}.txt`, element, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
        }
      });
      if(i >= 10) {
        return false
      }
      else {
        return true
      }
});
