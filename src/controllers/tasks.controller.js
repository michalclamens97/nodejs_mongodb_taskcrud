import Task from "../models/Task";

export const renderTaks = async (req, res) => {
  const tasks = await Task.find().lean(); //obtengo todos los objetos de mi tabla Task esto me devuelve un arreglo de objetos, con lean digo me que devuelva una lista de objetos tipicos para poder recorrerlos mas facil, es decir que en lugar de devolverme objetos de mongodb me devuelva los objetos como si fuera js
  res.render("index", { tasks: tasks }); //de esta manera paso mi arreglo de objetos a mi vista index
};

export const createTask = async (req, res) => {
  try {
    //console.log(req.body);
    const task = Task(req.body); //Guardo el request body del formulario a mi tabla Task (creo el modelo de datos(objeto) mas no lo guardo en la db todavia)
    await task.save(); //Guardo el objeto(la tarea) en mi db

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

export const renderTaskEdit = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).lean();
    console.log(req.params);
    res.render("edit", { task: task });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndUpdate(id, req.body); //actualizo la tarea con el id que se paso por la url y los valors nuevos son los que se obtienen del req.body al mandar el formulario
  res.redirect("/");
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);

  res.redirect("/");
};

export const toogleTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  task.done = !task.done;

  await task.save();

  res.redirect("/");
};
