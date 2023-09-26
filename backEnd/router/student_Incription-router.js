const express = require("express");
const route = express.Router();
const db =require ("./../models/index")

route.post("/createReview", (req, res) => {
 db.Review.create({
    comments:req.body.comments,
    rating:req.body.rating,
    adminID:req.body.adminID,
    bussinessID: req.body.bussinessID

 })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

route.get("/getOneReview/:id", (req, res) => {
  db.Review.findOne({ where: { id: req.params.id } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

route.get("/getAllReviews", (req, res) => {
  db.Review.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

route.put("/updateOneReview/:id", (req, res) => {
  db.Review.update(req.body, { where: { id: req.params.id } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

route.delete("/deleteOneReview/:id", (req, res) => {
  db.Review.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = route;
