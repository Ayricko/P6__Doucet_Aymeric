const Sauce = require('../models/sauce');

exports.creatSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    likes: 0,
    dislikes: 0,
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ sauce }))
    .catch((error) => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
  const likeStatus = req.body.like;
  // Si L'utilisateur like la sauce
  if (likeStatus === 1) {
    // On utilise le modele mongoose updateOne sur le modèle Sauce en passant en premier paramètre l'id de la sauce concernée, puis on incremente les likes de cette sauce de 1, et on ajoute l'id de l'utilisateur au tableau usersLiked.
    Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
      .then(() => res.status(200).json({ message: 'Like ajouté' }))
      .catch((error) => res.status(400).json({ error }));
    // Sinon si l'utilisateur dislike
  } else if (likeStatus === -1) {
    // On utilise la methode mongoose updateOne sur le modèle Sauce en passant en premier paramètre l'id de la sauce concernée, puis on incremente les dislikes de cette sauce d'une unité, et on ajoute l'id de l'utilisateur au tableau usersDisliked.
    Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
      .then(() => res.status(200).json({ message: 'Dislike ajouté' }))
      .catch((error) => res.status(400).json({ error }));
    // Sinon si l'utilisateur enleve son like ou son dislike
  } else if (likeStatus === 0) {
    // On récupère L'id de la sauce
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        // Si l'utilisateur est dans le tableau des likes
        if (sauce.usersLiked.includes(req.body.userId)) {
          // Alors on enleve une unité de like dans la sauce concernée, et on retire l'utilisateur du tableau des usersLiked
          Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
            .then((sauce) => res.status(200).json({ message: 'Déselectionné !' }))
            .catch((error) => res.status(400).json({ error }));
          // Sinon si l'utilisateur est dans le tableau des dislikes
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          // Alors on enleve une unité de like dans la sauce concernée, et on retire l'utilisateur du tableau des usersDisliked
          Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
            .then((sauce) => res.status(200).json({ message: 'Déselectionné !' }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.updateSauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      }
    : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
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
