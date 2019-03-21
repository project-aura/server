class AuraBusiness {
  constructor() {
    this.id = '';
    this.address = '';
    this.city = '';
    this.state = '';
    this.postalCode = '';
    this.latitude = '';
    this.longitude = '';

    this.url = '';
    this.stars = 0;
    this.reviewCount = 0;
    this.novelty = 0;
    this.businessImage = {
      src: '',
      owner: '',
    };
    this.attributes = {
      aura: '',
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
      priceRange: 0,
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
    };
    this.categories = [
      {
        alias: '',
        title: '',
      },
    ];
  }
}

module.exports = AuraBusiness;
