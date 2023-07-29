// Import the tag service
const tagService = require('../services/tagService');

// Controller method to get all tags
exports.getAllTags = async (req, res, next) => {
  try {
    const tags = await tagService.getAllTags();
    res.json(tags);
  } catch (err) {
    next(err);
  }
};

// Controller method to get a tag by ID
exports.getTagById = async (req, res, next) => {
  try {
    const tagId = parseInt(req.params.id);
    const tag = await tagService.getTagById(tagId);
    res.json(tag);
  } catch (err) {
    next(err);
  }
};

// Controller method to create a new tag
exports.createTag = async (req, res, next) => {
  try {
    const { tag_name } = req.body;
    const newTag = await tagService.createTag(tag_name);
    res.json(newTag);
  } catch (err) {
    next(err);
  }
};

// Controller method to update a tag
exports.updateTag = async (req, res, next) => {
  try {
    const tagId = parseInt(req.params.id);
    const { tag_name } = req.body;
    const updatedTag = await tagService.updateTag(tagId, tag_name);
    res.json(updatedTag);
  } catch (err) {
    next(err);
  }
};

// Controller method to delete a tag
exports.deleteTag = async (req, res, next) => {
  try {
    const tagId = parseInt(req.params.id);
    await tagService.deleteTag(tagId);
    res.json({ message: 'Tag deleted' })
  } catch (err) {
    next(err);
  }
};
