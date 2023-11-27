import express from "express";

const router = express.Router();

import { register, login, logout, update, remove, getById, get } from "./users/methods";
import { create, update as updateVacancy, remove as removeVacancy, get as getVacancies } from "./vacancies/methods";
import { create as createApplication, remove as removeApplication, get as getApplications } from "./applications/methods";
import { auth } from "../middleware/auth";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(auth, logout);

router.route("/users").get(get);
router.route("/users/:_id").get(getById);
router.route("/users/:_id").put(auth, update);
router.route("/users/:_id").delete(auth, remove);

router.route("/vacancies").get(getVacancies);
router.route("/vacancies").post(auth, create);
router.route("/vacancies/:_id").put(auth, updateVacancy);
router.route("/vacancies/:_id").delete(auth, removeVacancy);

router.route("/applications").get(auth, getApplications);
router.route("/applications").post(createApplication);
router.route("/applications/:_id").delete(auth, removeApplication);

export default router;
