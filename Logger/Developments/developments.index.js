const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
/*
const customLevels = {
  levels: {
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    verbose: 5,
    debug: 6,
    silly: 7
  }
};
*/
const CustomFormat = printf(({ level, message,service,  timestamp }) => {
    if (typeof message == 'object') message ='\n '+ JSON.stringify(message,null,2);
    else if(Array.isArray(message)) message ='\n '+ JSON.stringify(message,null,2);
    return `time:${timestamp}|service:${service ? service:"log"} [${level}] : ${ message}`;
  });

const developmentLogger = () =>{
   
      return createLogger({
        level: 'debug',
        format: format.combine(format.colorize(),format.splat(), format.simple(),format.prettyPrint(), timestamp({format: "YYYY-MM-DD HH:MM:SS"}) ,CustomFormat),
        defaultMeta: { service: 'server-side' },
        transports: [
              new transports.Console({
                json: true,
                stringify: (obj) => JSON.stringify(obj),
               }),
            ],
      });
}

module.exports = developmentLogger;