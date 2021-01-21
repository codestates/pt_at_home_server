import * as dotenv from 'dotenv';

dotenv.config();

// type timeOption = {
//     dateStrings: boolean;
//     typeCast: boolean;
//   };

// type Config = {
//     username : string;
//     password : string;
//     database : string;
//     host : string;
//     port : any;
//     dialect : any;
//     dialectOptions: timeOption;
// }

// interface ConfigGroup {
//     development : Config;
// }

// const config: ConfigGroup = {
//     development : {
//         username : 'root',
//         password : process.env.DATABASE_SECRET!,
//         database : 'ptathome',
//         port : '3306',
//         host : '127.0.0.1',
//         dialect : 'mysql',
//         dialectOptions: {
//             dateStrings: true,
//             typeCast: true,
//         },
//     }
// }

const config = {
    database : 'ptathome',
    username : 'root',
    password : process.env.DATABASE_SECRET,
    dialect : 'mysql',
    port : '3306',
}


export default config;