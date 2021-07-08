const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define("Notebook", {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required",
        },
      },
    },
    slug: { type: DataTypes.STRING, unique: true },
  });
  SequelizeSlugify.slugifyModel(Notebook, { source: ["name"] });
  return Notebook;
};
