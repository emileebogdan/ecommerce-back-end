const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    
    if(!categoryData) {
      res.status(404).json({message: "No category data with this id!"})
      return;
    }

    res.status(200).json(categoryData)

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = Category.create(req.body)
    res.status(200).json(categoryData)

  } catch (err) {
    res.status(500).json(err);

  }
});

router.put('/:id', (req, res) => {
  Category.update(
    req.body, {where: {
      id: req.params.id,
    }}
  )
  .then((updatedCategory) => {
    // Sends the updated book as a json response
    res.json(updatedCategory);
  })
  .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleteCategory) => {
      res.json(deleteCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;


