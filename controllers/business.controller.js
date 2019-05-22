/**
 * Business Controller -> 1 to 1 relationship with Business Model
 * Cuz were bored like that
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const CustomError = require('../helpers/CustomError');
const Business = require('../models/business.model');
const funnelAction = require('../helpers/funnel');
const funnelZip = require('../helpers/funnelZip');

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
    business[0].usersVotedAura.push({ 
      userId: options.userId, 
      aura: options.aura,
      objectReference: options.userId,
     });
    business[0].auras[options.aura]++;
  } else {
    // execute if voter's ID has been found 
    if(voter.aura === options.aura) {
      // voter desires to take back vote
      // splice the object out of the usersVotedAura field
      for (let i = 0; i < business[0].usersVotedAura.length; ++i) {
        if(business[0].usersVotedAura[i].userId.toString() === options.userId.toString()) {
          business[0].usersVotedAura.splice(i, 1);
          break;
        }
      }
      // proceed to decrement aura from vote takeback.
      // DOWNVOTE 
      business[0].auras[options.aura] > 0 ? 
        business[0].auras[options.aura]--
        : business[0].auras[options.aura] = 0;
    } else {
      // the user is trying to vote for a different aura. 
      // NOT ALLOWED FOR NOW
      return 'message: User has already voted for this business';
    }
  }
  // now that the business' usersVotedAura and auras have been modified,
  // shove it back to reflect in the database.
  const doc = await updateOne(businessId, { 
    usersVotedAura: business[0].usersVotedAura,
    auras: business[0].auras
  });
  return doc;
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
    .regex(query.city)
    .where('categorySearch')
    .regex(query.category);
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
