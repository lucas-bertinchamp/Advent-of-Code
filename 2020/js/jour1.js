import { Console } from 'console';
import * as fs from 'fs';

const a = Date.now()

function recherche(tab, val){
    
    const n = Math.floor(tab.length / 2)

    if (tab.length <= 1){
        if (tab[0] == val){
            return 0
        } else {
            return NaN
        }

    } else {
        if (tab[n] == val){
            return n
        } else if (tab[n] > val){
            return recherche (tab.splice(0, n), val)
        } else {
            return n + 1 + recherche (tab.splice(n+1, tab.length), val)
        }
    }
}

const array = fs.readFileSync("input.txt", "utf-8").trim().split("\n").map(Number)

array.sort(function(a, b) {return a - b;})

for (let i = 0; i<array.length; i++){
    const e = array[i]
    const sol = recherche(array.slice(), 2020-e)
    if (sol * 0 == 0){
        console.log(e , array[sol])
        console.log(e * array[sol])
    }

}

console.log(Date.now() - a)