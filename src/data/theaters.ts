export interface Theater {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  shortDescription: string;
  address: string;
  phone: string;
  website: string;
  seatingCapacity: number;
  yearBuilt: number;
  imageUrl: string;
  imageAlt: string;
  galleryImages: { url: string; alt: string }[];
  features: string[];
  parking: string;
  accessibility: string;
  showSlugs: string[];
  rating: number;
  reviewCount: number;
  tags: string[];
}

export const theaters: Theater[] = [
  {
    name: "Clay Cooper Theatre",
    slug: "clay-cooper-theatre",
    tagline: "Home of Branson's #1 Show — The Haygoods",
    description:
      "Clay Cooper Theatre is one of the most popular entertainment venues on the Branson Strip. Located at 3216 W 76 Country Blvd, this state-of-the-art theater hosts some of Branson's biggest and most beloved shows, including The Haygoods — Branson's #1 most-attended show — and Clay Cooper's own Country Express morning show. The theater features comfortable stadium-style seating with excellent sightlines from every seat, a modern sound and lighting system, and a spacious lobby with concessions. With multiple shows running daily from morning to evening, Clay Cooper Theatre is a must-visit destination for anyone exploring Branson's entertainment scene.",
    shortDescription:
      "State-of-the-art theater hosting The Haygoods and Clay Cooper's Country Express on the famous 76 Strip.",
    address: "3216 W 76 Country Blvd, Branson, MO 65616",
    phone: "(417) 332-2529",
    website: "https://www.claycoopertheatre.com",
    seatingCapacity: 2000,
    yearBuilt: 2006,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Clay_Cooper_Theatre%2C_Branson%2C_MO_IMG_1716_%282%29.JPG/1280px-Clay_Cooper_Theatre%2C_Branson%2C_MO_IMG_1716_%282%29.JPG",
    imageAlt: "Clay Cooper Theatre exterior on 76 Country Boulevard in Branson Missouri",
    galleryImages: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Downtown_Branson_Missouri.jpg/1280px-Downtown_Branson_Missouri.jpg",
        alt: "Downtown Branson Missouri entertainment district near Clay Cooper Theatre",
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Glimpse_of_downtown_Branson%2C_MO_IMG_1726.JPG/1280px-Glimpse_of_downtown_Branson%2C_MO_IMG_1726.JPG",
        alt: "Glimpse of downtown Branson near the theater district",
      },
    ],
    features: [
      "Stadium-style seating",
      "State-of-the-art sound system",
      "LED lighting and pyrotechnic capabilities",
      "Gift shop",
      "Concession stand",
      "Multiple shows daily",
    ],
    parking: "Free parking with over 500 spaces available in the adjacent lot.",
    accessibility:
      "Fully ADA accessible with wheelchair seating, accessible restrooms, and hearing-assistance devices available upon request.",
    showSlugs: ["the-haygoods", "clay-coopers-country-express"],
    rating: 4.8,
    reviewCount: 4200,
    tags: ["popular", "strip-location", "pyrotechnics", "family-friendly"],
  },
  {
    name: "Hughes Brothers Theatre",
    slug: "hughes-brothers-theatre",
    tagline: "Where the Hughes Family Brings Music to Life",
    description:
      "Hughes Brothers Theatre is a premier Branson entertainment venue located at 3425 W 76 Country Blvd. Home to the talented Hughes family, this theater hosts the legendary SIX show — an all-vocal, no-instrument powerhouse of six-part harmony — along with the Hughes Music Show and other rotating productions. The intimate yet spacious theater provides excellent acoustics that perfectly complement the Hughes Brothers' incredible vocal talents. The venue features comfortable seating, a welcoming lobby, and the warm, family-oriented atmosphere that has made the Hughes name synonymous with quality Branson entertainment for decades.",
    shortDescription:
      "Home of the legendary SIX show and Hughes family entertainment — world-class vocal harmony on the Strip.",
    address: "3425 W 76 Country Blvd, Branson, MO 65616",
    phone: "(417) 334-0076",
    website: "https://www.hughes-brothers.com",
    seatingCapacity: 1200,
    yearBuilt: 1994,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Hughes_Family_Christmas_Show_Branson_MO.webp/960px-Hughes_Family_Christmas_Show_Branson_MO.webp.png",
    imageAlt: "Hughes Brothers Theatre Christmas show performance in Branson Missouri",
    galleryImages: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Glimpse_of_downtown_Branson%2C_MO_IMG_1726.JPG/1280px-Glimpse_of_downtown_Branson%2C_MO_IMG_1726.JPG",
        alt: "Downtown Branson Missouri near the theater district",
      },
    ],
    features: [
      "Excellent acoustics",
      "Comfortable padded seating",
      "Meet-and-greet after shows",
      "Gift shop and merchandise",
      "Concessions available",
    ],
    parking: "Free parking lot adjacent to the theater with easy access from 76 Country Blvd.",
    accessibility:
      "ADA compliant with wheelchair-accessible seating, restrooms, and hearing-assistance devices.",
    showSlugs: ["six"],
    rating: 4.8,
    reviewCount: 3100,
    tags: ["family-owned", "strip-location", "vocal-harmony", "family-friendly"],
  },
  {
    name: "Grand Country Music Hall",
    slug: "grand-country-music-hall",
    tagline: "Non-Stop Entertainment from Morning to Night",
    description:
      "Grand Country Music Hall, located at 1945 W 76 Country Blvd, is one of Branson's most versatile entertainment complexes. Part of the Grand Country Resort, this venue runs shows from morning until late night, making it one of the busiest theaters in town. The Music Hall hosts a rotating lineup that includes the Grand Jubilee variety show, Comedy Jamboree, Ozarks Gospel, Down Home Country, and the late-night Branson Country USA — offering entertainment options for every taste and schedule. The complex also features an indoor water park, mini golf, a restaurant, and a fudge shop, making it a complete family entertainment destination.",
    shortDescription:
      "Branson's busiest theater complex running shows from morning to midnight — plus water park, dining, and fun.",
    address: "1945 W 76 Country Blvd, Branson, MO 65616",
    phone: "(417) 335-2484",
    website: "https://www.grandcountry.com",
    seatingCapacity: 476,
    yearBuilt: 1989,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Grand_County_Music_Hall%2C_Branson%2C_MO_IMG_1685_%282%29.JPG/1280px-Grand_County_Music_Hall%2C_Branson%2C_MO_IMG_1685_%282%29.JPG",
    imageAlt: "Grand Country Music Hall exterior on 76 Country Boulevard in Branson Missouri",
    galleryImages: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Hollywood_Wax_Museum_-_Branson_MO.jpg/1280px-Hollywood_Wax_Museum_-_Branson_MO.jpg",
        alt: "Hollywood Wax Museum on the Branson Strip near Grand Country Music Hall",
      },
    ],
    features: [
      "Multiple show times daily",
      "Indoor water park (Splash Country)",
      "Mini golf course",
      "Restaurant and buffet",
      "Fudge shop",
      "Resort hotel on-site",
      "Late-night shows available",
    ],
    parking: "Free parking garage and lot with over 600 spaces.",
    accessibility:
      "Fully ADA accessible. Wheelchair seating available. Hearing-assistance devices at the box office.",
    showSlugs: ["grand-jubilee", "comedy-jamboree", "ozarks-gospel", "down-home-country"],
    rating: 4.6,
    reviewCount: 2800,
    tags: ["resort-complex", "strip-location", "multiple-shows", "family-friendly"],
  },
  {
    name: "Sight & Sound Theatres",
    slug: "sight-and-sound-theatres",
    tagline: "Biblical Stories Brought to Life on a Massive Stage",
    description:
      "Sight & Sound Theatres brings the Bible to life on a massive 300-foot wraparound stage with live animals, stunning sets, and Broadway-caliber performances. Located at 1001 Shepherd of the Hills Expy, this state-of-the-art, 2,000-seat theater is one of the largest in the country. The current production, 'DAVID,' tells the epic story of Israel's greatest king through breathtaking theatrical production. With professional actors, elaborate costumes, live animals including horses, camels, and birds, and cutting-edge special effects, Sight & Sound delivers an experience unlike anything else in Branson. The theater also presents special Christmas productions during the holiday season.",
    shortDescription:
      "Massive 2,085-seat theater with 300-foot wraparound stage bringing biblical epics to life with live animals and stunning production.",
    address: "1001 Shepherd of the Hills Expy, Branson, MO 65616",
    phone: "(800) 377-1277",
    website: "https://www.sight-sound.com",
    seatingCapacity: 2085,
    yearBuilt: 2008,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Branson%2C_United_States_%28Unsplash%29.jpg/1280px-Branson%2C_United_States_%28Unsplash%29.jpg",
    imageAlt: "Scenic Branson Missouri area near Sight and Sound Theatres",
    galleryImages: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Top_of_the_Rock%2C_Branson%2C_Missouri%2C_USA.jpg/1280px-Top_of_the_Rock%2C_Branson%2C_Missouri%2C_USA.jpg",
        alt: "Top of the Rock scenic overlook near Sight & Sound Theatres in Branson",
      },
    ],
    features: [
      "300-foot wraparound stage",
      "Live animals in productions",
      "Broadway-caliber performances",
      "2,085 comfortable seats",
      "Gift shop with exclusive merchandise",
      "Café and dining options",
      "Seasonal Christmas productions",
    ],
    parking: "Free parking with over 800 spaces. Shuttle service from remote lots during peak season.",
    accessibility:
      "Fully ADA accessible with wheelchair seating, accessible restrooms, and assistive listening devices. Service animals welcome.",
    showSlugs: ["david-sight-and-sound"],
    rating: 4.9,
    reviewCount: 5600,
    tags: ["must-see", "biblical", "theatrical", "world-class"],
  },
  {
    name: "Dolly Parton's Stampede",
    slug: "dolly-partons-stampede",
    tagline: "The World's Most Visited Dinner Attraction",
    description:
      "Dolly Parton's Stampede, located at 1525 W 76 Country Blvd, is the world's most visited dinner attraction and a Branson must-see. This spectacular dinner show features 32 magnificent horses and their expert riders performing daring stunts and choreographed routines in a 35,000-square-foot arena. While you enjoy a four-course feast — including Dolly's famous creamy vegetable soup, a whole rotisserie chicken, hickory smoked barbecue pork loin, corn on the cob, a biscuit, and apple turnover — you'll witness friendly competition between the North and South featuring trick riding, pig races, music, comedy, and spectacular special effects. It's dinner and a show unlike anything else in the world.",
    shortDescription:
      "World-famous dinner show with 32 horses, four-course feast, trick riding, and spectacular arena entertainment.",
    address: "1525 W 76 Country Blvd, Branson, MO 65616",
    phone: "(800) 520-5544",
    website: "https://www.dpstampede.com",
    seatingCapacity: 1100,
    yearBuilt: 1987,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Dixie_Stampede.jpg/1280px-Dixie_Stampede.jpg",
    imageAlt: "Dolly Parton's Stampede dinner attraction exterior in Branson Missouri",
    galleryImages: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Patriotic_Kitsch_-_Branson_-_Missouri_-_USA_%2828026913408%29.jpg/1280px-Patriotic_Kitsch_-_Branson_-_Missouri_-_USA_%2828026913408%29.jpg",
        alt: "Patriotic theming on the Branson Strip near Dolly Parton's Stampede",
      },
    ],
    features: [
      "Four-course dinner included",
      "32 magnificent horses",
      "35,000 sq ft arena",
      "Pre-show Horse Walk",
      "Gift shop",
      "No utensils — eat with your hands!",
      "Seasonal Christmas show",
    ],
    parking: "Free parking with dedicated lot. Overflow parking available during peak season.",
    accessibility:
      "ADA accessible seating available. Wheelchair accessible entrance and restrooms. Special dietary accommodations available with advance notice.",
    showSlugs: ["dolly-partons-stampede"],
    rating: 4.7,
    reviewCount: 6800,
    tags: ["dinner-show", "must-see", "horses", "family-friendly", "strip-location"],
  },
  {
    name: "King's Castle Theatre",
    slug: "kings-castle-theatre",
    tagline: "Branson's Premier Tribute and Variety Venue",
    description:
      "King's Castle Theatre, located at 2701 W 76 Country Blvd, is a major multi-show venue on the Branson Strip hosting some of the area's best tribute and variety productions. Home to crowd favorites like New Jersey Nights (a Four Seasons tribute), Anthems of Rock, Dublin's Irish Tenors & The Celtic Ladies, Spirit of America, and the seasonal Branson's Christmas Wonderland, this theater offers something for every music lover. The venue features comfortable seating, excellent sound quality, and a prime location in the heart of the entertainment district with easy access to dining and shopping.",
    shortDescription:
      "Premier multi-show venue hosting tribute acts, variety shows, and the beloved Christmas Wonderland on the Strip.",
    address: "2701 W 76 Country Blvd, Branson, MO 65616",
    phone: "(417) 334-2500",
    website: "https://www.kingscastletheatre.com",
    seatingCapacity: 1500,
    yearBuilt: 1998,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Patriotic_Kitsch_-_Branson_-_Missouri_-_USA_%2828026913408%29.jpg/1280px-Patriotic_Kitsch_-_Branson_-_Missouri_-_USA_%2828026913408%29.jpg",
    imageAlt: "Patriotic theming on the Branson Strip near King's Castle Theatre",
    galleryImages: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Patriotic_Kitsch_-_Branson_-_Missouri_-_USA_%2828026913408%29.jpg/1280px-Patriotic_Kitsch_-_Branson_-_Missouri_-_USA_%2828026913408%29.jpg",
        alt: "Patriotic Branson Strip theming near King's Castle Theatre",
      },
    ],
    features: [
      "Multiple shows daily",
      "Professional sound and lighting",
      "Gift shop",
      "Concessions",
      "Central Strip location",
    ],
    parking: "Free parking lot with easy access from 76 Country Blvd.",
    accessibility: "ADA accessible with wheelchair seating and accessible restrooms.",
    showSlugs: ["new-jersey-nights", "anthems-of-rock", "spirit-of-america"],
    rating: 4.6,
    reviewCount: 2200,
    tags: ["tribute-shows", "strip-location", "multi-show", "family-friendly"],
  },
  {
    name: "Andy Williams Moon River Theatre",
    slug: "andy-williams-moon-river-theatre",
    tagline: "A Branson Landmark Since 1992 — Now Truth Traveler Theater",
    description:
      "The Andy Williams Moon River Theatre, originally built by the legendary entertainer Andy Williams in 1992, is one of Branson's most beautiful and iconic venues. Located at 2500 W 76 Country Blvd, this elegant 2,000-seat theater was the home of Andy Williams' Christmas shows and variety entertainment for two decades. Following Williams' passing, the theater operated under various names and now operates as Truth Traveler Theater, hosting faith-based immersive experiences. The venue's stunning architecture, plush seating, and excellent acoustics remain world-class. The building itself is a Branson landmark recognizable by its distinctive columned facade.",
    shortDescription:
      "Iconic 2,000-seat Branson landmark built by Andy Williams in 1992, now operating as Truth Traveler Theater.",
    address: "2500 W 76 Country Blvd, Branson, MO 65616",
    phone: "(417) 334-4500",
    website: "https://www.andywilliamstheatre.com",
    seatingCapacity: 2000,
    yearBuilt: 1992,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Moon_River_Theatre%2C_Branson%2C_MO_IMG_1682.JPG/1280px-Moon_River_Theatre%2C_Branson%2C_MO_IMG_1682.JPG",
    imageAlt:
      "Andy Williams Moon River Theatre exterior on 76 Country Boulevard in Branson Missouri",
    galleryImages: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Moon_River_Theatre%2C_Branson%2C_MO_IMG_1682.JPG/1280px-Moon_River_Theatre%2C_Branson%2C_MO_IMG_1682.JPG",
        alt: "Moon River Theatre exterior showing the iconic columned facade",
      },
    ],
    features: [
      "2,000 plush seats",
      "Excellent acoustics",
      "Andy Williams memorabilia display",
      "Gift shop",
      "Concessions",
      "Elegant lobby",
    ],
    parking: "Free parking with large lot. Convenient Strip location.",
    accessibility:
      "Fully ADA compliant with wheelchair seating, hearing-assistance devices, and accessible restrooms.",
    showSlugs: ["legends-in-concert", "rick-thomas"],
    rating: 4.7,
    reviewCount: 3400,
    tags: ["landmark", "strip-location", "elegant", "iconic"],
  },
  {
    name: "Hamners' Variety Theater",
    slug: "hamners-variety-theater",
    tagline: "Branson's Home for Music Tributes and Magic",
    description:
      "Hamners' Variety Theater, located at 3090 Shepherd of the Hills Expy, is a beloved Branson venue known for its diverse lineup of tribute shows and variety entertainment. The theater hosts popular productions including ABBA Tribute, Back to the Bee Gees, Beach Boys California Dreamin', and Hamners' Unbelievable Variety show featuring magic, comedy, and illusion. With its intimate setting, every seat feels close to the action. The Hamner family has been a fixture in Branson entertainment for decades, and their theater reflects their commitment to quality, family-friendly performances.",
    shortDescription:
      "Intimate venue hosting popular tribute shows — ABBA, Bee Gees, Beach Boys — plus magic and variety entertainment.",
    address: "3090 Shepherd of the Hills Expy, Branson, MO 65616",
    phone: "(417) 334-4363",
    website: "https://www.hamnersvarietytheater.com",
    seatingCapacity: 800,
    yearBuilt: 1995,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Hollywood_Wax_Museum_-_Branson_MO.jpg/1280px-Hollywood_Wax_Museum_-_Branson_MO.jpg",
    imageAlt: "Branson entertainment district near Hamners Variety Theater",
    galleryImages: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Hollywood_Wax_Museum_-_Branson_MO.jpg/1280px-Hollywood_Wax_Museum_-_Branson_MO.jpg",
        alt: "Hollywood Wax Museum near Hamners' Variety Theater in Branson",
      },
    ],
    features: [
      "Intimate setting",
      "Multiple tribute shows",
      "Magic and illusion shows",
      "Gift shop",
      "Concessions",
    ],
    parking: "Free parking available.",
    accessibility: "ADA accessible with wheelchair seating and accessible restrooms.",
    showSlugs: ["hamners-unbelievable-variety"],
    rating: 4.5,
    reviewCount: 1800,
    tags: ["tribute-shows", "magic", "intimate", "family-friendly"],
  },
  {
    name: "Americana Theatre",
    slug: "americana-theatre",
    tagline: "Classic Entertainment on the Branson Strip",
    description:
      "The Americana Theatre at 2905 W 76 Country Blvd is one of Branson's versatile multi-show venues, hosting a wide range of entertainment from magic and comedy to country music and tribute shows. Notable shows include the award-winning illusionist Rick Thomas, Aaron Wayne's Comedy Hypnosis show, the Awesome 80s tribute, and various country music productions. The theater features comfortable seating, modern sound and lighting, and a welcoming atmosphere that keeps audiences coming back show after show.",
    shortDescription:
      "Versatile multi-show venue featuring magic, comedy, country, and tribute performances on 76 Country Blvd.",
    address: "2905 W 76 Country Blvd, Branson, MO 65616",
    phone: "(417) 544-8700",
    website: "https://www.americanatheatre.com",
    seatingCapacity: 1100,
    yearBuilt: 2001,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Glimpse_of_downtown_Branson%2C_MO_IMG_1726.JPG/1280px-Glimpse_of_downtown_Branson%2C_MO_IMG_1726.JPG",
    imageAlt: "Branson Missouri entertainment district near Americana Theatre",
    galleryImages: [],
    features: [
      "Multiple shows daily",
      "Modern sound system",
      "Comfortable seating",
      "Gift shop",
      "Central location on the Strip",
    ],
    parking: "Free parking in adjacent lot.",
    accessibility: "ADA accessible with wheelchair seating available.",
    showSlugs: ["rick-thomas"],
    rating: 4.5,
    reviewCount: 1600,
    tags: ["multi-show", "strip-location", "variety"],
  },
  {
    name: "Showboat Branson Belle",
    slug: "showboat-branson-belle",
    tagline: "Dinner Cruise Entertainment on Table Rock Lake",
    description:
      "The Showboat Branson Belle is a 700-passenger paddlewheel showboat offering dinner cruises on beautiful Table Rock Lake. This unique Branson attraction combines a delicious three-course meal with a captivating variety show — all while cruising the crystal-clear waters of one of the Ozarks' most stunning lakes. Passengers enjoy breathtaking views of the Ozark Mountains as they dine and watch world-class entertainment. The Showboat features multiple decks, including an open-air upper deck perfect for taking in the scenery. Operated by Silver Dollar City, the Branson Belle has been a signature Branson experience since 1996.",
    shortDescription:
      "700-passenger paddlewheel showboat with dinner and live entertainment on scenic Table Rock Lake.",
    address: "4800 State Hwy 165, Branson, MO 65616",
    phone: "(800) 475-9370",
    website: "https://www.silverdollarcity.com/showboat",
    seatingCapacity: 700,
    yearBuilt: 1996,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Branson_Belle_Table_Rock_Lake_2012_cropped.jpg/960px-Branson_Belle_Table_Rock_Lake_2012_cropped.jpg",
    imageAlt: "Showboat Branson Belle paddlewheel boat on Table Rock Lake in Branson Missouri",
    galleryImages: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Branson_Belle_aft.jpg/1280px-Branson_Belle_aft.jpg",
        alt: "Aft view of the Showboat Branson Belle on Table Rock Lake",
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Table_Rock_Branson_Missouri.jpg/1280px-Table_Rock_Branson_Missouri.jpg",
        alt: "Table Rock Lake scenic view near Branson Missouri",
      },
    ],
    features: [
      "Three-course dinner included",
      "Live variety show",
      "Scenic Table Rock Lake cruise",
      "Multiple deck levels",
      "Open-air upper deck",
      "Captain's Club premium seating",
      "Gift shop on board",
    ],
    parking: "Free parking at the dock with shuttle service from remote lots during peak times.",
    accessibility:
      "ADA accessible boarding. Wheelchair-accessible decks and restrooms. Special dietary accommodations with advance notice.",
    showSlugs: ["showboat-branson-belle"],
    rating: 4.6,
    reviewCount: 3200,
    tags: ["dinner-cruise", "unique-venue", "scenic", "table-rock-lake"],
  },
  {
    name: "Shepherd of the Hills",
    slug: "shepherd-of-the-hills",
    tagline: "Branson's Historic Outdoor Entertainment Park",
    description:
      "Shepherd of the Hills, located at 5586 W 76 Country Blvd, is a historic outdoor entertainment complex offering a unique combination of dinner shows, adventure attractions, and outdoor entertainment. The venue hosts the popular WhoDunnit Hoedown Murder Mystery Dinner Show, Comedy Bash Dinner Show, and the classic Shepherd of the Hills outdoor drama (seasonal). Beyond shows, guests can enjoy the Copperhead Mountain Coaster, ziplines, a ropes course, trail rides, and Inspiration Tower with panoramic Ozark views. This 160-acre park has been entertaining visitors since 1960.",
    shortDescription:
      "Historic 160-acre entertainment park with dinner shows, mountain coaster, ziplines, and panoramic Ozark views.",
    address: "5586 W 76 Country Blvd, Branson, MO 65616",
    phone: "(417) 334-4191",
    website: "https://www.theshepherdofthehills.com",
    seatingCapacity: 600,
    yearBuilt: 1960,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Old_Matt%27s_Cabin%2C_Shepherd_of_the_Hills_Country%2C_near_Branson%2C_Mo_%2879279%29.jpg/1280px-Old_Matt%27s_Cabin%2C_Shepherd_of_the_Hills_Country%2C_near_Branson%2C_Mo_%2879279%29.jpg",
    imageAlt: "Old Matt's Cabin at Shepherd of the Hills historic park near Branson Missouri",
    galleryImages: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Top_of_the_Rock%2C_Branson%2C_Missouri%2C_USA.jpg/1280px-Top_of_the_Rock%2C_Branson%2C_Missouri%2C_USA.jpg",
        alt: "Top of the Rock scenic overlook near Branson Missouri",
      },
    ],
    features: [
      "Dinner shows",
      "Copperhead Mountain Coaster",
      "Zipline canopy tours",
      "Inspiration Tower (230 ft)",
      "Trail rides",
      "Ropes course",
      "160 acres of Ozark beauty",
    ],
    parking: "Free parking with multiple lots across the property.",
    accessibility: "Main buildings are ADA accessible. Some outdoor attractions have physical requirements.",
    showSlugs: [],
    rating: 4.5,
    reviewCount: 2400,
    tags: ["outdoor", "adventure", "dinner-show", "scenic", "historic"],
  },
  {
    name: "Mickey Gilley Grand Shanghai Theatre",
    slug: "mickey-gilley-grand-shanghai-theatre",
    tagline: "Home of the Amazing Acrobats of Shanghai",
    description:
      "The Mickey Gilley Grand Shanghai Theatre is home to the Amazing Acrobats of Shanghai, one of Branson's most thrilling and unique shows. This theater, originally built by country music legend Mickey Gilley, has become synonymous with world-class acrobatic entertainment. The Amazing Acrobats of Shanghai bring a troupe of 20+ performers from China who execute breathtaking feats of balance, agility, and strength that have audiences gasping in amazement. The theater features state-of-the-art rigging systems specifically designed for aerial acrobatic performances.",
    shortDescription:
      "Home of the breathtaking Amazing Acrobats of Shanghai with state-of-the-art aerial rigging systems.",
    address: "3455 W 76 Country Blvd, Branson, MO 65616",
    phone: "(417) 336-8888",
    website: "https://www.grandshanghaitheatre.com",
    seatingCapacity: 1400,
    yearBuilt: 1990,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Downtown_Branson_Missouri.jpg/1280px-Downtown_Branson_Missouri.jpg",
    imageAlt: "Branson Missouri Strip district near the Grand Shanghai Theatre",
    galleryImages: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Glimpse_of_downtown_Branson%2C_MO_IMG_1726.JPG/1280px-Glimpse_of_downtown_Branson%2C_MO_IMG_1726.JPG",
        alt: "Downtown Branson near the Grand Shanghai Theatre",
      },
    ],
    features: [
      "Aerial rigging systems",
      "State-of-the-art lighting",
      "Comfortable seating",
      "Gift shop",
      "Concessions",
    ],
    parking: "Free parking in dedicated lot.",
    accessibility: "ADA accessible with wheelchair seating and accessible restrooms.",
    showSlugs: ["amazing-acrobats-of-shanghai"],
    rating: 4.6,
    reviewCount: 2000,
    tags: ["acrobats", "strip-location", "unique", "family-friendly"],
  },
  {
    name: "God & Country Theatres",
    slug: "god-and-country-theatres",
    tagline: "Classic Branson Entertainment with Heart and Soul",
    description:
      "God & Country Theatres, located at 1840 W 76 Country Blvd, hosts a diverse collection of tribute and music shows that celebrate the best of American music. The venue features multiple performance spaces and hosts shows including Elvis LIVE! starring Jerry Presley, A Garth Tribute, Dan Wagner's Johnny Cash & Friends, A Neil Diamond Tribute, and Carpenters Once More. Known for delivering authentic, heartfelt performances in an intimate setting, God & Country Theatres is a favorite among visitors who love classic American music.",
    shortDescription:
      "Multi-stage venue hosting beloved tribute shows — Elvis, Johnny Cash, Garth Brooks, Neil Diamond, and more.",
    address: "1840 W 76 Country Blvd, Branson, MO 65616",
    phone: "(417) 334-6806",
    website: "https://www.gctheatres.com",
    seatingCapacity: 800,
    yearBuilt: 1993,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Shopping_in_Branson%2C_Missouri_-_Dick%27s_5_%26_10_%2846641614685%29.jpg/1280px-Shopping_in_Branson%2C_Missouri_-_Dick%27s_5_%26_10_%2846641614685%29.jpg",
    imageAlt: "The famous Branson Strip near God and Country Theatres",
    galleryImages: [],
    features: [
      "Multiple performance spaces",
      "Intimate setting",
      "Meet the performers",
      "Gift shop",
      "Convenient Strip location",
    ],
    parking: "Free parking available.",
    accessibility: "ADA accessible with wheelchair seating.",
    showSlugs: [],
    rating: 4.5,
    reviewCount: 1500,
    tags: ["tribute-shows", "strip-location", "intimate", "classic-music"],
  },
  {
    name: "Branson Hot Hits Theatre",
    slug: "branson-hot-hits-theatre",
    tagline: "Downtown Branson's Hottest Music Venue",
    description:
      "The Branson Hot Hits Theatre at 206 S Commercial St in historic downtown Branson brings classic music back to life with shows like Motown Downtown, Doo Wop & More, Patsy to Patsy, Golden Sounds of the Platters, and Best of Dean Martin Tribute. This intimate downtown venue offers a different experience from the Strip theaters, with its charming location near Branson Landing and walkable access to downtown shops and restaurants. The theater specializes in music from the 1950s through 1970s, making it a favorite for nostalgia lovers.",
    shortDescription:
      "Downtown venue specializing in classic Motown, doo-wop, and vintage music tributes near Branson Landing.",
    address: "206 S Commercial St, Branson, MO 65616",
    phone: "(417) 337-7426",
    website: "https://www.bransonhothits.com",
    seatingCapacity: 500,
    yearBuilt: 2005,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Branson_Landing_-_panoramio.jpg/1280px-Branson_Landing_-_panoramio.jpg",
    imageAlt: "Branson Landing waterfront near Branson Hot Hits Theatre in downtown",
    galleryImages: [],
    features: [
      "Downtown Branson location",
      "Near Branson Landing",
      "Intimate atmosphere",
      "Classic music tributes",
      "Walkable to shops and dining",
    ],
    parking: "Street parking and nearby public lots in downtown Branson.",
    accessibility: "ADA accessible with ground-level entry.",
    showSlugs: ["motown-downtown", "doo-wop-and-more"],
    rating: 4.5,
    reviewCount: 1200,
    tags: ["downtown", "intimate", "classic-music", "walkable"],
  },
  {
    name: "Little Opry Theatre",
    slug: "little-opry-theatre",
    tagline: "Intimate Performances in the Heart of Branson",
    description:
      "The Little Opry Theatre, located inside the IMAX Entertainment Complex at 3562 Shepherd of the Hills Expy, is one of Branson's most intimate performance venues. Despite its name, this theater delivers big entertainment with shows like The Petersens (bluegrass/gospel favorites), Sons of Britches, Smoke on the Mountain, and The Mountain Hollers Family Band. The smaller venue size creates an up-close experience where you can see every expression and feel every note. The IMAX complex also features a giant-screen theater and gift shop.",
    shortDescription:
      "Intimate venue inside the IMAX complex hosting bluegrass, gospel, and family shows up close and personal.",
    address: "3562 Shepherd of the Hills Expy, Branson, MO 65616",
    phone: "(417) 335-4832",
    website: "https://www.bransonimax.com",
    seatingCapacity: 210,
    yearBuilt: 1996,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Branson%2C_MO%2C_Convention_Center_IMG_1723_%282%29.JPG/1280px-Branson%2C_MO%2C_Convention_Center_IMG_1723_%282%29.JPG",
    imageAlt: "Branson entertainment complex area near the Little Opry Theatre",
    galleryImages: [],
    features: [
      "Intimate 210-seat venue",
      "IMAX giant-screen theater",
      "Up-close performances",
      "Gift shop",
      "Concessions",
    ],
    parking: "Free parking with large lot shared with IMAX complex.",
    accessibility: "ADA accessible with wheelchair seating and accessible restrooms.",
    showSlugs: ["the-petersens", "smoke-on-the-mountain"],
    rating: 4.6,
    reviewCount: 1400,
    tags: ["intimate", "bluegrass", "gospel", "family-friendly"],
  },
  {
    name: "Pierce Arrow Theater",
    slug: "pierce-arrow-theater",
    tagline: "World-Class Variety and Comedy Entertainment",
    description:
      "Pierce Arrow Theater, located at 3069 Shepherd of the Hills Expy, is home to some of Branson's most popular variety and comedy productions. The theater hosts Pierce Arrow's 30th Anniversary show, Doug Gabriel's Ultimate Variety Show, and Reza's Edge of Illusion magic show. The venue features excellent sight lines, quality sound, and a comfortable setting that makes every show an enjoyable experience. The Pierce Arrow quartet has been a Branson staple for three decades, delivering their signature blend of comedy, harmony, and entertainment.",
    shortDescription:
      "Premier venue for Pierce Arrow, Doug Gabriel, and Reza's magic — 30 years of Branson entertainment excellence.",
    address: "3069 Shepherd of the Hills Expy, Branson, MO 65616",
    phone: "(417) 336-8742",
    website: "https://www.piercearrowtheater.com",
    seatingCapacity: 900,
    yearBuilt: 1996,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Lake_Taneycomo%2C_Branson%2C_MO_IMG_1720_%282%29.JPG/1280px-Lake_Taneycomo%2C_Branson%2C_MO_IMG_1720_%282%29.JPG",
    imageAlt: "Lake Taneycomo scenery near Pierce Arrow Theater in Branson Missouri",
    galleryImages: [],
    features: [
      "Multiple shows daily",
      "Excellent sight lines",
      "Quality sound system",
      "Gift shop",
      "Meet-and-greet opportunities",
    ],
    parking: "Free parking in adjacent lot.",
    accessibility: "ADA accessible with wheelchair seating available.",
    showSlugs: ["pierce-arrow", "doug-gabriel"],
    rating: 4.6,
    reviewCount: 1900,
    tags: ["variety", "comedy", "magic", "family-friendly"],
  },
  {
    name: "Presleys' Country Jubilee Theatre",
    slug: "presleys-country-jubilee-theatre",
    tagline: "Branson's Original Show — Entertaining Since 1967",
    description:
      "The Presleys' Theatre is home to Presleys' Country Jubilee, the show that started Branson's live entertainment tradition back in 1967. The Presley family has been performing for nearly 60 years, making them the longest-running show in Branson history. Located on the famous 76 Country Blvd, the theater continues the family tradition with a mix of country music, gospel, comedy, and family entertainment that spans four generations. Visiting the Presleys' show is like stepping into Branson history — it's where it all began.",
    shortDescription:
      "Branson's original show since 1967 — nearly 60 years of Presley family country, gospel, and comedy entertainment.",
    address: "2920 W 76 Country Blvd, Branson, MO 65616",
    phone: "(417) 334-4874",
    website: "https://www.presleys.com",
    seatingCapacity: 1500,
    yearBuilt: 1967,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Presley%27s_Country_Jubilee%2C_Branson%2C_MO_IMG_1719_%282%29.JPG/1280px-Presley%27s_Country_Jubilee%2C_Branson%2C_MO_IMG_1719_%282%29.JPG",
    imageAlt: "Presleys' Country Jubilee Theatre exterior on 76 Country Boulevard in Branson Missouri",
    galleryImages: [],
    features: [
      "Branson's oldest show",
      "Family-run since 1967",
      "Four generations of Presleys",
      "Country, gospel, and comedy",
      "Historic venue",
    ],
    parking: "Free parking in theater lot.",
    accessibility: "ADA accessible with wheelchair seating.",
    showSlugs: ["presleys-country-jubilee"],
    rating: 4.7,
    reviewCount: 2600,
    tags: ["historic", "strip-location", "family-owned", "original"],
  },
  {
    name: "Dutton Family Theater",
    slug: "dutton-family-theater",
    tagline: "America's First Family of Entertainment",
    description:
      "The Dutton Family Theater at 3454 W 76 Country Blvd is the home stage of The Duttons, one of America's most talented musical families. Known for their appearance on NBC's America's Got Talent, The Duttons deliver an incredible show featuring fiddle, guitar, banjo, and vocals from multiple generations. The intimate theater provides a personal, up-close experience with this remarkable family. The venue also hosts the inspirational production 'Where Jesus Walked.'",
    shortDescription:
      "Home of The Duttons — America's Got Talent family with incredible multi-generational musical talent.",
    address: "3454 W 76 Country Blvd, Branson, MO 65616",
    phone: "(417) 332-2772",
    website: "https://www.theduttons.com",
    seatingCapacity: 600,
    yearBuilt: 2009,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Branson%2C_United_States_%28Unsplash_HklQmjOsq_k%29.jpg/1280px-Branson%2C_United_States_%28Unsplash_HklQmjOsq_k%29.jpg",
    imageAlt: "Scenic Branson Missouri area near Dutton Family Theater on the Strip",
    galleryImages: [],
    features: [
      "Intimate family venue",
      "Multi-generational performers",
      "Meet-and-greet after shows",
      "Gift shop",
      "Americas Got Talent alumni",
    ],
    parking: "Free parking in theater lot.",
    accessibility: "ADA accessible with wheelchair seating and accessible restrooms.",
    showSlugs: ["the-duttons"],
    rating: 4.7,
    reviewCount: 1800,
    tags: ["family-owned", "strip-location", "intimate", "talent-show"],
  },
  {
    name: "Baldknobbers Theatre",
    slug: "baldknobbers-theatre",
    tagline: "Branson's Famous First Family of Comedy",
    description:
      "The Baldknobbers Theatre has been home to Branson's Famous Baldknobbers since 1959, making it one of the longest-running entertainment traditions in the Ozarks. The Mabe family started performing in a cave on the shores of Lake Taneycomo and eventually built this theater on the Strip. Today, the show continues its tradition of hilarious comedy, country music, and family-friendly entertainment that has been delighting audiences for over 60 years. The Baldknobbers' unique brand of Ozark humor is a Branson institution.",
    shortDescription:
      "Home of the Baldknobbers since 1959 — over 60 years of legendary Ozark comedy and country music.",
    address: "645 State Hwy 165, Branson, MO 65616",
    phone: "(417) 332-4449",
    website: "https://www.baldknobbers.com",
    seatingCapacity: 1700,
    yearBuilt: 1968,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Fall_in_the_Ozarks.jpg/1280px-Fall_in_the_Ozarks.jpg",
    imageAlt: "Beautiful Ozark fall foliage near Baldknobbers Theatre in Branson Missouri",
    galleryImages: [],
    features: [
      "Branson's first show family",
      "Over 60 years of entertainment",
      "Comedy and country music",
      "Family tradition",
      "Historic venue",
    ],
    parking: "Free parking in adjacent lot.",
    accessibility: "ADA accessible with wheelchair seating.",
    showSlugs: ["bransons-famous-baldknobbers"],
    rating: 4.6,
    reviewCount: 2200,
    tags: ["historic", "comedy", "family-owned", "legendary"],
  },
  {
    name: "Welk Resort Theatre",
    slug: "welk-resort-theatre",
    tagline: "The Lawrence Welk Legacy Lives On",
    description:
      "The Welk Resort Theatre is part of the Welk Resort Branson, a full resort property originally developed in association with the legendary Lawrence Welk family. The theater hosts various shows and events throughout the year and is connected to the resort's hotel, golf course, and dining facilities. The venue offers a resort-style entertainment experience that sets it apart from the Strip theaters.",
    shortDescription:
      "Resort theater connected to the Welk Resort with hotel, golf, and full vacation amenities.",
    address: "1984 State Hwy 165, Branson, MO 65616",
    phone: "(417) 336-3575",
    website: "https://www.welkresortbranson.com",
    seatingCapacity: 800,
    yearBuilt: 1997,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Lakeside_Campsite%2C_Branson%2C_Missouri.jpg/1280px-Lakeside_Campsite%2C_Branson%2C_Missouri.jpg",
    imageAlt: "Lakeside setting near Welk Resort Theatre in Branson Missouri",
    galleryImages: [],
    features: [
      "Full resort property",
      "Golf course",
      "Hotel accommodations",
      "Restaurant and dining",
      "Pool and recreation",
    ],
    parking: "Free parking for resort and theater guests.",
    accessibility: "Fully ADA accessible as a modern resort property.",
    showSlugs: [],
    rating: 4.4,
    reviewCount: 1100,
    tags: ["resort", "golf", "accommodations"],
  },
  {
    name: "Yakov Smirnoff Theatre",
    slug: "yakov-smirnoff-theatre",
    tagline: "What a Country! — Branson's Favorite Comedian",
    description:
      "The Yakov Smirnoff Theatre at 470 State Hwy 248 is one of Branson's largest purpose-built entertainment venues, with seating for 2,000 guests. The theater was built by Soviet-born comedian Yakov Smirnoff, who became one of Branson's most beloved performers with his signature blend of comedy celebrating American life and freedom. The massive theater features a grand entrance, spacious lobby, comfortable seating with excellent sight lines, and state-of-the-art sound and lighting. The venue has hosted a variety of productions over the years and remains an important part of Branson's entertainment landscape.",
    shortDescription:
      "2,000-seat theater built by beloved comedian Yakov Smirnoff — one of Branson's largest venues on Hwy 248.",
    address: "470 State Hwy 248, Branson, MO 65616",
    phone: "(417) 332-2500",
    website: "https://www.yakov.com",
    seatingCapacity: 2000,
    yearBuilt: 1992,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunset_at_Table_Rock_Lake%2C_Ozarks%2C_Missouri.jpg/1280px-Sunset_at_Table_Rock_Lake%2C_Ozarks%2C_Missouri.jpg",
    imageAlt: "Sunset over Table Rock Lake near Yakov Smirnoff Theatre in Branson Missouri",
    galleryImages: [],
    features: [
      "2,000 comfortable seats",
      "State-of-the-art sound system",
      "Spacious lobby",
      "Gift shop",
      "Concessions",
      "Grand entrance",
    ],
    parking: "Free parking with large lot off Highway 248.",
    accessibility:
      "Fully ADA accessible with wheelchair seating, accessible restrooms, and hearing-assistance devices.",
    showSlugs: [],
    rating: 4.5,
    reviewCount: 1800,
    tags: ["large-venue", "comedy", "iconic"],
  },
  {
    name: "Mansion Theatre",
    slug: "mansion-theatre",
    tagline: "Branson's Largest Indoor Entertainment Venue",
    description:
      "The Mansion Theatre at 189 Expressway Lane is Branson's single largest indoor entertainment venue with a staggering 3,000-seat capacity. This massive theater hosts major touring acts, special events, and large-scale productions that require a venue of exceptional size. The theater features a massive stage, state-of-the-art sound and lighting systems, comfortable seating with good sight lines throughout, and ample concessions. Originally built as part of a larger entertainment complex, The Mansion Theatre continues to be the go-to venue for Branson's biggest entertainment events and concerts.",
    shortDescription:
      "Branson's largest theater at 3,000 seats — home to major touring acts and large-scale productions.",
    address: "189 Expressway Ln, Branson, MO 65616",
    phone: "(417) 335-2000",
    website: "https://www.mansiontheatre.com",
    seatingCapacity: 3000,
    yearBuilt: 1996,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Wharf_Scene_along_White_River_-_Branson_-_Missouri_-_USA_%2841179413184%29.jpg/1280px-Wharf_Scene_along_White_River_-_Branson_-_Missouri_-_USA_%2841179413184%29.jpg",
    imageAlt: "White River waterfront scene near The Mansion Theatre in Branson Missouri",
    galleryImages: [],
    features: [
      "3,000 seats — Branson's largest",
      "Massive stage",
      "State-of-the-art sound and lighting",
      "Major touring acts",
      "Concessions and gift shop",
      "Ample lobby space",
    ],
    parking: "Free parking with multiple large lots surrounding the theater.",
    accessibility:
      "Fully ADA accessible with wheelchair seating, accessible restrooms, and assistive listening devices.",
    showSlugs: [],
    rating: 4.4,
    reviewCount: 1200,
    tags: ["large-venue", "touring-acts", "concerts", "events"],
  },
];

export function getTheaterBySlug(slug: string): Theater | undefined {
  return theaters.find((t) => t.slug === slug);
}

export function getTheaterByName(name: string): Theater | undefined {
  return theaters.find((t) => t.name.toLowerCase() === name.toLowerCase());
}
