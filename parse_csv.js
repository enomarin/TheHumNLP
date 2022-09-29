const fs = require("fs");
const { parse } = require("csv-parse");
let keys = [];
let json = [];
fs.createReadStream("./database.csv")
    .pipe(parse({ delimiter: ";", from_line: 1, to_line: 1 }))
    .on("data", function (row) {
        keys = row; // idk if we can get rid of this
    })
    .on("end", () => {
        fs.createReadStream("./database.csv")
            .pipe(parse({ delimiter: ";", from_line: 2 })).on("data", function (row) {
                let obj = {};
                row.forEach((e, i) => {
                    let key = keys[i];
                    obj[key] = e;
                })
                json.push(obj)
            }).on("end", () => {
                console.log(json);
                data = JSON.stringify(json)
                fs.writeFile("database.json", data, (err) => {
                    if (err)
                      console.log(err);
                    else {
                      console.log("File written successfully\n");
                    }
                  });
            })
    })



