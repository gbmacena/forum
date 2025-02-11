const sequelize = require("../database");
const truncateDatabase = async () => {
  try {
    console.log("Iniciando truncamento do banco de dados...");
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    const tables = await sequelize.query("SHOW TABLES", {
      type: sequelize.QueryTypes.SHOWTABLES,
    });

    for (const table of tables) {
      await sequelize.query(`TRUNCATE TABLE ${table}`);
      console.log(`Tabela ${table} truncada.`);
    }

    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("Banco de dados truncado com sucesso.");
  } catch (error) {
    console.error("Erro ao truncar o banco de dados:", error);
  } finally {
    await sequelize.close();
    console.log("Conexão com o banco de dados fechada.");
  }
};

truncateDatabase();
