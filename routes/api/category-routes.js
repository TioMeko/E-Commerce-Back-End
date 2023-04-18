const router = require('express').Router();
const { Category, Product } = require('../../models');

// The /api/categories endpoint
router.get('/', async (req, res) => {

  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a category by its id value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category was found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name,
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a category by its id value
router.put('/:id', async (req, res) => {

  try {
    const newCategoryData = await Category.update({
      category_name: req.body.category_name,  
    }, 
    {
      where: {
        id: req.params.id,
      }
    });
    if (!newCategoryData) {
      res.status(404).json({ message: 'No category was found with that id!' });
      return;
    }

    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its id value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category was found with that id!' });
      return;
    }
  res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;