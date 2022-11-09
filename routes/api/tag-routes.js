const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product, through: ProductTag}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const TagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag}],
    });
    
    if(!TagData) {
      res.status(404).json({message: "No tag data with this id!"})
      return;
    }

    res.status(200).json(TagData)

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const TagData = Tag.create(req.body)
    res.status(200).json(TagData)

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  Tag.update(
    req.body, {where: {
      id: req.params.id,
    }}
  )
  .then((updatedTag) => {
    // Sends the updated book as a json response
    res.json(updatedTag);
  })
  .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleteTag) => {
      res.json(deleteTag);
    })
});

module.exports = router;
