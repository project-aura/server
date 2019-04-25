const businessTransformer = {
  yelpToAura: (auraData, yelpData) => {
    auraData.yelpId = yelpData.id;
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
    auraData.categories = yelpData.categories;
    auraData.businessImage.src = yelpData.image_url || '';
    return auraData;
  },
  imagesToAura: (auraData, imageData) => {
    if (!imageData) return auraData;
    auraData.businessImage.src = imageData.imageUrl || '';
    auraData.businessImage.owner = imageData.imageOwner || '';
    return auraData;
  },
};

module.exports = {
  businessTransformer,
};
