const Content = require('../models/content.model')
const moment = require('moment')
const csvtojson = require('csvtojson')

/**
 * 
 * @param {*} req Request: contains the file to be uploaded in csv format
 * @param {*} res Response: contains the cotent as uploaded in the database in JSON format
 */
exports.uploadCsv = (req, res) => {
    try {
        contentArray = []
        csvtojson().fromFile(req.file.path)
            .then((jsonObj) => {
                for (let i = 0; i < jsonObj.length; i++) {
                    let row = {
                        serial: parseInt(jsonObj[i]["serial"]),
                        title: jsonObj[i]["title"],
                        story: jsonObj[i]["story"],
                        user: jsonObj[i]["user"],
                        publication_date: moment(jsonObj[i]["publication_date"], "DD-MM-YYYY")
                    }
                    contentArray.push(row)
                }
                Content.insertMany(contentArray, (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    if (result) {
                        // console.log(result)
                        return res.status(201).send({ message: "data posted", result })
                    }
                })
            })
    } catch (error) {
        console.log(error);
        return res.status(500).send(`Error when trying upload content: ${error}`);
    }
}

/**
 * 
 * @param {*} req Request: contains the details of the content to be uploaded in req.body
 * @param {*} res Response: contains the uploaded content in JSON format
 */
exports.create_content = async (req, res) => {
    try {
        let { serial, title, story, user, publication_date } = req.body
        if (!serial || !title || !story || !user || !publication_date) {
            return res.status(400).send({ message: "Fields empty. Please Fill all required fields" })
        }
        publication_date = moment(publication_date, "DD-MM-YYYY")
        const nBook = new Content({
            serial,
            title,
            story,
            user,
            publication_date
        })
        const finalData = await nBook.save()
        return res.status(201).send(finalData)
    } catch (error) {
        console.log(error);
        return res.status(500).send(`Error when trying upload content: ${error}`);
    }
}

/**
 * 
 * @param {*} req Request: contains the title query to be searched
 * @param {*} res Response: contains the content in JSON format
 * @returns The list of content that matches the title query
 */
exports.search_by_title = async (req, res) => {
    try {
        const query = { $text: { $search: req.body.title } }
        const bookData = await Content.find(query);
        console.log(bookData)
        if (bookData.length === 0) {
            return res.status(404).send({ message: "Book not found" })
        }
        return res.status(200).send(bookData)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

/**
 * 
 * @param {*} req Request: contains the story query in req.body to be searched
 * @param {*} res Response: contains the content in JSON format
 */
exports.search_by_story = async (req, res) => {
    try {
        const query = { $text: { $search: req.body.story } }
        const bookData = await Content.find(query)
        if (bookData.length === 0) {
            return res.status(404).send({ message: "Book not found" })
        }
        return res.status(200).send(bookData)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

/**
 * 
 * @param {*} req Request: contains the id of the content to be updated in req.params
 * @param {*} res Response: contains the updated content in JSON format
 */
exports.update_title_story_by_id = async (req, res) => {
    try {
        const updateBook = await Content.findOne({ _id: req.params.id })
        if (!updateBook) {
            return res.status(404).send({ message: "Book not found" })
        }
        if (req.body.title) {
            updateBook.title = req.body.title
        }
        if (req.body.story) {
            updateBook.story = req.body.story
        }
        await updateBook.save()
        return res.status(201).send({ updateBook })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

/**
 * 
 * @param {*} req Request: contains the id of the content to be deleted in req.params
 * @param {*} res Response: contains the deletion confirmation message
 */
exports.delete_content_by_id = async (req, res) => {
    try {
        const delId = req.params.id
        const delBook = await Content.findByIdAndDelete({ _id: delId })
        if (!delBook) {
            return res.status(404).send({ message: "Blog not found" })
        }
        return res.send({
            status: "success",
            message: "Content deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

/**
 * 
 * @param {*} req Request: contains the id of the content to be searched in req.params
 * @param {*} res Response: contains the content in JSON format
 */
exports.search_newest_content = async (req, res) => {
    try {
        const newestBook = await Content.find().sort({ publication_date: -1 })
        if (newestBook.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "No content found"
            })
        }
        return res.status(200).send({
            status: "success",
            data: newestBook[0]
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

/**
 * 
 * @param {*} req Request: contains the id of the content to be searched in req.params
 * @param {*} res Response: contains the popular content in JSON format
 */
exports.search_popular_content = async (req, res) => {
    var axios = require('axios');
    var config = {
        method: 'get',
        url: 'http://localhost:3003/interaction/topcontent/likes',
        headers: {}
    };
    axios(config)
        .then(function (response) {
            var data = response.data;
            // For each element, get the content
            let contents = [];
            data.forEach(element => {
                contents.push({
                    post: element.content,
                    likes: element.likes.length,
                    reads: element.reads.length
                });
            });
            let results = [];
            for (let i = 0; i < contents.length; i++) {
                results.push({ 'content': contents[i].post, likes: contents[i].likes, reads: contents[i].reads });
            }
            return res.status(200).send({
                status: 'success',
                data: results
            })
        })
        .catch(function (error) {
            console.log(error);
            return res.status(500).send({
                status: 'error',
                message: 'Error when trying to get popular content'
            });
        });
}

/**
 * 
 * @param {*} req Request: contains the id of the content to be searched in req.params
 * @param {*} res Response: contains the content in JSON format
 * @returns The content that matches the id query
 */
exports.getContent = async function (req, res) {
    try {
        let id = req.params.id;
        let content = await Content.findById(id);
        if (!content) {
            return res.status(404).send({ message: "Content not found" });
        }
        return res.status(200).send(content);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}