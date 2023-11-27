import Vacancies from './model';

const create = async (req, res, next) => {
  const { title, status, short_content, content } = req.body;
  const { userId } = req.cookies;

  await Vacancies.create({ title, status, short_content, content, createdBy: userId })
    .then((vacancy) => {
      res.status(200).json({
        message: "Vacancy successfully created",
        _id: vacancy._id
      });
    })
    .catch((error) =>{ 
      res.status(400).json({
        message: "Vacancy not successful created",
        error: error.message,
      })
    } 
  )
};

const update = async (req, res, next) => {
  const { _id } = req.params;

  await Vacancies.updateOne({ _id } , req.body)
    .then(() => {
      res.status("200").json({ message: "Update successful" });
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message });
    });

};

const remove = async (req, res, next) => {
  const { _id } = req.params;
  await Vacancies.findById(_id)
    .then((vacancy) => vacancy.remove())
    .then((vacancy) =>
      res.status(200).json({ message: "Vacancy successfully deleted", vacancy })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};

const get = async (req, res, next) => {
  const query = req.query;
  await Vacancies.find(query)
    .then((vacancies) => {
      res.status(200).json(vacancies);
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );
};


export { create, update, remove, get }