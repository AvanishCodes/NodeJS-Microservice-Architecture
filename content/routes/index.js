const express = require('express')
const csvRouter = express.Router()
const upload = require('../middlewares/uploadCsv')
const { uploadCsv, search_by_title, search_by_story, update_title_story_by_id, create_content, delete_content_by_id, search_newest_content, search_popular_content, getContent } = require('../controllers/csv.controllers')

csvRouter.post('/uploadcsv', upload.single("file"), uploadCsv)

csvRouter.post('/create', create_content)

csvRouter.get('/title', search_by_title)

csvRouter.get('/story', search_by_story)

csvRouter.get('/storybyid/:id', getContent)

csvRouter.put('/update/:id', update_title_story_by_id)

csvRouter.delete('/delete/:id', delete_content_by_id)

csvRouter.get('/sorted/date', search_newest_content)

csvRouter.get('/sorted/popular', search_popular_content)

module.exports = csvRouter