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
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;


// activity 7 bookRoutes for the .put route and .delete route

// finish the routes 

// rewrite category routes in product routes and tag routes 