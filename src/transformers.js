const businessTransformer = {
  yelpToAura: (auraData, yelpData) => {
    auraData.id = yelpData.id;
    auraData.name = yelpData.name;
    auraData.alias = yelpData.alias;
    auraData.address = `${yelpData.location.address1}${
      yelpData.location.address2 ? ` ${yelpData.location.address2}` : ''
    }${yelpData.location.address3 ? ` ${yelpData.location.address3}` : ''}`;
    auraData.displayAddress = yelpData.location.display_address;
    auraData.city = yelpData.location.city;
    auraData.state = yelpData.location.state;
    auraData.postalCode = yelpData.location.zip_code;
    auraData.latitude = yelpData.coordinates.latitude;
    auraData.longitude = yelpData.coordinates.longitude;
    auraData.url = yelpData.url;
    auraData.stars = yelpData.rating || 0;
    auraData.reviewCount = yelpData.review_count || 0;
    auraData.attributes.priceRange = yelpData.price;
    auraData.categories = yelpData.categories; // uses objects {alias: '', title: ''} in categories array
    return auraData;
  },
  imagesToAura: (auraData, imageData) => {
    auraData.businessImage.src = imageData.imageUrl;
    auraData.businessImage.owner = imageData.imageOwner;
    return auraData;
  },
  sampleToAura: (auraData, sampleData) => {
    auraData.name = sampleData.name;
    auraData.address = sampleData.address;
    auraData.city = sampleData.city;
    auraData.state = sampleData.state;
    auraData.postalCode = sampleData.postal_code;
    auraData.attributes.aura = sampleData.attributes.Aura;
    auraData.businessImage.src = sampleData.img;
    auraData.categories = sampleData.categories; // uses objects {alias: '', title: ''} in categories array
    return auraData;
  },
};

module.exports = {
  businessTransformer,
};
