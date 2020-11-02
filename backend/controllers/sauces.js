const Sauce = require('../models/sauce');

exports.creatSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ sauce }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateSauce = (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Modified!' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.findSauce = (req, res, next) => {
  Sauce.find()
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

exports.findOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((oneSauce) => res.status(200).json(oneSauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Deleted!' }))
    .catch((error) => res.status(400).json({ error }));
};
