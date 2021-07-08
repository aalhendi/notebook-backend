const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define("Note", {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required",
        },
      },
    },
    // TODO: ADD MORE PROPERTIES
    slug: { type: DataTypes.STRING, unique: true },
  });
  SequelizeSlugify.slugifyModel(Note, { source: ["name"] });
  return Note;
};
