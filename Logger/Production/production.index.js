const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
require('winston-mongodb');
const dotenv = require('dotenv');

dotenv.config({path: '../../.env'})

const CustomFormat = printf(({ level, message,service,  timestamp }) => {
  if (typeof message == 'object') message ='\n '+ JSON.stringify(message,null,2);
  else if(Array.isArray(message)) message ='\n '+ JSON.stringify(message,null,2);
  return `time:${timestamp}|service:${service ? service:"log"} [${level}] : ${ message}`;
});

const productionLogger = () =>{
   
      return createLogger({
        level: 'debug',
        format: format.combine( timestamp({format: "YYYY-MM-DD"}),format.splat(), format.simple(),format.prettyPrint(),  CustomFormat),
        // defaultMeta: { service: 'user-service' },
        transports: [
            new transports.File({ filename: './log/example_Error.log', level: 'debug' }),
            new transports.File({ filename: './log/example_Error.log' }),
            new transports.MongoDB({ level:"debug", 
                                  db:process.env.MONGO_LINK,
                                  collection:"WinstonExample",
                                  format: format.combine( timestamp({format: "YYYY-MM-DD"}),  
                                  CustomFormat)
                                })
          ],
      });
}

module.exports = productionLogger;