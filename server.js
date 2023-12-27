const SignUp = require("./handlers/authentication/SignUp");
const SignIn = require("./handlers/authentication/SignIn");

const GetTasks = require("./handlers/tasks/Get");
const CreateTask = require("./handlers/tasks/Create");
const DeleteTask = require("./handlers/tasks/Delete");
const EditTask = require("./handlers/tasks/Edit");

const GetFilters = require("./handlers/filters/Get");
const CreateFilter = require("./handlers/filters/Create");
const EditFilter = require("./handlers/filters/Edit");
const DeleteFilter = require("./handlers/filters/Delete");

const GetLabels = require("./handlers/labels/Get");
const CreateLabel = require("./handlers/labels/Create");
const EditLabel = require("./handlers/labels/Edit");
const DeleteLabel = require("./handlers/labels/Delete");

const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;
app.use(cors());

try {
  app.use(SignUp);
  app.use(SignIn);

  app.use(GetTasks);
  app.use(CreateTask);
  app.use(DeleteTask);
  app.use(EditTask);

  app.use(GetFilters);
  app.use(CreateFilter);
  app.use(EditFilter);
  app.use(DeleteFilter);

  app.use(GetLabels);
  app.use(CreateLabel);
  app.use(EditLabel);
  app.use(DeleteLabel);
} catch (err) {
  console.log("error", err);
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
