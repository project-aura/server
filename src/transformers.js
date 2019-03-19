const transformer = {
  yelpToAura: yelpData => ({
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
    stars: yelpData.rating || 0,
    reviewCount: yelpData.review_count || 0,
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
      priceRange: yelpData.price || '',
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
  }),
};

module.exports = {
  transformer,
};
