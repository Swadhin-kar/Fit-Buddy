import express from 'express'
import { SearchById, SearchByQuery } from '../controller/food.controller.js'
const router = express.Router()

router.get("/search", SearchByQuery);

router.get("/:id", SearchById);

export default router;