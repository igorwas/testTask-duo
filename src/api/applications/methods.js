import Applications from './model';

const create = async (req, res, next) => {
  await Applications.create(req.body)
    .then((application) => {
      res.status(200).json({
        message: "Application successfully created",
        application
      });
    })
    .catch((error) =>{ 
      res.status(400).json({
        message: "Application not successful created",
        error: error.message,
      })
    } 
  )
};

const remove = async (req, res, next) => {
  const { _id } = req.params;
  await Applications.findById(_id)
    .then((application) => application.remove())
    .then((application) =>
      res.status(200).json({ message: "Application successfully deleted", application })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};

const get = async (req, res, next) => {
  const query = req.query;

  await Applications.find(query)
    .then((applications) => {
      res.status(200).json(applications);
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );
};

export { create, remove, get }