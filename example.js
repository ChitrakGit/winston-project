const logger = require('./Logger');


// change NODE_ENV=Production in .env to see how it work in production
// testing variables
let str = "string";
let value = 123;
let json = {key1:1,key2:2, key3:{k1:1,k2:2}}
let array = [{"print done":str,value}]

// logs
logger.log("error",json,{service:"json service"})
logger.log("info",array,{service:"array service"})
logger.log({level:"info",message:str})
logger.log("info",'multiple variable: %s, %d,%s', str, value, {k1:1} )
logger.log("warn","print warn")
logger.log("debug","print debug")
logger.log("http","print done")

console.log("from console log")

///////////////////////////////////  OUTPUT //////////////////////////////
/*

Development
time:2021-11-14 13:11:20|service:json service [error] :
 {
  "key1": 1,
  "key2": 2,
  "key3": {
    "k1": 1,
    "k2": 2
  }
}
time:2021-11-14 13:11:20|service:array service [info] :
 [
  {
    "print done": "string",
    "value": 123
  }
]
time:2021-11-14 13:11:20|service:server-side [info] : string
time:2021-11-14 13:11:20|service:server-side [info] : multiple variable: string, 123,{ k1: 1 }
time:2021-11-14 13:11:20|service:log [warn] : print warn
time:2021-11-14 13:11:21|service:log [debug] : print debug
time:2021-11-14 13:11:21|service:log [http] : print done
from console log

*/