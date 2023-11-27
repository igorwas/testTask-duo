import Mongoose from "mongoose";

const VacancySchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum : ['draft','published'],
    default: 'draft'
  },
  short_content: {
    type: String,
  },
  content: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
  },
}, { timestamps: true });

const Vacancies = Mongoose.model("vacancies", VacancySchema);

export default Vacancies;
