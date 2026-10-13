import parisImg from "@/assets/paris.jpg";
import baliImg from "@/assets/bali.jpg";
import tokyoImg from "@/assets/tokyo.jpg";
import swissAlpsImg from "@/assets/swiss-alps.jpg";
import goaImg from "@/assets/goa.jpg";
import rajasthanImg from "@/assets/rajasthan.jpg";
import keralaImg from "@/assets/kerala.jpg";
import santoriniImg from "@/assets/santorini.jpg";

export interface ItineraryDay {
  day: string;
  title: string;
  activities: string[];
}

export interface OtherInfo {
  title: string;
  info: string[];
}

export interface PackageData {
  packageName: string;
  packageRate: string;
  pickAndDrop: string;
  duration: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  overview: {
    route: string;
    description: string;
  };
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  otherInfo: OtherInfo[];
  image: string;
  tags: string[];
  pdf?: string;
}

export const packages: Record<string, PackageData> = {
  "paris-france": {
    packageName: "Paris Romantic Getaway",
    packageRate: "₹89,999/-",
    pickAndDrop: "Delhi - Delhi",
    duration: "6N - 7D",
    location: { city: "Paris", state: "Île-de-France", country: "France" },
    overview: {
      route: "Delhi - Paris - Versailles - Paris - Delhi",
      description: "Experience the magic of Paris with visits to the Eiffel Tower, Louvre Museum, and charming Montmartre. Perfect for couples seeking romance and culture in the City of Love."
    },
    itinerary: [
      {
        day: "1",
        title: "Delhi Departure | Arrival in Paris | Overnight at Paris",
        activities: [
          "Depart from Indira Gandhi International Airport in the evening.",
          "Arrive at Charles de Gaulle Airport by morning.",
          "Transfer to hotel & check-in. Rest and freshen up.",
          "Evening leisure walk around the Champs-Élysées.",
          "Overnight stay at Paris."
        ]
      },
      {
        day: "2",
        title: "Eiffel Tower | Seine River Cruise | Overnight at Paris",
        activities: [
          "Post breakfast, visit the iconic Eiffel Tower.",
          "Lunch at a local French bistro.",
          "Evening Seine River cruise with dinner.",
          "Overnight stay at Paris."
        ]
      },
      {
        day: "3",
        title: "Louvre Museum | Montmartre | Overnight at Paris",
        activities: [
          "Visit the world-famous Louvre Museum.",
          "Explore the artistic neighborhood of Montmartre.",
          "Visit Sacré-Cœur Basilica.",
          "Overnight stay at Paris."
        ]
      }
    ],
    inclusions: [
      "Accommodation on twin sharing basis",
      "All transfers and sightseeing by private vehicle",
      "Daily breakfast",
      "Round-trip international flights",
      "All applicable hotel taxes",
      "English-speaking guide"
    ],
    exclusions: [
      "Personal expenses such as tips, laundry, telephone calls, etc.",
      "Visa fees and travel insurance",
      "Lunch and dinner (unless specified)",
      "Any other item not mentioned in the inclusions"
    ],
    otherInfo: [
      {
        title: "Must Carry",
        info: ["Valid Passport & Visa", "Comfortable walking shoes", "Weather-appropriate clothing", "Travel insurance documents"]
      },
      {
        title: "Important Notes",
        info: ["Check-in time: 2:00 PM", "Check-out time: 11:00 AM", "Carry Euros for local expenses"]
      }
    ],
    image: parisImg,
    tags: ["#Honeymoon", "#Culture", "#Romance"],
    pdf: ""
  },
  "bali-indonesia": {
    packageName: "Bali Tropical Escape",
    packageRate: "₹65,999/-",
    pickAndDrop: "Delhi - Delhi",
    duration: "5N - 6D",
    location: { city: "Bali", state: "Bali", country: "Indonesia" },
    overview: {
      route: "Delhi - Bali - Ubud - Seminyak - Bali - Delhi",
      description: "Discover Bali's stunning beaches, ancient temples, and lush rice terraces. Perfect blend of adventure, relaxation, and spiritual experiences in the Island of Gods."
    },
    itinerary: [
      {
        day: "1",
        title: "Delhi Departure | Arrival in Bali | Overnight at Seminyak",
        activities: [
          "Depart from Delhi in the morning.",
          "Arrive at Ngurah Rai International Airport.",
          "Transfer to Seminyak beach resort.",
          "Evening at leisure - explore Seminyak beach.",
          "Overnight stay at Seminyak."
        ]
      },
      {
        day: "2",
        title: "Ubud Day Trip | Rice Terraces | Overnight at Ubud",
        activities: [
          "Post breakfast, depart for Ubud.",
          "Visit Tegallalang Rice Terraces.",
          "Explore Ubud Monkey Forest.",
          "Traditional Balinese spa treatment.",
          "Overnight stay at Ubud."
        ]
      }
    ],
    inclusions: [
      "Accommodation on twin sharing basis",
      "All transfers and sightseeing by private vehicle",
      "Daily breakfast",
      "Round-trip international flights",
      "One spa treatment included"
    ],
    exclusions: [
      "Personal expenses such as tips, laundry, telephone calls, etc.",
      "Visa on arrival fees",
      "Water sports activities",
      "Any other item not mentioned in the inclusions"
    ],
    otherInfo: [
      {
        title: "Must Carry",
        info: ["Valid Passport", "Sunscreen & sunglasses", "Light cotton clothing", "Swimwear"]
      }
    ],
    image: baliImg,
    tags: ["#Adventure", "#Beach", "#Spiritual"],
    pdf: ""
  },
  "tokyo-japan": {
    packageName: "Tokyo Cultural Discovery",
    packageRate: "₹1,25,999/-",
    pickAndDrop: "Delhi - Delhi",
    duration: "7N - 8D",
    location: { city: "Tokyo", state: "Tokyo", country: "Japan" },
    overview: {
      route: "Delhi - Tokyo - Hakone - Mt. Fuji - Tokyo - Delhi",
      description: "Immerse yourself in Tokyo's fascinating blend of cutting-edge technology and ancient traditions. From sushi markets to temples, experience the best of Japan."
    },
    itinerary: [
      {
        day: "1",
        title: "Delhi Departure | Arrival in Tokyo | Overnight at Tokyo",
        activities: [
          "Depart from Delhi in the morning.",
          "Arrive at Narita/Haneda International Airport.",
          "Transfer to hotel in Shinjuku area.",
          "Evening exploration of Shibuya Crossing.",
          "Overnight stay at Tokyo."
        ]
      },
      {
        day: "2",
        title: "Tsukiji Market | Tokyo Skytree | Overnight at Tokyo",
        activities: [
          "Early morning visit to Tsukiji Outer Market.",
          "Fresh sushi breakfast experience.",
          "Visit Tokyo Skytree for panoramic views.",
          "Explore Asakusa and Senso-ji Temple.",
          "Overnight stay at Tokyo."
        ]
      }
    ],
    inclusions: [
      "Accommodation on twin sharing basis",
      "All transfers by bullet train and private vehicle",
      "Daily breakfast",
      "Round-trip international flights",
      "7-day JR Pass included"
    ],
    exclusions: [
      "Personal expenses such as tips, laundry, telephone calls, etc.",
      "Visa fees",
      "Lunch and dinner",
      "Any other item not mentioned in the inclusions"
    ],
    otherInfo: [
      {
        title: "Must Carry",
        info: ["Valid Passport & Visa", "Comfortable walking shoes", "Pocket WiFi recommended", "Cash in Japanese Yen"]
      }
    ],
    image: tokyoImg,
    tags: ["#Culture", "#Technology", "#Food"],
    pdf: ""
  },
  "swiss-alps": {
    packageName: "Swiss Alps Adventure",
    packageRate: "₹1,45,999/-",
    pickAndDrop: "Delhi - Delhi",
    duration: "8N - 9D",
    location: { city: "Interlaken", state: "Bern", country: "Switzerland" },
    overview: {
      route: "Delhi - Zurich - Interlaken - Jungfrau - Lucerne - Zurich - Delhi",
      description: "Experience the breathtaking Swiss Alps with scenic train rides, mountain adventures, and pristine alpine lakes. A dream destination for nature and adventure lovers."
    },
    itinerary: [
      {
        day: "1",
        title: "Delhi Departure | Arrival in Zurich | Overnight at Zurich",
        activities: [
          "Depart from Delhi in the evening.",
          "Arrive at Zurich Airport.",
          "Transfer to hotel & check-in.",
          "Evening walk around Zurich Old Town.",
          "Overnight stay at Zurich."
        ]
      },
      {
        day: "2",
        title: "Zurich to Interlaken | Lake Thun | Overnight at Interlaken",
        activities: [
          "Post breakfast, scenic train to Interlaken.",
          "Check-in at mountain view hotel.",
          "Cruise on Lake Thun.",
          "Evening at leisure in Interlaken.",
          "Overnight stay at Interlaken."
        ]
      }
    ],
    inclusions: [
      "Accommodation on twin sharing basis",
      "All transfers by Swiss trains",
      "Daily breakfast",
      "Round-trip international flights",
      "Swiss Travel Pass (8 days)"
    ],
    exclusions: [
      "Personal expenses such as tips, laundry, telephone calls, etc.",
      "Visa fees and travel insurance",
      "Adventure activities (paragliding, skiing)",
      "Any other item not mentioned in the inclusions"
    ],
    otherInfo: [
      {
        title: "Must Carry",
        info: ["Valid Passport & Schengen Visa", "Warm winter clothing", "Sunglasses & sunscreen", "Comfortable hiking shoes"]
      }
    ],
    image: swissAlpsImg,
    tags: ["#Adventure", "#Snow", "#Nature"],
    pdf: ""
  },
  "goa-india": {
    packageName: "Goa Beach Bliss",
    packageRate: "₹25,999/-",
    pickAndDrop: "Goa - Goa",
    duration: "4N - 5D",
    location: { city: "Goa", state: "Goa", country: "India" },
    overview: {
      route: "Goa Airport - North Goa - South Goa - Old Goa - Goa Airport",
      description: "Relax on Goa's beautiful beaches, explore Portuguese heritage, and enjoy vibrant nightlife in India's favorite beach destination."
    },
    itinerary: [
      {
        day: "1",
        title: "Goa Arrival | Calangute Beach | Overnight at North Goa",
        activities: [
          "Arrive at Dabolim Airport.",
          "Transfer to beach resort in North Goa.",
          "Check-in and freshen up.",
          "Evening visit to Calangute Beach.",
          "Dinner at beach shack.",
          "Overnight stay at North Goa."
        ]
      },
      {
        day: "2",
        title: "North Goa Beaches | Water Sports | Overnight at North Goa",
        activities: [
          "Post breakfast, visit Baga and Anjuna beaches.",
          "Water sports activities (parasailing, jet ski).",
          "Visit Aguada Fort.",
          "Evening at Tito's Lane.",
          "Overnight stay at North Goa."
        ]
      }
    ],
    inclusions: [
      "Accommodation on twin sharing basis",
      "All transfers and sightseeing by AC vehicle",
      "Daily breakfast",
      "One water sports activity",
      "All applicable hotel taxes"
    ],
    exclusions: [
      "Airfare to and from Goa",
      "Personal expenses such as tips, laundry, telephone calls, etc.",
      "Additional water sports",
      "Any other item not mentioned in the inclusions"
    ],
    otherInfo: [
      {
        title: "Must Carry",
        info: ["Authentic Government ID Card", "Sunscreen & sunglasses", "Light cotton clothing", "Swimwear"]
      }
    ],
    image: goaImg,
    tags: ["#Beach", "#Party", "#FamilyFriendly"],
    pdf: ""
  },
  "rajasthan-india": {
    packageName: "Royal Rajasthan Tour",
    packageRate: "₹35,999/-",
    pickAndDrop: "Jaipur - Jaipur",
    duration: "6N - 7D",
    location: { city: "Jaipur", state: "Rajasthan", country: "India" },
    overview: {
      route: "Jaipur - Jodhpur - Jaisalmer - Udaipur - Jaipur",
      description: "Journey through the land of maharajas with majestic palaces, desert safaris, and rich cultural heritage. Experience the royal legacy of Rajasthan."
    },
    itinerary: [
      {
        day: "1",
        title: "Jaipur Arrival | City Palace | Overnight at Jaipur",
        activities: [
          "Arrive at Jaipur Airport/Railway Station.",
          "Transfer to heritage hotel.",
          "Visit City Palace and Jantar Mantar.",
          "Evening shopping at Johari Bazaar.",
          "Overnight stay at Jaipur."
        ]
      },
      {
        day: "2",
        title: "Amber Fort | Hawa Mahal | Overnight at Jaipur",
        activities: [
          "Post breakfast, visit Amber Fort (elephant ride optional).",
          "Photo stop at Hawa Mahal.",
          "Visit Albert Hall Museum.",
          "Traditional Rajasthani dinner with folk dance.",
          "Overnight stay at Jaipur."
        ]
      }
    ],
    inclusions: [
      "Accommodation on twin sharing basis in heritage hotels",
      "All transfers and sightseeing by AC vehicle",
      "Daily breakfast and dinner",
      "Desert safari in Jaisalmer",
      "All monument entry fees"
    ],
    exclusions: [
      "Airfare / Train fare",
      "Personal expenses such as tips, laundry, telephone calls, etc.",
      "Elephant ride at Amber Fort",
      "Any other item not mentioned in the inclusions"
    ],
    otherInfo: [
      {
        title: "Must Carry",
        info: ["Authentic Government ID Card", "Comfortable walking shoes", "Sunscreen & hat", "Camera for photography"]
      }
    ],
    image: rajasthanImg,
    tags: ["#Culture", "#Heritage", "#Desert"],
    pdf: ""
  },
  "kerala-india": {
    packageName: "Kerala Backwater Retreat",
    packageRate: "₹45,999/-",
    pickAndDrop: "Cochin - Cochin",
    duration: "5N - 6D",
    location: { city: "Kochi", state: "Kerala", country: "India" },
    overview: {
      route: "Cochin - Munnar - Thekkady - Alleppey - Cochin",
      description: "Experience Kerala's serene backwaters, lush hill stations, and traditional Ayurvedic treatments in nature's paradise - God's Own Country."
    },
    itinerary: [
      {
        day: "1",
        title: "Cochin Arrival | Fort Kochi Tour | Overnight at Cochin",
        activities: [
          "Arrive at Cochin International Airport.",
          "Visit Fort Kochi and Chinese Fishing Nets.",
          "Explore St. Francis Church and Jewish Synagogue.",
          "Evening Kathakali dance performance.",
          "Overnight stay at Cochin."
        ]
      },
      {
        day: "2",
        title: "Cochin to Munnar | Tea Plantations | Overnight at Munnar",
        activities: [
          "Post breakfast, drive to Munnar (4 hours).",
          "En route visit Cheeyappara Waterfalls.",
          "Check-in at hill resort.",
          "Visit Tea Museum and tea plantations.",
          "Overnight stay at Munnar."
        ]
      }
    ],
    inclusions: [
      "Accommodation on twin sharing basis",
      "All transfers by AC vehicle",
      "Daily breakfast",
      "Houseboat stay with all meals",
      "One Ayurvedic massage"
    ],
    exclusions: [
      "Airfare to and from Cochin",
      "Personal expenses such as tips, laundry, telephone calls, etc.",
      "Periyar boat safari",
      "Any other item not mentioned in the inclusions"
    ],
    otherInfo: [
      {
        title: "Must Carry",
        info: ["Authentic Government ID Card", "Light cotton clothing", "Mosquito repellent", "Rain gear (monsoon season)"]
      }
    ],
    image: keralaImg,
    tags: ["#Nature", "#Backwaters", "#Ayurveda"],
    pdf: ""
  },
  "santorini-greece": {
    packageName: "Santorini Sunset Dream",
    packageRate: "₹1,15,999/-",
    pickAndDrop: "Delhi - Delhi",
    duration: "5N - 6D",
    location: { city: "Santorini", state: "South Aegean", country: "Greece" },
    overview: {
      route: "Delhi - Athens - Santorini - Oia - Fira - Athens - Delhi",
      description: "Witness the world's most beautiful sunsets in Santorini with white-washed villages, blue domes, and crystal-clear Aegean waters."
    },
    itinerary: [
      {
        day: "1",
        title: "Delhi Departure | Athens Transit | Overnight at Santorini",
        activities: [
          "Depart from Delhi in the morning.",
          "Transit through Athens International Airport.",
          "Domestic flight to Santorini.",
          "Transfer to cave hotel in Oia.",
          "Evening sunset viewing at Oia Castle.",
          "Overnight stay at Santorini."
        ]
      },
      {
        day: "2",
        title: "Oia Exploration | Wine Tasting | Overnight at Santorini",
        activities: [
          "Post breakfast, explore Oia village.",
          "Visit blue dome churches for photography.",
          "Wine tasting tour at local vineyards.",
          "Sunset dinner at cliffside restaurant.",
          "Overnight stay at Santorini."
        ]
      }
    ],
    inclusions: [
      "Accommodation on twin sharing basis in cave hotel",
      "All transfers by private vehicle",
      "Daily breakfast",
      "Round-trip international flights",
      "Sunset catamaran cruise"
    ],
    exclusions: [
      "Personal expenses such as tips, laundry, telephone calls, etc.",
      "Schengen Visa fees",
      "Lunch and dinner (unless specified)",
      "Any other item not mentioned in the inclusions"
    ],
    otherInfo: [
      {
        title: "Must Carry",
        info: ["Valid Passport & Schengen Visa", "Sunscreen & sunglasses", "Comfortable walking shoes", "Swimwear"]
      }
    ],
    image: santoriniImg,
    tags: ["#Honeymoon", "#Sunset", "#Islands"],
    pdf: ""
  }
};

export const getPackageSlug = (packageName: string): string => {
  return packageName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
};
