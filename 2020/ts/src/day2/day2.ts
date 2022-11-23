import * as fs from "fs";

const array: String[] = fs
    .readFileSync("./src/day2/input.txt", "utf-8")
    .trim()
    .split("\n");

console.log(array);


var total = 0;
for (let nLigne: number = 0; nLigne < array.length; nLigne++) {
    const split: string[] = array[nLigne].split(" ");
    const min: number = Number(split[0].split("-")[0]);
    const max: number = Number(split[0].split("-")[1]);
    const lettre: String = split[1][0];
    const analyse: String = split[2];
    
    var count: number = 0;

    for (let nLettre: number = 0 ; nLettre < analyse.length; nLettre++) {
        if(analyse[nLettre] == lettre){
            count++;
        }
    }

    if (min <= count && count <= max){
        total++;
    }

}

console.log(total)
