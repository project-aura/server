const businessLA = [
  {
    name: 'Tocaya Organica',
    address: '12150 Millennium, #101',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90094',
    attributes: {
      Ambience: "{'exotic': True, 'touristy': True}",
    },
    img:
      'https://cdn.vox-cdn.com/thumbor/i-k0g-R7OIflrCFEEuj9oPZkcOE=/0x0:4800x3300/1200x800/filters:focal(2016x1266:2784x2034)/cdn.vox-cdn.com/uploads/chorus_image/image/58929673/Overview.0.jpg',
    categories: 'Eating, Mexican, Restaurants, Organic',
  },
  {
    name: 'Raffaello Ristorante',
    address: '400 S Pacific Ave',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90731',
    attributes: {
      Ambience: "{'romantic': True, 'exotic': False, 'touristy': False, 'hipster': False}",
    },
    img: 'https://s3-media4.fl.yelpcdn.com/bphoto/Z8pYS63MoKt3lpux-XV-_w/o.jpg',
    categories: 'Eating, Italian, Restaurants, Vegetarian-Friendly',
  },
  {
    name: 'Sushi Gen',
    address: '422 E 2nd St, Central Ave.',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90012',
    attributes: {
      Ambience: "{'romantic': False, 'exotic': True, 'touristy': False, 'hipster': False, 'peaceful': True}",
    },
    img:
      'https://otg.imgix.net/assets/grid/los-angeles/little-tokyo/sushi-gen/IMG_3858.jpg?auto=format%2Ccompress&crop=focalpoint&fit=min&fm=jpg&fp-x=0.5&fp-y=0.5&ixlib=php-1.1.0&q=80&w=1200&s=76b3cd369e29963fee8df6e5206d1ee7',
    categories: 'Eating, Japanese, Asian, Sushi, Restaurants',
  },
  {
    name: 'Madeo',
    address: '8897 Beverly Blvd',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90048',
    attributes: {
      Ambience: "{'romantic': True, 'upscale': True, 'exotic': False, 'touristy': False, 'hipster': False}",
    },
    img:
      'https://cdn.vox-cdn.com/thumbor/JwfflVMxdLEIoXrMdsvOCRc-Mog=/0x0:2599x1354/1200x800/filters:focal(1093x470:1507x884)/cdn.vox-cdn.com/uploads/chorus_image/image/58942599/madeo_restaurant_google.0.png',
    categories: 'Eating, Dating, Italian, Restaurants, Vegetarian-Friendly, Vegan-Options, Upscale',
  },
  {
    name: 'Melody Bar and Grill',
    address: '9132 S Sepulveda Blvd',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90045',
    attributes: {
      Ambience: "{'romantic': False, exotic': False, 'touristy': False, 'lively': True, 'groovy': True}",
    },
    img: 'https://s3-media4.fl.yelpcdn.com/bphoto/Kxhb6z2Zxf-VDamHyXhj0A/o.jpg',
    categories: 'Drinking, Dating, Coffee, Bar, Pub, Cafe',
  },
  {
    name: 'Aroma Cafe',
    address: '4360 Tujunga Ave',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '91604',
    attributes: {
      Ambience: "{'lively': True, 'romantic': True, 'hipster': True}",
    },
    img: 'https://s3-media2.fl.yelpcdn.com/bphoto/P79kCPWjBTpgd_vgw_VpyA/o.jpg',
    categories: 'Dating, Coffee, Tea, Bar, Pub, Cafe',
  },
  {
    name: 'Cafe Gratitude',
    address: '639 N Larchmont Blvd',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90004',
    attributes: {
      Ambience: "{'lively': True, 'romantic': True, 'imaginative': True}",
    },
    img:
      'https://cdn.vox-cdn.com/thumbor/jET-16qat4gkFm9yjyIv_fjOD2U=/51x0:845x596/1200x800/filters:focal(51x0:845x596)/cdn.vox-cdn.com/uploads/chorus_image/image/49434451/cafe-gratitude-arts-district.0.0.png',
    categories: 'Dating, Coffee, Tea, Bar, Pub, Cafe, Vegetarian-Friendly, Vegan-Options',
  },
  {
    name: 'Javista Organic Coffee Bar',
    address: '6707 W Sunset Blvd',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90028',
    attributes: {
      Ambience: "{'lively': False, 'romantic': True, 'hipster': True, 'imaginative': True}",
    },
    img: 'https://s3-media1.fl.yelpcdn.com/bphoto/dbZ2-LzBc-VVTgM7J7djCQ/o.jpg',
    categories: 'Studying, Dating, Coffee, Tea, Organic, Bar, Pub, Cafe, Vegetarian-Friendly, Vegan-Options',
  },
  {
    name: 'Blu Jam Cafe',
    address: '15045 Ventura Blvd',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '91403',
    attributes: {
      Ambience: "{'groovy': True, 'romantic': False, 'hipster': False}",
    },
    img:
      'https://cdn.vox-cdn.com/thumbor/30-F1nuWN0Vmd1O8zJOwraVkwMQ=/0x0:2000x1331/1200x800/filters:focal(840x506:1160x826)/cdn.vox-cdn.com/uploads/chorus_image/image/56861945/2015-10-23-maru-005.0.0.jpg',
    categories: 'Drinking, Coffee, Tea, Bar, Pub, Cafe, Vegetarian-Friendly, Vegan-Options',
  },
  {
    name: 'Cafe Intelligentsia',
    address: '1331 Abbot Kinney Blvd',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90291',
    attributes: {
      Ambience: "{'imaginative': True, 'romantic': True, 'hipster': False}",
    },
    img: 'https://www.intelligentsiacoffee.com/media/wysiwyg/cms/locations/Venice/Venice-ADDRESS-BLOCK.jpg',
    categories: 'Relaxing, Studying, Coffee, Tea, Bar, Pub, Cafe, Breakfast',
  },
  {
    name: 'Angel City Brewery',
    address: '216 S Alameda St',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90012',
    attributes: {
      Ambience: "{'lively': True, 'silly': True}",
    },
    img: 'https://floridabeerblog.files.wordpress.com/2016/09/wp-1474495706370.jpg',
    categories: 'Drinking, Nightlife, Food & Drink, Pub, Bar, Club',
  },
  {
    name: 'No Vacancy',
    address: '1727 N Hudson Ave',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90028',
    attributes: {
      Ambience: "{'lively': True, 'groovy': True}",
    },
    img: 'https://assets3.thrillist.com/v1/image/1616705/size/tmg-slideshow_l.jpg',
    categories: 'Drinking, Nightlife, Food & Drink, Pub, Bar, Club',
  },
  {
    name: "Mondrian's Skybar",
    address: '8440 W Sunset Blvd',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90069',
    attributes: {
      Ambience: "{'lively': True, 'groovy': True}",
    },
    img: 'https://www.therooftopguide.com/rooftop-bars-in-los-angeles/Bilder/SkybarattheMandarinHotel_4_slide.jpg',
    categories: 'Drinking, Nightlife, Food & Drink, Pub, Bar, Club',
  },
  {
    name: 'The Federal',
    address: '5303 Lankershim Blvd',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '91601',
    attributes: {
      Ambience: "{'peaceful': True, 'hipster': True}",
    },
    img: 'http://nh.thefederalbar.com/wp-content/gallery/federal/MG_2043-edited-72.jpg',
    categories: 'Drinking, Nightlife, Food & Drink, Pub, Bar, Club',
  },
  {
    name: 'Seven Bar Lounge',
    address: '555 W 7th St',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90014',
    attributes: {
      Ambience: "{'romantic': True 'peaceful': True, 'silly': False}",
    },
    img: 'https://res.cloudinary.com/ddr1rxq1v/image/upload/q_auto:low/v1490565034/x0j0t6yboexiokgn9nh1.jpg',
    categories: 'Drinking, Nightlife, Food & Drink, Pub, Bar, Upscale, Club',
  },
  {
    name: "Boardner's",
    address: '1652 N Cherokee Ave',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90028',
    attributes: {
      Ambience: "{'lively': True, 'groovy': True, 'exotic': True}",
    },
    img:
      'https://7e512d47533b372e0cf7-0fcb01ade5e30f5e05136adbd496363c.ssl.cf1.rackcdn.com/334/boardners_3_650x300.jpg',
    categories: 'Drinking, Nightlife, Food & Drink, Pub, Bar, Club, Shows',
  },
  {
    name: 'Black Rabbit Hose',
    address: '1719 N Hudson Ave',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90028',
    attributes: {
      Ambience: "{'romantic': True, 'silly': False}",
    },
    img: 'https://media.timeout.com/images/103813861/630/472/image.jpg',
    categories: 'Drinking, Nightlife, Food & Drink, Pub, Bar, Club, Shows',
  },
  {
    name: 'The Rooftop at the Standard  Downtown LA',
    address: '550 S Flower St',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90071',
    attributes: {
      Ambience: "{'romantic': True, 'groovy': True}",
    },
    img: 'https://images.trvl-media.com/hotels/1000000/890000/887000/886918/f0662efd_z.jpg',
    categories: 'Drinking, Nightlife, Food & Drink, Pub, Bar, Music',
  },
  {
    name: 'Howl at the Moon',
    address: '100 Universal City Plaza',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '91608',
    attributes: {
      Ambience: "{'lively': True, 'silly': True, 'groovy': True}",
    },
    img:
      'https://cdn.wedding-spot.com/images/venues/9680/Howl-at-the-Moon-Hollywood-Wedding-Los-Angeles-CA-3_main.1482484227.jpg',
    categories: 'Drinking, Nightlife, Food & Drink, Pub, Bar, Music',
  },
  {
    name: "4Play The Gentleman's Club",
    address: '2238 Cortner Ave',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90064',
    attributes: {
      Ambience: "{'lively': True, 'touristy': True, 'romantic': True}",
    },
    categories: 'Drinking, Nightlife, Nightclub, Upscale, Adult Entertainment, Strip Club',
  },
  {
    name: "Spearmint Rhino Gentlemen's Club Los Angeles",
    address: '2020 E Olympic Blvd',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90021',
    attributes: {
      Ambience: "{'lively': True, 'touristy': True, 'romantic': True}",
    },
    categories: 'Drinking, Nightlife, Nightclub, Adult Entertainment, Strip Club',
  },
  {
    name: "Synn Gentlemen's Club",
    address: '365 N La Cienega Blvd',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90048',
    attributes: {
      Ambience: "{'lively': True, 'exotic': True}",
    },
    categories: 'Drinking, Nightlife, Nightclub, Adult Entertainment, Strip Club',
  },
  {
    name: 'The Playpen',
    address: '1109 S Santa Fe Ave',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90021',
    attributes: {
      Ambience: "{'lively': True, 'exotic': True}",
    },
    categories: 'Drinking, Nightlife, Nightclub, Adult Entertainment, Strip Club',
  },
  {
    name: 'Blue Whale',
    address: '123 Astronaut E S Onizuka St Ste 301',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90012',
    attributes: {
      Ambience: "{'romantic': True, 'groovy': True}",
    },
    img:
      'https://static1.squarespace.com/static/56fa25d28259b56d9b432b84/57004d7e01dbae8fc9b4f0c9/57008bb407eaa0a58ec47065/1459653564254/DSC_4982_1980.jpg?format=750w',
    categories: 'Drinking, Nightlife, Concerts, Shows',
  },
  {
    name: 'Izakaya & Bar Fu-ga',
    address: '111 S San Pedro St',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90012',
    attributes: {
      Ambience: "{'peaceful': True, 'exotic': True}",
    },
    img: 'http://urbandiningguide.com/wp-content/uploads/2014/05/izakayafugalosangeles.jpg',
    categories: 'Drinking, Relaxing, Nightlife, Restaurants, Food & Drink, Bar, Club, Japanese, Asian',
  },
  {
    name: "The Cow's End Cafe",
    address: '34 Washington Blvd',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90292',
    attributes: {
      Ambience: "{'romantic': True, 'peaceful': True}",
    },
    img: 'https://cdn.workfrom.co/files/usermedia/36734-Du4osHUSmSEoPjllWiug-los-angeles-cows-end-3.jpg',
    categories: 'Studying, Dating, Relaxing, Coffee, Tea, Cafe, Deli, Food & Drink',
  },
  {
    name: "Menotti's Coffee Shop",
    address: '56 Windward Ave',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90291',
    attributes: {
      Ambience: "{'groovy': True, 'hipster': True}",
    },
    img:
      'https://cdn.vox-cdn.com/thumbor/uPZTk5wPj_mXnsgDFV8WHu5eifg=/0x0:753x526/1200x800/filters:focal(317x203:437x323)/cdn.vox-cdn.com/uploads/chorus_image/image/62656516/menotti_s.0.0.jpg',
    categories: 'Relaxing, Coffee, Tea, Cafe, Food & Drink',
  },
  {
    name: 'Rise N Grind',
    address: '6501 Hollywood Blvd',
    city: 'Los Angeles',
    state: 'CA',
    postal_code: '90028',
    attributes: {
      Ambience: "{'imaginative': True, 'peaceful': True}",
    },
    img:
      'http://res.cloudinary.com/spothopper/image/fetch/f_auto,q_80,c_fit,h_864/http://static.spotapps.co/spots/53/4a7a40f7e911e7906349d5a639d4f5/:original',
    categories: 'Studying, Relaxing, Coffee, Tea, Cafe, Food & Drink, Vegetarian-Friendly, Vegan-Options',
  },
];

module.exports = businessLA;
