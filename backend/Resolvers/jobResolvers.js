const { AuthenticationError } = require("apollo-server-express");
const JobModel = require("../Models/Job");

const jobResolvers = {
  Query: {
    getJobs: async () => {
      try {
        const jobs = await JobModel.find();
        return jobs;
      } catch (error) {
        throw new Error("Failed to fetch job listings");
      }
    },
  },
  Mutation: {
    createJob: async (_, { input }, context) => {
      const newJob = new JobModel({
        ...input,
      });

      const job = await newJob.save();
      return job;
    },
  },
};

module.exports = jobResolvers;


// postedBy: context.user._id,

// if (!context.user) {
//   throw new AuthenticationError("You must be logged in to post a job.");
// }
// const authorizationHeader = context.req.headers.authorization;
