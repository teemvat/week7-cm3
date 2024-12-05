const express = require("express");
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobControllers");
const requireAuth = require("../middleware/requireAuth"); // Uusi, autentikointia varten

const router = express.Router();

// Kaikki reitit edellyttävät sisäänkirjautumista, joten käytä middlewarea kaikissa
// Jos työt halutaan näyttää kaikille mutta muokkaukset vain kirjautuneille niin lisää middleware suoraan halutuihin reitteihin
router.use(requireAuth);  // Uusi lisäys

router.get("/", getAllJobs);
router.post("/", createJob);
router.get("/:jobId", getJobById);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);

module.exports = router;
