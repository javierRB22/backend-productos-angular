import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('almacen', 'root', 'Marpico*23$je', {
    host: 'localhost',
    dialect:'mysql'
  });

  export default sequelize;