const express = require("express");
const db = require("./models");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync()
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/companies", async (req, res) => {
  try {
    const result = await db.Company.findAll();
    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(503).json({
      status: error,
    });
  }
});

app.post("/companies", async (req, res) => {
  const { companyName } = req.body;
  try {
    const result = await db.Company.create({ companyName });

    res.status(201).json({
      status: "success",
      created: result,
    });
  } catch (error) {
    console.log(error);
    res.status(503).json({
      status: error,
    });
  }
});

app.delete("/companies/:id", async (req, res) => {
  const companyId = req.params.id;
  try {
    const result = await db.Company.destroy({
      where: { companyId },
    });
    res.json({
      status: "success",
      deleted: result,
    });
  } catch (error) {
    console.log(error);
    res.status(503).json({
      status: "failure",
      e: error,
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const result = await db.User.findAll();
    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(503).json({
      status: error,
    });
  }
});

app.post("/users", async (req, res) => {
  const { companyId, loginId, password, email } = req.body;
  try {
    const result = await db.User.create({
      companyId,
      loginId,
      password,
      email,
    });

    res.status(201).json({
      status: "success",
      created: result,
    });
  } catch (error) {
    console.log(error);
    res.status(503).json({
      status: "failure",
      e: error,
    });
  }
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await db.User.destroy({
      where: { userId },
    });
    res.json({
      status: "success",
      deleted: result,
    });
  } catch (error) {
    console.log(error);
    res.status(503).json({
      status: "failure",
      e: error,
    });
  }
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server started listening on ${process.env.SERVER_PORT}`);
});
