/**
 * Business Controller -> 1 to 1 relationship with Business Model
 * Cuz were bored like that
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const CustomError = require('../helpers/CustomError');
const Business = require('../models/business.model');
const Feedback = require('../models/feedback.model');

/**
 * @param {Object} business Aura Business
 * @param {Object} options Additional parameters (optional)
 * @returns awaited obj
 * ADD ONE
 */
const createOne = async (business, options) => {
  const returnAwait = await Business.create(business);
  return returnAwait;
};

/**
 * Creates many businesses with a batch request
 * @param {Object} businesses Aura Businesses
 * @param {Object} options Additional parameters (optional)
 * @returns awaited obj
 * ADD BATCH
 */
const createMany = async (businesses, options) => {
  const returnAwait = await Business.insertMany(businesses, { ordered: false });
  return returnAwait;
};

/**
 * Reads a single business
 * @param {Object} options defines what to find
 * @returns Response
 */
const readOne = async options => {
  const returnAwait = await Business.findOne(options);
  return returnAwait;
};

/**
 * Reads many businesses with a batch request
 * @param {Object} options defines what to find
 * @returns Response
 */
const readMany = async options => {
  const returnAwait = await Business.find(options);
  return returnAwait;
};

/**
 * @param {String} businessId contains the businessId of the
 * business.
 * @param {Object} options contains the userID
 * and other optional parameters.
 * Client needs initial array of aura's voted on a business
 * on intial click to feedback tab.
 */
const readVotesAura = async (businessId, options) => {
  // Get the business from the business ID
  const business = await Business.findOne({ _id: businessId });
  let returnToRouter;
  /**
   * From here, the business should have a usersVotedAura array
   * whether it has something or not.
   * CASES TO CONSIDER.
   * 1. The usersVotedAura array is empty.
   * 2. The usersVotedAura is not empty but the user HAS NOT
   * been recorded in the usersVotedAura.
   * 3. The usersVotedAura is not empty and the user HAS BEEN
   * recorded in the usersVotedAura
   */
  if (!business.usersVotedAura || business.usersVotedAura.length === 0) {
    // CASE 1
    returnToRouter = {
      aura: '[]',
      poll: business.auras,
    };
  } else {
    // attempt to find the user from user ID
    let userIndex;
    for (let i = 0; i < business.usersVotedAura.length; ++i) {
      if (business.usersVotedAura[i].userId.toString() === options.userId.toString()) {
        userIndex = i;
        break;
      }
    }
    if (userIndex >= business.usersVotedAura.length) {
      // CASE 2: userIndex goes all the into the end and didnt find
      // the appropriate userId
      returnToRouter = {
        aura: '[]',
        poll: business.auras,
      };
    } else {
      // CASE 3: user has been found
      returnToRouter = {
        aura: business.usersVotedAura[userIndex].aura,
        poll: business.auras,
      };
    }
  }
  return returnToRouter;
};

/**
 *
 * @param {Object} options defines field to be renamed with new field
 * complains about rename being empty is the field to be renamed does
 * not exist in the schema.
 */
const renameField = async options => {
  const docs = await Business.updateMany({}, { $rename: options }, { new: true });
  return docs;
};

/**
 * Updates a single business
 * @param {Object} business Aura Business
 * @param {Object} options Additional parameters
 * @returns doc
 */
const updateOne = async (business, options) => {
  const doc = await Business.findByIdAndUpdate(business, { $set: options }, { new: true });
  return doc;
};

/**
 * Updates many businesses with a batch request
 * @param {Object} options Additional parameters
 * @returns docs
 * Updates all
 */
const updateMany = async options => {
  const docs = await Business.updateMany({}, { $set: options }, { new: true });
  return docs;
};

/**
 *
 * @param {*} businessId -> ID of business
 * @param {*} options -> additional params, userId is derived here.
 * This function is called whenever user upvotes/downvotes an aura
 * on the business. It calls the updateOne() method to update the
 * document whenever it is done.
 * Additional task of this control module is to notify the feedback 
 * controller that a feedback is either created or needs to be updated.
 * With that comes the task to update the feedback array of the particular
 * business as well. 
 */
const updateVotesAura = async (businessId, options) => {
  let userSpliced = false;
  const business = await Business.find({ _id: businessId });
  // find if the userId already exists in the business'
  // array of userIds
  let voter;
  for (let i = 0; i < business[0].usersVotedAura.length; ++i) {
    if (business[0].usersVotedAura[i].userId.toString() === options.userId.toString()) {
      voter = business[0].usersVotedAura[i];
      break;
    }
  }
  // if no user was found, record the user's/voter's vote
  if (!voter) {
    // UPVOTE
    // Reassign voter.aura array into a temp storage
    // auraArr is the temp storage.
    // eslint-disable-next-line prefer-const
    let auraArr = [];
    auraArr.push(options.aura);
    business[0].usersVotedAura.push({
      userId: options.userId,
      // aura is an array, assign auraArr to it
      aura: auraArr,
      objectReference: options.userId,
    });
    business[0].auras[options.aura]++;
  } else {
    // execute if voter's ID has been found
    // this if checks if the options.aura is already
    // inside the voter.aura array
    // find userIndex to make offsets and indices easier
    let userIndex;
    for (let i = 0; i < business[0].usersVotedAura.length; ++i) {
      if (business[0].usersVotedAura[i].userId.toString() === options.userId.toString()) {
        userIndex = i;
        break;
      }
    }
    if (voter.aura.indexOf(options.aura) !== -1) {
      // find userIndex to make offsets and indices easier
      // DOWNVOTE: voter desires to take back vote
      // splice the aura out of the voter.aura array
      const spliceAuraIndex = business[0].usersVotedAura[userIndex].aura.indexOf(options.aura);
      business[0].usersVotedAura[userIndex].aura.splice(spliceAuraIndex, 1);
      // proceed to decrement aura from vote takeback.
      // DOWNVOTE
      business[0].auras[options.aura] > 0 ? business[0].auras[options.aura]-- : (business[0].auras[options.aura] = 0);

      // Proceed to check if the aura array is empty.
      // Take out of usersVotedAura array if the aura array
      // is empty. There is no point of storing an object with
      // and empty aura array in the usersVotedAuraArray.
      if (!business[0].usersVotedAura[userIndex].aura || business[0].usersVotedAura[userIndex].aura.length === 0) {
        // splice the object out of the usersVotedAura field
        // if the aura array is empty
        business[0].usersVotedAura.splice(userIndex, 1);
        userSpliced = true;
      }
    } else {
      // the user is trying to vote for a different aura.
      // UPVOTE the other aura that the user is voting.
      // push options.aura into the user's aura array
      business[0].usersVotedAura[userIndex].aura.push(options.aura);
      business[0].auras[options.aura]++;
    }
  }
  /**
   * Notify the feedback controller of the changes that needs to be 
   * reflected. Certain information must be present before proceeding 
   * this route.
   * 1. Is the feedback array empty?
   *    -> SOLUTION: Create feedback object and save the ID in the
   *        feedback array
   * 2. Is the userId associated with a feedback already existing?
   *    -> SOLUTION: Update feedback object. Save accordingly.
   * 3. MORE TO FOLLOW.
   */

  // now that the business' usersVotedAura and auras have been modified,
  // shove it back to reflect in the database.
  const doc = await updateOne(businessId, {
    usersVotedAura: business[0].usersVotedAura,
    auras: business[0].auras,
  });
  /**
   * =============================================================================
   * Cool, now thats done. Time to send an object back as a response
   * back to the client. What are we going to send back?
   * We can send a humongous clusterfuck of the business object
   * and let the front end figure out what to do with that shit ton of
   * text. But lets be nice to our client colleagues, and send them
   * just the array of auras voted by the user for that particular business
   * along with the poll of the current vote standings.
   * They won't know we did it, but that's just us, we work in the shadows.
   * ==============================================================================
   */

  /**
   * CASES:
   * 1. empty usersVotedAura (business has no votes at all)
   * 2. user not in the usersVotedAura (user has not voted)
   * 3. user is in the usersVotedAura (user has >= 1 votes in
   * particular business)
   */
  let returnToRouter;
  if (!doc.usersVotedAura || doc.usersVotedAura.length === 0) {
    // CASE 1
    returnToRouter = {
      aura: '[]',
      poll: doc.auras,
    };
  } else if (!userSpliced) {
    // CASE 3
    // find the index of the user
    let userIndex;
    for (let i = 0; i < doc.usersVotedAura.length; ++i) {
      if (doc.usersVotedAura[i].userId.toString() === options.userId.toString()) {
        userIndex = i;
        break;
      }
    }
    returnToRouter = {
      aura: doc.usersVotedAura[userIndex].aura,
      poll: doc.auras,
    };
  } else {
    // CASE 2
    returnToRouter = {
      aura: '[]',
      poll: doc.auras,
    };
  }
  return returnToRouter;
};

/**
 *
 * @param {String} businessId Id of the business of interest
 * @param {Object} options contains userId, activity to be
 * voted for and any additional or optional parameters
 * Lets limit votes to 3, just for fun.
 */
const updateVotesActivity = async (businessId, options) => {
  let userSpliced = false;
  const limitArray = 3;
  let returnToRouter;
  const business = await Business.findOne({ _id: businessId });
  // find if the userId already exists in the business/
  // array of userIds
  let voter;
  for (let i = 0; i < business.usersVotedActivity.length; ++i) {
    if (business.usersVotedActivity[i].userId.toString() === options.userId.toString()) {
      voter = business.usersVotedActivity[i];
      break;
    }
  }
  // voter is an entry in the usersVotedActivity
  // if no user was found OR the user has less than 3 votes,
  // enter this block
  if (!voter || voter.activity.length < limitArray) {
    /**
     * CASES
     * 1. No user yet
     * 2. User exists but has less than 3 items on its
     * activity array. KEEP IN MIND that a downvote can
     * still happen in here and even a possible SPLICE if user downvoted
     * his/her only one vote.
     */
    if (voter) {
      // CASE 2
      // find the user index
      let userIndex;
      for (let i = 0; i < business.usersVotedActivity.length; ++i) {
        if (business.usersVotedActivity[i].userId.toString() === options.userId.toString()) {
          userIndex = i;
          break;
        }
      }
      if (voter.activity.indexOf(options.activity) !== -1) {
        // DOWNVOTE: voter desires to take back vote
        // splice the activity out of the array voter.activity array.
        const spliceActIndex = business.usersVotedActivity[userIndex].activity.indexOf(options.activity);
        business.usersVotedActivity[userIndex].activity.splice(spliceActIndex, 1);
        // proceed to decrement activity from vote takeback.
        // DOWNVOTE
        business.activities[options.activity] > 0
          ? business.activities[options.activity]--
          : (business.activities[options.activity] = 0);

        // Proceed to check if the activity array is empty.
        // Splice out of the usersVotedActivity array if the activity array
        // is empty. No point in storing an object with an empty activity array.
        if (
          !business.usersVotedActivity[userIndex].activity ||
          business.usersVotedActivity[userIndex].activity.length === 0
        ) {
          // splice the object out of the usersVotedActivity field
          // if the activity array is empty. Then set boolean userSpliced to true
          business.usersVotedActivity.splice(userIndex, 1);
          userSpliced = true;
        }
      } else {
        // user is trying to vote for a different activity.
        // UPVOTE this activity that the user is wanting to vote
        business.usersVotedActivity[userIndex].activity.push(options.activity);
        business.activities[options.activity]++;
      }
    } else {
      // CASE 1
      // UPVOTE. Reassign voter.activity array into a temp storage
      // eslint-disable-next-line prefer-const
      let actArr = [];
      actArr.push(options.activity);
      business.usersVotedActivity.push({
        userId: options.userId,
        // activity is an array, assign actArr to it
        activity: actArr,
        objectReference: options.userId,
      });
      business.activities[options.activity]++;
    }
  } else {
    /**
     * Can a splice happen in here? No because all users in here
     * has 3 votes already. Thus, it is just a downvote or a no more
     * votes allowed
     * CASES
     * 1. User wants to downvote
     * 2. User attempts a 4th upvote (not allowed)
     */
    let userIndex;
    for (let i = 0; i < business.usersVotedActivity.length; ++i) {
      if (business.usersVotedActivity[i].userId.toString() === options.userId.toString()) {
        userIndex = i;
        break;
      }
    }
    // HOLY SHIT, were repeating ourselves
    if (voter.activity.indexOf(options.activity) !== -1) {
      // CASE 1
      // DOWNVOTE: voter desires to take back vote
      // splice the activity out of the array voter.activity array.
      const spliceActIndex = business.usersVotedActivity[userIndex].activity.indexOf(options.activity);
      business.usersVotedActivity[userIndex].activity.splice(spliceActIndex, 1);
      // proceed to decrement activity from vote takeback.
      // DOWNVOTE
      business.activities[options.activity] > 0
        ? business.activities[options.activity]--
        : (business.activities[options.activity] = 0);
    } else {
      // CASE 2
      let userIndex;
      for (let i = 0; i < business.usersVotedActivity.length; ++i) {
        if (business.usersVotedActivity[i].userId.toString() === options.userId.toString()) {
          userIndex = i;
          break;
        }
      }
      returnToRouter = {
        message: 'You can only vote 3 times',
        activity: business.usersVotedActivity[userIndex].activity,
        poll: business.activities,
      };
      // just cut the shit and return
      return returnToRouter;
    }
  }
  // Now that the business' usersVotedActivity and activity array have
  // been modified, shove it back to reflect in the database.
  const doc = await updateOne(businessId, {
    usersVotedActivity: business.usersVotedActivity,
    activities: business.activities,
  });

  /**
   * ================================================================================
   * Now think about what to return to the user.
   * Most likely, it will be the same as updateVoteAuras where the
   * activity array is returned along with the poll.
   * ================================================================================
   * CASES:
   * 1. empty usersVotedActivity (business has no votes/voters at all)
   * 2. user is not in the usersVotedActivity(user has not voted)
   * 3. user is in the usersVotedActivity(user has >= votes in particular business)
   */
  if (!doc.usersVotedActivity || doc.usersVotedActivity.length === 0) {
    // CASE 1
    returnToRouter = {
      activity: '[]',
      poll: doc.activities,
    };
  } else if (!userSpliced) {
    // CASE 3
    // find the index of the user
    let userIndex;
    for (let i = 0; i < doc.usersVotedActivity.length; ++i) {
      if (doc.usersVotedActivity[i].userId.toString() === options.userId.toString()) {
        userIndex = i;
        break;
      }
    }
    returnToRouter = {
      activity: doc.usersVotedActivity[userIndex].activity,
      poll: doc.activities,
    };
  } else {
    // CASE 2
    returnToRouter = {
      activity: '[]',
      poll: doc.activities,
    };
  }
  return returnToRouter;
};

/**
 *
 * @param {*} businessId -> The id of the business that will be updated
 * @param {*} options -> additional parameters in here, the userId
 * will be placed in here.
 * This function is called by a user controller whenever a user
 * 'likes' or 'favorites' a places.
 * Checking for repeating users liking the same business is not the job
 * of this controller. The user controller takes on that responsibility.
 */
const updateLike = async (businessId, options) => {
  // find the business by its ID
  // pick off the business 'likes' and 'usersLiked' fields
  // and edit accordingly.
  const business = await Business.find({ _id: businessId });
  // options.operation === 1 is add
  // options.operation === 0 is subtract
  if (options.operation === 1) {
    // user controller desired an add
    business[0].likes++;
    business[0].usersLiked.push({
      userId: options.userId,
      objectReference: options.userId,
    });
  } else {
    // user controller desired a subtract
    business[0].likes > 0 ? business[0].likes-- : (business[0].likes = 0);
    for (let i = 0; i < business[0].usersLiked.length; ++i) {
      if (options.userId.toString() === business[0].usersLiked[i].userId.toString()) {
        business[0].usersLiked.splice(i, 1);
        break;
      }
    }
  }
  // likes and usersLiked have now been modified accordingly
  // push changes back into the document
  const doc = await updateOne(businessId, {
    usersLiked: business[0].usersLiked,
    likes: business[0].likes,
  });
  return doc;
};

/**
 * Deletes a single business
 * @param {Object} options defines what to delete
 * @returns Response
 */
const deleteOne = async options => {
  const returnAwait = await Business.deleteOne(options);
  return returnAwait;
};

/**
 * Deletes many businesses with a batch request
 * @param {Object} options defines objects to delete
 * @returns query
 * Might as well call this NUKE
 */
const deleteMany = async options => {
  const returnAwait = await Business.deleteMany(options);
  return returnAwait;
};

/**
 * Deletes many businesses then addes many businesses with a batch request
 * @param {Object} businesses Aura Businesses
 * @param {Object} options Additional parameters (optional)
 * @returns Response
 */
const seed = async (businesses, options) => {
  const del = await Business.deleteMany({});
  const ins = await Business.insertMany(businesses, { ordered: false });
  return `${del} ... ${ins}`;
};

/**
 * Finds businesses by query
 * @param {Object} query Search object parameters
 * @param {Object} options Additional parameters (optional)
 * @returns Response
 */
const find = async (query, options) => {
  // something else takes care of destructuring the query from request
  const { aura, city, category, page, results } = query;
  const businesses = await Business.find()
    .where('attributes.aura')
    .regex(aura || '')
    .where('citySearch')
    .regex(city || '')
    .where('categorySearch')
    .regex(category || '')
    .sort({
      likes: -1,
    })
    .skip(parseInt(page) * parseInt(results));
  // .limit(parseInt(results));

  // activate these shits if all else fails
  // const cityFilter = await funnelZip(query.city, businesses);
  // const catFilter = await funnelAction(query.category, cityFilter);
  return {
    businesses: businesses.slice(0, results),
    hasMoreResults: businesses.length > results,
  };
};

const businessController = {
  createOne,
  createMany,
  readOne,
  readMany,
  readVotesAura,
  renameField,
  updateOne,
  updateMany,
  updateVotesAura,
  updateVotesActivity,
  updateLike,
  deleteOne,
  deleteMany,
  seed,
  find,
};
module.exports = businessController;
