// Import the Prisma client instance
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Service method to get all tags
exports.getAllTags = async () => {
  return prisma.tags.findMany();
};

// Service method to get a tag by ID
exports.getTagById = async (tagId) => {
  return prisma.tags.findUnique({
    where: { tag_id: tagId },
  });
};

// Service method to create a new tag
exports.createTag = async (tag_name) => {
  return prisma.tags.create({
    data: {
      tag_name,
    },
  });
};

// Service method to update a tag
exports.updateTag = async (tagId, tag_name) => {
  return prisma.tags.update({
    where: { tag_id: tagId },
    data: {
      tag_name,
    },
  });
};

// Service method to delete a tag
exports.deleteTag = async (tagId) => {
  return prisma.tags.delete({
    where: { tag_id: tagId },
  });
};
