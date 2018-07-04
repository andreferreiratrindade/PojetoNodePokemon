module.exports = app => {
  if (process.env.NODE_ENV !== "test") {
    app.libs.db.sequelize.sync().done(() => {
      app.listen(app.get("port"), () => {
          console.log(`Servidor iniciado - Porta: ${app.get("port")}`);
        });
    });
  }
};