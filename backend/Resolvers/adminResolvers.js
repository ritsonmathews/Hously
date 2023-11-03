const Service = require("../Models/Services");

const adminResolvers = {
  Query: {
    getService: async (_, { id }) => {
      return await Service.findById(id);
    },

    getAllServices: async () => {
      return await Service.find();
    },
  },

  Mutation: {
    createService: async (_, { input }) => {
      return await Service.create(input);
    },

    updateService: async (_, { id, input }) => {
      return await Service.findByIdAndUpdate(id, input, { new: true });
    },

    deleteService: async (_, { id }) => {
      return await Service.findByIdAndRemove(id);
    },
  },
};

module.exports = adminResolvers;
