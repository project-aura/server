const yelpToAuraTransformer = yelpData => ({
  id: yelpData.id,
  address: `${yelpData.location.address1}${
    yelpData.location.address2 ? ` ${yelpData.location.address2}` : ''
  }${yelpData.location.address3 ? ` ${yelpData.location.address3}` : ''}`,
  displayAddress: yelpData.location.display_address,
  city: yelpData.location.city,
  state: yelpData.location.state,
  postalCode: yelpData.location.zip_code,
  latitude: yelpData.coordinates.latitude,
  longitude: yelpData.coordinates.longitude,

  // TODO: Ask team about this change of nesting the location fields...
  stars: yelpData.rating,
  reviewCount: yelpData.review_count,
  novelty: 0,
  aura: '',
  attributes: {
    wifi: '',
    alcohol: '',
    bestNights: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    goodForKids: false,
    goodForDancing: false,
    goodForMeal: {
      breakfast: false,
      brunch: false,
      lunch: false,
      dinner: false,
      lateNight: false,
      dessert: false,
    },
    priceRange: yelpData.price,
    parking: {
      garage: false,
      street: false,
      lot: false,
      valet: false,
      validated: false,
    },
    noiseLevel: '',
    attire: '',
    hasTV: false,
    music: {
      jukebox: false,
      video: false,
      karoake: false,
      dj: false,
      live: false,
      backgroundMusic: false,
      noMusic: false,
    },
    smoking: '',
  },
  categories: yelpData.categories, // uses objects {alias: '', title: ''} in categories array
  hours: {
    monday: {
      start: yelpData.hours[0].open[0].start,
      end: yelpData.hours[0].open[0].end,
    },
    tuesday: {
      start: yelpData.hours[0].open[1].start,
      end: yelpData.hours[0].open[1].end,
    },
    wednesday: {
      start: yelpData.hours[0].open[2].start,
      end: yelpData.hours[0].open[2].end,
    },
    thursday: {
      start: yelpData.hours[0].open[3].start,
      end: yelpData.hours[0].open[3].end,
    },
    friday: {
      start: yelpData.hours[0].open[4].start,
      end: yelpData.hours[0].open[4].end,
    },
    saturday: {
      start: yelpData.hours[0].open[5].start,
      end: yelpData.hours[0].open[5].end,
    },
    sunday: {
      start: yelpData.hours[0].open[6].start,
      end: yelpData.hours[0].open[6].end,
    },
    openNow: false,
  },
});

module.exports = {
  yelpToAuraTransformer,
};
