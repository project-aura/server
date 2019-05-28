/**
 * Business Controller -> 1 to 1 relationship with Business Model
 * Cuz were bored like that
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const CustomError = require('../helpers/CustomError');
const Business = require('../models/business.model');

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
  const business = await Business.find({ _id: businessId });
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
  if(!business.usersVotedAura || business.usersVotedAura.length === 0) {
    // CASE 1
    returnToRouter = '[]'
  } else {
    // attempt to find the user from user ID
    let userIndex;
  }
}

/**
 * 
 * @param {Object} options defines field to be renamed with new field
 * complains about rename being empty is the field to be renamed does 
 * not exist in the schema.
 */
const renameField = async(options) => {
  const docs = await Business.updateMany({}, { $rename: options }, { new: true });
  return docs;
}

/**
 * Updates a single business
 * @param {Object} business Aura Business
 * @param {Object} options Additional parameters
 * @returns Response
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
const updateMany = async (options) => {
  const docs = await Business.updateMany({}, { $set: options }, { new: true });
  return docs;
};

/**
 * 
 * @param {*} businessId -> ID of business
 * @param {*} options -> additional params, userId is derived here.
 * This function is called whenever user upvotes/downvotes an aura
 * on the business. It calls the updateOne() method to update the 
 * document whenever it is done
 */
const updateVotesAura = async (businessId, options) => {
  let userSpliced = false;
  const business = await Business.find({ _id: businessId });
  // find if the userId already exists in the business' 
  // array of userId.]s
  let voter;
  for(let i = 0; i < business[0].usersVotedAura.length; ++i) {
    if(business[0].usersVotedAura[i].userId.toString() === options.userId.toString()) {
      voter = business[0].usersVotedAura[i];
      break;
    }
  }
  // if no user was found, record the user's/voter's vote
  if(!voter) {
    // UPVOTE
    // Reassign voter.aura array into a temp storage
    // auraArr is the temp storage.
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
    for(let i = 0; i < business[0].usersVotedAura.length; ++i) {
      if(business[0].usersVotedAura[i].userId.toString() === options.userId.toString()) {
        userIndex = i;
        break;
      }
    }
    if(voter.aura.indexOf(options.aura) !== -1) {
      // find userIndex to make offsets and indices easier
      // DOWNVOTE: voter desires to take back vote
      // splice the aura out of the voter.aura array
      const spliceAuraIndex = business[0].usersVotedAura[userIndex].aura.indexOf(options.aura);
      business[0].usersVotedAura[userIndex].aura.splice(spliceAuraIndex, 1);
      // proceed to decrement aura from vote takeback.
      // DOWNVOTE 
      business[0].auras[options.aura] > 0 ? 
        business[0].auras[options.aura]--
        : business[0].auras[options.aura] = 0;

      // Proceed to check if the aura array is empty.
      // Take out of usersVotedAura array if the aura array 
      // is empty. There is no point of storing an object with 
      // and empty aura array in the usersVotedAuraArray.
      if(!business[0].usersVotedAura[userIndex].aura || 
          business[0].usersVotedAura[userIndex].aura.length === 0) {
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
  // now that the business' usersVotedAura and auras have been modified,
  // shove it back to reflect in the database.
  const doc = await updateOne(businessId, { 
    usersVotedAura: business[0].usersVotedAura,
    auras: business[0].auras
  });
  /**
   * =============================================================================
   * Cool, now thats done. Time to send an object back as a response 
   * back to the client. What are we going to send back?
   * We can send a humongous clusterfuck of the business object
   * and let the front end figure out what to do with that shit ton of 
   * text. But lets be nice to our client colleagues, and send them
   * just the array of auras voted by the user for that particular business.
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
  if(!doc.usersVotedAura || doc.usersVotedAura.length === 0) {
    // CASE 1
    returnToRouter = '[]';
  } else {
    if(!userSpliced) {
      // CASE 3
      // find the index of the user 
      let userIndex;
      for(let i = 0; i < doc.usersVotedAura.length; ++i) {
        if(doc.usersVotedAura[i].userId.toString() === options.userId.toString()) {
          userIndex = i;
          break;
        }
      }
      returnToRouter = doc.usersVotedAura[userIndex].aura;
    } else {
    // CASE 2
    returnToRouter = '[]';
    }
  }
  return returnToRouter;
}

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
  if(options.operation === 1) {
    // user controller desired an add
    business[0].likes++;
    business[0].usersLiked.push({ 
      userId: options.userId,
      objectReference: options.userId,
     });
  } else {
    // user controller desired a subtract
    business[0].likes > 0 ?
      business[0].likes--
        : business[0].likes = 0;
    for(let i = 0; i < business[0].usersLiked.length; ++i) {
      if(options.userId.toString() === business[0].usersLiked[i].userId.toString()) {
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
}

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
  const businesses = await Business.find()
    .where('attributes.aura')
    .regex(query.aura || '')
    .where('citySearch')
    .regex(query.city || '')
    .where('categorySearch')
    .regex(query.category || '');
  // activate these shits if all else fails
  // const cityFilter = await funnelZip(query.city, businesses);
  // const catFilter = await funnelAction(query.category, cityFilter);
  return businesses;
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
  updateLike,
  deleteOne,
  deleteMany,
  seed,
  find
};
module.exports = businessController;
