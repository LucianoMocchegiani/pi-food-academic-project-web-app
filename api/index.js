//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Diet } = require('./src/db.js');
const {
  PORT,
} = process.env;


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, '0.0.0.0', () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    const dietas = ["gluten free","ketogenic","vegetarian","lacto ovo vegetarian",
    "vegan","pescatarian","paleolithic", "primal","fodmap friendly","whole 30","dairy free"]
    // crear dietas en la base de datos
      for (let i = 0; i < dietas.length; i++){
      Diet.create({name: dietas[i] }) }
  });
});
