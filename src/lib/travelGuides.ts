export interface GuideSection {
  title: string;
  paragraphs: string[];
  checklist?: string[];
}

export interface TravelGuideData {
  slug: string;
  title: string;
  description: string;
  category: string;
  readMinutes: number;
  relatedPackages: string[];
  sections: GuideSection[];
}

export const travelGuides: TravelGuideData[] = [
  {
    slug: "goa-trip-planning-checklist",
    title: "Plan a Goa trip around your pace, stay and budget",
    description: "A practical checklist for choosing your base, planning beach days and comparing what a Goa holiday quote actually includes.",
    category: "Goa planning",
    readMinutes: 5,
    relatedPackages: ["goa-india"],
    sections: [
      {
        title: "Start with the kind of holiday you want",
        paragraphs: [
          "Before choosing a hotel, write down the three things that would make the trip worthwhile. A family wanting easy meals and a relaxed beach routine needs a different plan from friends wanting late evenings and several activities. Give your travel adviser those priorities alongside your dates and budget.",
          "Decide how much moving around feels comfortable. Staying in one base can simplify a short break; changing bases can suit a longer trip when the places you want to explore are spread out. Treat each hotel change as time spent packing, checking out and travelling rather than as another sightseeing day."
        ]
      },
      {
        title: "Choose a hotel by location as well as photographs",
        paragraphs: [
          "A room photograph tells you very little about the journey to the beach, the surroundings or the noise you might hear at night. Ask for the exact property name, its map location, the room category and whether beach access means a walk, a drive or a private entrance. Compare recent guest feedback for the factors you care about.",
          "For children, older travellers or anyone with limited mobility, ask about stairs, lifts, walking surfaces and the distance between the room and common areas. Request confirmation of any essential accessibility requirement before paying."
        ],
        checklist: [
          "Exact hotel and room category, including occupancy",
          "Meal plan and any extra charge for children",
          "Check-in and check-out arrangements for your arrival times",
          "Transfer meeting point and airport name on the quotation"
        ]
      },
      {
        title: "Give each day one main plan",
        paragraphs: [
          "Leave the arrival day flexible. A delayed journey, a wait for a room or a long transfer can turn a tightly packed first day into a rush. On later days, group nearby stops and leave room for meals, rest and the activity you most want to enjoy.",
          "A beach morning, a heritage visit and an evening out may each deserve their own time. Ask your adviser to show the approximate driving time for proposed day trips. If a quote lists water sports, confirm the specific activity, the operator, eligibility requirements and the alternative if conditions prevent it from running."
        ]
      },
      {
        title: "Build a total budget, including the small extras",
        paragraphs: [
          "Compare the total for everyone travelling, as well as the per-person number. Ask which transport, meals and activities are included and whether the quote assumes two adults sharing a room. Keep a separate allowance for meals outside the plan, local journeys, optional activities and personal spending.",
          "Musafirnama's Goa package page is a starting point for a quote. Its listed exclusions include airfare to and from Goa and additional water sports. Use the inclusion and exclusion lists together, then ask for the final dated quote to resolve any detail before booking."
        ]
      },
      {
        title: "Finish with a written confirmation checklist",
        paragraphs: [
          "Before committing, request the complete day-by-day plan, the named stays, the exact amount payable and the cancellation conditions. Check current weather and activity availability close to travel rather than assuming that every beach activity runs on every date.",
          "Save your confirmed transport details, accommodation details and provider contact numbers so they are accessible during the journey. Share the final plan with everyone in your group; resolving different expectations before departure makes the holiday easier."
        ],
        checklist: [
          "Confirm arrival and departure times against the first and last day's plan",
          "Check the payment schedule and cancellation conditions in writing",
          "Flag dietary, mobility or room requirements before confirmation",
          "Keep some time in the itinerary genuinely free"
        ]
      }
    ]
  },
  {
    slug: "kerala-route-and-budget-guide",
    title: "Plan a Kerala route without rushing every stop",
    description: "How to balance Kochi, hills and backwaters, compare houseboat details and prepare a clear brief for a Kerala holiday quote.",
    category: "Kerala planning",
    readMinutes: 5,
    relatedPackages: ["kerala-india"],
    sections: [
      {
        title: "Choose your experiences before adding destinations",
        paragraphs: [
          "A useful Kerala brief starts with the experiences you want: time in Kochi, a hill stay, a backwater experience or a slower hotel break. Rank those choices. When time is limited, doing fewer of them comfortably can be more enjoyable than changing hotels every night.",
          "The Kerala route shown on Musafirnama connects Cochin, Munnar, Thekkady and Alleppey. Treat it as an idea to discuss. Ask for a complete plan that fits your actual arrival and departure times, including the driving involved between each overnight stop."
        ]
      },
      {
        title: "Count usable days, not only nights",
        paragraphs: [
          "A late arrival and an early departure leave less time on the ground than the headline trip length suggests. Mark the hours you realistically have at each stop, then add transfers, meal breaks and hotel check-in. Avoid filling a long transfer day with several timed activities.",
          "Ask the person preparing your quote to explain the route order and why each overnight base was chosen. If a group includes children or older travellers, describe your preferred break frequency and maximum comfortable time in a vehicle. The most useful plan is one that fits the people taking it."
        ],
        checklist: [
          "Arrival and departure city and approximate times",
          "Number of nights at each named stop",
          "Expected transfer time and space for breaks",
          "One or two essential experiences, with optional stops identified"
        ]
      },
      {
        title: "Compare houseboat arrangements carefully",
        paragraphs: [
          "If a houseboat is part of your plan, ask whether the quote is for a day experience or an overnight stay and whether the boat is private or shared. Check the boarding and disembarkation points and times. A vague mention of a houseboat is not enough to compare two offers fairly.",
          "Request the room arrangement, air-conditioning hours where relevant, meal plan and any dietary options you need. Ask how the planned experience changes if weather or operating conditions affect the route. Confirm these details in the final quotation instead of relying on a representative photograph."
        ]
      },
      {
        title: "Separate the package cost from optional spending",
        paragraphs: [
          "A fair comparison uses the same dates, room occupancy, hotel category and transport arrangement. A lower price may use a different hotel location, leave out meals or cover fewer activities. Ask for the final total for your group and a clear list of amounts payable separately.",
          "The Kerala package currently displayed on Musafirnama lists accommodation, transfers, breakfast and a houseboat stay among its proposed inclusions. It lists airfare to and from Cochin and the Periyar boat safari as exclusions. Confirm the version offered for your dates; an indicative page price is not a final booking amount."
        ]
      },
      {
        title: "Keep the plan adaptable and the essentials explicit",
        paragraphs: [
          "Outdoor plans need some flexibility. Check the forecast near departure, ask which experiences need advance reservations and decide what you would enjoy if an outdoor activity cannot run. Do not use a generic seasonal description as a promise of conditions on your dates.",
          "Tell your adviser about walking limits, luggage, dietary requirements and any essential room features. For an international traveller, check current entry requirements through official sources. Once the plan is agreed, keep the full itinerary, payment terms and provider contacts together."
        ],
        checklist: [
          "Request named accommodation and the complete itinerary",
          "Confirm any houseboat meals and room arrangements",
          "Allow for meals, personal spending and excluded activities",
          "Review change and cancellation conditions before paying"
        ]
      }
    ]
  },
  {
    slug: "compare-holiday-quotes",
    title: "How to compare holiday quotes before you book",
    description: "A clear way to compare prices, hotels, transport, exclusions and booking terms so that the lowest headline price does not hide an incomplete plan.",
    category: "Booking essentials",
    readMinutes: 6,
    relatedPackages: ["goa-india", "bali-indonesia", "rajasthan-india"],
    sections: [
      {
        title: "Send the same brief to everyone",
        paragraphs: [
          "Quotes are easier to compare when they answer the same request. Write one brief with your destination, departure city, travel dates or flexibility, number of adults and children, preferred room arrangement and approximate budget per person. Add the experiences that matter most and any essential requirements.",
          "If dates are flexible, ask the provider to label the dates used for each price. A weekday stay, a different flight or a different number of nights can change the offer substantially. Record the quote's validity and when availability will be checked again."
        ]
      },
      {
        title: "Turn each quote into the same list",
        paragraphs: [
          "Put the offers beside each other and compare individual items. A hotel star category alone is not a substitute for a property name, location and room category. For transport, look for the route, whether the service is private or shared and what happens at the arrival and departure points.",
          "For a flight-inclusive offer, ask for the flight details, baggage allowance and fare conditions. For a sightseeing list, distinguish a drive past a place from an entry ticket or a guided visit. If an item is ambiguous, have the provider clarify it in writing."
        ],
        checklist: [
          "Exact dates, duration and overnight locations",
          "Named hotels, room categories, occupancy and meals",
          "Flights or trains, baggage and transfers where included",
          "Activities, entrance tickets and guide arrangements",
          "Total amount, taxes, exclusions and optional charges"
        ]
      },
      {
        title: "Calculate what your group will actually pay",
        paragraphs: [
          "A per-person price may assume two people sharing a room. Ask for the total for your exact group, including child charges, extra beds or a single room where needed. Check whether taxes and service charges are included rather than applying your own estimate.",
          "Add the costs that you know you will incur outside the package: travel to the starting point, excluded meals, desired activities and personal spending. For international trips, ask which currency is used and whether any part of the amount can change before payment. Comparing a realistic total makes differences between quotes easier to judge."
        ]
      },
      {
        title: "Read the itinerary for practicality",
        paragraphs: [
          "A long list of attractions can disguise a rushed itinerary. Check transfer time, the time available after arrival and the distance between planned stops. Look for repeated early starts, frequent hotel changes and activities scheduled immediately after a long journey.",
          "Use the sample highlights on a package page to explain what interests you, then request a complete day-by-day itinerary. Activities mentioned in an itinerary are not automatically included in the price; cross-check them against the inclusions and exclusions."
        ]
      },
      {
        title: "Confirm the terms before making a payment",
        paragraphs: [
          "Ask who will provide each service and who you should contact about changes or problems during the trip. Get the payment schedule, cancellation charges, change fees and refund conditions applicable to your booking in writing. Check what happens if an accommodation option or activity becomes unavailable.",
          "For overseas travel, verify current passport, visa, transit and entry requirements through official government or embassy information. A travel quote does not establish your eligibility to enter a country. Check any insurance policy's coverage and exclusions against the activities you actually plan to do."
        ]
      },
      {
        title: "Choose the best fit for your priorities",
        paragraphs: [
          "Once the inclusions and total costs are comparable, decide which offer best fits your priorities. A quieter hotel, fewer transfers, a better room arrangement or clearer support may matter more to your group than an extra sightseeing stop.",
          "Keep the agreed quote and final confirmation together. If a conversation changes an important detail, ask for the updated version in writing. A quote request on Musafirnama starts that planning conversation; submitting it does not confirm a booking."
        ]
      }
    ]
  }
];
