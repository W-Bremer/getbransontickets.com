export interface Show { name: string; slug: string; tagline: string; category: string[]; theater: string; theaterAddress: string; description: string; shortDescription: string; priceFrom: number; priceTo: number; duration: string; ageRecommendation: string; timeOfDay: "morning" | "afternoon" | "evening"; mealIncluded: boolean; mealType: string | null; isNew2026: boolean; isFeatured: boolean; featuredOrder?: number; isLimitedEngagement: boolean; seasonStart: string; seasonEnd: string; showTimes: string[]; darkDays: string[]; specialOffers: string[]; tags: string[]; seoKeywords: string[]; relatedShows: string[]; imageAlt: string; imageUrl: string; /** Local gallery photos rendered on the show detail page. */ galleryImages?: string[]; faqs: { question: string; answer: string }[]; isFeaturedPartner: boolean; externalUrl?: string; childPriceFrom?: number; childPriceTo?: number; studentPriceFrom?: number; studentPriceTo?: number; familyPassPrice?: number; scheduleNote?: string; /** Full-dark pauses (inclusive ISO dates) that override the weekly schedule. */ darkDateRanges?: { start: string; end: string }[]; /** Weekdays dark only within a date span (seasonal schedule reductions). */ seasonalDarkWeekdays?: { day: string; start: string; end: string }[]; /** One-off performances outside the weekly pattern (holiday matinees, special evening runs). */ extraPerformances?: { date: string; times: string[] }[]; /** Official promo video embed URL (player.vimeo.com / youtube-nocookie.com), from the show's own site. */ videoUrl?: string; /** Kids at or under this age are admitted free, per the theater's FIT contract. */ kidsFreeUnderAge?: number; /** Real Google Business Profile rating — only values verified against the live listing, with the check date noted on the entry. These are the FALLBACK when the live Places lookup (googlePlaceId) is unavailable. */ googleRating?: number; googleReviewCount?: number; /** Link to the listing the rating was read from. */ googleReviewsUrl?: string; /** Places API place id — enables the live rating + curated-review lookup in lib/google-places.ts. */ googlePlaceId?: string; /** Custom alt text per gallery image (falls back to a generic label); used to credit guest photographers. */ galleryImageAlts?: string[]; /** Small caption under the Photos heading (e.g. guest-photo sourcing note). */ galleryNote?: string; /** A competitor's documented listed per-adult rate, rendered struck through with an "on other ticket sites" label. NEVER label it as our former price; keep a dated screenshot in docs/substantiation/ and re-verify monthly or remove the field. */ competitorPrice?: number; /** Render heuristic demand labels (Available / Limited / Going Fast / Sold Out) on this show's booking calendar and grids. */ demandBadges?: boolean; /** Render the family-of-4 pricing strip (real per-ticket arithmetic, prefills 2 adults + 2 kids). */ familyBundle?: boolean; /** Long-form SEO sections rendered at the bottom of the show page, with optional images. */ detailSections?: { heading: string; paragraphs: string[]; imageUrl?: string; imageAlt?: string }[]; /** BOGO 50%: every 2nd adult ticket in a pair is half price, applied automatically at checkout (lib/adjustments.ts). */ bogo50?: boolean; /** Enhanced booking layout: date-card strip under the hero, Ticket Info panel on the right, big bookable calendar + Prices section lower on the page. */ bookingPageV2?: boolean;
} export const shows: Show[] = [ { name: "The Haygoods", slug: "the-haygoods", tagline: "Branson's Most Popular Show", category: ["variety-music"], theater: "Clay Cooper Theatre", theaterAddress: "3216 W 76 Country Blvd, Branson, MO 65616", description: "For over two decades, The Haygoods have been Branson's most-attended and most-talked-about show. This family of six siblings delivers a jaw-dropping spectacle that blends rock, pop, country, and gospel with more than 20 different instruments, dazzling laser effects, pyrotechnics, and aerial stunts. Their seamless transitions between musical genres keep audiences of all ages on the edge of their seats. From classic rock anthems to today's biggest hits, The Haygoods deliver a two-hour performance that rivals anything you'd see in Las Vegas. It's no wonder they've performed over 8,000 shows to more than 7 million fans.", shortDescription: "Six siblings, 20+ instruments, lasers, pyrotechnics. Branson's #1 show for over 20 years.", priceFrom: 71.00, priceTo: 73.00, childPriceFrom: 44.00, childPriceTo: 46.00, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: true, featuredOrder: 4, isLimitedEngagement: false, seasonStart: "February", seasonEnd: "December", showTimes: ["7:30 PM"], darkDays: ["Sunday", "Monday", "Wednesday", "Friday"], darkDateRanges: [{ start: "2026-08-23", end: "2026-08-31" }, { start: "2026-10-31", end: "2026-10-31" }, { start: "2026-12-24", end: "2026-12-25" }, { start: "2026-12-30", end: "2027-12-31" }], extraPerformances: [{ date: "2026-09-06", times: ["2:00 PM"] }, { date: "2026-11-04", times: ["2:00 PM"] }, { date: "2026-11-11", times: ["2:00 PM"] }, { date: "2026-11-18", times: ["2:00 PM"] }], scheduleNote: "Performs Tuesday, Thursday, and Saturday at 7:30 PM, resuming September 1. Select dates add 2:00 PM matinees. The Christmas show begins November 3. Dark October 31 and December 24 and 25; final regular show December 29. The New Year's Eve show is sold by phone only.", specialOffers: [], tags: ["popular", "family-friendly", "pyrotechnics", "live-music", "must-see"], seoKeywords: ["haygoods branson", "haygoods show tickets", "branson variety show"], relatedShows: ["clay-coopers-country-express", "six", "grand-jubilee"], imageAlt: "The Haygoods performing live on stage with pyrotechnics in Branson Missouri", imageUrl: "/shows/the-haygoods.jpg", faqs: [
  {
    question: "How long is The Haygoods show?",
    answer: "The show runs approximately 2 hours with no intermission.",
  },
  {
    question: "Is The Haygoods show appropriate for children?",
    answer: "Yes! The Haygoods is a family-friendly show enjoyed by all ages. The high-energy performance, lights, and pyrotechnics are a hit with kids.",
  },
  {
    question: "What kind of music do The Haygoods perform?",
    answer: "The Haygoods perform a wide variety including rock, pop, country, gospel, and classical, often switching between genres within the same song.",
  },
  {
    question: "Does The Haygoods have a Christmas show?",
    answer: "Yes. The Haygoods Christmas show begins November 3 and runs through the final regular performance on December 29, with the theater dark on December 24 and 25. The New Year's Eve show is sold by phone only, so call us at (417) 243-9629 if you want that date.",
  },
  {
    question: "Are the lasers and pyrotechnics intense?",
    answer: "It is a big, bright, high-energy production with laser effects, pyrotechnics, and aerial stunts, so guests who are sensitive to flashing lights or loud effects should know that going in. Most families, grandparents included, find it thrilling rather than overwhelming.",
  },
  {
    question: "What makes The Haygoods different from other Branson shows?",
    answer: "Six siblings play more than 20 different instruments and move between rock, pop, country, and gospel in a single two-hour performance, backed by lasers, pyrotechnics, and aerial stunts. Over more than two decades and 8,000 shows, that combination has made it Branson's most-attended show.",
  },
  {
    question: "Is the Clay Cooper Theatre wheelchair accessible?",
    answer: "Call us at (417) 243-9629 before you book and we will arrange accessible seating with the theater and answer any questions about the building.",
  },
], isFeaturedPartner: true, externalUrl: "https://thehaygoods.com",
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Rating read from the "The Haygoods" Google listing via the Places API on 2026-09-06
// (4.9 stars, 8625 reviews). Fallback only; the page reads the live value via googlePlaceId.
googleRating: 4.9,
googleReviewCount: 8625,
googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=The%20Haygoods%20Branson%20MO",
googlePlaceId: "ChIJqTog8K0cz4cRSf_frdWO0i4",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Branson's Most-Attended Show for Two Decades",
    paragraphs: ["The Haygoods have been Branson's most-attended and most-talked-about show for more than 20 years, and the reason is simple. Six siblings walk onto the stage at the Clay Cooper Theatre and deliver a full two hours of rock, pop, country, and gospel with more than 20 different instruments, laser effects, pyrotechnics, and aerial stunts. It is the show people mention first when they describe Branson shows to friends back home, and it is the one most visitors book before anything else.", "The numbers back up the reputation. The family has performed over 8,000 shows for more than 7 million fans, and audiences keep coming back because a show that blends this much music with this much spectacle is rare anywhere, let alone from a single family. If you are searching for The Haygoods Branson tickets for 2026, this page books seats directly with the theater, and the calendar shows every date the box office has on sale."],
  },
  {
    heading: "Twenty Instruments, Lasers, and Six Siblings",
    paragraphs: ["Expect a performance that rivals anything you would see in Las Vegas. The six Haygood siblings trade instruments constantly, more than 20 in all, and shift from classic rock anthems to today's biggest hits without slowing down. One number leans country, the next turns to gospel, and the transitions are so smooth that the audience barely notices the genre changed until the song is already underway.", "Layered over the music is the spectacle the show is known for. Dazzling laser effects sweep the room, pyrotechnics punctuate the big moments, and aerial stunts put performers high above the stage. The two hours run without an intermission, and the pace keeps audiences of every age on the edge of their seats from the first note to the last bow."],
  },
  {
    heading: "Planning Your Night at the Clay Cooper Theatre",
    paragraphs: ["The Haygoods perform at the Clay Cooper Theatre, 3216 W 76 Country Blvd, Branson, MO 65616, on Tuesday, Thursday, and Saturday evenings at 7:30 PM, with 2:00 PM matinees added on select dates. The 2026 season runs February through December. The Christmas show starts November 3, the theater is dark October 31 and December 24 and 25, and the final regular show is December 29.", "The show runs about two hours with no intermission. Plan to arrive 30 minutes before showtime so you can park at the theater, get through the lobby, and settle into your seats without rushing. The New Year's Eve performance is sold by phone only, so give us a call if that is the night you are hoping for."],
  },
  {
    heading: "Who Will Love It and Why Book Here",
    paragraphs: ["This is the show for families who want everyone from grandparents to grade schoolers happy in the same row, for couples who like their concerts loud and bright, and for first-time Branson visitors who want to start with the biggest name on the strip. Fans of classic rock, country, and gospel each get their share of the evening, and the stunts and effects fill in the rest. Kids' tickets are available, and the show is recommended for all ages.", "Get Branson Tickets books your seats directly with the theater with no added fees. Your tickets arrive by email, and every order comes with free cancellation up to 24 hours before showtime, so a change of plans on vacation does not cost you anything. Pick a date on the calendar above, or call (417) 243-9629 and a member of our team will help you choose the best night."],
  },
], }, { name: "The Duttons", slug: "the-duttons", tagline: "America's Got Talent Family. Live in Branson", category: ["variety-music", "family", "country-gospel"], theater: "Dutton Family Theater", theaterAddress: "3454 W 76 Country Blvd, Branson, MO 65616", description: "The Duttons are a multi-generational family of professional musicians who captured America's heart as finalists on America's Got Talent. Their Branson show is a non-stop two-hour celebration of music, comedy, and family, featuring every instrument you can imagine, fiddle, mandolin, banjo, guitar, bass, drums, piano, and more, played with virtuoso skill and contagious joy. From bluegrass and country to classical, pop, and patriotic favorites, the Duttons' versatility and tight family harmonies have made them one of Branson's most beloved shows. Family-friendly, wholesome, and genuinely uplifting, a true Branson original.", shortDescription: "America's Got Talent finalists deliver two hours of virtuoso music, comedy, and family fun.", priceFrom: 52.00, priceTo: 52.00, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "afternoon", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: true, featuredOrder: 2, isLimitedEngagement: false, seasonStart: "April", seasonEnd: "December", showTimes: ["Mon 7:30 PM", "Wed 2:00 PM", "Thu 7:30 PM", "Fri 7:30 PM"], darkDays: ["Sunday", "Tuesday", "Saturday"], darkDateRanges: [{ start: "2026-08-20", end: "2026-08-23" }, { start: "2026-11-26", end: "2026-11-26" }, { start: "2026-12-01", end: "2026-12-01" }, { start: "2026-12-17", end: "2026-12-31" }], extraPerformances: [{ date: "2026-10-01", times: ["10:00 AM"] }, { date: "2026-11-03", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-11-04", times: ["7:30 PM"] }, { date: "2026-11-05", times: ["2:00 PM"] }, { date: "2026-11-10", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-11-11", times: ["7:30 PM"] }, { date: "2026-11-17", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-11-18", times: ["7:30 PM"] }, { date: "2026-12-02", times: ["7:30 PM"] }], scheduleNote: "Monday, Thursday, Friday at 7:30 PM and Wednesday at 2:00 PM. Dark August 20 to 23 and Thanksgiving Day. Christmas season adds Tuesday shows and extra evening performances in November. Final 2026 show is December 16. The theater lists a December 1 show at an unconfirmed time, so it is not bookable online until the office confirms it. The Friday 4:00 PM VIP unplugged hour is a separate theater product we do not sell. Verified 2026-08-21 against theduttons.com.", specialOffers: [], tags: ["family-friendly", "variety", "live-music", "americas-got-talent", "multi-generational"], seoKeywords: ["duttons branson", "dutton family theater", "duttons show tickets"], relatedShows: ["the-haygoods", "six", "clay-coopers-country-express"], imageAlt: "The Duttons family performing on stage with multiple instruments at the Dutton Family Theater in Branson", imageUrl: "/shows/the-duttons.jpg", faqs: [
  {
    question: "How long is The Duttons show?",
    answer: "The show runs approximately 2 hours.",
  },
  {
    question: "What are The Duttons show times?",
    answer: "Monday, Thursday & Friday at 7:30 PM. Wednesday at 2:00 PM. Dark on Tuesday, Saturday & Sunday. The Nov/Dec Christmas show schedule may vary.",
  },
  {
    question: "Is The Duttons show appropriate for children?",
    answer: "Absolutely. The Duttons is a wholesome, family-friendly show that audiences of all ages enjoy.",
  },
  {
    question: "What instruments do The Duttons play?",
    answer: "The family plays a huge range of instruments including fiddle, mandolin, banjo, guitar, bass, drums, piano, and more, often switching between them throughout the show.",
  },
  {
    question: "When is The Duttons season?",
    answer: "The Duttons perform in Branson from April through December. During January through March, they perform at their winter theater in Mesa, Arizona.",
  },
  {
    question: "Does The Duttons show have a Christmas edition?",
    answer: "Yes. The Christmas season at the Dutton Family Theater adds Tuesday shows and extra evening performances in November, and the final 2026 show is December 16. Check the calendar above for the exact holiday dates.",
  },
  {
    question: "Is The Duttons a good show for seniors and multi-generation groups?",
    answer: "It is one of the best fits in Branson for a group that spans three generations. The family itself is multi-generational, the humor is wholesome, and the mix of bluegrass, country, classical, pop, and patriotic favorites gives everyone in the row something they know.",
  },
  {
    question: "What makes The Duttons different from other Branson shows?",
    answer: "The performers are a real family, playing in the theater that carries their name on the Branson strip. They reached the finals of America's Got Talent, and the tight family harmonies and constant instrument switching are things you do not get from a hired cast.",
  },
  {
    question: "Is the Dutton Family Theater accessible?",
    answer: "Call us at (417) 243-9629 before you book and we will coordinate accessible seating with the theater and answer any questions about getting around the building.",
  },
], isFeaturedPartner: true, externalUrl: "https://www.theduttons.com/branson", childPriceFrom: 14.00, childPriceTo: 14.00, studentPriceFrom: 18.00, studentPriceTo: 18.00,
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Rating read from the "The Dutton Family Theater" Google listing via the Places API on 2026-09-06
// (4.8 stars, 1746 reviews). Fallback only; the page reads the live value via googlePlaceId.
googleRating: 4.8,
googleReviewCount: 1746,
googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=The%20Dutton%20Family%20Theater%20Branson%20MO",
googlePlaceId: "ChIJ-yqhUpocz4cRkct-svkUhrg",
// bransonshows.com's listed adult rate for this show (their Adult Admission offer),
// captured 2026-09-06; see docs/substantiation/README.md. Re-verify monthly.
competitorPrice: 51.92,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "A Family Band That Became a Branson Institution",
    paragraphs: ["The Duttons are a multi-generational family of professional musicians whose Branson show has become one of the most beloved on the strip. They captured a national audience as finalists on America's Got Talent, and the show they perform at the Dutton Family Theater on West 76 Country Boulevard is a two-hour celebration of music, comedy, and family. If you are comparing Branson shows for 2026, The Duttons Branson show belongs near the top of the list.", "What sets the show apart is how genuine it feels. The harmonies are tight because the singers grew up singing together, the jokes land because the people on stage clearly enjoy each other, and the versatility comes from musicians who play fiddle, mandolin, banjo, guitar, bass, drums, and piano with equal skill. Wholesome, uplifting, and a true Branson original, it is exactly the kind of show people come to Branson to see."],
  },
  {
    heading: "Fiddle, Banjo, Harmony, and Plenty of Laughs",
    paragraphs: ["The music moves fast. One number is a driving bluegrass tune with fiddle and banjo out front, the next is a country ballad, and before long the family shifts into classical pieces, pop favorites, and patriotic songs that bring the room to its feet. The instrument changes never stop, with mandolin, guitar, bass, drums, and piano passing between family members from song to song.", "Comedy runs throughout the show and stays clean enough for any age. The tight family harmonies are the thread that ties everything together, and the contagious joy on stage is the part audiences talk about afterward. It is virtuoso playing delivered with a grin, and it never feels like a recital. Two hours go by quickly when the people on stage are having this much fun."],
  },
  {
    heading: "Planning Your Visit to the Dutton Family Theater",
    paragraphs: ["The Duttons perform at the Dutton Family Theater, 3454 W 76 Country Blvd, Branson, MO 65616. The regular schedule is Monday, Thursday, and Friday at 7:30 PM and Wednesday at 2:00 PM, with the Branson season running April through December. The theater is dark August 20 to 23 and on Thanksgiving Day, the Christmas season adds Tuesday shows and extra November evenings, and the final 2026 show is December 16.", "The performance lasts about two hours. Arrive 30 minutes early to park at the theater and find your seats at an easy pace. From January through March the family performs at their winter theater in Mesa, Arizona, so plan a Branson visit between April and mid December to catch them here. The calendar above shows every date the theater has on sale."],
  },
  {
    heading: "Grandparents, Kids, and Why Book Here",
    paragraphs: ["Book this one for grandparents who grew up on fiddle tunes, for parents who want a show with no worries about content, and for kids who will spend the ride home asking which instrument to learn. Fans of bluegrass and country will feel at home, and anyone who watched the family on America's Got Talent will see why the judges kept them around. Kids' tickets and student tickets are available alongside adult seats.", "When you book The Duttons tickets through Get Branson Tickets, there are no added fees, your tickets arrive by email, and you get free cancellation up to 24 hours before showtime. Pick a date on the calendar above to see what the theater has on sale, or call (417) 243-9629 and we will help you fit the show into the rest of your Branson trip."],
  },
], }, { name: "SIX", slug: "six", tagline: "Six Brothers. Six-Part Harmony. One Unforgettable Show.", category: ["variety-music"], theater: "Pepsi Legends Theater", theaterAddress: "1600 W 76 Country Blvd, Branson, MO 65616", description: "SIX features six real brothers, the Knudsens, in a powerhouse vocal harmony show that spans every genre of music. Using nothing but their voices, no instruments, no tracks, just pure vocal talent, they create a sound so full and rich that audiences often can't believe what they're hearing. From Motown to country, gospel to rock, their six-part harmonies are complemented by world-class choreography, humor, and genuine brotherly chemistry. Named one of Branson's top shows year after year, SIX is a must-see for anyone who appreciates vocal talent and family entertainment at its finest.", shortDescription: "Six brothers, six-part harmony, zero instruments, pure vocal magic that will blow your mind.", priceFrom: 52.99, priceTo: 52.99, childPriceFrom: 29.47, childPriceTo: 29.47, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: true, featuredOrder: 5, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "December", showTimes: ["Mon 8:00 PM", "Tue 3:00 PM", "Wed 8:00 PM", "Thu 3:00 PM", "Fri 8:00 PM", "Sat 3:00 PM"], darkDays: ["Sunday"], darkDateRanges: [{ start: "2026-08-23", end: "2026-09-08" }, { start: "2026-10-03", end: "2026-10-03" }, { start: "2026-10-31", end: "2026-10-31" }, { start: "2026-11-25", end: "2026-11-26" }, { start: "2026-12-15", end: "2026-12-15" }, { start: "2026-12-17", end: "2026-12-17" }, { start: "2026-12-19", end: "2026-12-19" }, { start: "2026-12-24", end: "2026-12-25" }, { start: "2026-12-27", end: "2027-12-31" }], scheduleNote: "Evening shows Monday, Wednesday, and Friday at 8:00 PM. Matinees Tuesday, Thursday, and Saturday at 3:00 PM. Fall season resumes September 9. The Christmas edition begins November 2. Dark Sundays, Thanksgiving November 25 and 26, and December 24 and 25. Online booking runs through December 26; call us for later December dates.", specialOffers: [], tags: ["popular", "family-friendly", "vocal", "harmony", "must-see"], seoKeywords: ["six show branson", "knudsen brothers branson", "branson harmony show"], relatedShows: ["the-haygoods", "the-petersens", "grand-jubilee"], imageAlt: "SIX Hughes Brothers performing vocal harmonies on stage in Branson", imageUrl: "/shows/six.jpg", faqs: [
  {
    question: "Do the SIX brothers really sing without instruments?",
    answer: "Yes! The entire show is performed a cappella, six voices creating every sound you hear, from bass lines to percussion.",
  },
  {
    question: "Where is the SIX show located?",
    answer: "SIX performs at the Pepsi Legends Theater at 1600 W 76 Country Blvd in Branson.",
  },
  {
    question: "Does SIX have a Christmas show?",
    answer: "Yes. The SIX Christmas edition begins November 2 at the Pepsi Legends Theater and runs through December, with the theater dark November 25 and 26 and December 24 and 25. Online booking runs through December 26, so call us at (417) 243-9629 for later December dates.",
  },
  {
    question: "Is SIX a good show for kids and seniors?",
    answer: "It is recommended for all ages. Kids respond to the vocal percussion and choreography, seniors appreciate the Motown, country, and gospel harmonies, and the humor stays family-friendly throughout.",
  },
  {
    question: "What makes SIX different from other Branson shows?",
    answer: "There is not a single instrument or backing track on stage. Six brothers create every note, bass line, and beat with their voices, then add world-class choreography and humor on top. It is a sound most people have never heard live, which is why so many visitors call it a must-see.",
  },
  {
    question: "Is the Pepsi Legends Theater accessible?",
    answer: "Call us at (417) 243-9629 and we will arrange accessible seating with the theater and answer any questions before you book.",
  },
], isFeaturedPartner: true, externalUrl: "https://thesixshow.com",
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Rating read from the "The SIX Show" Google listing via the Places API on 2026-09-06
// (4.7 stars, 920 reviews). Fallback only; the page reads the live value via googlePlaceId.
googleRating: 4.7,
googleReviewCount: 920,
googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=The%20SIX%20Show%20Branson%20MO",
googlePlaceId: "ChIJr16ZTpocz4cRrxRBzB4X-3c",
// bransonshows.com's listed adult rate for this show (their Adult Admission offer),
// captured 2026-09-06; see docs/substantiation/README.md. Re-verify monthly.
competitorPrice: 52.99,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Six Brothers and Not One Instrument",
    paragraphs: ["SIX is the Knudsen brothers, six real brothers who perform a full vocal harmony show at the Pepsi Legends Theater with no instruments and no backing tracks. Everything you hear, from the bass line to the drum beat, comes from six voices, and the sound is so full that first-time audiences often cannot believe it. Named one of Branson's top shows year after year, SIX is one of the names people search for first when they look up Branson shows.", "The show works because the brothers pair that vocal skill with world-class choreography, humor, and the kind of chemistry only siblings have. It spans every genre, from Motown to country and gospel to rock, so there is no single audience it belongs to. Anyone who appreciates vocal talent and family entertainment at its finest will find plenty to enjoy here, and SIX Branson tickets for 2026 are available on this page."],
  },
  {
    heading: "What Six Voices Can Do on Stage",
    paragraphs: ["The first thing you notice is the low end. One brother lays down a bass line, another supplies the percussion, and the remaining voices stack harmonies on top until the arrangement is as full as a band. Then the song changes, and a Motown groove gives way to a country ballad or a gospel number without a single instrument appearing anywhere on the stage.", "Choreography keeps the eyes as busy as the ears. The brothers move together through polished routines, trade lead vocals from song to song, and lean into the humor and brotherly chemistry that give the show its personality. The two hours cover rock, country, gospel, and Motown, and the pace never lets the energy drop between numbers."],
  },
  {
    heading: "Planning Your Visit to the Pepsi Legends Theater",
    paragraphs: ["SIX performs at the Pepsi Legends Theater, 1600 W 76 Country Blvd, Branson, MO 65616. Evening shows are Monday, Wednesday, and Friday at 8:00 PM, and matinees run Tuesday, Thursday, and Saturday at 3:00 PM. The season runs March through December, the fall schedule resumes September 9, and the Christmas edition begins November 2. The theater is dark on Sundays, on Thanksgiving November 25 and 26, and on December 24 and 25.", "Plan on about two hours for the show and arrive 30 minutes early to park at the theater and find your seats without hurrying. Online booking runs through December 26. If you want a date later in December, give us a call and we will check availability with the box office for you. The calendar above lists every performance currently on sale."],
  },
  {
    heading: "Who Will Love SIX and Why Book Here",
    paragraphs: ["SIX is a natural pick for anyone who sings in a choir or grew up on close harmonies, for couples who want a polished evening show, and for families who need something that holds a ten-year-old and a grandparent at the same time. If you love the Motown era, or if you simply want to hear what six trained voices can do together, this is the Branson show to see.", "Get Branson Tickets sells SIX tickets with no added fees, delivers them by email, and includes free cancellation up to 24 hours before showtime on every order. Kids' tickets are available for younger guests, and the show is recommended for all ages. Pick a date on the calendar above to book, or call (417) 243-9629 and we will help you choose between a matinee and an evening show."],
  },
], }, { name: "Clay Cooper's Country Express", slug: "clay-coopers-country-express", tagline: "Country Music, Comedy & Family Fun", category: ["variety-music", "country-gospel"], theater: "Clay Cooper Theatre", theaterAddress: "3216 W 76 Country Blvd, Branson, MO 65616", description: "Clay Cooper's Country Express is a high-energy morning show that packs the house with a winning combination of country music, gospel, comedy, and variety entertainment. Clay and his talented cast of singers, dancers, and musicians deliver a fast-paced show that keeps audiences laughing, clapping, and singing along. With a mix of classic country favorites and modern hits, plus side-splitting comedy routines, this show embodies everything that makes Branson entertainment special. It's the perfect way to start your day on the Branson strip.", shortDescription: "High-energy country, comedy, and variety, the perfect morning show on the strip.", priceFrom: 57.00, priceTo: 57.00, childPriceFrom: 27.00, childPriceTo: 27.00, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: true, featuredOrder: 3, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "December", showTimes: ["Wed 7:30 PM", "Sun 7:30 PM", "Tue 10:00 AM", "Thu 10:00 AM", "Fri 2:00 PM"], darkDays: ["Monday", "Saturday"], darkDateRanges: [{ start: "2026-01-01", end: "2027-12-31" }], extraPerformances: [{ date: "2026-08-26", times: ["7:30 PM"] }, { date: "2026-08-28", times: ["7:30 PM"] }, { date: "2026-08-30", times: ["7:30 PM"] }, { date: "2026-09-02", times: ["7:30 PM"] }, { date: "2026-09-04", times: ["2:00 PM"] }, { date: "2026-09-06", times: ["7:30 PM"] }, { date: "2026-09-09", times: ["7:30 PM"] }, { date: "2026-09-10", times: ["10:00 AM"] }, { date: "2026-09-11", times: ["2:00 PM"] }, { date: "2026-09-13", times: ["7:30 PM"] }, { date: "2026-09-16", times: ["7:30 PM"] }, { date: "2026-09-17", times: ["10:00 AM"] }, { date: "2026-09-20", times: ["7:30 PM"] }, { date: "2026-09-22", times: ["10:00 AM"] }, { date: "2026-09-23", times: ["7:30 PM"] }, { date: "2026-09-24", times: ["10:00 AM"] }, { date: "2026-09-25", times: ["2:00 PM"] }, { date: "2026-09-27", times: ["7:30 PM"] }, { date: "2026-09-29", times: ["10:00 AM"] }, { date: "2026-09-30", times: ["7:30 PM"] }, { date: "2026-10-01", times: ["10:00 AM"] }, { date: "2026-10-02", times: ["2:00 PM"] }, { date: "2026-10-04", times: ["7:30 PM"] }, { date: "2026-10-06", times: ["10:00 AM"] }, { date: "2026-10-08", times: ["10:00 AM"] }, { date: "2026-10-11", times: ["7:30 PM"] }, { date: "2026-10-13", times: ["10:00 AM"] }, { date: "2026-10-14", times: ["7:30 PM"] }, { date: "2026-10-15", times: ["10:00 AM"] }, { date: "2026-10-16", times: ["2:00 PM"] }, { date: "2026-10-18", times: ["7:30 PM"] }, { date: "2026-10-21", times: ["7:30 PM"] }, { date: "2026-10-22", times: ["10:00 AM"] }, { date: "2026-10-23", times: ["2:00 PM"] }, { date: "2026-10-25", times: ["7:30 PM"] }, { date: "2026-10-27", times: ["10:00 AM"] }, { date: "2026-10-28", times: ["7:30 PM"] }, { date: "2026-10-30", times: ["2:00 PM"] }, { date: "2026-11-01", times: ["7:30 PM"] }, { date: "2026-11-03", times: ["10:00 AM"] }, { date: "2026-11-04", times: ["7:30 PM"] }, { date: "2026-11-05", times: ["10:00 AM"] }, { date: "2026-11-06", times: ["2:00 PM"] }, { date: "2026-11-10", times: ["10:00 AM"] }, { date: "2026-11-11", times: ["7:30 PM"] }, { date: "2026-11-12", times: ["10:00 AM"] }, { date: "2026-11-13", times: ["2:00 PM"] }, { date: "2026-11-15", times: ["7:30 PM"] }, { date: "2026-11-17", times: ["10:00 AM"] }, { date: "2026-11-18", times: ["7:30 PM"] }, { date: "2026-11-19", times: ["10:00 AM"] }, { date: "2026-11-20", times: ["2:00 PM"] }, { date: "2026-11-22", times: ["7:30 PM"] }, { date: "2026-11-25", times: ["7:30 PM"] }, { date: "2026-11-27", times: ["2:00 PM"] }, { date: "2026-11-29", times: ["7:30 PM"] }, { date: "2026-12-01", times: ["10:00 AM"] }, { date: "2026-12-02", times: ["7:30 PM"] }, { date: "2026-12-03", times: ["10:00 AM"] }, { date: "2026-12-04", times: ["2:00 PM"] }, { date: "2026-12-06", times: ["7:30 PM"] }, { date: "2026-12-08", times: ["10:00 AM"] }, { date: "2026-12-09", times: ["7:30 PM"] }, { date: "2026-12-10", times: ["10:00 AM"] }, { date: "2026-12-11", times: ["2:00 PM"] }, { date: "2026-12-13", times: ["7:30 PM"] }, { date: "2026-12-16", times: ["7:30 PM"] }, { date: "2026-12-18", times: ["2:00 PM"] }, { date: "2026-12-27", times: ["7:30 PM"] }, { date: "2026-12-30", times: ["7:30 PM"] }], scheduleNote: "Wednesday and Sunday evenings at 7:30 PM, Friday matinees at 2:00 PM from September 4, and 10:00 AM morning shows most Tuesdays and Thursdays from mid September. Some weeks skip individual dates for special events, so check the booking calendar for exact dates. The Ozark Mountain Christmas edition begins November 1. Dark December 19 to 26; final show December 30.", specialOffers: ["Family Passes Available by Phone from the Box Office"], tags: ["family-friendly", "country", "comedy", "morning-show"], seoKeywords: ["clay cooper branson", "branson morning show", "country express branson"], relatedShows: ["the-haygoods", "grand-jubilee", "comedy-jamboree"], imageAlt: "Clay Cooper performing country music on stage in Branson Missouri", imageUrl: "/shows/clay-coopers-country-express.jpg", faqs: [
  {
    question: "What time does Clay Cooper's show start?",
    answer: "The main show is Wednesday and Sunday at 7:30 PM, with Friday evening shows in summer. From September to mid December there are also 10:00 AM shows on Tuesday and Thursday and a 2:00 PM Friday matinee.",
  },
  {
    question: "Does Clay Cooper's Country Express have a Christmas show?",
    answer: "Yes. The Ozark Mountain Christmas edition begins November 1 at the Clay Cooper Theatre and runs until the final show on December 30, with the theater dark December 19 to 26. Pick a November or December date on the calendar above to book the holiday show.",
  },
  {
    question: "What kind of music is in the show?",
    answer: "It is country first, with classic country favorites and modern hits, plus gospel numbers and full variety segments from Clay and his cast of singers, dancers, and musicians. Expect to clap and sing along more than once.",
  },
  {
    question: "Is the comedy clean enough for kids and grandparents?",
    answer: "Yes. The show is recommended for all ages, and the comedy routines are the kind the whole family can laugh at together. It is a favorite for groups that include both kids and grandparents.",
  },
  {
    question: "Can you help with accessible seating at the Clay Cooper Theatre?",
    answer: "Yes. Call us at (417) 243-9629 before you book and we will set up accessible seating with the theater and answer any questions about the building.",
  },
], isFeaturedPartner: true, externalUrl: "https://www.claycoopertheatre.com/clay-coopers-country-express",
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// bransonshows.com's listed adult rate for this show (their Adult Admission offer),
// captured 2026-09-06; see docs/substantiation/README.md. Re-verify monthly.
competitorPrice: 71.15,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Country, Comedy, and Variety on the Branson Strip",
    paragraphs: ["Clay Cooper's Country Express is the show that embodies what Branson entertainment is about. Clay and his cast of singers, dancers, and musicians deliver a fast-paced mix of country music, gospel, comedy, and variety, and they pack the house at the Clay Cooper Theatre doing it. It is high energy from the opening number, and it has visitors laughing, clapping, and singing along before the first few songs are finished.", "The show is best known as a morning show, and the 10:00 AM performances are a favorite way to start a day on the strip. But the schedule also includes evening and matinee performances, so it fits almost any itinerary. For anyone comparing Branson shows in 2026, Clay Cooper's Country Express is the dependable country-and-comedy choice that visitors recommend to their friends."],
  },
  {
    heading: "What You Will See and Hear",
    paragraphs: ["The music runs from classic country favorites to modern hits, with gospel numbers that give the show its heart. Clay leads the cast, the singers keep the harmonies full, and the dancers bring big production numbers to the stage. The pace never lets up, and audiences that came in expecting a quiet morning end up clapping along within minutes.", "Then come the comedy routines, which are side-splitting and squarely family-friendly. The variety segments break up the music and keep the two hours moving, and the whole thing feels less like a concert than a party with a room full of new friends. If you have never seen a Branson show, this is the one people describe when they explain what the town does best."],
  },
  {
    heading: "Planning Your Visit to the Clay Cooper Theatre",
    paragraphs: ["Clay Cooper's Country Express plays at the Clay Cooper Theatre, 3216 W 76 Country Blvd, Branson, MO 65616. The season runs March through December. Evening shows are Wednesday and Sunday at 7:30 PM, Friday matinees at 2:00 PM begin September 4, and 10:00 AM morning shows run most Tuesdays and Thursdays from mid September. Some weeks skip individual dates for special events, so the booking calendar is the best guide to exact dates.", "Plan on a two-hour show. For a 10:00 AM performance, arriving 30 minutes early gives you time to park at the theater and find your seats before the lights go down. The Ozark Mountain Christmas edition begins November 1, the theater is dark December 19 to 26, and the final show of 2026 is December 30."],
  },
  {
    heading: "Country Fans, Families, and Why Book Here",
    paragraphs: ["This is the show for country fans, for groups who want to laugh together, and for families who would rather see a show in the morning and spend the afternoon at the lake. Grandparents love the classic country, kids love the comedy and the dancing, and everyone leaves in a good mood. Kids' tickets are available, and all ages are welcome.", "Booking Clay Cooper's Country Express Branson tickets through Get Branson Tickets means no added fees, tickets delivered by email, and free cancellation up to 24 hours before showtime. Pick a date on the calendar above to see the morning, matinee, and evening options, or call (417) 243-9629 and we will help you find a date that works around the rest of your trip."],
  },
], }, { name: "Legends in Concert", slug: "legends-in-concert", tagline: "The World's Greatest Live Tribute Show", category: ["tribute", "variety-music"], theater: "Pepsi Legends Theater", theaterAddress: "1600 W 76 Country Blvd, Branson, MO 65616", description: "Legends in Concert is the world's longest-running and largest tribute show, bringing the greatest performers in music history back to the stage with jaw-dropping accuracy. Each rotating cast features world-class tribute artists performing as Elvis Presley, Dolly Parton, Michael Jackson, Adele, Garth Brooks, Whitney Houston, and more. These aren't mere impersonators, they're meticulously trained performers who capture the voice, look, and stage presence of each legend. With a live band, backup singers, and Broadway-quality production values, Legends in Concert delivers a concert experience that makes you feel like you're seeing the real thing.", shortDescription: "World-class tribute artists bring music legends back to life with stunning accuracy.", priceFrom: 42.0, priceTo: 53.95, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "February", seasonEnd: "December", showTimes: ["Mon 3:00 PM", "Tue 8:00 PM", "Thu 8:00 PM", "Fri 3:00 PM", "Sat 8:00 PM"], darkDays: ["Wednesday", "Sunday"], scheduleNote: "Matinees Monday and Friday at 3:00 PM. Evening shows Tuesday, Thursday, and Saturday at 8:00 PM, with occasional Sundays. Legends of Country Christmas runs November 1 through January 2.", specialOffers: [], tags: ["popular", "tribute", "elvis", "family-friendly"], seoKeywords: ["legends in concert branson", "branson tribute show", "tribute show branson"], relatedShows: ["hits-of-the-60s", "hot-rods-and-high-heels", "motown-downtown"], imageAlt: "Legends in Concert tribute performers on stage in Branson Missouri", imageUrl: "https://legendsinconcert.com/wp-content/uploads/2023/09/Theater-Complex-edited-scaled.jpg", faqs: [
  {
    question: "Which legends are featured in the current show?",
    answer: "The cast rotates throughout the season. Past performers include tributes to Elvis, Dolly Parton, Michael Jackson, Whitney Houston, and more. Check our schedule for the current lineup.",
  },
  {
    question: "Is Legends in Concert a good show for kids and grandparents together?",
    answer: "Yes. It is an all-ages show, and the two-hour lineup spans several decades of music, so every generation in the family usually has a favorite on the bill.",
  },
  {
    question: "Is there a Christmas version of Legends in Concert?",
    answer: "Yes. Legends of Country Christmas runs November 1 through January 2, giving the tribute format a holiday and country flavor for the season.",
  },
  {
    question: "How is this different from an impersonator show?",
    answer: "The performers are trained tribute artists who work on the voice, look, and stage presence of one legend down to the smallest mannerism. They are backed by a live band and backup singers, which is why it feels like a real concert.",
  },
], isFeaturedPartner: false, externalUrl: "https://legendsinconcert.com/location/branson-mo/",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "The World's Longest-Running Tribute Show",
    paragraphs: ["Legends in Concert Branson brings the biggest names in music history back to the stage, one tribute artist at a time. It bills itself as the world's longest-running and largest tribute show, and the Branson edition at the Pepsi Legends Theater lives up to that reputation. A rotating cast steps into the voices and wardrobes of Elvis Presley, Dolly Parton, Michael Jackson, Adele, Garth Brooks, Whitney Houston, and more, so the lineup you see depends on when you visit.", "What sets this show apart from a typical impersonator act is the training behind each performer. These are working vocalists who have studied the voice, the look, and the stage presence of one legend until the resemblance is uncanny. Backed by a live band and backup singers, with production values the show describes as Broadway quality, the result feels less like a tribute and more like a concert by the real thing. It is a natural fit among Branson shows, where live music and star power have always drawn a crowd."],
  },
  {
    heading: "Hits, Costumes, and a Live Band",
    paragraphs: ["Each legend gets a set of signature hits performed the way audiences remember them, from the costumes down to the mannerisms. One moment the stage belongs to a rhinestone-covered country queen, the next to a pop icon whose dance moves the whole room recognizes. Because the cast rotates through the season, no two visits are quite the same, which gives repeat visitors a reason to come back and catch a legend they missed the first time.", "The live band and backup singers keep the energy up between legends and give the whole show a concert feel. Sound, lighting, and staging are built to a Broadway standard, so the show looks and sounds polished from the opening number to the finale. The full performance runs about two hours. It suits all ages, and grandparents, parents, and kids tend to find at least one legend they can sing along with, which is a big part of the fun."],
  },
  {
    heading: "Visiting the Pepsi Legends Theater",
    paragraphs: ["Legends in Concert plays at the Pepsi Legends Theater, 1600 W 76 Country Blvd, Branson, MO 65616. The 2026 season runs February through December, with matinees Monday and Friday at 3:00 PM and evening shows Tuesday, Thursday, and Saturday at 8:00 PM, plus occasional Sunday performances. From November 1 through January 2 the show becomes Legends of Country Christmas, a holiday edition with a country flavor. Plan to arrive about 30 minutes before showtime to park and settle in.", "Legends in Concert tickets are sold directly by the theater rather than through Get Branson Tickets, so you'll book your seats with the venue. We are still glad to help with everything around it. Call (417) 243-9629 and our team can suggest other Branson shows that pair well with a tribute night, help you fill the days between performances with attractions, and sketch out a full itinerary for your trip."],
  },
], }, { name: "The Petersens", slug: "the-petersens", tagline: "Bluegrass, Folk & Family Harmony", category: ["variety-music", "country-gospel"], theater: "Little Opry Theatre", theaterAddress: "3562 Shepherd of the Hills Expy, Branson, MO 65616", description: "The Petersens are a family band that has taken Branson and the world by storm with their unique blend of bluegrass, folk, and Americana music. Known for their viral YouTube videos with hundreds of millions of views, this talented family brings exceptional musicianship, tight harmonies, and genuine warmth to every performance. From fiddle to banjo, mandolin to guitar, each family member is a multi-instrumentalist who contributes to their signature sound. Their show features original songs alongside creative covers that showcase their incredible musical range.", shortDescription: "Viral YouTube sensation, family bluegrass and folk with millions of fans worldwide.", priceFrom: 41.75, priceTo: 44.75, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "afternoon", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "December", showTimes: ["2:00 PM"], darkDays: ["Sunday", "Monday", "Wednesday", "Friday", "Saturday"], scheduleNote: "Performs Tuesday and Thursday at 2:00 PM, with select additional dates.", specialOffers: [], tags: ["popular", "family-friendly", "bluegrass", "youtube-famous"], seoKeywords: ["petersens branson", "petersens show tickets", "branson bluegrass show"], relatedShows: ["six", "grand-jubilee"], imageAlt: "The Petersens family band performing bluegrass music in Branson", imageUrl: "https://petersenband.com/wp-content/uploads/2021/10/branson-show-full-band-mood-lighting.png", faqs: [
  {
    question: "What kind of music do The Petersens play?",
    answer: "Bluegrass, folk, and Americana, with fiddle, banjo, mandolin, and guitar behind tight family harmonies. The set mixes original songs with creative covers.",
  },
  {
    question: "Is the live show like their YouTube videos?",
    answer: "The videos are how most fans found the band, and the live show delivers that same family sound in person, with two hours of music instead of a few minutes at a time.",
  },
  {
    question: "Is The Petersens show good for young children and seniors?",
    answer: "Yes. It is an all-ages afternoon show built on bluegrass and folk harmony that plays gently for every generation, so grandparents and grandkids enjoy it side by side.",
  },
], isFeaturedPartner: false, externalUrl: "https://petersenband.com",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "A Family Band With a Worldwide Following",
    paragraphs: ["The Petersens Branson show is the live version of something millions of people first discovered online. This family band built a following with YouTube videos that have racked up hundreds of millions of views, and their afternoon show at the Little Opry Theatre lets fans hear those harmonies in the same room. The music is a blend of bluegrass, folk, and Americana, played by family members who each handle more than one instrument.", "What comes through on stage is warmth. The focus stays squarely on the music and the family playing it, and the audience feels invited in rather than performed at. Among Branson shows, it stands out because the performers are also songwriters, with original songs sitting alongside creative covers in the show. If you like string-band music played well, with tight harmonies and genuine personality, this is an easy afternoon to recommend."],
  },
  {
    heading: "Fiddle, Banjo, Mandolin, and Harmony",
    paragraphs: ["Over about two hours you'll hear fiddle, banjo, mandolin, and guitar traded around the family. Because every member plays more than one instrument, the arrangements vary widely from song to song and the sound never settles into a rut. Their original material shows off thoughtful writing, and their covers reinterpret familiar songs in a bluegrass and folk style that often reveals something new in a tune you thought you knew.", "The heart of the show is the vocal blend. Family harmonies have a quality that unrelated singers struggle to match, and the Petersens use it on ballads, gospel-flavored numbers, and up-tempo bluegrass alike. The genuine warmth the family is known for comes across from the stage, which keeps the show relaxed and personal. It is all ages and easy on the ears, so it works for grandparents who grew up on this music and grandkids who found the band on their phones."],
  },
  {
    heading: "Your Afternoon at the Little Opry Theatre",
    paragraphs: ["The Petersens perform at the Little Opry Theatre, 3562 Shepherd of the Hills Expy, Branson, MO 65616. The regular schedule is Tuesday and Thursday at 2:00 PM from March through December, with select additional dates added through the season, so it pays to check the theater's 2026 calendar before you plan your day. Plan on about two hours for the show. Arriving 30 minutes early gives you time to park and get seated without rushing.", "Because this is an afternoon show, it pairs well with an evening performance elsewhere in town, and our team can help you line up both. Tickets for The Petersens are sold directly by the venue, not through Get Branson Tickets. For the rest of your Branson plans, from other shows to attractions and where to eat, call us at (417) 243-9629 and we'll help you build a schedule that makes the most of your visit."],
  },
], }, { name: "Pierce Arrow", slug: "pierce-arrow", tagline: "Comedy, Vocals & the World's Lowest Bass Singer", category: ["variety-music", "comedy"], theater: "Reza Live Theatre", theaterAddress: "645 State Hwy 165, Branson, MO 65616", description: "Pierce Arrow delivers a one-of-a-kind show combining world-class four-part vocal harmony with hilarious comedy. The group's claim to fame includes having the Guinness World Record holder for the lowest bass voice ever recorded. Their show blends smooth vocal performances spanning decades of music with laugh-out-loud comedy sketches that keep the audience in stitches. With tight harmonies that rival any professional quartet and comedy timing that would make headlining comedians jealous, Pierce Arrow offers a complete entertainment experience that appeals to all ages.", shortDescription: "World-record bass voice meets four-part harmony and laugh-out-loud comedy.", priceFrom: 30.0, priceTo: 48.0, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "December", showTimes: ["Mon 2:00 PM", "Tue 8:00 PM", "Thu 2:00 PM", "Fri 8:00 PM"], darkDays: ["Sunday", "Wednesday", "Saturday"], scheduleNote: "Matinees Monday and Thursday at 2:00 PM. Evening shows Tuesday and Friday at 8:00 PM.", specialOffers: ["BOGO: Free 2nd Theater Show with Your Ticket Stub"], tags: ["comedy", "vocal", "family-friendly", "guinness-record"], seoKeywords: ["pierce arrow branson", "branson vocal show", "branson comedy variety"], relatedShows: ["six", "comedy-jamboree", "grand-jubilee"], imageAlt: "Pierce Arrow vocal quartet performing comedy and music in Branson", imageUrl: "https://www.discoverbranson.com/media/products/15710a8d-50c6-4341-8667-f01445b0fea8.jpg", faqs: [
  {
    question: "What kind of music does Pierce Arrow sing?",
    answer: "Four-part vocal harmony covering decades of popular music, from smooth ballads to upbeat favorites, anchored by a bass singer who holds the Guinness World Record for the lowest voice ever recorded.",
  },
  {
    question: "Is the comedy family-friendly?",
    answer: "Yes. The sketches are written to work for all ages, so it is a safe pick for a group with kids, parents, and grandparents in the same row.",
  },
  {
    question: "Is Pierce Arrow more of a concert or a comedy show?",
    answer: "It is both. Vocal sets and comedy sketches trade off throughout the show, so you get a concert's worth of harmony and plenty of laughs in one ticket.",
  },
], isFeaturedPartner: false, externalUrl: "https://piercearrow.com",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Four-Part Harmony Meets Comedy",
    paragraphs: ["Pierce Arrow Branson is a vocal group with a comedy show wrapped around it, or a comedy show with a vocal group at its center, depending on which half you enjoy more. Four-part harmony is the foundation, with smooth vocals covering decades of popular music. Then the sketches start, and the room fills with the kind of laughter you usually only get from a headlining comic. The two halves take turns through the whole show, which keeps the energy high.", "The group's best-known claim to fame is having the Guinness World Record holder for the lowest bass voice ever recorded. Hearing that voice live is something people talk about long after they leave the Reza Live Theatre. Add tight harmonies that hold their own against any professional quartet and comedy timing that keeps every age group laughing, and you have one of the more complete variety experiences among Branson shows."],
  },
  {
    heading: "Smooth Vocals and Big Laughs",
    paragraphs: ["Expect a musical tour that jumps across decades, with the four voices blending on ballads, upbeat classics, and everything in between. The bass notes that anchor the harmony sit lower than most people have ever heard a human voice go, and the group knows exactly when to show that off. The vocal sets are polished without being stiff, and the transitions into comedy are quick, so you never sit through a long lull.", "The comedy comes in sketch form, with bits that break up the music and keep the pace lively. It is written to work for all ages, so parents, grandparents, and kids can laugh at the same jokes without anyone squirming. Plenty of Branson shows offer music, and a few offer comedy, but Pierce Arrow's mix of the two, with a world-record voice on top, is its own thing. It is a two-hour show that feels shorter."],
  },
  {
    heading: "Planning Your Visit to the Reza Live Theatre",
    paragraphs: ["Pierce Arrow performs at the Reza Live Theatre, 645 State Hwy 165, Branson, MO 65616. The season runs March through December, with matinees Monday and Thursday at 2:00 PM and evening shows Tuesday and Friday at 8:00 PM. The show lasts about two hours. Give yourself 30 minutes before curtain to park and find your seats, and you'll be settled in time for the opening number.", "Pierce Arrow tickets are sold by the theater itself, so Get Branson Tickets does not handle seats for this one. What we can do is help with the rest. Since the group offers both afternoon and evening dates, it fits easily into a day with another show or an attraction, and our team at (417) 243-9629 is happy to suggest combinations that work with your dates in 2026."],
  },
], }, { name: "Grand Jubilee", slug: "grand-jubilee", tagline: "Music, Laughter & Good Times", category: ["variety-music"], theater: "Grand Country Music Hall", theaterAddress: "1945 W 76 Country Blvd, Branson, MO 65616", description: "Grand Jubilee is an award-winning variety show that has been entertaining Branson audiences for years with its perfect blend of music, comedy, and showmanship. The show features an incredibly talented cast performing everything from classic country and gospel to rock and pop, all tied together with hilarious comedy segments. Located at the Grand Country Music Hall, one of Branson's premier entertainment venues, Grand Jubilee consistently ranks among the top-rated shows in town. The show's energy and production values make it a must-see for anyone visiting Branson.", shortDescription: "Award-winning variety show with music, comedy, and non-stop entertainment.", priceFrom: 52.99, priceTo: 52.99, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "January", seasonEnd: "December", showTimes: ["7:30 PM"], darkDays: ["Sunday"], darkDateRanges: [{ start: "2026-08-24", end: "2026-09-01" }, { start: "2026-12-24", end: "2026-12-25" }, { start: "2026-12-31", end: "2026-12-31" }], scheduleNote: "Nightly at 7:30 PM except Sundays. Dark August 24 through September 1 and December 24 to 25. December 31 is the theater's separate 9:00 PM New Year's Eve show, not the regular performance. Verified 2026-08-21 against tickets.grandcountry.com.", specialOffers: [], tags: ["variety", "family-friendly", "comedy", "music"], seoKeywords: ["grand jubilee branson", "branson variety show", "grand country music hall show"], relatedShows: ["clay-coopers-country-express", "the-haygoods", "comedy-jamboree"], imageAlt: "Grand Jubilee cast performing variety entertainment in Branson", imageUrl: "/shows/grand-jubilee.jpg", faqs: [
  {
    question: "What kind of show is Grand Jubilee?",
    answer: "It is a variety show built on live music and comedy. The cast moves from classic country and gospel into rock and pop, with comedy segments tying the whole evening together.",
  },
  {
    question: "Is Grand Jubilee good for kids and seniors?",
    answer: "Yes. The show is rated for all ages, the humor is family-friendly, and the mix of familiar songs and quick comedy bits works for grandparents and grandkids sitting in the same row.",
  },
  {
    question: "What makes Grand Jubilee different from other Branson variety shows?",
    answer: "It is an award-winning production that consistently ranks among the top-rated shows in town, and it plays six nights a week from January through December. That combination of quality and availability is hard to find, so it fits almost any travel date.",
  },
  {
    question: "What should I wear, and when should I arrive?",
    answer: "Casual vacation clothes are the norm at Grand Country Music Hall. Plan to arrive about 30 minutes before curtain so you have time to park and get settled.",
  },
], isFeaturedPartner: true, externalUrl: "https://www.grandcountry.com/grand-jubilee", childPriceFrom: 18.14, childPriceTo: 18.14,
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Rating read from the "Grand Jubilee Show" Google listing via the Places API on 2026-09-06
// (4.7 stars, 599 reviews). Fallback only; the page reads the live value via googlePlaceId.
googleRating: 4.7,
googleReviewCount: 599,
googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=Grand%20Jubilee%20Show%20Branson%20MO",
googlePlaceId: "ChIJX_syXlIDz4cRUDEjNgyvky8",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Branson's Award-Winning Variety Show",
    paragraphs: ["Grand Jubilee is the evening show at Grand Country Music Hall, and it has been entertaining Branson audiences for years with its blend of music, comedy, and showmanship. It is an award-winning production that consistently ranks among the top-rated shows in town, which is why so many return visitors put Grand Jubilee Branson at the top of their list before they book anything else. The show plays nearly every night of the year, so it fits a trip in spring, summer, fall, or the Christmas season.", "Part of the appeal is how much ground the show covers in two hours. Rather than settling on a single style, the cast builds the evening out of variety, moving from one number to the next without letting the energy drop. Production values are high, the pacing is quick, and the comedy segments give the audience a chance to catch its breath between songs. If you only have one night in town and want a show that represents what Branson shows do best, this is the safe choice."],
  },
  {
    heading: "From Country and Gospel to Rock and Pop",
    paragraphs: ["Music is the backbone of Grand Jubilee. The cast performs classic country, gospel, rock, and pop, and that range means nearly everyone in the room hears something they grew up with. Expect strong lead vocals and tight group harmonies, with the cast shifting from a gospel standard to a rock number without letting the momentum slip. The arrangements are polished, but the performances still feel personal, which is a big part of how the show has held onto its top-rated reputation year after year.", "Comedy is what ties it all together. Funny segments are woven between the musical numbers, and the humor is the good-natured kind that plays well to a room full of families and tour groups. The jokes land just as well with teenagers as they do with grandparents, and the comedy keeps the show moving rather than stopping it cold for a long routine. By the time the finale arrives, the two hours have gone by faster than most people expect, which is usually the first thing folks mention on the way out."],
  },
  {
    heading: "Grand Country Music Hall and Planning Your Night",
    paragraphs: ["Grand Jubilee plays at Grand Country Music Hall, 1945 W 76 Country Blvd, Branson, MO 65616. The 2026 season runs January through December, nightly at 7:30 PM except Sundays. The theater goes dark August 24 through September 1 and again on December 24 and 25, and December 31 is the theater's separate 9:00 PM New Year's Eve show rather than the regular performance. The show runs about two hours, so an evening curtain still gets you back to the hotel at a reasonable hour, and parking is at the theater.", "Arrive about 30 minutes before the 7:30 PM curtain so you can park at the theater and find your seats without rushing. Evening traffic on 76 Country Boulevard moves slowly in peak season, so leave the hotel a little earlier than you think you need to. The booking calendar above shows every date the theater has on sale for 2026, including the holiday weeks, and dark dates do not appear, so if a night is listed, it is available. Dress is casual, and the whole show takes place indoors, so weather is never a concern."],
  },
  {
    heading: "Who Will Love It and Why Book Here",
    paragraphs: ["Grand Jubilee is for anyone who wants a full evening of entertainment without having to choose between music and comedy. Couples on a getaway, three-generation families, church groups, and bus tours all fill the seats, and the all-ages rating means nobody has to sit this one out. It is also a smart pick for first-time visitors who are not sure what a Branson show is like, because it covers so many styles in one sitting. Fans of country and gospel will feel right at home, and the rock and pop numbers keep the younger crowd engaged.", "Booking Grand Jubilee tickets through Get Branson Tickets is simple. Pick a date on the calendar above, check out in a couple of minutes, and your tickets arrive by email. There are no added fees at checkout, and every ticket comes with free cancellation up to 24 hours before showtime, so a change in plans does not cost you anything. Adult tickets are $46.34 plus tax and kids' tickets are $15.86 plus tax. If you would rather talk to a person, or you are booking for a group, call us at (417) 243-9629 and we will get it handled."],
  },
], }, { name: "Dolly Parton's Stampede", slug: "dolly-partons-stampede", tagline: "Branson's Most Fun Place to Eat!", category: ["dinner-shows", "family"], theater: "Dolly Parton's Stampede", theaterAddress: "1525 W 76 Country Blvd, Branson, MO 65616", description: "Dolly Parton's Stampede is a world-class dinner attraction featuring 32 magnificent horses and a cast of talented trick riders in a 35,000 square foot arena. While you enjoy a four-course feast, including Stampede's famous rotisserie chicken, hickory smoked BBQ pork, corn on the cob, and more, you'll be dazzled by stunning horsemanship, musical performances, aerial acrobatics, and a friendly North vs. South competition. The pre-show experience in the Horse Walk gives you a chance to meet the stars of the show up close. This is dinner and entertainment at its most spectacular.", shortDescription: "32 horses, trick riders, and a four-course feast in a spectacular dinner show experience.", priceFrom: 79.87, priceTo: 85.4, duration: "2.5 hours", ageRecommendation: "All ages", timeOfDay: "evening", mealIncluded: true, mealType: "Four-Course Dinner", isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "February", seasonEnd: "December", showTimes: ["5:30 PM"], darkDays: [], scheduleNote: "Most days at 5:30 PM. Saturdays and peak dates add an 8:00 PM show, plus select 3:00 PM matinees. The Christmas show runs through early January.", specialOffers: [], tags: ["popular", "dinner-show", "family-friendly", "horses", "must-see"], seoKeywords: ["dolly parton stampede branson", "branson dinner show", "stampede branson tickets"], relatedShows: ["showboat-branson-belle", "shepherd-of-the-hills"], imageAlt: "Dolly Parton's Stampede dinner show with horses performing in Branson", imageUrl: "https://dpstampede.com/hs-fs/hubfs/Stampede/stampede-website-assets/images/card-dinner-show.jpg", faqs: [
  {
    question: "What's included with the Stampede ticket?",
    answer: "Your ticket includes the full pre-show experience, the main arena show, and a four-course meal including rotisserie chicken, BBQ pork, corn on the cob, biscuit, soup, and dessert.",
  },
  {
    question: "Can you accommodate dietary restrictions?",
    answer: "Yes, vegetarian and gluten-free options are available. Please notify staff when you arrive.",
  },
  {
    question: "Is the Stampede a good choice for young children?",
    answer: "Yes. It is an all-ages show, and the horses, riders, and arena-sized action hold a child's attention in a way a stage show sometimes cannot. The Horse Walk before the show lets kids see the horses up close.",
  },
  {
    question: "Is there a Christmas version of Dolly Parton's Stampede?",
    answer: "Yes. The Stampede's Christmas show runs through the holiday season and into early January, keeping the horses and the dinner while adding a holiday theme.",
  },
  {
    question: "Do you eat during the show or before it?",
    answer: "During it. The four-course dinner is served while the show is under way, so you eat and watch the riders at the same time.",
  },
], isFeaturedPartner: false, externalUrl: "https://dpstampede.com/branson",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "A Four-Course Dinner Show on Horseback",
    paragraphs: ["Dolly Parton's Stampede Branson is a dinner show built around 32 horses and the trick riders who put them through their paces in a 35,000 square foot arena. The meal is a four-course feast served while the show is under way, so you eat rotisserie chicken and hickory smoked BBQ pork with corn on the cob while riders gallop past. It is dinner and entertainment together, and among Branson shows it is one of the most popular family outings.", "The tagline calls it Branson's most fun place to eat, and it is hard to argue after an evening there. Everything is arranged so that a family can sit together, share a big meal, and watch a show that needs no explanation for kids or grandparents. The evening runs about two and a half hours, which is long enough to feel like a full night out without wearing anyone down."],
  },
  {
    heading: "Horses, Riders, and a Friendly Rivalry",
    paragraphs: ["The heart of the show is horsemanship. Trick riders perform stunts at full speed on 32 horses that are as much the stars as anyone on two legs, and the size of the arena lets them build up real momentum. Between riding segments there are musical numbers and aerial acrobatics, so the show changes pace often. The whole thing is stitched together by a friendly North versus South competition that gives the audience a side to cheer for.", "Before the main show, the Horse Walk gives you a chance to see the horses up close and meet the stars before they take the arena. Then dinner arrives course by course as the show unfolds. The famous rotisserie chicken and hickory smoked BBQ pork are the anchors, with corn on the cob and more alongside. It is a lot of food and a lot of show, and neither one gets in the way of the other."],
  },
  {
    heading: "Planning Your Evening at the Stampede",
    paragraphs: ["Dolly Parton's Stampede is at 1525 W 76 Country Blvd, Branson, MO 65616, in its own arena. The season runs February through December, with most days offering a 5:30 PM show. Saturdays and peak dates add an 8:00 PM performance, and select dates offer a 3:00 PM matinee. From the holidays into early January, the Stampede becomes its Christmas show. Plan on about two and a half hours, and arriving 30 minutes early leaves time to park and take in the Horse Walk before you're seated.", "Stampede Branson tickets are sold directly by the venue, so Get Branson Tickets does not book seats for this show. We do help visitors plan around it. Because the show includes dinner, it takes the place of a restaurant stop, which leaves the afternoon open for a matinee or an attraction. Call our team at (417) 243-9629 and we'll help you fit the Stampede into a full Branson itinerary."],
  },
], }, { name: "Showboat Branson Belle", slug: "showboat-branson-belle", tagline: "Cruise, Dine & Be Entertained on Table Rock Lake", category: ["dinner-shows"], theater: "Showboat Branson Belle", theaterAddress: "4800 Historic State Hwy 165, Branson, MO 65616", description: "Step aboard the Showboat Branson Belle for a unique dining and entertainment cruise on beautiful Table Rock Lake. This 700-passenger paddle wheeler offers a three-course meal paired with a spectacular live show featuring music, comedy, and magic, all while you take in the stunning Ozark Mountain scenery from the water. The cruise lasts approximately two hours, giving you plenty of time to explore the decks, enjoy the views, and be thoroughly entertained. It's one of Branson's most unique experiences and a favorite among visitors.", shortDescription: "Dinner cruise on Table Rock Lake with live entertainment and stunning Ozark views.", priceFrom: 59.87, priceTo: 81.0, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening", mealIncluded: true, mealType: "Three-Course Dinner", isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "December", showTimes: ["4:00 PM", "7:30 PM"], darkDays: ["Monday"], scheduleNote: "Cruise times vary by date: most days sail at 4:00 PM, with 12:30 PM lunch cruises and 7:30 PM dinner cruises on select dates. Check the official calendar before booking.", specialOffers: [], tags: ["dinner-show", "cruise", "scenic", "family-friendly", "unique"], seoKeywords: ["showboat branson belle", "branson dinner cruise", "table rock lake cruise"], relatedShows: ["dolly-partons-stampede", "riga-tonys-murder-mystery"], imageAlt: "Showboat Branson Belle paddlewheel cruising on Table Rock Lake", imageUrl: "https://hfe.widen.net/content/sxarxzpznv/png/SBB22_General_625x355_Boat-Front.png?w=625&h=355&keep=c&crop=yes&color=ffffff00&quality=80&u=vko3qc", faqs: [
  {
    question: "Is a meal included on the Showboat Branson Belle?",
    answer: "Yes. Every sailing includes a three-course meal served on board during the cruise, so it covers your meal as well as the show and the scenery.",
  },
  {
    question: "Is the cruise suitable for young children and seniors?",
    answer: "Yes. It is an all-ages outing, and the combination of a sit-down meal, a variety show, and lake views works for everyone from grandkids to grandparents.",
  },
  {
    question: "Can you go out on the decks during the cruise?",
    answer: "Yes. The roughly two-hour trip leaves time to explore the decks and enjoy the Ozark scenery from the water as well as see the full show.",
  },
], isFeaturedPartner: false, externalUrl: "https://www.silverdollarcity.com/showboat-branson/",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Dinner, a Show, and Table Rock Lake",
    paragraphs: ["The Showboat Branson Belle is a Branson show that leaves the dock. This 700-passenger paddle wheeler cruises Table Rock Lake while you sit down to a three-course meal and a live show, so scenery, dinner, and entertainment happen at the same time. It sails from 4800 Historic State Hwy 165, and it is one of the most distinctive experiences among Branson shows, the kind of outing people describe to friends when they get home.", "What makes the Showboat Branson Belle popular with visitors is how much it packs into roughly two hours. There is the boat itself, a big paddle wheeler with open decks to explore. There is the Ozark Mountain scenery from the water, which changes as the light does. And there is a full show with music, comedy, and magic, plus a proper meal. It is a favorite among visitors for good reason."],
  },
  {
    heading: "Aboard the Paddle Wheeler",
    paragraphs: ["Once the boat pulls away from the landing, the show begins. The entertainment mixes live music, comedy, and magic, so the pace shifts every few minutes and there is something for every taste at the table. Your three-course meal is served during the cruise. Between courses and acts you can step out to the decks for the view, then come back in for the next number without missing much of anything.", "The views are the part no theater can offer. Table Rock Lake is ringed by Ozark hills, and watching them slide past from the deck of a paddle wheeler is a pleasure in itself. The boat carries up to 700 passengers, yet there is room to wander, find a spot at the rail, and take pictures. With about two hours on the water, you can see the whole show, finish your meal, and still spend time outside enjoying the scenery."],
  },
  {
    heading: "Sailing Times and Planning Your Cruise",
    paragraphs: ["The Showboat Branson Belle sails from 4800 Historic State Hwy 165, Branson, MO 65616. The season runs March through December, with no cruises on Mondays. Most days sail at 4:00 PM, and select dates add a 12:30 PM lunch cruise or a 7:30 PM dinner cruise, so check the official calendar for 2026 before you settle on a day. Because the boat leaves on schedule, arrive at least 30 minutes before sailing time to park and board without hurrying.", "Showboat Branson Belle tickets are sold directly by the venue, not through Get Branson Tickets. That said, the cruise is only one piece of a Branson trip, and our team is glad to help with the rest. A 4:00 PM sailing leaves the evening free for a late show back in town, and a lunch cruise pairs well with an afternoon matinee. Call (417) 243-9629 and we'll help you build a day around it."],
  },
], }, { name: "Reza: Edge of Illusion", slug: "reza-edge-of-illusion", tagline: "Mind-Blowing Magic for a New Generation", category: ["magic"], theater: "Reza Live Theatre", theaterAddress: "645 State Hwy 165, Branson, MO 65616", description: "Reza is one of the hottest young illusionists in the world, and his Branson show proves why. Edge of Illusion features grand-scale illusions, mind-reading feats, and audience-interactive magic wrapped in a high-energy, modern production with concert-quality sound, lighting, and video. Unlike old-school magic shows, Reza brings a contemporary edge that appeals to younger audiences while still wowing traditionalists. His illusions have been featured on national television and international stages, and his Branson residency has quickly become one of the most popular attractions in town.", shortDescription: "Young, modern illusionist with grand-scale magic, mind reading, and high-energy production.", priceFrom: 44.95, priceTo: 48.74, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "December", showTimes: ["Wed 8:00 PM", "Thu 8:00 PM", "Sat 2:00 PM", "Sun 8:00 PM"], darkDays: ["Monday", "Tuesday", "Friday"], scheduleNote: "Wednesday, Thursday, and Sunday at 8:00 PM, plus a Saturday 2:00 PM matinee.", specialOffers: ["VIP Backstage Pass: $20 at the Box Office"], tags: ["popular", "magic", "family-friendly", "modern", "interactive"], seoKeywords: ["reza branson", "branson magic show", "edge of illusion branson"], relatedShows: ["rick-thomas"], imageAlt: "Reza performing grand illusion on stage during Edge of Illusion show in Branson", imageUrl: "https://media.bransontourismcenter.com/images/property_galleries/8233_051.jpg", faqs: [
  {
    question: "Is the Reza show scary for young children?",
    answer: "Not at all! Reza's show is family-friendly. While some illusions are dramatic, they're designed to amaze rather than frighten.",
  },
  {
    question: "What makes Edge of Illusion different from a traditional magic show?",
    answer: "It is built like a modern concert, with big sound, lighting, and video behind grand-scale illusions and mind-reading. The pace and style are aimed at a younger crowd without losing longtime magic fans.",
  },
  {
    question: "Will I be asked to take part?",
    answer: "Possibly. Audience interaction is part of the show, and some guests are invited to help with an illusion or a mind-reading piece, which is a big part of the fun.",
  },
  {
    question: "Is there a VIP backstage pass?",
    answer: "Yes. The theater offers a VIP backstage pass at its box office. Ask there when you arrive for what it includes and whether it is available for your date.",
  },
], isFeaturedPartner: false, externalUrl: "https://rezalive.com",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Magic With a Modern Edge",
    paragraphs: ["Reza: Edge of Illusion is a magic show built for today's audience. Reza is one of the hottest young illusionists working, and his Branson residency at the Reza Live Theatre has quickly become one of the most popular attractions in town. The production puts concert-quality sound, lighting, and video behind grand-scale illusions, mind-reading, and magic that pulls the audience into the act. It feels closer to a rock concert than a parlor trick.", "Old-school magic shows lean on a tuxedo and a top hat. Reza Branson goes the other direction, with a contemporary look and pace that appeals to younger audiences while still landing with people who have seen plenty of magic in their lives. His illusions have been featured on national television and on international stages, and he brings that same scale to Branson week after week through a season that runs most of the year."],
  },
  {
    heading: "Grand Illusions and Mind Reading",
    paragraphs: ["The big set pieces are grand-scale illusions, the kind where something large appears, vanishes, or ends up somewhere it could not possibly be. Between them, Reza slows things down for mind-reading feats that leave people in the seats second-guessing what they just saw. Video screens and lighting are part of the design rather than an afterthought, so even the quieter moments have a polished, cinematic look.", "Audience interaction runs through the entire show. Guests are brought into illusions and mind-reading pieces, which means every performance plays a little differently and nobody can be completely sure what is coming next. Despite the dramatic staging, the show is designed for all ages, and it works for families as well as couples and groups looking for a Branson show with more energy than the traditional variety format."],
  },
  {
    heading: "Showtimes and the Reza Live Theatre",
    paragraphs: ["Reza performs at his namesake Reza Live Theatre, 645 State Hwy 165, Branson, MO 65616. The 2026 season runs March through December, with 8:00 PM shows on Wednesday, Thursday, and Sunday and a Saturday matinee at 2:00 PM. Expect the show to run about two hours. Arriving 30 minutes early leaves time to park and find your seats. The theater also sells a VIP backstage pass at its box office, so ask at the window if you'd like to add that.", "Edge of Illusion tickets are sold directly by the theater, so you'll book with the venue rather than through Get Branson Tickets. We can still help with the rest of your trip. A Sunday or midweek evening at Reza's show leaves afternoons free for other Branson shows and attractions, and our team at (417) 243-9629 is happy to help you fill in the days around it."],
  },
], }, { name: "Rick Thomas: Mansion of Dreams", slug: "rick-thomas", tagline: "World-Class Magic with White Tigers", category: ["magic"], theater: "Americana Theatre", theaterAddress: "2905 W 76 Country Blvd, Branson, MO 65616", description: "Rick Thomas has been called one of the top illusionists in the world by critics and fellow magicians alike. His Branson show features spectacular grand illusions, exotic white tigers, beautiful choreography, and a polished production that has made him one of the most in-demand performers in the industry. With over 20 years of touring experience on stages from Las Vegas to China, Rick brings a level of sophistication and spectacle to Branson that is truly world-class. His show combines classic elegance with stunning modern illusions for an unforgettable experience.", shortDescription: "World-class illusionist with grand illusions, white tigers, and Vegas-quality production.", priceFrom: 40.0, priceTo: 65.74, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "December", showTimes: ["8:00 PM"], darkDays: ["Sunday", "Tuesday", "Thursday"], scheduleNote: "Monday, Wednesday, Friday, and Saturday at 8:00 PM.", specialOffers: [], tags: ["magic", "family-friendly", "white-tigers", "elegant"], seoKeywords: ["rick thomas branson", "branson magic show", "illusionist branson"], relatedShows: ["reza-edge-of-illusion"], imageAlt: "Rick Thomas performing grand illusion magic show in Branson Missouri", imageUrl: "https://www.bransonshows.com/images_cache/listingPhotos/1/628508/5413532-VYFW_normal-w_1362-h_0-force_webp.webp", faqs: [
  {
    question: "Are there real white tigers in the show?",
    answer: "Yes. Exotic white tigers are part of Mansion of Dreams and appear as part of the grand illusions.",
  },
  {
    question: "Is Rick Thomas a good show for kids and seniors?",
    answer: "Yes. It is an all-ages show. The tigers and grand illusions keep kids' attention, and the elegant, polished production suits adults who want more than a novelty act.",
  },
  {
    question: "What makes Mansion of Dreams different from other magic shows?",
    answer: "The scale and the polish. Rick Thomas brings more than 20 years of touring experience, exotic white tigers, and choreography that turns each illusion into a production number.",
  },
], isFeaturedPartner: false, externalUrl: "https://www.rickthomas.com",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "A World-Class Illusionist in Branson",
    paragraphs: ["Rick Thomas: Mansion of Dreams is the Branson home of a magician that critics and fellow magicians have called one of the top illusionists in the world. Rick Thomas has spent more than 20 years touring, with stops that run from Las Vegas to China, and that experience shows in a production that is polished from the first illusion to the last. It is an evening show at the Americana Theatre, and it brings a level of sophistication that stands out among Branson shows.", "The word that fits Mansion of Dreams is elegant. The show combines classic stagecraft with modern illusions, and everything around the magic, from the choreography to the staging, is designed to look beautiful as well as baffling. This is a big-stage spectacle rather than a comedy magic act, though it stays warm and welcoming for every age. If you want a magic show with real polish, Rick Thomas Branson is the one to see."],
  },
  {
    heading: "White Tigers and Grand Illusions",
    paragraphs: ["The white tigers are the signature. Exotic animals are rare in a magic show, and seeing them appear on stage is a moment that stays with you. Around the tigers, Rick builds grand illusions on a scale that fills the Americana Theatre stage, with choreography that turns each illusion into a full production number rather than a quick reveal. The staging is as carefully thought out as the trick itself.", "The two hours move between classic elegance and modern illusions, so the show has variety as well as scale. Rick's years of touring show in his stage presence, which is part of why the illusions land so well. The production has a Las Vegas polish, but it never loses the warmth that Branson audiences expect, and it works just as well for grandparents as for kids seeing their first magic show."],
  },
  {
    heading: "Getting to the Americana Theatre",
    paragraphs: ["Mansion of Dreams plays at the Americana Theatre, 2905 W 76 Country Blvd, Branson, MO 65616. The season runs March through December, with 8:00 PM performances on Monday, Wednesday, Friday, and Saturday. The performance runs right around two hours. Arrive 30 minutes before showtime to park and get to your seats, especially on weekends. That extra cushion means you can relax into the evening rather than hurry through the doors as the lights go down.", "Rick Thomas tickets are sold directly by the Americana Theatre, not through Get Branson Tickets, so book your seats with the venue. Our team is still here to help plan the rest of your visit. An 8:00 PM magic show leaves the full afternoon open for a matinee or an attraction, and since Rick Thomas plays four nights a week in 2026, it is easy to fit into almost any itinerary. Call us at (417) 243-9629 for suggestions."],
  },
], }, { name: "Comedy Jamboree", slug: "comedy-jamboree", tagline: "Branson's Funniest Show", category: ["comedy", "variety-music"], theater: "Grand Country Music Hall", theaterAddress: "1945 W 76 Country Blvd, Branson, MO 65616", description: "Comedy Jamboree is Branson's premier comedy show, delivering non-stop laughter with a talented cast of comedians, singers, and entertainers. The show features clean, family-friendly humor that spans generations, from classic vaudeville-style comedy to modern observational humor that has audiences rolling in the aisles. Interspersed with the comedy are impressive musical performances and variety acts that keep the energy high throughout. Located at the Grand Country Music Hall, Comedy Jamboree has been making Branson visitors laugh for years and consistently earns rave reviews.", shortDescription: "Non-stop clean comedy with music and variety. Branson's funniest family show.", priceFrom: 52.99, priceTo: 52.99, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "afternoon", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "January", seasonEnd: "December", showTimes: ["3:00 PM"], darkDays: ["Sunday"], darkDateRanges: [{ start: "2026-08-23", end: "2026-09-01" }, { start: "2026-11-26", end: "2026-11-26" }, { start: "2026-12-24", end: "2026-12-25" }], seasonalDarkWeekdays: [{ day: "Thursday", start: "2026-09-10", end: "2026-12-10" }], scheduleNote: "Daily at 3:00 PM except Sundays. Pauses August 23 through September 1. Thursdays September 10 through December 10 are dark (New South Gospel plays instead), as are Thanksgiving Day and December 24 to 25. Verified 2026-08-21 against tickets.grandcountry.com.", specialOffers: ["$20 Off Your Next Show with Ticket Stub", "Family Pass: $99 (2 Adults + Up to 4 Kids)"], tags: ["comedy", "family-friendly", "clean-humor", "variety"], seoKeywords: ["comedy jamboree branson", "branson comedy show", "funny branson show"], relatedShows: ["yakov-smirnoff", "the-baldknobbers", "pierce-arrow"], imageAlt: "Comedy Jamboree comedians performing at Grand Country Music Hall in Branson", imageUrl: "/shows/comedy-jamboree.jpg", faqs: [
  {
    question: "Is the humor in Comedy Jamboree clean?",
    answer: "Yes! The comedy is clean and family-friendly from start to finish, so you can bring the kids and the grandparents to the same afternoon show and nobody will squirm.",
  },
  {
    question: "Is Comedy Jamboree only comedy, or is there music too?",
    answer: "There is plenty of music. Between the comedy bits, the cast delivers musical performances and variety acts that keep the energy high, so it plays like a full variety show with comedy as the headliner.",
  },
  {
    question: "What kind of comedy should I expect?",
    answer: "The style ranges from classic vaudeville-style routines to modern observational humor, all delivered by a cast of comedians, singers, and entertainers. It is quick and broad enough that every age group in the theater finds something to laugh at.",
  },
  {
    question: "Should I see Comedy Jamboree or Grand Jubilee?",
    answer: "Both play at Grand Country Music Hall, and plenty of visitors see both. Comedy Jamboree is the afternoon show and leans toward laughs, while Grand Jubilee is the evening show with a heavier music mix. If your group's priority is comedy, start here.",
  },
], isFeaturedPartner: true, externalUrl: "https://www.grandcountry.com/comedy-jamboree", childPriceFrom: 18.14, childPriceTo: 18.14,
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Branson's Funniest Afternoon",
    paragraphs: ["Comedy Jamboree bills itself as Branson's funniest show, and it has been making visitors laugh at Grand Country Music Hall for years. The cast is a mix of comedians, singers, and entertainers, and the whole thing is built around clean humor that works for every generation in the room. It is an afternoon show, which makes it easy to pair with an evening performance somewhere else in town, and it consistently earns rave reviews from folks who came expecting a few chuckles and left with sore cheeks.", "Among Branson shows, Comedy Jamboree fills a specific role. Plenty of productions in town include a comedian as a change of pace between songs, but here the laughs are the main event and the music and variety acts are the supporting cast. That balance is why Comedy Jamboree Branson audiences tend to be families with kids of very different ages, or groups who have already seen the big music shows and want something lighter. Two hours later, they usually agree it delivered."],
  },
  {
    heading: "What Happens on Stage",
    paragraphs: ["The comedy comes in several flavors. Some of it is classic vaudeville-style material, the kind of quick-fire routine that has been getting laughs for a century. Some of it is modern observational humor, the sort of thing that has the audience nudging each other because it hits a little close to home. The cast trades off so no single bit runs long, and the pace stays brisk from the opening number to the final bow. Audiences describe it as rolling in the aisles, and that is not much of an exaggeration.", "In between, the singers and entertainers step forward with musical performances and variety acts that keep the energy high. These are not filler. The musical numbers are polished and the variety segments give the show a rhythm, so the audience is never sitting through twenty minutes of the same thing. The result feels less like a stand-up set and more like a full afternoon revue where comedy happens to be the star. If someone in your party is not much of a joke person, they will still have plenty to enjoy."],
  },
  {
    heading: "Getting to Grand Country Music Hall",
    paragraphs: ["Comedy Jamboree plays at Grand Country Music Hall, 1945 W 76 Country Blvd, Branson, MO 65616. The 2026 schedule is daily at 3:00 PM except Sundays, running January through December with a pause from August 23 through September 1. From September 10 through December 10 the Thursday slot goes to New South Gospel, so Comedy Jamboree is dark on Thursdays during the fall, and it also takes Thanksgiving Day and December 24 and 25 off. The show runs about two hours, which leaves time for dinner before an evening show.", "Plan to be at the theater about 30 minutes ahead of the 3:00 PM start. Parking is at the theater, and a mid-afternoon arrival means you avoid the evening rush along the strip. Since the show wraps up around 5:00 PM, many visitors book it as the first half of a double feature and head to a 7:00 or 7:30 PM performance afterward. The calendar above lists only the dates that are on sale, so if you are traveling on a fall Thursday, look at Grand Jubilee that evening or New South Gospel that afternoon instead."],
  },
  {
    heading: "Great for Families, Easy to Book",
    paragraphs: ["Comedy Jamboree is rated for all ages, and it earns that rating honestly. Small children laugh at the physical comedy, teenagers catch the observational jokes, and grandparents appreciate that nothing on stage would make them wince in front of the grandkids. It is a natural fit for family reunions, church groups, and anyone traveling with a wide spread of ages. Couples enjoy it too, especially those who want a lighter afternoon after a morning of shopping or a day on the lake.", "Comedy Jamboree tickets from Get Branson Tickets come with free cancellation up to 24 hours before showtime, and we never tack on service fees at checkout. Pick a date on the calendar above, and your tickets are delivered by email. Kids' tickets are priced well below the adult rate, which makes this an easy afternoon to book for a big family without a second thought. Questions about seating, accessibility, or group sizes are welcome by phone at (417) 243-9629, and we are happy to help you line up the rest of your Branson shows while we are at it."],
  },
], }, { name: "Yakov Smirnoff", slug: "yakov-smirnoff", tagline: "What a Country!", category: ["comedy"], theater: "Yakov Smirnoff Theatre", theaterAddress: "470 State Hwy 248, Branson, MO 65616", description: "The legendary comedian Yakov Smirnoff brings his unique brand of humor, rooted in his experience as a Russian immigrant discovering the wonders (and absurdities) of American life, to his own theater in Branson. His show is a masterful blend of stand-up comedy, storytelling, and audience interaction that goes beyond just laughs. Yakov weaves in themes of love, happiness, and gratitude that leave audiences feeling both entertained and uplifted. With his trademark catchphrase 'What a country!' and decades of performing experience, Yakov delivers a show that is as heartwarming as it is hilarious.", shortDescription: "Legendary comedian's hilarious and heartwarming show about American life and love.", priceFrom: 42.95, priceTo: 49.5, duration: "2 hours", ageRecommendation: "12+", timeOfDay: "evening", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "May", seasonEnd: "November", showTimes: ["7:30 PM"], darkDays: ["Sunday", "Monday", "Tuesday", "Friday"], scheduleNote: "Wednesdays at 7:30 PM May through September, adding Thursdays and Saturdays in October and November. Final 2026 show is November 21.", specialOffers: [], tags: ["comedy", "stand-up", "legendary", "heartwarming"], seoKeywords: ["yakov smirnoff branson", "branson stand-up comedy", "yakov show tickets"], relatedShows: ["comedy-jamboree", "the-baldknobbers"], imageAlt: "Yakov Smirnoff performing stand-up comedy at his theater in Branson", imageUrl: "https://yakov.com/wp-content/uploads/2025/10/yakoffbranson@2x-1024x600.png", faqs: [
  {
    question: "Is Yakov Smirnoff's show appropriate for children?",
    answer: "The show is recommended for ages 12 and up. The humor and the themes of love, happiness, and gratitude are aimed at adults, so it lands best with teens and grown-ups.",
  },
  {
    question: "Is it just stand-up comedy?",
    answer: "No. Stand-up is the backbone, but Yakov mixes in storytelling and audience interaction, and he weaves in themes of love and gratitude that leave people feeling uplifted as well as entertained.",
  },
  {
    question: "Does Yakov still do the 'What a country' material?",
    answer: "Yes. His view of American life through the eyes of a Russian immigrant is still the foundation of the show, and the famous catchphrase makes its appearance.",
  },
], isFeaturedPartner: false, externalUrl: "https://yakov.com",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "A Comedy Legend With His Own Theater",
    paragraphs: ["Yakov Smirnoff Branson is the rare comedy show where the comedian's name is on the building. Yakov performs in his own theater on State Highway 248, and the show is built on the humor that made him famous, a Russian immigrant's view of the wonders and absurdities of American life. Decades of performing have sharpened the material, and the trademark catchphrase still gets its moment. This is a comedy show with heart as well as punchlines.", "What sets Yakov apart from a straight stand-up act is what happens between the jokes. His show blends stand-up, storytelling, and audience interaction, and along the way he works in themes of love, happiness, and gratitude that give the evening real warmth. Audiences leave both entertained and uplifted, which makes it one of the more heartfelt options among Branson shows. It is recommended for ages 12 and up, so it suits a grown-up night out."],
  },
  {
    heading: "Laughs, Stories, and a Little Wisdom",
    paragraphs: ["The first thing you notice is how quickly the laughs come. Yakov's material about arriving in America and puzzling over its habits still works because the observations are sharp and the delivery is warm. Then the show shifts. Stories take over from setups and punchlines, and Yakov turns to what he has learned about love and happiness, drawing the audience into the conversation rather than talking at them.", "Audience interaction is a big part of the two hours, and it keeps every performance a little different. The humor is aimed at adults and older teens, with the show recommended for ages 12 and up, so it is a better fit for a couples' night or a group of friends than for a family with small children. When the famous 'What a country!' line finally arrives, the whole room is ready for it."],
  },
  {
    heading: "A Night at the Yakov Smirnoff Theatre",
    paragraphs: ["Yakov performs at the Yakov Smirnoff Theatre, 470 State Hwy 248, Branson, MO 65616. His 2026 season runs May through November, and the schedule is lighter than a nightly show, so plan around it. Wednesdays at 7:30 PM are the standard from May through September, with Thursdays and Saturdays added in October and November. The final 2026 show is November 21. The show runs about two hours, and arriving 30 minutes early gives you time to park and settle in.", "Yakov Smirnoff tickets are sold directly by his theater, so Get Branson Tickets does not book seats for this show. We can still be useful for everything else. With Yakov playing mostly Wednesday nights, many visitors build the rest of the week around other Branson shows, and our team at (417) 243-9629 can help you choose ones that suit your group and line up the evenings so nothing overlaps."],
  },
], }, { name: "DAVID at Sight & Sound Theatres", slug: "sight-and-sound-david", tagline: "Experience the Bible Like Never Before", category: ["theatrical"], theater: "Sight & Sound Theatres", theaterAddress: "1001 Shepherd of the Hills Expy, Branson, MO 65616", description: "Sight & Sound Theatre brings the Bible to life on a massive 300-foot stage that wraps around the audience for a truly immersive experience. Their current production features a cast of over 60 actors, live animals, stunning sets, and state-of-the-art technology that creates a theatrical experience unlike anything else in the world. With productions that have included 'Moses,' 'David,' 'Jesus,' and 'Miracle of Christmas,' Sight & Sound has become one of Branson's most visited attractions. The sheer scale and artistry of these productions, with Broadway-quality acting, original music, and breathtaking special effects, make this a must-see experience.", shortDescription: "Biblical epic on a 300-foot wrap-around stage with 60+ actors and live animals.", priceFrom: 58.0, priceTo: 78.0, duration: "2.5 hours", ageRecommendation: "All ages", timeOfDay: "afternoon", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "October", showTimes: ["3:30 PM", "7:30 PM"], darkDays: ["Sunday", "Monday"], scheduleNote: "Tuesday through Saturday at 3:30 PM and 7:30 PM (Thursdays usually matinee only), with 11:30 AM shows on many Saturdays. Final DAVID performance is October 8, 2026. Miracle of Christmas runs November 3 to December 31.", specialOffers: ["Group Discounts for 15 or More"], tags: ["must-see", "theatrical", "biblical", "family-friendly", "spectacular"], seoKeywords: ["sight and sound branson", "sight sound theatre branson", "branson biblical show"], relatedShows: ["shepherd-of-the-hills", "bransons-christmas-wonderland"], imageAlt: "Sight & Sound Theatres' live stage production of DAVID in Branson, the biblical shepherd-king in dramatic spotlight", imageUrl: "https://sst-prod.cdn.sight-sound.com/assets/34104474-142d-458a-8d8e-13910bf478b5?width=1200&quality=100&format=auto", faqs: [
  {
    question: "How big is the Sight & Sound stage?",
    answer: "The stage wraps around the audience at 300 feet, creating a fully immersive experience. It's one of the largest stages in the country.",
  },
  {
    question: "Is DAVID suitable for young children?",
    answer: "Yes. It is an all-ages production, and the live animals, huge sets, and constant movement on stage hold children's attention through a long show.",
  },
  {
    question: "Are there really live animals on stage?",
    answer: "Yes. Live animals are part of the production and move through the action alongside the cast of more than 60 actors.",
  },
  {
    question: "Is there a Christmas show at Sight & Sound in 2026?",
    answer: "Yes. After DAVID closes on October 8, Miracle of Christmas runs November 3 through December 31 on the same 300-foot stage.",
  },
], isFeaturedPartner: false, externalUrl: "https://www.sight-sound.com/shows/david",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Biblical Theater on a Massive Scale",
    paragraphs: ["DAVID at Sight & Sound Theatres is a biblical epic staged on a scale that is hard to picture until you are sitting in front of it. Sight & Sound brings Bible stories to life on a 300-foot stage that wraps around the audience, with a cast of more than 60 actors, live animals, and technology that most theaters could only dream of. The current production tells the biblical story of David, and it is among the most visited attractions in Branson.", "Sight & Sound Branson has become known for productions like Moses, David, Jesus, and Miracle of Christmas, each built with original music, Broadway-quality acting, and special effects that would be at home in a major touring show. DAVID continues that tradition. It is a faith-based story, but the storytelling and stagecraft are strong enough that it plays as a full theatrical event for anyone who enjoys live theater on a grand scale."],
  },
  {
    heading: "Sets, Animals, and Original Music",
    paragraphs: ["The stage wraps around the audience, so scenes unfold beside you as well as in front of you. Sets change on a scale that feels architectural, and live animals move through the action to make the ancient world feel real. The cast of more than 60 fills those sets with movement, which gives the big crowd scenes a weight that smaller productions cannot match. It is theater designed to surround you rather than sit at a distance.", "Original music carries the story, with songs written for the production. Add special effects designed to make the biggest moments in David's life feel as dramatic on stage as they read on the page, and the two and a half hours pass quickly. It is all ages, and families often find it works for children, parents, and grandparents at once, since the spectacle keeps kids engaged while the story speaks to adults."],
  },
  {
    heading: "Planning Your Visit to Sight & Sound",
    paragraphs: ["Sight & Sound Theatres is at 1001 Shepherd of the Hills Expy, Branson, MO 65616. DAVID runs March through October, Tuesday through Saturday at 3:30 PM and 7:30 PM, with Thursdays usually matinee only and 11:30 AM shows on many Saturdays. The final DAVID performance is October 8, 2026. After that, Miracle of Christmas runs November 3 through December 31. The show lasts about two and a half hours, so arrive 30 minutes early to park and find your seats in a theater this large.", "Sight & Sound tickets are sold directly by the theater, not through Get Branson Tickets. Because it is an afternoon or evening commitment of nearly three hours once you count arrival, it is worth planning the rest of the day around it, and our team is glad to help. Call (417) 243-9629 and we can suggest Branson shows and attractions that fit around a DAVID performance, whether you are in town for a weekend or a full week."],
  },
], }, { name: "Spirit of America", slug: "spirit-of-america", tagline: "A Patriotic Celebration of America", category: ["variety-music"], theater: "King's Castle Theatre", theaterAddress: "2701 W 76 Country Blvd, Branson, MO 65616", description: "Spirit of America is a stirring patriotic tribute show that celebrates the best of American music, history, and values. Featuring a talented cast of singers, dancers, and musicians, the show takes audiences on a musical journey through America's greatest moments, from classic patriotic anthems to pop culture favorites that defined generations. Veterans and military personnel are honored in a moving tribute segment, and the show's high-energy performances and genuine emotion make it one of Branson's most popular and beloved productions.", shortDescription: "Stirring patriotic tribute celebrating American music, history, and heroes.", priceFrom: 48.92, priceTo: 48.92, childPriceFrom: 23.98, childPriceTo: 23.98, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "afternoon", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "November", showTimes: ["Sun 8:00 PM", "Tue 2:00 PM", "Wed 10:00 AM"], darkDays: ["Monday", "Thursday", "Friday", "Saturday"], darkDateRanges: [{ start: "2026-01-01", end: "2027-12-31" }], extraPerformances: [{ date: "2026-08-30", times: ["8:00 PM"] }, { date: "2026-09-01", times: ["2:00 PM"] }, { date: "2026-09-02", times: ["10:00 AM"] }, { date: "2026-09-06", times: ["8:00 PM"] }, { date: "2026-09-08", times: ["2:00 PM"] }, { date: "2026-09-09", times: ["10:00 AM"] }, { date: "2026-09-13", times: ["8:00 PM"] }, { date: "2026-09-15", times: ["2:00 PM"] }, { date: "2026-09-16", times: ["10:00 AM"] }, { date: "2026-09-20", times: ["8:00 PM"] }, { date: "2026-09-22", times: ["2:00 PM"] }, { date: "2026-09-23", times: ["10:00 AM"] }, { date: "2026-09-27", times: ["8:00 PM"] }, { date: "2026-09-29", times: ["2:00 PM"] }, { date: "2026-09-30", times: ["10:00 AM"] }, { date: "2026-10-04", times: ["8:00 PM"] }, { date: "2026-10-06", times: ["2:00 PM"] }, { date: "2026-10-07", times: ["10:00 AM"] }, { date: "2026-10-08", times: ["10:00 AM"] }, { date: "2026-10-11", times: ["8:00 PM"] }, { date: "2026-10-13", times: ["2:00 PM"] }, { date: "2026-10-14", times: ["10:00 AM"] }, { date: "2026-10-15", times: ["8:00 PM"] }, { date: "2026-10-18", times: ["8:00 PM"] }, { date: "2026-10-20", times: ["2:00 PM"] }, { date: "2026-10-21", times: ["10:00 AM"] }, { date: "2026-10-25", times: ["8:00 PM"] }, { date: "2026-11-07", times: ["10:00 AM"] }, { date: "2026-11-09", times: ["8:00 PM"] }, { date: "2026-11-10", times: ["8:00 PM"] }, { date: "2026-11-18", times: ["2:00 PM"] }], scheduleNote: "Sunday at 8:00 PM, Tuesday at 2:00 PM, and Wednesday at 10:00 AM through late October, plus select Thursday and November dates at varying times. Season ends November 18.", specialOffers: ["$15 Off Each Ticket on a 2nd Show Within 7 Days"], tags: ["patriotic", "family-friendly", "music", "tribute"], seoKeywords: ["spirit of america branson", "branson patriotic show", "branson veteran tribute"], relatedShows: ["clay-coopers-country-express", "grand-jubilee"], imageAlt: "Spirit of America patriotic show performance in Branson Missouri", imageUrl: "/shows/spirit-of-america.jpg", faqs: [
  {
    question: "Is there a tribute to veterans in Spirit of America?",
    answer: "Yes. Veterans and military personnel are honored in a moving tribute segment during the show. If you are bringing a veteran to Branson, this is the show to choose for them.",
  },
  {
    question: "What kind of music is in the show?",
    answer: "It ranges from classic patriotic anthems to the pop culture favorites that defined different generations, performed by a cast of singers, dancers, and musicians. Expect familiar songs and plenty of chances to sing along.",
  },
  {
    question: "Is Spirit of America good for young kids and seniors?",
    answer: "Yes, it is recommended for all ages. The show is upbeat and easy to follow, seniors connect with the history and the tribute segment, and the dancing and big production numbers keep kids interested.",
  },
  {
    question: "How do I arrange accessible seating at King's Castle Theatre?",
    answer: "Call us at (417) 243-9629 before you book. We will coordinate with the theater to set up accessible seating and answer any questions about the building.",
  },
], isFeaturedPartner: true, externalUrl: "https://www.kingscastletheatre.com/schedules/",
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "A Patriotic Celebration on the Branson Strip",
    paragraphs: ["Spirit of America is a patriotic tribute show that celebrates the best of American music, history, and values. A talented cast of singers, dancers, and musicians takes the audience through America's greatest moments, from classic patriotic anthems to the pop culture favorites that defined generations. It plays at King's Castle Theatre on West 76 Country Boulevard and has become one of the most popular and beloved productions among Branson shows.", "Branson has always had a soft spot for patriotic shows, and this one earns its reputation with genuine emotion behind every number. The tribute to veterans and military personnel is the moment audiences talk about most, and the high-energy performances around it keep the show moving. Spirit of America Branson tickets for 2026 are available on this page for the March through November season."],
  },
  {
    heading: "Anthems, Pop Favorites, and a Salute to Veterans",
    paragraphs: ["The show is built on American music and keeps widening the lens. Classic patriotic anthems get the full treatment from the singers, while the dancers bring big, bright production numbers to the stage. Then the pop culture favorites arrive, songs that defined one generation after another, and the room starts singing along without being asked, one familiar chorus at a time.", "The emotional center is the tribute segment, where veterans and military personnel are honored. It is a moving few minutes that often leaves the room quiet before the applause starts. The rest of the two hours balances that with high-energy performances, so you leave the theater feeling proud and lifted rather than somber. It is a show with real heart."],
  },
  {
    heading: "Planning Your Visit to King's Castle Theatre",
    paragraphs: ["Spirit of America performs at King's Castle Theatre, 2701 W 76 Country Blvd, Branson, MO 65616. The regular schedule through late October is Sunday at 8:00 PM, Tuesday at 2:00 PM, and Wednesday at 10:00 AM, with select Thursday and November dates at varying times. The season runs March through November, and the final performance of 2026 is November 18.", "Plan on about two hours for the show and arrive 30 minutes early to park at the theater and find your seats. The 10:00 AM Wednesday show is a good choice if you want the rest of the day free, while the Sunday 8:00 PM performance suits a weekend trip. Check the calendar above for the November dates, since those times vary."],
  },
  {
    heading: "For Veterans, Families, and Anyone Who Loves America",
    paragraphs: ["Bring a veteran and you will understand why this show is a Branson favorite. It is also a strong pick for families who want their kids to hear the songs and stories behind the flag, for church and community groups, and for anyone who likes a show with heart. The music is familiar, the message is uplifting, and it is recommended for all ages, with kids' tickets available.", "Get Branson Tickets books Spirit of America tickets with no added fees, sends them by email, and includes free cancellation up to 24 hours before showtime. Pick a date on the calendar above to see the Sunday, Tuesday, and Wednesday options, or call (417) 243-9629 and we will help you find the best date for your group."],
  },
], }, { name: "#1 Hits of the 60's", slug: "hits-of-the-60s", tagline: "Relive the Greatest Decade in Music", category: ["tribute", "variety-music"], theater: "Clay Cooper Theatre", theaterAddress: "3216 W 76 Country Blvd, Branson, MO 65616", description: "Take a trip back in time to the greatest decade in popular music with #1 Hits of the 60's. This high-energy show features a talented cast performing the chart-topping hits that defined a generation, from the British Invasion to Motown, surf rock to folk. Hear the songs of The Beatles, The Supremes, The Beach Boys, Simon & Garfunkel, and many more performed live with incredible authenticity and energy. The show's costumes, choreography, and attention to period detail transport you straight back to the swinging sixties.", shortDescription: "Chart-topping hits from the greatest decade in music, performed with authentic 60s energy.", priceFrom: 39.95, priceTo: 44.0, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "afternoon", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "December", showTimes: ["2:00 PM"], darkDays: ["Monday", "Wednesday", "Friday"], scheduleNote: "Tuesday, Thursday, and Saturday at 2:00 PM. Sunday shows run in September and October only.", specialOffers: [], tags: ["tribute", "60s", "classic-rock", "nostalgia"], seoKeywords: ["60s hits branson", "branson oldies show", "sixties music branson"], relatedShows: ["legends-in-concert", "hot-rods-and-high-heels", "motown-downtown"], imageAlt: "60s music tribute show with performers in period costumes in Branson", imageUrl: "https://images.squarespace-cdn.com/content/v1/53bc0a8ee4b054e2f4ed8f0d/2c5a6ff8-8c30-41fd-87c0-c34ba15239b6/60s_2026.PNG", faqs: [
  {
    question: "What music is in #1 Hits of the 60's?",
    answer: "Chart-topping songs from across the decade, including the music of The Beatles, The Supremes, The Beach Boys, and Simon & Garfunkel, covering the British Invasion, Motown, surf rock, and folk.",
  },
  {
    question: "Is the show good for grandchildren as well as grandparents?",
    answer: "Yes. It is an all-ages show, and the songs are ones most kids have heard at home or in movies, so families often enjoy it together.",
  },
  {
    question: "Do the performers dress the part?",
    answer: "Yes. Period costumes and choreography are part of the show, with attention to detail that helps take you back to the sixties.",
  },
], isFeaturedPartner: false, externalUrl: "https://www.1hitsofthe60s.com",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "The Greatest Decade in Music, Live",
    paragraphs: ["#1 Hits of the 60's Branson is a full afternoon of chart-toppers from the decade that changed popular music. The show covers the whole spread, from the British Invasion to Motown, surf rock to folk, and the cast performs it live with the kind of energy those songs had when they were new. If you grew up with a transistor radio, this is your music. If you didn't, it is a two-hour crash course in why everyone else did.", "The show plays at the Clay Cooper Theatre on West 76 Country Boulevard, and it is an afternoon matinee, which suits a relaxed vacation day. The songs of The Beatles, The Supremes, The Beach Boys, Simon & Garfunkel, and many more are performed with authenticity and care rather than as a novelty, and the costumes and choreography are done with real attention to period detail. Among Branson shows built on nostalgia, this one is squarely about the music."],
  },
  {
    heading: "Beatles to Motown to Surf Rock",
    paragraphs: ["Expect the hits and only the hits. The British Invasion material brings the mop-top energy of the early Beatles era, then the show slides into the polish and rhythm of Motown, with The Supremes' sound front and center. Surf rock gets its turn with Beach Boys harmonies, and the folk side of the decade comes through in Simon & Garfunkel style ballads. The chart-topping theme is the whole point, and the cast never strays far from it.", "What sells it is the presentation. The costumes match the period, and the choreography suits the era, so a Motown number looks like Motown as well as sounding like it. The energy stays high across the full two hours, and since it is an all-ages show, it works for three generations in a row, with grandparents singing along and grandkids discovering where their favorite bands got their ideas."],
  },
  {
    heading: "Matinee Planning at the Clay Cooper Theatre",
    paragraphs: ["#1 Hits of the 60's plays at the Clay Cooper Theatre, 3216 W 76 Country Blvd, Branson, MO 65616. The season runs March through December, with 2:00 PM matinees on Tuesday, Thursday, and Saturday, and Sunday performances added in September and October only. The matinee runs about two hours. Arriving 30 minutes early leaves time to park and get seated, and a 2:00 PM start means you'll be out in time for dinner and an evening show.", "Tickets for #1 Hits of the 60's are sold directly by the Clay Cooper Theatre rather than through Get Branson Tickets. We are happy to help you plan around it. A sixties matinee pairs naturally with an evening show, and our team at (417) 243-9629 can suggest Branson shows in 2026 that round out the day, whether you want more music, comedy, or something for the grandkids."],
  },
], }, { name: "Hot Rods & High Heels", slug: "hot-rods-and-high-heels", tagline: "Classic Cars, Classic Rock & Roll", category: ["tribute", "variety-music"], theater: "Clay Cooper Theatre", theaterAddress: "3216 W 76 Country Blvd, Branson, MO 65616", description: "Hot Rods & High Heels takes you back to the golden age of rock and roll with a high-octane show that celebrates the music, cars, and culture of the 1950s and 60s. The energetic cast performs the greatest hits from Elvis, Chuck Berry, Jerry Lee Lewis, Buddy Holly, and more, with authentic choreography and costumes that transport you to the era of sock hops and drive-in movies. It's a non-stop party that gets audiences out of their seats dancing and singing along to the music that started it all.", shortDescription: "High-energy 50s and 60s rock and roll celebration with classic cars and dancing.", priceFrom: 46.00, priceTo: 46.00, childPriceFrom: 22.00, childPriceTo: 22.00, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "afternoon", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "April", seasonEnd: "December", showTimes: ["Mon 2:00 PM", "Wed 10:00 AM", "Fri 10:00 AM"], darkDays: ["Tuesday", "Thursday", "Saturday", "Sunday"], darkDateRanges: [{ start: "2026-08-26", end: "2026-08-31" }, { start: "2026-11-09", end: "2026-11-09" }, { start: "2026-12-12", end: "2026-12-27" }, { start: "2026-12-31", end: "2027-12-31" }], extraPerformances: [{ date: "2026-08-26", times: ["2:00 PM"] }, { date: "2026-08-28", times: ["2:00 PM"] }, { date: "2026-08-31", times: ["2:00 PM"] }, { date: "2026-11-09", times: ["10:00 AM"] }], scheduleNote: "Matinees Monday at 2:00 PM and Wednesday and Friday at 10:00 AM. Through August 31 all shows are at 2:00 PM. Dark December 12 to 27; final shows December 28 and 30.", specialOffers: [], tags: ["rock-and-roll", "50s", "60s", "dancing", "nostalgia"], seoKeywords: ["hot rods high heels branson", "branson rock and roll show", "50s show branson"], relatedShows: ["hits-of-the-60s", "legends-in-concert", "classic-rock-icons"], imageAlt: "Hot Rods and High Heels rock and roll show performers in Branson", imageUrl: "/shows/hot-rods-and-high-heels.jpg", faqs: [
  {
    question: "What music is in Hot Rods & High Heels?",
    answer: "It is the rock and roll of the 1950s and 60s, with the greatest hits made famous by Elvis, Chuck Berry, Jerry Lee Lewis, Buddy Holly, and more. If you remember sock hops and drive-in movies, you will know most of the songs by the first few notes.",
  },
  {
    question: "Is it a good show for kids and seniors?",
    answer: "Yes. The show is recommended for all ages. Seniors get the music they grew up with, and kids enjoy the energy, the costumes, and the dancing, so it works well for a three-generation group.",
  },
  {
    question: "Will I be expected to get up and dance?",
    answer: "Only if you want to. The cast gets audiences out of their seats dancing and singing along, but plenty of guests stay put and clap from their chairs. Either way, wear something comfortable.",
  },
  {
    question: "What if someone in my group uses a wheelchair or needs an aisle seat?",
    answer: "Give us a call at (417) 243-9629 before you book. We will work with the theater to reserve accessible seating and answer any questions about getting in and around the building.",
  },
], isFeaturedPartner: true, externalUrl: "https://www.claycoopertheatre.com/hot-rods-and-high-heels",
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Rating read from the "Hot Rods & High Heels 1950's show" Google listing via the Places API on 2026-09-06
// (4.8 stars, 54 reviews). Fallback only; the page reads the live value via googlePlaceId.
googleRating: 4.8,
googleReviewCount: 54,
googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=Hot%20Rods%20%26%20High%20Heels%201950's%20show%20Branson%20MO",
googlePlaceId: "ChIJw5u86wEdz4cR80FnJPjhAwQ",
// bransonshows.com's listed adult rate for this show (their Adult Admission offer),
// captured 2026-09-06; see docs/substantiation/README.md. Re-verify monthly.
competitorPrice: 53.85,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Rock and Roll's Golden Age, Live in Branson",
    paragraphs: ["Hot Rods & High Heels takes the audience back to the golden age of rock and roll, when the music was new, the cars had fins, and Saturday night meant a sock hop or a drive-in movie. The show celebrates the music, cars, and culture of the 1950s and 60s at the Clay Cooper Theatre, with an energetic cast performing the greatest hits from Elvis, Chuck Berry, Jerry Lee Lewis, Buddy Holly, and more.", "Among Branson shows, this is the one that turns into a party. Authentic choreography and period costumes set the scene, and by the middle of the show the cast has the crowd out of their seats singing along to the songs that started it all. If you are looking for Hot Rods & High Heels Branson tickets for 2026, the calendar on this page shows every daytime performance the theater has on sale."],
  },
  {
    heading: "The Hits That Started It All",
    paragraphs: ["Picture the songs that filled a 1950s jukebox and you have the idea. The cast tears through the greatest hits of Elvis, Chuck Berry, Jerry Lee Lewis, and Buddy Holly, along with more from the era, with the kind of energy those songs were written for. The choreography is authentic to the period, and the costumes look like they came straight out of a sock hop.", "It is a non-stop party from the first number. Classic cars are part of the theme, high heels are part of the title, and audience participation is part of the fun, with guests up dancing and singing along by the end. There is no slow stretch to sit through, and the two hours move as quickly as the music that inspired them."],
  },
  {
    heading: "Daytime Shows at the Clay Cooper Theatre",
    paragraphs: ["Hot Rods & High Heels is a daytime show at the Clay Cooper Theatre, 3216 W 76 Country Blvd, Branson, MO 65616. The season runs April through December. Through August 31 every performance is at 2:00 PM. From September the schedule is Monday at 2:00 PM and Wednesday and Friday at 10:00 AM, which makes it easy to pair with an evening show elsewhere on the strip.", "The show lasts about two hours. Arriving 30 minutes before showtime leaves time to park at the theater and find your seats, and a morning show leaves the whole afternoon free for the rest of Branson. The theater is dark December 12 to 27, and the final shows of the year are December 28 and 30, so check the calendar above for exact December dates."],
  },
  {
    heading: "A Show for Anyone Who Remembers the 50s",
    paragraphs: ["This is a natural choice for anyone who came of age with rock and roll, for car buffs who love the hot rod era, and for families who want a show grandparents and grandkids can enjoy together. It is upbeat, familiar, and easy to follow, and it suits a daytime slot well. Kids' tickets are available and the show is recommended for all ages.", "Book through Get Branson Tickets and you pay no added fees, receive your tickets by email, and get free cancellation up to 24 hours before showtime. Pick a date on the calendar above to choose a 2:00 PM or 10:00 AM performance, or call (417) 243-9629 and we will help you line it up with the rest of your Branson plans."],
  },
], }, { name: "Motown Downtown", slug: "motown-downtown", tagline: "The Sound of a Generation", category: ["tribute", "variety-music"], theater: "Branson Hot Hits Theatre", theaterAddress: "206 S Commercial St, Branson, MO 65616", description: "Motown Downtown brings the legendary sound of Motown Records to Branson with a show that celebrates the greatest music of the soul era. From The Temptations to The Supremes, Stevie Wonder to Marvin Gaye, the talented cast delivers powerful vocal performances that capture the magic of these iconic artists. With authentic choreography, period-perfect costumes, and a live band that nails every note, Motown Downtown transports you to the Motor City for an unforgettable evening of music and nostalgia.", shortDescription: "Motown's greatest hits performed live with powerful vocals and authentic choreography.", priceFrom: 34.95, priceTo: 38.95, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "February", seasonEnd: "December", showTimes: ["7:30 PM"], darkDays: ["Monday", "Tuesday"], scheduleNote: "7:30 PM. Sunday shows run April through December; February and March are Friday and Saturday only.", specialOffers: [], tags: ["motown", "soul", "tribute", "dancing"], seoKeywords: ["motown branson", "branson soul music show", "motown tribute branson"], relatedShows: ["hits-of-the-60s", "legends-in-concert", "hot-rods-and-high-heels"], imageAlt: "Motown Downtown performers singing soul music on stage in Branson", imageUrl: "https://www.bransonshows.com/images_cache/listingPhotos/1/579654/5413619-dmUU_normal-w_1362-h_0-force_webp.webp", faqs: [
  {
    question: "What kind of music is in Motown Downtown?",
    answer: "It is a tribute to the Motown Records catalog and the soul era, with songs made famous by The Temptations, The Supremes, Stevie Wonder, and Marvin Gaye. Everything is sung live with a live band behind the cast.",
  },
  {
    question: "Is Motown Downtown a good fit for seniors and for kids?",
    answer: "Yes on both counts. The show is recommended for all ages, and the dancing and familiar songs hold attention across generations, though the people who grew up with this music tend to enjoy it most.",
  },
  {
    question: "Is the band live or is the music recorded?",
    answer: "The music is live. A band backs the singers through the whole show, which is a big part of why the arrangements sound so close to the original records.",
  },
], isFeaturedPartner: false, externalUrl: "https://www.bransonhothits.com",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "The Motown Sound in Downtown Branson",
    paragraphs: ["Motown Downtown brings the sound of Motown Records to Branson, and it does it with a full cast rather than a single impersonator. The show celebrates the great soul era, with music made famous by The Temptations, The Supremes, Stevie Wonder, and Marvin Gaye. If you grew up with those records on the radio, this is the Branson show built for you. The songs are performed live, with vocals that aim for the power and polish of the originals.", "Motown Downtown plays the Branson Hot Hits Theatre on Commercial Street in downtown Branson, which fits a show named for the Motor City's most famous label. The choreography follows the style of the era, the costumes are period-perfect, and a live band handles every note. It is a tribute in the truest sense, a celebration of the artists and the songs rather than a parody of them. For many visitors it becomes the evening they talk about on the drive home."],
  },
  {
    heading: "What You Will See and Hear",
    paragraphs: ["Expect the songs that defined the soul era, delivered by a cast that sings and dances at the same time. The vocal arrangements lean on the close harmonies and call-and-response style that made the Motown label famous, and the live band gives the rhythm section the punch that recorded tracks never quite match. Songs made famous by The Temptations and The Supremes sit alongside the work of Stevie Wonder and Marvin Gaye, so the evening moves between smooth group numbers and big solo moments.", "The choreography is a big part of the fun. Synchronized steps, spins, and the kind of sharp suits and shimmering gowns that defined the era give the stage a look to match the sound. The costumes are period-perfect, so the picture keeps changing as the set list moves through the catalog. The show runs about two hours and is suited to all ages, though the audience tends to be people who remember these songs from the first time around and want to hear them sung right."],
  },
  {
    heading: "Branson Hot Hits Theatre and Planning Your Visit",
    paragraphs: ["The Branson Hot Hits Theatre is at 206 S Commercial St in downtown Branson, which makes it easy to pair the show with dinner downtown beforehand. Performances start at 7:30 PM, and the season runs February through December. In February and March the show plays Friday and Saturday only, and Sunday performances join the schedule from April through the end of the year. The theater is dark on Mondays and Tuesdays. Plan on about two hours for the show, and arrive 30 minutes early so you have time to park and find your seats.", "Motown Downtown tickets are sold directly by the Branson Hot Hits Theatre rather than through Get Branson Tickets, so you will book your seats with the venue. We are still glad to help with everything around it. If you are building a week of Branson shows for 2026, call us at (417) 243-9629 and we can suggest what pairs well with a soul music night downtown, from a morning show to a dinner show on the strip."],
  },
], }, { name: "The Baldknobbers", slug: "the-baldknobbers", tagline: "Branson's Original Show Since 1959", category: ["comedy", "variety-music", "country-gospel"], theater: "Hughes Brothers Theatre", theaterAddress: "3425 W 76 Country Blvd, Branson, MO 65616", description: "The Baldknobbers hold a special place in Branson history as the show that started it all. Since 1959, this legendary family show has been entertaining audiences with a unique blend of country music, comedy, and family fun that laid the foundation for Branson's entire entertainment industry. Now in its third generation of the Mabe family, The Baldknobbers continue to deliver the kind of genuine, heartfelt entertainment that made Branson famous. Their show features impressive musicianship, hilarious comedy characters, and a warmth that makes every audience member feel like family.", shortDescription: "Branson's original show since 1959, three generations of country, comedy, and family fun.", priceFrom: 44.95, priceTo: 49.95, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "December", showTimes: ["Mon 8:00 PM", "Wed 2:00 PM", "Thu 2:00 PM", "Fri 8:00 PM"], darkDays: ["Tuesday", "Saturday", "Sunday"], scheduleNote: "Monday and Friday at 8:00 PM, Wednesday and Thursday at 2:00 PM. Tuesday 10:00 AM shows added during the November and December Christmas season.", specialOffers: ["Family Pass: $119.10 (2 Adults + Up to 4 Kids)"], tags: ["historic", "family-friendly", "comedy", "country", "original"], seoKeywords: ["baldknobbers branson", "branson original show", "oldest branson show"], relatedShows: ["comedy-jamboree", "clay-coopers-country-express", "grand-jubilee"], imageAlt: "The Baldknobbers performing Branson's original show with comedy and music", imageUrl: "https://www.baldknobbers.com/img/baldknobbers-2024.jpg", faqs: [
  {
    question: "Is The Baldknobbers a good show for kids and grandparents together?",
    answer: "It is one of the easiest Branson shows to bring three generations to. The show is recommended for all ages, the comedy is clean, and the country music is familiar enough that grandparents sing along while kids laugh at the characters.",
  },
  {
    question: "Does The Baldknobbers have a Christmas season?",
    answer: "Yes. The show runs through the November and December Christmas season, when the theater adds extra Tuesday morning performances to the regular lineup.",
  },
  {
    question: "What makes The Baldknobbers different from other Branson shows?",
    answer: "History, mostly. The Mabe family has been performing in Branson since 1959, the show is now run by the third generation, and the country-and-comedy format they created became the template for nearly every Branson show that followed.",
  },
], isFeaturedPartner: false, externalUrl: "https://baldknobbers.com",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Where Branson's Show Business Began",
    paragraphs: ["The Baldknobbers hold a place in Branson history that no other show can claim. The Mabe family started performing in 1959, before Branson was known as a show town, and the mix of country music, comedy, and family fun they settled on became the pattern for the entire Branson entertainment industry. When people call The Baldknobbers Branson's original show, they mean it literally. Everything that came later on 76 Country Boulevard owes something to what this family built.", "The show is now in its third generation of the Mabe family, and that continuity shows in the room. The Baldknobbers were never about flash. The draw has always been genuine, heartfelt entertainment, the kind that makes a first-time visitor feel like family within a few songs. For anyone putting together a list of Branson shows to see in 2026, this is the one that explains where all the others came from."],
  },
  {
    heading: "Country Music, Comedy Characters, and Heart",
    paragraphs: ["A Baldknobbers show moves between two things the Mabe family does well. The first is music. Expect classic country played by musicians who take the songs seriously, with tight harmonies and the kind of playing that makes a room lean forward. Impressive musicianship is the backbone of the evening, and it gives the show a foundation that never depends on gimmicks. The second is comedy, and it arrives in the form of characters who carry on a tradition the family has kept alive since 1959.", "The comedy is broad, clean, and aimed at every age in the seats, so grandparents and grandkids laugh at the same bits. What ties the music and the jokes together is warmth. The performers talk to the audience like neighbors, and by the end of the two hours the theater feels less like a venue and more like a family reunion where the family happens to be very talented. That feeling is the reason so many visitors come back on every Branson trip."],
  },
  {
    heading: "Hughes Brothers Theatre and Planning Your Visit",
    paragraphs: ["The Baldknobbers perform at the Hughes Brothers Theatre, 3425 W 76 Country Blvd, right on the main Branson strip. The schedule mixes evenings and afternoons. Monday and Friday shows start at 8:00 PM, and Wednesday and Thursday shows are 2:00 PM matinees, which suits visitors who prefer daylight driving. During the November and December Christmas season the theater adds Tuesday shows at 10:00 AM. The season runs March through December, the show lasts about two hours, and arriving 30 minutes early gives you time to park and get seated without hurrying.", "Tickets for The Baldknobbers are sold directly by the Hughes Brothers Theatre, so book your seats with the venue. Get Branson Tickets does not sell this show, but our team helps visitors plan full Branson itineraries every day, and a call to (417) 243-9629 is the easiest way to fit Branson's original show in alongside the other Branson shows you want to see. We can help you line up a matinee here with a dinner show elsewhere on the same day."],
  },
], }, { name: "Amazing Acrobats of Shanghai", slug: "amazing-acrobats-of-shanghai", tagline: "Gravity-Defying Feats of Skill & Artistry", category: ["acrobats"], theater: "Mickey Gilley Grand Shanghai Theatre", theaterAddress: "3455 W 76 Country Blvd, Branson, MO 65616", description: "The Amazing Acrobats of Shanghai (also known as the Grand Shanghai Circus) bring breathtaking Chinese acrobatic artistry to Branson in a spectacular show that defies the laws of gravity. Trained since childhood, these world-class acrobats perform feats that seem humanly impossible, from daring high-wire acts and aerial silk performances to incredible contortion, juggling, and balancing acts. The show features stunning costumes, dramatic lighting, and original music that creates a Cirque-style experience at a fraction of the price. It's consistently rated as one of Branson's most impressive shows.", shortDescription: "World-class Chinese acrobats performing gravity-defying feats in a Cirque-style show.", priceFrom: 48.00, priceTo: 48.00, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: true, featuredOrder: 1, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "December", showTimes: ["2:00 PM", "7:30 PM"], darkDays: [], darkDateRanges: [{ start: "2026-08-21", end: "2027-06-30" }], extraPerformances: [{ date: "2026-08-21", times: ["7:30 PM"] }, { date: "2026-08-22", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-08-23", times: ["7:30 PM"] }, { date: "2026-08-24", times: ["7:30 PM"] }, { date: "2026-08-25", times: ["2:00 PM"] }, { date: "2026-08-26", times: ["7:30 PM"] }, { date: "2026-08-27", times: ["7:30 PM"] }, { date: "2026-08-28", times: ["7:30 PM"] }, { date: "2026-08-29", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-08-30", times: ["7:30 PM"] }, { date: "2026-08-31", times: ["7:30 PM"] }, { date: "2026-09-01", times: ["2:00 PM"] }, { date: "2026-09-02", times: ["7:30 PM"] }, { date: "2026-09-03", times: ["7:30 PM"] }, { date: "2026-09-04", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-09-05", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-09-06", times: ["7:30 PM"] }, { date: "2026-09-07", times: ["7:30 PM"] }, { date: "2026-09-09", times: ["7:30 PM"] }, { date: "2026-09-10", times: ["2:00 PM"] }, { date: "2026-09-11", times: ["2:00 PM"] }, { date: "2026-09-12", times: ["10:00 AM", "7:30 PM"] }, { date: "2026-09-13", times: ["7:30 PM"] }, { date: "2026-09-14", times: ["7:30 PM"] }, { date: "2026-09-15", times: ["2:00 PM"] }, { date: "2026-09-16", times: ["7:30 PM"] }, { date: "2026-09-17", times: ["7:30 PM"] }, { date: "2026-09-18", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-09-19", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-09-20", times: ["7:30 PM"] }, { date: "2026-09-21", times: ["7:30 PM"] }, { date: "2026-09-22", times: ["2:00 PM"] }, { date: "2026-09-23", times: ["7:30 PM"] }, { date: "2026-09-24", times: ["7:30 PM"] }, { date: "2026-09-25", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-09-26", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-09-27", times: ["7:30 PM"] }, { date: "2026-09-28", times: ["7:30 PM"] }, { date: "2026-09-29", times: ["2:00 PM"] }, { date: "2026-09-30", times: ["7:30 PM"] }, { date: "2026-10-01", times: ["7:30 PM"] }, { date: "2026-10-02", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-10-03", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-10-04", times: ["7:30 PM"] }, { date: "2026-10-05", times: ["7:30 PM"] }, { date: "2026-10-06", times: ["2:00 PM"] }, { date: "2026-10-07", times: ["7:30 PM"] }, { date: "2026-10-08", times: ["7:30 PM"] }, { date: "2026-10-09", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-10-10", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-10-11", times: ["7:30 PM"] }, { date: "2026-10-12", times: ["7:30 PM"] }, { date: "2026-10-14", times: ["7:30 PM"] }, { date: "2026-10-15", times: ["2:00 PM"] }, { date: "2026-10-16", times: ["2:00 PM"] }, { date: "2026-10-17", times: ["7:30 PM"] }, { date: "2026-10-18", times: ["7:30 PM"] }, { date: "2026-10-19", times: ["7:30 PM"] }, { date: "2026-10-20", times: ["2:00 PM"] }, { date: "2026-10-21", times: ["7:30 PM"] }, { date: "2026-10-22", times: ["7:30 PM"] }, { date: "2026-10-23", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-10-24", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-10-25", times: ["7:30 PM"] }, { date: "2026-10-26", times: ["7:30 PM"] }, { date: "2026-10-27", times: ["2:00 PM"] }, { date: "2026-10-28", times: ["7:30 PM"] }, { date: "2026-10-29", times: ["7:30 PM"] }, { date: "2026-10-30", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-10-31", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-11-01", times: ["7:30 PM"] }, { date: "2026-11-02", times: ["2:00 PM"] }, { date: "2026-11-04", times: ["7:30 PM"] }, { date: "2026-11-05", times: ["10:00 AM", "2:00 PM"] }, { date: "2026-11-06", times: ["10:00 AM", "2:00 PM"] }, { date: "2026-11-07", times: ["7:30 PM"] }, { date: "2026-11-08", times: ["7:30 PM"] }, { date: "2026-11-09", times: ["7:30 PM"] }, { date: "2026-11-10", times: ["2:00 PM"] }, { date: "2026-11-11", times: ["7:30 PM"] }, { date: "2026-11-12", times: ["10:00 AM", "2:00 PM"] }, { date: "2026-11-13", times: ["10:00 AM", "2:00 PM"] }, { date: "2026-11-14", times: ["7:30 PM"] }, { date: "2026-11-15", times: ["7:30 PM"] }, { date: "2026-11-16", times: ["10:00 AM", "7:30 PM"] }, { date: "2026-11-17", times: ["2:00 PM"] }, { date: "2026-11-18", times: ["7:30 PM"] }, { date: "2026-11-19", times: ["2:00 PM"] }, { date: "2026-11-20", times: ["7:30 PM"] }, { date: "2026-11-21", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-11-22", times: ["7:30 PM"] }, { date: "2026-11-23", times: ["7:30 PM"] }, { date: "2026-11-24", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-11-25", times: ["7:30 PM"] }, { date: "2026-11-26", times: ["7:30 PM"] }, { date: "2026-11-27", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-11-28", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-11-29", times: ["7:30 PM"] }, { date: "2026-11-30", times: ["2:00 PM"] }, { date: "2026-12-01", times: ["7:30 PM"] }, { date: "2026-12-02", times: ["2:00 PM"] }, { date: "2026-12-03", times: ["7:30 PM"] }, { date: "2026-12-04", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-12-05", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-12-06", times: ["7:30 PM"] }, { date: "2026-12-07", times: ["7:30 PM"] }, { date: "2026-12-09", times: ["7:30 PM"] }, { date: "2026-12-10", times: ["7:30 PM"] }, { date: "2026-12-11", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-12-12", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-12-13", times: ["7:30 PM"] }, { date: "2026-12-14", times: ["7:30 PM"] }, { date: "2026-12-16", times: ["7:30 PM"] }, { date: "2026-12-17", times: ["7:30 PM"] }, { date: "2026-12-18", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-12-19", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-12-20", times: ["7:30 PM"] }, { date: "2026-12-21", times: ["7:30 PM"] }, { date: "2026-12-23", times: ["7:30 PM"] }, { date: "2026-12-24", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-12-25", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-12-26", times: ["2:00 PM", "7:30 PM"] }, { date: "2026-12-27", times: ["7:30 PM"] }, { date: "2026-12-28", times: ["7:30 PM"] }, { date: "2026-12-30", times: ["7:30 PM"] }, { date: "2026-12-31", times: ["2:00 PM", "7:30 PM"] }, { date: "2027-01-01", times: ["2:00 PM", "7:30 PM"] }, { date: "2027-01-02", times: ["2:00 PM", "7:30 PM"] }, { date: "2027-01-20", times: ["2:00 PM"] }], scheduleNote: "Irregular calendar, so every bookable date is listed explicitly from the theater's own schedule: most days 7:30 PM, many 2:00 PM matinees, Tuesdays matinee only, select 10:00 AM mornings. Season runs through January 2 plus a January 20 matinee. Verified 2026-08-21 against tickets.grandshanghaitheatre.com.", specialOffers: [], tags: ["acrobats", "family-friendly", "spectacular", "cirque-style"], seoKeywords: ["acrobats shanghai branson", "branson acrobat show", "chinese acrobats branson"], relatedShows: ["reza-edge-of-illusion", "the-haygoods"], imageAlt: "Two Amazing Acrobats of Shanghai performers balancing in a one-hand stand on stage in Branson", imageUrl: "/shows/amazing-acrobats-of-shanghai.jpg",
// g1-g8 pulled from the show's Google Business Profile 2026-08-31 at William's
// direction (guest photos; photographers credited in the alt text below).
galleryImages: ["/shows/amazing-acrobats-of-shanghai.jpg", "/shows/amazing-acrobats-of-shanghai-troupe.jpg", "/shows/amazing-acrobats-of-shanghai/g1.jpg", "/shows/amazing-acrobats-of-shanghai/g2.jpg", "/shows/amazing-acrobats-of-shanghai/g3.jpg", "/shows/amazing-acrobats-of-shanghai/g4.jpg", "/shows/amazing-acrobats-of-shanghai/g5.jpg", "/shows/amazing-acrobats-of-shanghai/g6.jpg", "/shows/amazing-acrobats-of-shanghai/g7.jpg", "/shows/amazing-acrobats-of-shanghai/g8.jpg"],
galleryImageAlts: [
"Two Amazing Acrobats of Shanghai performers balancing in a one-hand stand on stage in Branson",
"The Amazing Acrobats of Shanghai troupe on stage",
"Human pyramid act under red stage lights (guest photo by Ruthann Kelley)",
"Aerial silks duet in purple light (guest photo by Shawnda Starr)",
"Unicycle balancing act on a giant candy ball (guest photo by Shawnda Starr)",
"Aerial hoop act in front of a Great Wall backdrop (guest photo by Misty)",
"Balancing act with cherry-blossom staging (guest photo by Dave Cipriani)",
"Chair-stacking balance act under blue light (guest photo by Barbara Williams)",
"Full stage with LED valley backdrop (guest photo by Matthew Aubin Cooper)",
"Comedy performer on stage (guest photo by Deepak Patil)",
],
galleryNote: "Includes guest photos from the show's Google listing.",
videoUrl: "https://player.vimeo.com/video/944634045", kidsFreeUnderAge: 3,
// Rating read from the "Shanghai Circus" Google Business Profile listing on 2026-08-31
// (4.6 stars, 265 reviews: 208 five-star / 31 four-star). Refresh these when they drift.
googleRating: 4.6, googleReviewCount: 265, googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=Shanghai%20Circus%20Branson%20MO", googlePlaceId: "ChIJXy2f9pQcz4cRZtdOC0DD2Lg",
faqs: [
{ question: "How long is the Amazing Acrobats of Shanghai show?", answer: "About 2 hours. Plan to arrive 30 minutes early to park and find your seats." },
{ question: "Is the show good for kids?", answer: "Yes! It's one of Branson's most family-friendly shows, and the nonstop acrobatics hold even young kids' attention. Children 3 and under are admitted free." },
{ question: "What do tickets cost?", answer: "Adult tickets are $41.98 plus tax and kids are $21.86 plus tax. There are no added fees, and your total never tops the theater box office rate. Children 3 and under are free." },
{ question: "What if our plans change?", answer: "You can cancel for a full refund up to 24 hours before showtime. Need a different date instead? Call us at (417) 243-9629 and we'll switch it." },
{ question: "How do we get our tickets?", answer: "Everything is delivered by email, and your confirmation arrives immediately after you book. Just show your tickets on your phone at the theater box office; nothing to print." },
{ question: "When are showtimes?", answer: "Most days at 7:30 PM, with 2:00 PM matinees on many dates and occasional 10:00 AM morning shows. The booking calendar shows every date the theater has on sale." },
{ question: "Where does the show play?", answer: "At the Mickey Gilley Grand Shanghai Theatre, 3455 W 76 Country Blvd, right on the Branson strip. Parking is available at the theater." },
],
isFeaturedPartner: true, externalUrl: "https://tickets.grandshanghaitheatre.com/show/shanghai-circus", childPriceFrom: 25.00, childPriceTo: 25.00,
// bransonshows.com's listed adult rate for this exact show, captured 2026-09-05
// (their cart shows $57/adult, "Normally $114.00" for 2). Re-verify monthly.
competitorPrice: 57,
demandBadges: true,
familyBundle: true,
bogo50: true,
bookingPageV2: true,
detailSections: [
{ heading: "From Shanghai to the Branson Strip", paragraphs: [
"The Amazing Acrobats of Shanghai, also known as the Grand Shanghai Circus and remembered by many longtime Branson visitors as the Acrobats of China, carry on a Chinese acrobatic tradition that stretches back more than two thousand years. The performers train from childhood in disciplines that demand strength, balance, and timing measured in fractions of a second, and the result on stage looks less like a routine and more like the laws of physics taking the night off.",
"Branson has hosted Chinese acrobatic troupes for decades, and this production is the standard bearer of that tradition on the Strip today. The show pairs its acrobatics with stunning costumes, dramatic lighting, and original music, creating a Cirque-style spectacle at a fraction of the big-city price.",
], imageUrl: "/shows/amazing-acrobats-of-shanghai/acrobats-of-china-branson-hand-balancing-act.jpg", imageAlt: "Hand balancing act on canes at the Amazing Acrobats of Shanghai in Branson" },
{ heading: "What You Will See on Stage", paragraphs: [
"Every performance is a parade of acts that seem humanly impossible. Aerial silk artists climb and spiral high above the stage. Contortionists fold themselves through shapes that make the audience gasp and laugh in the same breath. Balancing acts stack chairs, spin plates, and hold poses that would be difficult standing on solid ground, let alone atop a swaying tower.",
"Add daring high-wire work, precision juggling, and group tumbling routines where a dozen bodies fly in perfect synchronization, and the two hours move fast. There is no language barrier anywhere in the show. It is entirely visual, which is part of why it works for every generation in the seats.",
], imageUrl: "/shows/amazing-acrobats-of-shanghai/amazing-acrobats-of-shanghai-branson-juggling-act.jpg", imageAlt: "Acrobat juggling a glowing ball at the Shanghai Circus in Branson" },
{ heading: "The Mickey Gilley Grand Shanghai Theatre", paragraphs: [
"The show plays at the Mickey Gilley Grand Shanghai Theatre at 3455 W 76 Country Blvd, right in the heart of the Branson entertainment strip. The theater bears the name of the late country legend Mickey Gilley and hosts the acrobats as its resident production, with staging and lighting tailored to the aerial and balancing acts.",
"Parking is available at the theater, and the location puts you minutes from Branson's restaurants and attractions, which makes it easy to pair a matinee with an afternoon on the Strip or an evening show with dinner beforehand.",
], imageUrl: "/shows/amazing-acrobats-of-shanghai/grand-shanghai-circus-branson-acrobatic-trio.jpg", imageAlt: "Acrobatic trio adagio on stage at the Grand Shanghai Theatre in Branson" },
{ heading: "Planning Your Visit", paragraphs: [
"Most dates play at 7:30 PM, with 2:00 PM matinees on many days and occasional 10:00 AM morning performances. The show runs about two hours, and arriving 30 minutes early leaves time to park and find your seats. The booking calendar on this page shows every date and time the theater has on sale, and every seat is booked directly with the theater.",
"Kids' tickets cost about half the adult rate, and children 3 and under attend free. Plans change on vacation, so every ticket comes with free cancellation up to 24 hours before showtime.",
], imageUrl: "/shows/amazing-acrobats-of-shanghai/shanghai-circus-branson-aerial-silks.jpg", imageAlt: "Aerial silks artist at the Amazing Acrobats of Shanghai show in Branson" },
{ heading: "Who Will Love This Show", paragraphs: [
"Families rank the acrobats among Branson's best shows for kids because the action never stops long enough for young attention spans to wander. Grandparents love it for the artistry, and group leaders book it because it lands with every age on the bus. With a 4.6-star Google rating from hundreds of visitors, it is consistently rated one of the most impressive productions in Branson.",
"If you are comparing Branson acrobatics shows, searching for the Shanghai Circus, or trying to find the show you saw years ago as the Acrobats of China, this is the one. Pick a date on the calendar above and lock in your seats.",
], imageUrl: "/shows/amazing-acrobats-of-shanghai/amazing-acrobats-of-shanghai-duo-balancing.jpg", imageAlt: "Hand balancing duo from the show's official promo video" },
],
}, { name: "Pets & Giggles", slug: "pets-and-giggles", tagline: "Rescue Animals Stealing the Show", category: ["family"], theater: "Grand Country Music Hall", theaterAddress: "1945 W 76 Country Blvd, Branson, MO 65616", description: "Pets & Giggles is a heartwarming and hilarious show featuring rescue dogs, cats, birds, and other animals performing incredible tricks alongside their human co-stars. This family-favorite show proves that rescue animals are capable of amazing things, and the bond between the performers and their furry friends shines through in every act. Kids especially love this show, which combines animal performances with comedy and audience participation for an experience that's as uplifting as it is entertaining. It's the kind of show that leaves everyone smiling.", shortDescription: "Pets & Giggles features rescue dogs, cats, and birds performing incredible tricks in this heartwarming family show.", priceFrom: 52.99, priceTo: 52.99, duration: "1.5 hours", ageRecommendation: "All ages", timeOfDay: "morning", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "December", showTimes: ["10:00 AM"], darkDays: ["Wednesday"], darkDateRanges: [{ start: "2026-08-24", end: "2026-08-29" }, { start: "2026-12-24", end: "2026-12-25" }], seasonalDarkWeekdays: [{ day: "Monday", start: "2026-08-31", end: "2026-12-20" }, { day: "Tuesday", start: "2026-09-01", end: "2026-12-20" }, { day: "Thursday", start: "2026-09-01", end: "2026-12-20" }, { day: "Friday", start: "2026-09-01", end: "2026-12-20" }], extraPerformances: [{ date: "2026-08-25", times: ["7:00 PM"] }, { date: "2026-08-27", times: ["7:00 PM"] }, { date: "2026-08-28", times: ["7:00 PM"] }, { date: "2026-08-29", times: ["7:00 PM"] }, { date: "2026-09-07", times: ["10:00 AM"] }, { date: "2026-11-26", times: ["3:00 PM"] }, { date: "2026-11-27", times: ["10:00 AM"] }, { date: "2026-12-23", times: ["10:00 AM"] }, { date: "2026-12-24", times: ["7:00 PM"] }, { date: "2026-12-25", times: ["7:00 PM"] }, { date: "2026-12-30", times: ["10:00 AM"] }], scheduleNote: "Mornings at 10:00 AM (dark Wednesdays) through August 23, then a 7:00 PM evening run August 25 to 29. Weekends only at 10:00 AM September through December 20, plus Labor Day and Thanksgiving week shows. Daily December 19 to 31 with 7:00 PM shows on December 24 and 25. Verified 2026-08-21 against tickets.grandcountry.com.", specialOffers: [], tags: ["family-friendly", "kids", "animals", "rescue", "heartwarming"], seoKeywords: ["pets and giggles branson", "branson animal show", "branson kids show", "pets giggles grand country"], relatedShows: ["comedy-jamboree"], imageAlt: "Pets and Giggles show with rescue animals performing tricks in Branson", imageUrl: "/shows/pets-and-giggles.jpg", faqs: [
  {
    question: "What animals are in Pets & Giggles?",
    answer: "The cast includes rescue dogs, cats, birds, and other animals, all performing tricks alongside their human co-stars. Every animal on stage is a rescue, which is a big part of the show's charm.",
  },
  {
    question: "Is Pets & Giggles good for young children?",
    answer: "Yes! Kids are the show's biggest fans, and the mix of animal tricks, comedy, and audience participation holds even a preschooler's attention. It is rated for all ages, so grandparents enjoy it right along with them.",
  },
  {
    question: "Will my child get to participate?",
    answer: "Audience participation is built into the show, so there is a real chance. Nothing is guaranteed, but an enthusiastic hand in the air never hurts.",
  },
  {
    question: "What makes Pets & Giggles different from other Branson kids' shows?",
    answer: "Most family shows in town are built around music. This one is built around rescue animals and the bond they share with their human co-stars, so it feels heartwarming as well as funny, and it is one of the few Branson shows where the stars have four legs or feathers.",
  },
], isFeaturedPartner: true, externalUrl: "https://www.grandcountrylivemusic.com/pets-and-giggles-show", childPriceFrom: 18.14, childPriceTo: 18.14,
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Rescue Animals Take Center Stage",
    paragraphs: ["Pets & Giggles is the show at Grand Country Music Hall where the stars have fur and feathers. Rescue dogs, cats, birds, and other animals perform tricks alongside their human co-stars, and the whole thing is wrapped in comedy and audience participation. The message is simple. Rescue animals are capable of amazing things, and the bond between the performers and their animals comes through in every act. It is heartwarming and funny at the same time, which is a hard combination to pull off.", "The Pets & Giggles Branson show stands apart from other family entertainment in town because it is not built around a band or a singer. It is built around animals that were once looking for homes, and the audience gets to see what patience and kindness can accomplish. Kids especially love it, but parents and grandparents tend to leave just as charmed. It is the kind of show that has everyone smiling on the way to the car, and it makes a good first live show for little ones who have never sat through one before."],
  },
  {
    heading: "Tricks, Laughs, and Audience Participation",
    paragraphs: ["The animals do the heavy lifting. Dogs run through tricks that draw applause from the whole room, cats do things most cat owners would swear are impossible, and birds add a bit of color and surprise. Each act pairs an animal with its human co-star, and the trust between them is obvious. The routines are quick and varied, which suits the shorter attention spans in the crowd, and there is comedy woven into every segment so the laughs keep coming even between the tricks.", "Audience participation is a real part of the show, not an afterthought. Kids get called on, families get involved, and the cast is good at making volunteers feel like stars rather than props. Because the whole production runs about an hour and a half, it never overstays its welcome with younger children, and the pace is brisk enough that even a restless five-year-old stays locked in. Adults who arrive expecting a simple kids' show usually find themselves laughing as hard as anyone."],
  },
  {
    heading: "Morning Shows and Holiday Dates",
    paragraphs: ["Pets & Giggles plays at Grand Country Music Hall, 1945 W 76 Country Blvd, Branson, MO 65616, and its 2026 schedule shifts with the seasons. From spring through August 23 it is a 10:00 AM morning show, dark on Wednesdays, followed by a short 7:00 PM evening run August 25 to 29. From September through December 20 it plays weekends only at 10:00 AM, with added performances around Labor Day and Thanksgiving week. It then plays daily from December 19 through December 31, and the December 24 and 25 performances move to 7:00 PM.", "A morning curtain has its advantages. Parking at the theater is easy at that hour, the strip is quiet, and the show runs about an hour and a half, so you are out before lunch with the whole afternoon still ahead of you. Aim to arrive 30 minutes early, especially with small children who need a restroom stop and a minute to settle in. Because the schedule changes so much across the year, trust the calendar above rather than memory. It shows every date and time currently on sale."],
  },
  {
    heading: "Made for Kids, Loved by Grandparents",
    paragraphs: ["If you are traveling with children, Pets & Giggles belongs near the top of your list of Branson shows. Toddlers who cannot sit through a two-hour music show do fine here, grade-schoolers get to see animals do things they will talk about for weeks, and the comedy keeps the adults entertained. Grandparents taking the grandkids for a morning outing while the parents sleep in are a common sight. Animal lovers of any age will appreciate the rescue story behind every animal on stage.", "Pets & Giggles tickets are easy to book with Get Branson Tickets. Pick a date on the calendar above, and your tickets come by email with no added fees. Kids' tickets are $15.86 plus tax and adult tickets are $46.34 plus tax, and every ticket includes free cancellation up to 24 hours before showtime, which matters when you are planning around a small child's mood. If you have a question about strollers, accessibility, or which date works best for your family, call (417) 243-9629 and we will walk you through it."],
  },
], }, { name: "Shepherd of the Hills", slug: "shepherd-of-the-hills", tagline: "The Ozarks' Original Outdoor Drama", category: ["theatrical", "dinner-shows"], theater: "Thurman Old Mill Theater", theaterAddress: "5586 W 76 Country Blvd, Branson, MO 65616", description: "Based on Harold Bell Wright's famous 1907 novel, Shepherd of the Hills is one of America's longest-running outdoor dramas. Performed under the stars in a beautiful Ozark Mountain setting, this spectacular production tells the story of the people of the Ozarks in the late 1800s with a cast of over 90 actors, live animals, fire effects, and gunfights. Before the show, enjoy the Trail of Lights and take in the panoramic views from Inspiration Tower. An optional chuck wagon dinner is available before the performance. This is Branson at its most authentic.", shortDescription: "America's longest-running outdoor drama with 90+ actors under the Ozark stars.", priceFrom: 30, priceTo: 55, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "May", seasonEnd: "October", showTimes: ["7:30 PM"], darkDays: ["Sunday", "Monday", "Wednesday", "Friday"], scheduleNote: "Tuesday, Thursday, and Saturday at 7:30 PM May through August, then 7:00 PM Tuesday and Thursday and 6:00 PM Saturday in September and October. The 2026 season runs May 5 to October 24.", specialOffers: ["Dinner + Show Package Available"], tags: ["outdoor", "theatrical", "historic", "ozarks", "seasonal"], seoKeywords: ["shepherd of the hills branson", "branson outdoor drama", "ozark outdoor show"], relatedShows: ["sight-and-sound-david", "dolly-partons-stampede"], imageAlt: "Shepherd of the Hills outdoor drama performance under Ozark stars", imageUrl: "https://theshepherdofthehills.com/wp-content/uploads/2025/03/1Y8A3079-copy.jpg", faqs: [
  {
    question: "Is dinner included with Shepherd of the Hills?",
    answer: "Not with a standard ticket. An optional chuck wagon dinner is served before the performance, and the venue offers a dinner and show package if you would like to add it.",
  },
  {
    question: "Is the outdoor drama suitable for young children?",
    answer: "The show is recommended for all ages, and the live animals are a highlight for kids. Keep in mind that the gunfights and fire effects are loud and sudden, so very young or noise-sensitive children may want a heads-up before those scenes.",
  },
  {
    question: "What should I wear to an outdoor show in Branson?",
    answer: "Comfortable clothes and shoes, plus a light jacket for September and October evenings. The show is performed outdoors under the stars, so check the forecast and bring what you would for a night at a ballpark.",
  },
], isFeaturedPartner: false, externalUrl: "https://theshepherdofthehills.com",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "An Ozarks Story Told Under the Stars",
    paragraphs: ["Shepherd of the Hills is based on Harold Bell Wright's famous 1907 novel of the same name, a story about the Ozarks and the people who made their lives in these hills. The outdoor drama tells that story on a stage under the open sky, following Ozark families through the late 1800s. It has become one of America's longest-running outdoor dramas, and for many visitors a trip to Branson is not complete without an evening at this production. It is Branson at its most authentic.", "This is not a theater show that happens to be outside. The Ozark Mountain setting is part of the production, and the evening light fading over the stage as the story unfolds is something no indoor venue can copy. The cast numbers more than 90 actors, and the story shares the stage with live animals, fire effects, and gunfights. Seasonal by nature, Shepherd of the Hills Branson performances run from May through October, which makes it a warm-weather tradition rather than a year-round option."],
  },
  {
    heading: "What You Will See on the Outdoor Stage",
    paragraphs: ["The scale is the first thing you notice. With a cast of over 90 actors, the stage fills with townspeople and families rather than a handful of leads, and the story of the Ozarks in the late 1800s plays out with the crowds and commotion of a real settlement. Live animals move through the scenes. Gunfights break the quiet, and fire effects light up the night as the drama builds. It is theatrical in the old sense, big, physical, and happening right in front of you.", "Arrive before the show and the evening starts early. The Trail of Lights runs before the performance, and Inspiration Tower offers panoramic views across the Ozarks that are best enjoyed while there is still daylight. An optional chuck wagon dinner is available before the performance as well, so you can eat without leaving and then head to your seat. Give yourself a few hours on site rather than treating it as a two-hour show, and you will get the full experience."],
  },
  {
    heading: "Thurman Old Mill Theater and Planning Your Visit",
    paragraphs: ["The Thurman Old Mill Theater is at 5586 W 76 Country Blvd toward the west end of the Branson strip. The 2026 season runs May 5 through October 24, with performances on Tuesday, Thursday, and Saturday. From May through August the show starts at 7:30 PM. In September and October it moves earlier, to 7:00 PM on Tuesday and Thursday and 6:00 PM on Saturday, as the days get shorter. The performance itself runs about two hours.", "Dress for an evening outdoors. Summer nights in the Ozarks are warm, but September and October can turn cool once the sun goes down, so a jacket or blanket is a good idea late in the season. Arrive at least 30 minutes early, and earlier if you plan on the tower, the Trail of Lights, or the chuck wagon dinner. Shepherd of the Hills tickets are sold directly by the venue, not by Get Branson Tickets, but our team is happy to help you line up the other Branson shows on your trip. Call (417) 243-9629."],
  },
], }, { name: "Riga Tony's Murder Mystery Dinner", slug: "riga-tonys-murder-mystery", tagline: "Dinner, Drama & Whodunit Fun", category: ["dinner-shows", "comedy"], theater: "Clarion Inn Dinner Theater", theaterAddress: "2820 W 76 Country Blvd, Branson, MO 65616", description: "Riga Tony's Murder Mystery Dinner Show combines a delicious Italian dinner with an interactive murder mystery that puts YOU in the middle of the action. Set in a 1930s speakeasy, this hilarious show features audience participation, plot twists, and plenty of laughs as you try to figure out whodunit. The meal includes salad, pasta, entrée choices, and dessert, all served while the mystery unfolds around you. It's a unique dinner theater experience that's perfect for date nights, group outings, and anyone who loves a good mystery with a side of comedy.", shortDescription: "Interactive 1930s murder mystery with Italian dinner, you solve the crime!", priceFrom: 57.87, priceTo: 77.08, duration: "2.5 hours", ageRecommendation: "12+", timeOfDay: "evening", mealIncluded: true, mealType: "Italian Dinner", isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "December", showTimes: ["5:00 PM"], darkDays: ["Wednesday"], scheduleNote: "5:00 PM, dark Wednesdays. The Christmas version runs November 2 through January 3.", specialOffers: [], tags: ["dinner-show", "interactive", "mystery", "comedy", "date-night"], seoKeywords: ["murder mystery branson", "branson dinner theater", "riga tonys branson"], relatedShows: ["showboat-branson-belle", "dolly-partons-stampede"], imageAlt: "Riga Tony's Murder Mystery Dinner Show with actors and diners in Branson", imageUrl: "https://www.discoverbranson.com/media/products/06f2d607-bbae-4751-b94c-92d41ea30481.jpg", faqs: [
  {
    question: "Is dinner included with Riga Tony's Murder Mystery Dinner?",
    answer: "Yes. The ticket includes a full Italian dinner with salad, pasta, a choice of entrees, and dessert, served in courses while the mystery plays out around you.",
  },
  {
    question: "Is there a Christmas version of the show?",
    answer: "There is. The Christmas edition of the mystery runs November 2 through January 3, so visitors in town for the holidays get a seasonal version of the story.",
  },
  {
    question: "Is the murder mystery appropriate for kids?",
    answer: "The show is recommended for ages 12 and up. The humor and the whodunit plot are aimed at adults and teens, and the two and a half hour running time with dinner is a long sit for younger children.",
  },
], isFeaturedPartner: false, externalUrl: "https://rigatonysdinnershow.com/branson-murder-mystery-dinner-show/",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Dinner, Drama, and a Crime to Solve",
    paragraphs: ["Riga Tony's Murder Mystery Dinner is a Branson dinner show where the audience does more than eat and watch. The evening is set in a 1930s speakeasy, and somewhere between the salad and the dessert a crime is committed. From there the show becomes a whodunit, with plot twists, suspects working the room, and plenty of laughs as you and your tablemates try to figure out who did it. It is comedy first and mystery second, so nobody needs to take the detective work too seriously.", "The meal is a real Italian dinner rather than an afterthought. Courses include salad, pasta, a choice of entrees, and dessert, all served while the story unfolds around the tables. That combination is what makes it different from most Branson shows. Instead of dinner at one place and a show at another, you get both at once in about two and a half hours, which makes it a popular pick for date nights, group outings, and anyone who enjoys a good mystery with a side of comedy."],
  },
  {
    heading: "What Happens at Your Table",
    paragraphs: ["Expect to be part of the show. The cast plays the speakeasy's characters, and audience participation is built into the script, so you may be questioned, recruited, or accused before the night is over. The plot twists keep coming, and just when your table agrees on a suspect the story usually turns. Guests who like to play along get the most out of it, but the laughs work just as well if you would rather sit back and watch the room.", "The 1930s setting gives the whole evening its flavor. Think speakeasy characters, a hidden club atmosphere, and the kind of fast-talking humor that era invites. The Italian dinner fits the theme, and it arrives in courses timed to the story, so the salad, pasta, entree, and dessert each land between developments in the case. By the time dessert is cleared, the mystery is solved, the guilty party is revealed, and your table finds out whether its detective instincts were any good."],
  },
  {
    heading: "Clarion Inn Dinner Theater and Planning Your Visit",
    paragraphs: ["The show is staged at the Clarion Inn Dinner Theater, 2820 W 76 Country Blvd, on the Branson strip. Performances start at 5:00 PM, and the theater is dark on Wednesdays. The regular season runs March through December, and a Christmas version of the mystery takes over from November 2 through January 3, which gives holiday visitors a seasonal twist on the story. With dinner included, plan on about two and a half hours from the first course to the final reveal.", "Arrive about 30 minutes before the 5:00 PM start so you can park, check in, and find your table before the first course is served. The show is recommended for ages 12 and up, which makes it a better fit for couples and adult groups than for families with small children. Riga Tony's Murder Mystery Dinner tickets are sold directly by the venue rather than through Get Branson Tickets. We are glad to help with the rest of your 2026 Branson plans, so call (417) 243-9629 with any questions."],
  },
], }, { name: "Aaron Wayne. Sweet Dreams Comedy Hypnosis", slug: "aaron-wayne-comedy-hypnosis", tagline: "You Won't Believe Your Eyes", category: ["comedy"], theater: "Americana Theatre", theaterAddress: "2905 W 76 Country Blvd, Branson, MO 65616", description: "Aaron Wayne's Sweet Dreams Comedy Hypnosis show is one of the most talked-about shows in Branson for good reason, it's absolutely hilarious and completely unpredictable. Aaron invites volunteers from the audience to join him on stage, then uses his incredible hypnosis skills to create side-splitting comedy moments that are different every single night. The willing volunteers become the stars of the show as they sing, dance, and act out hilarious scenarios under hypnosis. It's clean family fun that has audiences literally crying with laughter.", shortDescription: "Hilarious comedy hypnosis where audience volunteers become the stars of the show.", priceFrom: 34.0, priceTo: 52.87, duration: "1.5 hours", ageRecommendation: "12+", timeOfDay: "evening", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "December", showTimes: ["5:00 PM"], darkDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Friday"], scheduleNote: "Select dates, typically Thursday and Saturday at 5:00 PM, with 8:00 PM shows added on select nights.", specialOffers: [], tags: ["comedy", "hypnosis", "interactive", "late-night", "unpredictable"], seoKeywords: ["aaron wayne branson", "branson hypnosis show", "comedy hypnosis branson"], relatedShows: ["comedy-jamboree", "yakov-smirnoff"], imageAlt: "Aaron Wayne performing comedy hypnosis show with audience volunteers in Branson", imageUrl: "https://www.discoverbranson.com/media/products/79076315-3e5b-42a4-96f2-edaa34575b40.jpg", faqs: [
  {
    question: "Do I have to go on stage at Aaron Wayne's show?",
    answer: "No. Only willing volunteers take part, so if you would rather watch, you can stay in your seat and enjoy the show. Plenty of people come just to see what their friends will do.",
  },
  {
    question: "Is the comedy hypnosis show appropriate for kids?",
    answer: "The material is clean, but the show is recommended for ages 12 and up. Teens tend to enjoy it most, and the 12 and up guideline is the theater's recommendation.",
  },
  {
    question: "Is the show the same every night?",
    answer: "No, and that is the point. The volunteers change with every performance, so the scenarios, the singing, and the dancing play out differently each time. If you have seen it before, you have not seen this one.",
  },
], isFeaturedPartner: false, externalUrl: "https://www.cleancomedyhypnotist.com",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "A Comedy Show Written by the Audience",
    paragraphs: ["Aaron Wayne's Sweet Dreams Comedy Hypnosis stands apart from other Branson comedy shows because the stars are not on the payroll. Aaron invites volunteers from the audience to join him on stage, and once they are under hypnosis, the show belongs to them. The scenarios he sets up turn ordinary visitors into singers, dancers, and actors in scenes they would never attempt awake. Because the volunteers change every night, the show does too, and no two performances play out the same way.", "That unpredictability is the reason Aaron Wayne's Branson show gets talked about. People leave repeating what they saw a stranger do, or what their own spouse did, and the stories travel. It is clean fun, with no crude material, so the laughs come from the situations rather than from shock. The show runs about an hour and a half, which is long enough for the hypnosis to build and the scenarios to escalate without wearing thin, and it is recommended for ages 12 and up."],
  },
  {
    heading: "What Happens Once the Volunteers Go Under",
    paragraphs: ["The evening starts with Aaron bringing volunteers up from the audience and guiding them into hypnosis. Then the scenarios begin. Volunteers sing like they are headlining an arena, dance with total commitment, and act out situations that are funnier because they seem to believe every word of them. Aaron steers it all with a comic's timing, building each bit and knowing when to move on. The audience in the seats is laughing at people they were chatting with in line fifteen minutes earlier.", "Nobody is forced into anything. Only willing volunteers take part, and everyone else enjoys the show from the safety of their seats. What you see is different every night because the personalities on stage set the tone, and a shy volunteer produces a different kind of comedy than a natural ham. Crying with laughter is the phrase that comes up most often afterward, and the stories from the night tend to become the part of the Branson trip people retell back home."],
  },
  {
    heading: "Americana Theatre and Planning Your Visit",
    paragraphs: ["Aaron Wayne performs at the Americana Theatre, 2905 W 76 Country Blvd, on the Branson strip. The show plays select dates from March through December, typically Thursday and Saturday at 5:00 PM, with 8:00 PM performances added on select nights. Because the dates are selective rather than nightly, it pays to confirm the schedule with the theater before you build an evening around it. At about 90 minutes, the 5:00 PM show leaves plenty of time for a late dinner afterward or for a second Branson show the same night.", "Arrive 30 minutes early to park and get settled before the volunteers are called up. Tickets for Sweet Dreams Comedy Hypnosis are sold directly by the Americana Theatre, not through Get Branson Tickets, so reserve your seats through the theater. If you are mapping out Branson shows for a 2026 visit and want help fitting this one in with everything else, our team is a phone call away at (417) 243-9629 and glad to help you plan the rest of the trip."],
  },
], }, { name: "New South Gospel", slug: "new-south-gospel", tagline: "Award-Winning Southern Gospel", category: ["country-gospel"], theater: "Grand Country Music Hall", theaterAddress: "1945 W 76 Country Blvd, Branson, MO 65616", description: "New South Gospel delivers a powerful and uplifting gospel music experience that has earned them multiple awards and a devoted following in Branson. Their exceptional vocal harmonies, dynamic arrangements, and genuine passion for gospel music create a show that is both spiritually moving and musically outstanding. From traditional hymns to contemporary gospel, their repertoire spans the full spectrum of sacred music, always delivered with the kind of authenticity and emotion that can only come from true believers performing songs that matter to them deeply.", shortDescription: "Award-winning southern gospel with exceptional harmonies and genuine spiritual passion.", priceFrom: 52.99, priceTo: 52.99, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "afternoon", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "December", showTimes: ["3:00 PM"], darkDays: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"], darkDateRanges: [{ start: "2026-06-01", end: "2026-09-09" }, { start: "2026-11-26", end: "2026-11-26" }, { start: "2026-12-11", end: "2026-12-31" }], scheduleNote: "Thursdays at 3:00 PM in the fall run, September 10 through December 10. No Thanksgiving Day show. Verified 2026-08-21 against tickets.grandcountry.com.", specialOffers: [], tags: ["gospel", "inspirational", "harmonies", "award-winning"], seoKeywords: ["new south gospel branson", "branson gospel show", "southern gospel branson"], relatedShows: ["ozarks-gospel"], imageAlt: "New South Gospel performing award-winning gospel music in Branson", imageUrl: "/shows/new-south-gospel.jpg", faqs: [
  {
    question: "What style of gospel does New South Gospel perform?",
    answer: "Southern gospel, built on vocal harmonies. The program moves from traditional hymns to contemporary gospel, so you will hear songs you grew up singing alongside newer material.",
  },
  {
    question: "Is New South Gospel appropriate for children?",
    answer: "Yes. It is rated for all ages, and the music is uplifting and family-friendly. It is a music show rather than a comedy or animal show, so it tends to suit older kids and adults best.",
  },
  {
    question: "Do I need to be religious to enjoy the show?",
    answer: "No. The songs are sacred music and the performers sing them as true believers, but the harmonies and arrangements stand on their own, and plenty of guests come simply because they love the sound of southern gospel.",
  },
  {
    question: "How is New South Gospel different from Ozarks Gospel?",
    answer: "Both play at Grand Country Music Hall. New South Gospel is an award-winning group with polished, dynamic arrangements, while Ozarks Gospel is a more intimate program built around Ozark Mountain hymns and spirituals. Many gospel fans see both.",
  },
], isFeaturedPartner: true, externalUrl: "https://www.grandcountry.com/new-south-gospel", childPriceFrom: 18.14, childPriceTo: 18.14,
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Award-Winning Southern Gospel in Branson",
    paragraphs: ["New South Gospel brings award-winning southern gospel to Grand Country Music Hall, with a 2026 fall run of Thursday afternoon performances. The group has earned multiple awards and a devoted following in Branson, and it is easy to hear why within the first few songs. The vocal harmonies are exceptional, the arrangements are dynamic, and the passion behind every number is genuine. Gospel music has always been part of the foundation of Branson shows, and New South Gospel represents that tradition at its most polished. If you make one gospel show part of your trip, this is a strong candidate.", "What sets this show apart is authenticity. These are true believers performing songs that matter to them deeply, and that comes across in a way no amount of production can fake. The result is a show that is spiritually moving for people of faith and musically outstanding for anyone who simply appreciates great singing. It is a quieter, more reflective afternoon than the comedy and variety shows on the same stage, and many visitors plan it as a change of pace in the middle of a busy week of shows."],
  },
  {
    heading: "Hymns, Harmonies, and Contemporary Gospel",
    paragraphs: ["The repertoire spans the full range of sacred music. Traditional hymns anchor the show, sung with the kind of close harmony that southern gospel is known for, where the voices stack and blend until the room seems to hum along. Contemporary gospel numbers bring a more modern feel and a bit more drive, and the arrangements move easily between the two. Expect moments that are quiet and tender, and others that build to a big finish.", "The singing is the show. The focus stays on the voices and the message, and the two hours pass in a way that feels more like a gathering than a performance. Longtime gospel fans will recognize the style immediately. Newcomers tend to be surprised by how much energy a gospel show can have, and by how many of the songs they already know. Bring a tissue. More than a few guests find themselves moved before the afternoon is over."],
  },
  {
    heading: "Thursday Afternoons at Grand Country",
    paragraphs: ["New South Gospel plays at Grand Country Music Hall, 1945 W 76 Country Blvd, Branson, MO 65616. The 2026 fall run is Thursdays at 3:00 PM from September 10 through December 10, with no show on Thanksgiving Day. That Thursday slot is the one Comedy Jamboree steps out of during the fall, so if you are at Grand Country on a Thursday afternoon, this is the show you will find. Plan for about two hours, and arrive 30 minutes early to park at the theater and get settled.", "A Thursday matinee fits neatly into a fall trip. The show lets out in time for an early dinner, and an evening show elsewhere on the strip is an easy add. Fall is also peak season in Branson, when the Christmas shows start rolling out and the town fills up, so it is worth booking your Thursday early rather than hoping for seats at the door. The calendar above lists every New South Gospel Branson performance in the run, and it is the quickest way to check whether your Thursday is available."],
  },
  {
    heading: "For Gospel Fans and Church Groups",
    paragraphs: ["New South Gospel is a natural choice for church groups, senior tours, and anyone who grew up on southern gospel radio and Sunday singing. The show is rated for all ages, and while it is not built around jokes or animals the way some family shows are, older children who enjoy music will do fine. Couples looking for a meaningful afternoon, and adult children bringing parents who love this music, make up a good share of the audience. If gospel harmonies give you chills, you are the person this show was made for.", "New South Gospel tickets are available right here. Pick a date on the calendar above and check out with no added fees, and your tickets will be sent by email. Every ticket includes free cancellation up to 24 hours before showtime, so booking ahead for a fall Thursday carries no risk if your travel dates shift. Kids' tickets are offered at a lower rate than adult tickets. For group bookings, accessible seating, or help fitting this show into a larger Branson itinerary, call Get Branson Tickets at (417) 243-9629."],
  },
], }, { name: "Ozarks Gospel", slug: "ozarks-gospel", tagline: "Gospel Music from the Heart of the Ozarks", category: ["country-gospel"], theater: "Grand Country Music Hall", theaterAddress: "1945 W 76 Country Blvd, Branson, MO 65616", description: "Ozarks Gospel brings the rich tradition of Ozark Mountain gospel music to the stage with heartfelt performances that celebrate faith, family, and the heritage of the region. This intimate show features talented local musicians performing beloved hymns, spirituals, and gospel songs in a setting that feels like a family gathering in the Ozark hills. The warm, authentic atmosphere and genuine performances make this show a favorite among visitors who appreciate the spiritual heart of Branson's entertainment tradition.", shortDescription: "Heartfelt Ozark Mountain gospel celebrating faith, family, and mountain heritage.", priceFrom: 52.99, priceTo: 52.99, duration: "1.5 hours", ageRecommendation: "All ages", timeOfDay: "afternoon", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "December", showTimes: ["2:00 PM"], darkDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], darkDateRanges: [{ start: "2026-08-23", end: "2026-08-23" }, { start: "2026-10-04", end: "2026-10-04" }, { start: "2026-12-14", end: "2026-12-31" }], scheduleNote: "Sundays at 2:00 PM. Skips August 23 and October 4. Final 2026 show is December 13. Verified 2026-08-21 against tickets.grandcountry.com.", specialOffers: [], tags: ["gospel", "ozarks", "traditional", "intimate"], seoKeywords: ["ozarks gospel branson", "gospel music branson", "branson gospel show"], relatedShows: ["new-south-gospel"], imageAlt: "Ozarks Gospel musicians performing traditional gospel music in Branson", imageUrl: "/shows/ozarks-gospel.jpg", faqs: [
  {
    question: "How is Ozarks Gospel different from a big production show?",
    answer: "It is intentionally intimate. Local musicians perform hymns, spirituals, and gospel songs in a setting that feels more like a family gathering in the Ozark hills than a stage spectacle, and that warmth is the whole point.",
  },
  {
    question: "Is Ozarks Gospel suitable for children and seniors?",
    answer: "Yes. It is rated for all ages, and the gentle, heartfelt tone makes it especially comfortable for seniors. Children who can sit through a church service will be fine, though very young kids may prefer one of the livelier family shows.",
  },
  {
    question: "Will I know the songs?",
    answer: "If you grew up around a church, almost certainly. The program leans on beloved hymns and spirituals that have been sung in the Ozarks for generations, along with gospel favorites.",
  },
  {
    question: "Do I need to dress up for a Sunday afternoon gospel show?",
    answer: "No. Casual clothes are fine at Grand Country Music Hall, even on a Sunday. Come as you are, and arrive about 30 minutes early to get settled.",
  },
], isFeaturedPartner: true, externalUrl: "https://www.grandcountry.com/ozarks-gospel", childPriceFrom: 18.14, childPriceTo: 18.14,
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Gospel the Way the Ozarks Sing It",
    paragraphs: ["Ozarks Gospel is the Sunday afternoon gospel show at Grand Country Music Hall, and it is built around the rich tradition of Ozark Mountain gospel music. Talented local musicians perform beloved hymns, spirituals, and gospel songs in a way that celebrates faith, family, and the heritage of the region. It is an intimate show by design. Rather than big staging, it offers the warm, authentic atmosphere of a family gathering in the Ozark hills, and that is exactly why it is a favorite among visitors who appreciate the spiritual heart of Branson's entertainment tradition.", "Branson grew up on this kind of music. Long before the big theaters, families in these hills sang hymns on porches and in small churches, and Ozarks Gospel Branson keeps that spirit alive on a professional stage. It is a different experience from the polished production numbers you will find in most Branson shows, and that is the appeal. If your idea of a good afternoon is familiar songs, heartfelt singing, and a room full of people who feel like neighbors, this show was made with you in mind."],
  },
  {
    heading: "Hymns, Spirituals, and Mountain Harmony",
    paragraphs: ["The program is a mix of beloved hymns, spirituals, and gospel songs, performed by talented local musicians. Expect the old standards that fill hymnals across the Ozarks, sung with the plain, close harmony that mountain gospel is known for. The instruments stay in service of the voices, the arrangements are heartfelt rather than showy, and there is room in the show for a quiet verse to land without a big finish behind it. It is the sound of a Sunday sing, carried onto a stage without losing what made it special.", "At about an hour and a half, the show is shorter than most of the evening productions in town, and the pace suits the material. Nobody is rushing to the next number. The whole afternoon carries the easy feel of a gathering rather than a performance, and the intimate setting means the singers never feel far away. Do not be surprised if you catch yourself humming along by the second or third hymn. That kind of unplanned participation is part of what makes the show feel so genuine, and it is a big reason people who see it once recommend it to friends."],
  },
  {
    heading: "Sunday Afternoons on 76 Country Boulevard",
    paragraphs: ["Ozarks Gospel plays Sundays at 2:00 PM at Grand Country Music Hall, 1945 W 76 Country Blvd, Branson, MO 65616. The 2026 season runs from spring into December, skipping August 23 and October 4, and the final show of the year is December 13. Because it is a once-a-week show, it is worth checking your travel dates against the calendar above before you plan the rest of the weekend around it. The show runs about an hour and a half, and parking is at the theater.", "Arriving 30 minutes before the 2:00 PM start gives you time to park, find your seats, and settle in without hurrying, which suits the mood of the show. A Sunday matinee also leaves the evening open. Ozarks Country, the Sunday night country show on the same stage, starts at 7:00 PM, and plenty of visitors make a full Grand Country Sunday out of the pair with dinner in between. Sunday afternoons on the strip tend to be calmer than Saturday nights, so getting there is rarely a problem."],
  },
  {
    heading: "A Quiet Favorite for Faith and Family",
    paragraphs: ["Ozarks Gospel is a good fit for seniors, church groups, and anyone who wants an afternoon that feeds the soul rather than just the ears. It is rated for all ages, and the gentle pace makes it one of the more comfortable Branson shows for older guests who would rather not sit through two hours of loud production. Families with older children who enjoy music will feel welcome. It is also a thoughtful choice for a Sunday when you want the day to feel like a Sunday, even on vacation.", "Ozarks Gospel tickets can be booked right here on Get Branson Tickets. Pick a date on the calendar above, and your tickets will arrive by email with no added fees. Free cancellation up to 24 hours before showtime is included with every ticket, so if your Sunday plans change, you are covered. Kids' tickets are priced lower than adult tickets. If you would like help choosing seats, checking accessibility, or pairing this show with Ozarks Country the same evening, call us at (417) 243-9629 and we will take care of it."],
  },
], }, { name: "George Dyer", slug: "george-dyer", tagline: "Branson's Broadway Tenor", category: ["variety-music"], theater: "Americana Theatre", theaterAddress: "2905 W 76 Country Blvd, Branson, MO 65616", description: "George Dyer brings a Broadway-quality tenor voice to Branson in an intimate show that spans opera, Broadway, pop, and inspirational music. His incredible vocal range and stage presence have made him one of Branson's most acclaimed performers. From soaring operatic arias to beloved Broadway showstoppers, George delivers each song with the kind of power and emotion that gives audiences goosebumps. His warm personality and genuine connection with the audience make every performance feel personal and special.", shortDescription: "Broadway-quality tenor performing opera, Broadway, and inspirational favorites.", priceFrom: 42.95, priceTo: 47.0, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "morning", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "October", seasonEnd: "December", showTimes: ["10:00 AM"], darkDays: ["Sunday", "Tuesday", "Wednesday", "Thursday", "Friday"], scheduleNote: "Mondays and Saturdays at 10:00 AM on select dates. The spring run has ended; remaining 2026 dates run October 10 through December 5.", specialOffers: [], tags: ["vocal", "broadway", "opera", "tenor", "intimate"], seoKeywords: ["george dyer branson", "branson broadway show", "branson tenor"], relatedShows: ["six", "legends-in-concert"], imageAlt: "George Dyer performing Broadway and opera music in Branson", imageUrl: "https://www.discoverbranson.com/media/products/6fe2174f-5fbc-408d-8620-d90ff9f60bfc.jpg", faqs: [
  {
    question: "What kind of music does George Dyer sing?",
    answer: "The show spans opera, Broadway, pop, and inspirational music. Expect operatic arias and Broadway showstoppers alongside familiar pop songs and songs of faith, all sung by a tenor with a big range.",
  },
  {
    question: "Do I need to like opera to enjoy the show?",
    answer: "No. Opera is only one part of the program, and the Broadway, pop, and inspirational selections are full of melodies most people already know. His warm personality keeps it approachable even for first-time opera listeners.",
  },
  {
    question: "Is a 10:00 AM show a good fit for seniors and groups?",
    answer: "It is one of the best fits in Branson for that. The show is recommended for all ages, the morning start avoids late-night driving, and the intimate format suits anyone who prefers to sit and listen rather than watch a big production.",
  },
], isFeaturedPartner: false, externalUrl: "https://americanatheatrebranson.com/shows/george_dyer.html",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "A Broadway Tenor in an Intimate Setting",
    paragraphs: ["George Dyer is known as Branson's Broadway tenor, and the title fits. His show is built around a voice with the power and range you would expect on a Broadway stage, presented as an intimate performance rather than a big production number. The program spans opera, Broadway, pop, and inspirational music, so a single morning moves from soaring arias to familiar showstoppers to songs of faith. He has become one of Branson's most acclaimed performers on the strength of that voice and the way he uses it.", "What sets the George Dyer Branson show apart from other vocal acts is the connection with the room. He talks to the audience between songs, and his warm, unhurried personality makes a full theater feel like a small gathering. Fans describe the goosebumps that come with the big notes, but they also remember how personal the performance felt. It is a morning show, which gives the whole thing a relaxed feel that suits the music."],
  },
  {
    heading: "What You Will Hear",
    paragraphs: ["The set list moves through four kinds of music, and each shows off a different side of the voice. Operatic arias bring the full power and the long, held notes that make a tenor thrilling in person. Broadway showstoppers add drama and storytelling, the kind of songs that build to a big finish. Pop selections keep things familiar and light, and inspirational numbers close the distance between performer and audience in a way that leaves many people quietly moved.", "You do not need to know opera to enjoy the morning. George sings with the emotion and clarity that make the meaning of a song land even if the words are in another language, and the Broadway and pop portions of the show are full of melodies most people already know. Expect about two hours, with the pacing of a concert rather than a revue. The focus stays on the singing from start to finish, which is exactly what fans of a great voice come for."],
  },
  {
    heading: "Americana Theatre and Planning Your Morning",
    paragraphs: ["George Dyer performs at the Americana Theatre, 2905 W 76 Country Blvd, on the Branson strip. This is a 10:00 AM show on Mondays and Saturdays on select dates, and the remaining 2026 dates run October 10 through December 5, since the spring run has already ended. That fall timing makes it a natural addition to a holiday season visit, so plan ahead. The show lasts about two hours, and arriving 30 minutes early leaves time to park and settle in before the first song.", "A morning show is a smart way to see more of Branson. You can catch George Dyer at 10:00 AM, have lunch, and still fit an afternoon matinee and an evening show into the same day. George Dyer tickets are sold directly by the Americana Theatre, not by Get Branson Tickets, so book with the venue. Our team is glad to help you plan the rest of the trip around it, and (417) 243-9629 reaches a real person who knows the Branson shows calendar."],
  },
], }, { name: "CJ Newsom's Classic Country & Comedy", slug: "cj-newsoms-classic-country", tagline: "Real Country Music & Real Laughs", category: ["comedy", "country-gospel"], theater: "Americana Theatre", theaterAddress: "2905 W 76 Country Blvd, Branson, MO 65616", description: "CJ Newsom delivers the kind of authentic country music and down-home comedy that Branson was built on. Her show features classic country favorites from legends like Patsy Cline, Loretta Lynn, and Tammy Wynette, along with hilarious comedy characters and sketches that have audiences laughing non-stop. CJ's powerful voice and natural comedic timing make her one of Branson's most versatile performers, and her genuine warmth makes every audience member feel like they're sitting on the front porch with an old friend.", shortDescription: "Authentic classic country music and hilarious comedy from a Branson favorite.", priceFrom: 42.95, priceTo: 47.0, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "April", seasonEnd: "December", showTimes: ["8:00 PM"], darkDays: ["Sunday", "Monday", "Wednesday", "Friday", "Saturday"], scheduleNote: "Tuesdays and Thursdays at 8:00 PM.", specialOffers: [], tags: ["country", "comedy", "classic", "authentic"], seoKeywords: ["cj newsom branson", "branson classic country", "branson comedy country show"], relatedShows: ["the-baldknobbers", "comedy-jamboree", "clay-coopers-country-express"], imageAlt: "CJ Newsom performing classic country music and comedy in Branson", imageUrl: "https://www.discoverbranson.com/media/products/1e13639f-9207-4b17-aefb-f0870a5f36b5.jpg", faqs: [
  {
    question: "What kind of country music is in CJ Newsom's show?",
    answer: "Classic country. The set leans on favorites made famous by Patsy Cline, Loretta Lynn, and Tammy Wynette, along with other songs from that era, sung with a powerful voice and no modern crossover.",
  },
  {
    question: "Is the comedy suitable for kids and grandparents?",
    answer: "Yes. The show is recommended for all ages, and the comedy characters and sketches are the down-home kind, so three generations can sit together without anyone squirming.",
  },
  {
    question: "How is this show different from other Branson country shows?",
    answer: "One performer carries both halves. CJ sings the classic country and plays the comedy characters herself, which gives the evening a personal, front-porch feel that a big production cast cannot match.",
  },
], isFeaturedPartner: false, externalUrl: "https://americanatheatrebranson.com/shows/classic_country_and_comedy.html",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Classic Country the Way Branson Started",
    paragraphs: ["CJ Newsom's Classic Country & Comedy is the kind of show Branson was built on, real country music and down-home humor delivered by a performer who does both well. The music leans on classic country favorites made famous by legends like Patsy Cline, Loretta Lynn, and Tammy Wynette. The comedy comes from characters and sketches CJ performs herself, and the switch between the two is a big part of the appeal. One minute she is singing a heartbreak ballad, the next she has the room laughing.", "What people remember is the warmth. CJ has a way of making a theater full of strangers feel like they are sitting on her front porch swapping stories with an old friend, and that feeling carries through both the songs and the jokes. Her voice is powerful enough to do justice to the classics, and her comedic timing is natural rather than rehearsed-sounding. It is a simple formula, honest music and honest laughs, and it is the reason her show is a Branson favorite."],
  },
  {
    heading: "What You Will Hear and Laugh At",
    paragraphs: ["The music side of the show is classic country, sung straight. Expect the songs that made Patsy Cline, Loretta Lynn, and Tammy Wynette household names, along with other favorites from the same era, performed by a voice with the power those songs demand. This is classic country, not the modern crossover kind. It is the tradition of heartache ballads and honky-tonk, the songs people in the seats grew up hearing on the radio and at the kitchen table, sung by someone who clearly loves them as much as the audience does.", "Then the comedy takes over. CJ's characters and sketches are the down-home kind, closer to a family gathering than a comedy club, and the laughs come quickly enough that audiences describe laughing non-stop. The two halves feed each other. The music earns the emotion, the comedy releases it, and the show keeps trading between them for about two hours. It is recommended for all ages, and the humor stays clean enough that grandparents bring grandkids without a second thought."],
  },
  {
    heading: "Americana Theatre and Planning Your Evening",
    paragraphs: ["CJ Newsom performs at the Americana Theatre, 2905 W 76 Country Blvd, on the Branson strip. The show plays Tuesdays and Thursdays at 8:00 PM, with a season that runs April through December. Those two nights a week make it easy to plan around, and the 8:00 PM start leaves room for an early dinner on the strip beforehand. The show runs about two hours, so plan on being out around 10:00 PM. Arriving 30 minutes early gives you time to park and find your seats without rushing.", "CJ Newsom's Classic Country & Comedy tickets are sold directly by the Americana Theatre rather than through Get Branson Tickets, so your seats will come from the theater itself. That said, we are happy to help with the rest. If you are lining up Branson shows for a 2026 trip and want a classic country night to sit alongside a morning show and a dinner show, call our team at (417) 243-9629 and we will help you plan the rest of the trip."],
  },
], }, { name: "Branson's Christmas Wonderland", slug: "bransons-christmas-wonderland", tagline: "Branson's Biggest Christmas Show", category: ["theatrical", "family"], theater: "King's Castle Theatre", theaterAddress: "2701 W 76 Country Blvd, Branson, MO 65616", description: "Branson's Christmas Wonderland is the largest and most spectacular Christmas show in Branson, featuring a massive cast of singers, dancers, and performers in a dazzling holiday production. With stunning costumes, elaborate sets, a live nativity scene, flying angels, dancing toy soldiers, and visits from Santa himself, this show captures the magic of Christmas in a way that delights audiences of all ages. The show features beloved Christmas classics performed with Broadway-quality production values, making it the centerpiece of any Branson holiday vacation.", shortDescription: "Branson's biggest Christmas spectacular with dancing, flying angels, and holiday magic.", priceFrom: 54.58, priceTo: 54.58, childPriceFrom: 29.65, childPriceTo: 29.65, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: true, seasonStart: "November", seasonEnd: "December", showTimes: ["10:00 AM", "2:00 PM", "8:00 PM"], darkDays: ["Monday"], darkDateRanges: [{ start: "2026-01-01", end: "2027-12-31" }], extraPerformances: [{ date: "2026-11-01", times: ["8:00 PM"] }, { date: "2026-11-03", times: ["10:00 AM"] }, { date: "2026-11-04", times: ["10:00 AM", "8:00 PM"] }, { date: "2026-11-05", times: ["10:00 AM", "8:00 PM"] }, { date: "2026-11-06", times: ["2:00 PM"] }, { date: "2026-11-07", times: ["2:00 PM", "8:00 PM"] }, { date: "2026-11-08", times: ["8:00 PM"] }, { date: "2026-11-10", times: ["10:00 AM"] }, { date: "2026-11-11", times: ["10:00 AM", "8:00 PM"] }, { date: "2026-11-12", times: ["10:00 AM", "8:00 PM"] }, { date: "2026-11-13", times: ["2:00 PM"] }, { date: "2026-11-14", times: ["2:00 PM", "8:00 PM"] }, { date: "2026-11-15", times: ["8:00 PM"] }, { date: "2026-11-17", times: ["10:00 AM"] }, { date: "2026-11-18", times: ["10:00 AM", "8:00 PM"] }, { date: "2026-11-19", times: ["10:00 AM", "8:00 PM"] }, { date: "2026-11-20", times: ["2:00 PM"] }, { date: "2026-11-21", times: ["2:00 PM", "8:00 PM"] }, { date: "2026-11-22", times: ["8:00 PM"] }, { date: "2026-11-24", times: ["2:00 PM"] }, { date: "2026-11-25", times: ["2:00 PM", "8:00 PM"] }, { date: "2026-11-26", times: ["8:00 PM"] }, { date: "2026-11-27", times: ["2:00 PM"] }, { date: "2026-11-28", times: ["2:00 PM", "8:00 PM"] }, { date: "2026-11-29", times: ["8:00 PM"] }, { date: "2026-12-01", times: ["10:00 AM"] }, { date: "2026-12-02", times: ["10:00 AM", "8:00 PM"] }, { date: "2026-12-03", times: ["10:00 AM", "8:00 PM"] }, { date: "2026-12-04", times: ["2:00 PM"] }, { date: "2026-12-05", times: ["2:00 PM", "8:00 PM"] }, { date: "2026-12-06", times: ["2:00 PM", "8:00 PM"] }, { date: "2026-12-08", times: ["10:00 AM"] }, { date: "2026-12-09", times: ["10:00 AM", "8:00 PM"] }, { date: "2026-12-10", times: ["10:00 AM", "8:00 PM"] }, { date: "2026-12-11", times: ["2:00 PM"] }, { date: "2026-12-12", times: ["2:00 PM", "8:00 PM"] }, { date: "2026-12-13", times: ["2:00 PM", "8:00 PM"] }, { date: "2026-12-15", times: ["2:00 PM"] }, { date: "2026-12-16", times: ["8:00 PM"] }, { date: "2026-12-17", times: ["2:00 PM", "8:00 PM"] }, { date: "2026-12-18", times: ["2:00 PM"] }, { date: "2026-12-19", times: ["2:00 PM", "8:00 PM"] }, { date: "2026-12-20", times: ["2:00 PM", "8:00 PM"] }, { date: "2026-12-22", times: ["2:00 PM", "8:00 PM"] }, { date: "2026-12-23", times: ["8:00 PM"] }, { date: "2026-12-24", times: ["2:00 PM", "8:00 PM"] }, { date: "2026-12-26", times: ["2:00 PM", "8:00 PM"] }, { date: "2026-12-27", times: ["2:00 PM", "8:00 PM"] }, { date: "2026-12-29", times: ["8:00 PM"] }, { date: "2026-12-30", times: ["8:00 PM"] }, { date: "2026-12-31", times: ["2:00 PM"] }], scheduleNote: "Runs November 1 through December 31. Typical week: 10:00 AM Tuesday through Thursday, 2:00 PM Friday and Saturday, and 8:00 PM shows Wednesday through Sunday, with 2:00 PM Sunday matinees added in December. Dark Mondays and Christmas Day. Times vary in late December, so check the booking calendar.", specialOffers: ["$15 Off Each Ticket on a 2nd Show Within 7 Days"], tags: ["christmas", "holiday", "family-friendly", "spectacular", "seasonal"], seoKeywords: ["branson christmas show", "christmas wonderland branson", "branson holiday show"], relatedShows: ["sight-and-sound-david"], imageAlt: "Branson's Christmas Wonderland holiday show with dancers and festive sets", imageUrl: "/shows/bransons-christmas-wonderland.jpg", faqs: [
  {
    question: "Does Branson's Christmas Wonderland include a nativity scene?",
    answer: "Yes. The show includes a live nativity scene alongside its flying angels, dancing toy soldiers, and visits from Santa, so it covers both the sacred and the playful sides of Christmas in one production.",
  },
  {
    question: "Is the show good for young children?",
    answer: "It is one of the most kid-friendly Branson shows of the holiday season. Santa, toy soldiers, flying angels, and bright costumes hold young attention, and the familiar Christmas classics keep grandparents happy too. It is a show for all ages.",
  },
  {
    question: "What makes it different from other Branson Christmas shows?",
    answer: "Scale. It is the largest Christmas show in Branson, with a massive cast, elaborate sets, and Broadway-quality production values, and it is a full holiday production rather than a regular show with a few Christmas songs added.",
  },
  {
    question: "Is King's Castle Theatre accessible?",
    answer: "Call us at (417) 243-9629 before you book and we will arrange accessible seating with the theater and answer any questions about getting around the building.",
  },
], isFeaturedPartner: true, externalUrl: "https://www.kingscastletheatre.com/schedules/",
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Branson's Biggest Christmas Show",
    paragraphs: ["Branson's Christmas Wonderland is the largest and most spectacular Christmas show in town, and for many families it is the reason they book a Branson holiday vacation at all. A massive cast of singers, dancers, and performers fills the stage at King's Castle Theatre with stunning costumes, elaborate sets, and beloved Christmas classics performed with Broadway-quality production values. It is the centerpiece of a Branson Christmas.", "Branson turns into a Christmas town from November 1 through December 31, and this show runs the entire two months, with morning, matinee, and evening performances most days, so it fits into any holiday itinerary. Whether you are here for a long weekend or the whole week between the holidays, Branson's Christmas Wonderland tickets for the 2026 season are available on this page."],
  },
  {
    heading: "Flying Angels, Toy Soldiers, and Santa Himself",
    paragraphs: ["The production moves through the whole story of Christmas. A live nativity scene brings the sacred side of the season to the stage with real reverence, flying angels take to the air, and dancing toy soldiers march through numbers that have children pointing and laughing. Santa himself makes his visits, and the costumes and sets change with each scene.", "Underneath the spectacle is the music. Beloved Christmas classics are sung by a large cast with full choreography, and the production values are what you would expect from a Broadway show rather than a small revue. The two hours pass quickly, and audiences of all ages leave humming the songs they came in knowing by heart."],
  },
  {
    heading: "Holiday Dates at King's Castle Theatre",
    paragraphs: ["Branson's Christmas Wonderland plays at King's Castle Theatre, 2701 W 76 Country Blvd, Branson, MO 65616, from November 1 through December 31. A typical week has 10:00 AM shows Tuesday through Thursday, 2:00 PM shows Friday and Saturday, and 8:00 PM shows Wednesday through Sunday, with 2:00 PM Sunday matinees added in December. The theater is dark on Mondays and on Christmas Day.", "Expect the show to run about two hours. Arrive 30 minutes before showtime to park at the theater and get settled, since holiday weeks bring big crowds to the strip. Times vary in late December, so the booking calendar above is the best guide to the exact schedule for your dates, and it shows every performance the theater has on sale."],
  },
  {
    heading: "Why Families Choose It and Why Book Here",
    paragraphs: ["This is the show for families building a Christmas tradition, for grandparents treating the grandkids, and for anyone who wants the full holiday spectacle in one evening. It works for church groups, for couples on a December getaway, and for kids seeing Santa for the first time on a stage this big. The show is recommended for all ages, and kids' tickets are available.", "When you book Branson's Christmas Wonderland tickets through Get Branson Tickets, there are no added fees, your tickets arrive by email, and free cancellation up to 24 hours before showtime protects you if winter weather changes your plans. Pick a date on the calendar above, or call (417) 243-9629 and we will help you choose a morning, matinee, or evening performance."],
  },
], }, { name: "Rock 'n' Roll Sunrise", slug: "rock-n-roll-sunrise", tagline: "Start Your Day with Rock Legends", category: ["tribute", "variety-music"], theater: "The Showroom at Branson Meadows", theaterAddress: "4600 Gretna Rd, Branson, MO 65616", description: "Rock 'n' Roll Sunrise is a 90 minute morning concert at The Showroom at Branson Meadows, led by Matthew Boyce, Branson's 2025 Entertainer of the Year. Backed by a live band, the show works through the hits of Elvis Presley, Buddy Holly, Johnny Cash, Roy Orbison, Connie Francis, and more from rock and roll's first decades. It is played straight rather than as impersonation, with the energy of the originals and a start time that leaves your whole day open.", shortDescription: "High-energy morning tribute to rock and roll pioneers and legends.", priceFrom: 52.80, priceTo: 52.80, childPriceFrom: 0.00, childPriceTo: 0.00, duration: "1.5 hours", ageRecommendation: "All ages", timeOfDay: "morning", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "July", seasonEnd: "October", showTimes: ["Tue 10:00 AM", "Sat 10:00 AM"], darkDays: ["Sunday", "Monday", "Wednesday", "Thursday", "Friday"], darkDateRanges: [{ start: "2026-09-01", end: "2026-09-01" }, { start: "2026-10-28", end: "2026-10-31" }], scheduleNote: "Tuesdays and Saturdays at 10:00 AM through October 27, 2026.", specialOffers: [], tags: ["rock-and-roll", "morning-show", "tribute", "classic"], seoKeywords: ["rock n roll sunrise branson", "branson morning rock show", "rock tribute branson morning"], relatedShows: ["british-invasion", "classic-rock-icons", "elvis-story-of-a-king"], imageAlt: "Rock n Roll Sunrise morning tribute show in Branson Missouri", imageUrl: "/shows/rock-n-roll-sunrise.jpg", galleryImages: ["/shows/rock-n-roll-sunrise/g1.jpg", "/shows/rock-n-roll-sunrise/g2.jpg", "/shows/rock-n-roll-sunrise/g3.jpg", "/shows/rock-n-roll-sunrise/g4.jpg", "/shows/rock-n-roll-sunrise/g5.jpg", "/shows/rock-n-roll-sunrise/g6.jpg", "/shows/rock-n-roll-sunrise/g7.jpg", "/shows/rock-n-roll-sunrise/g8.jpg", "/shows/rock-n-roll-sunrise/g9.jpg", "/shows/rock-n-roll-sunrise/g10.jpg", "/shows/rock-n-roll-sunrise/g11.jpg", "/shows/rock-n-roll-sunrise/g12.jpg"], faqs: [
  {
    question: "When does Rock 'n' Roll Sunrise play?",
    answer: "Tuesdays and Saturdays at 10:00 AM through October 27, 2026.",
  },
  {
    question: "How do I get my tickets?",
    answer: "You receive an order confirmation right away, and your tickets arrive by email within about 12 hours. Present them at the box office.",
  },
  {
    question: "Is Rock 'n' Roll Sunrise an impersonation show?",
    answer: "No. Matthew Boyce and the live band play the songs straight, as a concert, with the energy of the originals rather than as an impersonation act.",
  },
  {
    question: "Which artists' music is in the show?",
    answer: "The set covers the hits of Elvis Presley, Buddy Holly, Johnny Cash, Roy Orbison, Connie Francis, and more from rock and roll's first decades.",
  },
  {
    question: "Is a morning show a good fit for kids and seniors?",
    answer: "Yes. It is recommended for all ages, the 10:00 AM start suits early risers and young children alike, and children 12 and under are free.",
  },
  {
    question: "Who is Matthew Boyce?",
    answer: "Matthew Boyce is the singer who leads the show and was named Branson's 2025 Entertainer of the Year.",
  },
], isFeaturedPartner: true,
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Rock and Roll to Start Your Day",
    paragraphs: ["Rock 'n' Roll Sunrise Branson is a 90 minute morning concert at The Showroom at Branson Meadows, built around the hits of rock and roll's first decades. The show is led by Matthew Boyce, Branson's 2025 Entertainer of the Year, backed by a live band. It is played straight, as a concert, rather than as an impersonation act. The songs of Elvis Presley, Buddy Holly, Johnny Cash, Roy Orbison, Connie Francis, and more are performed with the energy of the originals, and the 10:00 AM start leaves the rest of your day wide open.", "Morning shows have become a Branson tradition, and this one makes a strong case for them. There is something fitting about hearing the music that woke up a generation while your coffee is still working. With artists ranging from Buddy Holly to Johnny Cash to Connie Francis, the set has more variety than a single-artist tribute could offer, taking in rockabilly, country-flavored hits, and the big ballads of the era. It is a concert first, with a band that plays the songs the way they were meant to be played."],
    imageUrl: "/shows/rock-n-roll-sunrise/g1.jpg",
    imageAlt: "Rock 'n' Roll Sunrise cast on stage at The Showroom at Branson Meadows in Branson",
  },
  {
    heading: "Elvis, Buddy Holly, Johnny Cash, and More",
    paragraphs: ["Expect the hits. Elvis Presley, Buddy Holly, Johnny Cash, Roy Orbison, and Connie Francis are all on the bill, along with more names from rock and roll's first decades, and the show works through their biggest songs one after another. Matthew Boyce fronts the show with his own voice and his own energy rather than a costume and an accent, which lets the songs stand on their own. The live band behind him gives every number the punch of the original records, and 90 minutes goes by fast.", "Because the show is not tied to a single artist, expect the mood to keep shifting. A driving rockabilly number gives way to a heartbreak ballad, a country-flavored hit follows a pop classic, and the crowd never has time to settle into one groove before the next one arrives. That range is what makes the morning fly. You do not need to know the artists' biographies to enjoy it. If you know the songs, and nearly everyone does, you are ready."],
    imageUrl: "/shows/rock-n-roll-sunrise/g2.jpg",
    imageAlt: "A performance of Rock 'n' Roll Sunrise in Branson, MO",
  },
  {
    heading: "Planning Your Morning at Branson Meadows",
    paragraphs: ["Rock 'n' Roll Sunrise plays at The Showroom at Branson Meadows, 4600 Gretna Rd, Branson, MO 65616. Performances are Tuesdays and Saturdays at 10:00 AM through October 27, 2026. The show runs about 90 minutes, so you will be back in the sunshine before noon. Plan to arrive 30 minutes early. That leaves time to park at the theater, check in at the box office, and find your seats with time to spare.", "The theater is on Gretna Road, with parking at the theater and an easy morning drive from anywhere in town. The Saturday show is a natural fit for weekend visitors who arrive Friday night and want to get the trip started right away, while the Tuesday show suits guests settling into a longer stay. With the season ending October 27, fall visitors should pick their date early. The morning slot pairs well with an afternoon on the water and an evening show, giving you three very different Branson experiences in one day."],
    imageUrl: "/shows/rock-n-roll-sunrise/g3.jpg",
    imageAlt: "Rock 'n' Roll Sunrise performers under the stage lights in Branson",
  },
  {
    heading: "Great for Early Risers and Families",
    paragraphs: ["Anyone who grew up on early rock and roll will feel at home here, and the concert format means you get the songs themselves rather than an impersonation. It is recommended for all ages. The 90 minute length and the morning start make it a comfortable choice for seniors and for families with young children who are at their best before lunch, and children 12 and under are free. Adult tickets are $46.17 plus tax, and that buys you a live band and Branson's 2025 Entertainer of the Year at the front of the stage.", "Rock 'n' Roll Sunrise tickets are sold right here on Get Branson Tickets. Pick a date on the calendar above, choose your ticket count, and you are done. We do not add fees, your tickets arrive by email, and every purchase includes free cancellation up to 24 hours before showtime, so booking early costs you nothing if the weather or the itinerary changes. If you want a hand choosing between the Tuesday and Saturday dates or fitting this show into a fuller week of Branson shows, call us at (417) 243-9629."],
    imageUrl: "/shows/rock-n-roll-sunrise/g4.jpg",
    imageAlt: "Scene from Rock 'n' Roll Sunrise at The Showroom at Branson Meadows",
  },
], }, { name: "Best of Dean Martin", slug: "dean-martin-tribute", tagline: "An Evening with Dino", category: ["tribute"], theater: "Branson Hot Hits Theatre", theaterAddress: "206 S Commercial St, Branson, MO 65616", description: "Step back into the golden age of Hollywood with this stunning tribute to the legendary Dean Martin. The show captures Dino's smooth vocal style, effortless charm, and trademark wit in a performance that makes you feel like you're watching the real King of Cool. From 'That's Amore' to 'Everybody Loves Somebody,' every song is performed with the kind of style and sophistication that made Dean Martin an entertainment icon. Complete with a live band and classic cocktail lounge atmosphere.", shortDescription: "Smooth tribute capturing Dean Martin's vocal style, charm, and legendary cool.", priceFrom: 29.95, priceTo: 34.95, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "afternoon", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "December", showTimes: ["2:00 PM"], darkDays: ["Monday", "Tuesday", "Thursday", "Saturday"], scheduleNote: "2:00 PM matinees Wednesday and Sunday, adding Fridays from early September.", specialOffers: [], tags: ["tribute", "rat-pack", "classic", "elegant"], seoKeywords: ["dean martin tribute branson", "branson rat pack show", "dean martin branson"], relatedShows: ["legends-in-concert", "george-dyer"], imageAlt: "Dean Martin tribute performer singing classic hits in Branson", imageUrl: "https://www.discoverbranson.com/media/products/d66cf24b-26c7-4d52-869b-c390b528ed86.jpg", faqs: [
  {
    question: "What songs are in the Best of Dean Martin show?",
    answer: "'That's Amore' and 'Everybody Loves Somebody' are the centerpieces, surrounded by more standards from Dean Martin's era. Everything is sung with a live band in a cocktail lounge setting.",
  },
  {
    question: "Is this a Rat Pack show or a Dean Martin show?",
    answer: "It is all about Dean. Fans of the Rat Pack era will recognize the lounge feel and the humor, but the tribute stays focused on Dean Martin's songs, charm, and wit rather than splitting time with a full Rat Pack lineup.",
  },
  {
    question: "Is a 2:00 PM matinee a good choice for seniors?",
    answer: "It is one of the better picks in Branson for that reason. The afternoon start means no night driving, the show is recommended for all ages, and the music is the kind most people over 50 already know by heart.",
  },
], isFeaturedPartner: false, externalUrl: "https://www.bransonhothits.com/best-of-dean-martin",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "An Afternoon With the King of Cool",
    paragraphs: ["Best of Dean Martin is a tribute to the golden age of Hollywood and to the entertainer who defined easy cool. The show captures Dino's smooth vocal style, effortless charm, and trademark wit in a performance that aims to feel like time spent with the real King of Cool, even though it plays as a 2:00 PM matinee. A live band backs the singing, and the classic cocktail lounge atmosphere sets the mood before the first note. It is one of the few Branson shows that plays in the afternoon and still feels like a night out.", "Tribute shows live or die on whether the performer gets the small things right, and this one is built around them. The phrasing, the timing of a joke, the way a song is half sung and half talked, all of it points back to the original. Fans of the Rat Pack era will recognize the lounge feel, though the spotlight stays on Dean rather than the whole gang. For anyone who owns a Dean Martin record, this Branson tribute is the easy afternoon pick."],
  },
  {
    heading: "The Songs and the Lounge Atmosphere",
    paragraphs: ["The set list is anchored by the songs everyone associates with Dean Martin. 'That's Amore' and 'Everybody Loves Somebody' are the ones fans wait for, and they arrive with the swing and sophistication that made him an icon. Around them come more standards from the same era, delivered in the same unhurried style. The live band matters here. Those songs were written to be sung in front of musicians, and hearing them played live rather than over a backing track is a big part of the charm.", "Between the songs comes the wit. Dean Martin's stage persona was as much about the jokes as the voice, and the tribute leans into that with the kind of relaxed, self-deprecating humor that made his performances feel like a party everyone was invited to. The cocktail lounge atmosphere carries the theme through the full two hours. It is stylish without being stiff, and it works for all ages, though the people who remember the era get the most out of every reference."],
  },
  {
    heading: "Branson Hot Hits Theatre and Planning Your Afternoon",
    paragraphs: ["Best of Dean Martin plays the Branson Hot Hits Theatre at 206 S Commercial St in downtown Branson. This is a matinee show, with 2:00 PM performances on Wednesdays and Sundays, and Friday matinees join the schedule from early September. The season runs March through December. Because the theater is downtown rather than out on the strip, it pairs naturally with lunch downtown before curtain. The show runs about two hours, which means you are done by late afternoon with the whole evening still open for another show.", "Arrive 30 minutes before the 2:00 PM start to park and find your seats. Best of Dean Martin tickets are sold directly by the Branson Hot Hits Theatre, not by Get Branson Tickets, so your seats come from the venue. We can still help with the rest of your Branson plans. Call (417) 243-9629 if you want a hand pairing this matinee with an evening show or a dinner show, and our team will help you plan the rest of the 2026 trip."],
  },
], }, { name: "Hamners' Unbelievable Variety Show", slug: "hamners-unbelievable-variety", tagline: "Magic, Music, Comedy & Impossibilities", category: ["variety-music", "magic", "comedy"], theater: "Hamners' Variety Theater", theaterAddress: "3090 Shepherd of the Hills Expy, Branson, MO 65616", description: "The Hamners' Unbelievable Variety Show is a fast-paced extravaganza that combines world-class magic, live music, comedy, and jaw-dropping specialty acts into one incredible show. The Hamner family has been entertaining audiences for decades, and their show reflects that experience with polished performances, seamless transitions, and production values that rival anything in Las Vegas. From grand illusions to aerial performances, from comedy sketches to powerful musical numbers, this show truly lives up to its 'unbelievable' name.", shortDescription: "Fast-paced extravaganza of magic, music, comedy, and jaw-dropping variety acts.", priceFrom: 48.00, priceTo: 48.00, childPriceFrom: 0.00, childPriceTo: 0.00, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "March", seasonEnd: "December", showTimes: ["8:00 PM"], darkDays: ["Sunday", "Monday", "Friday"], darkDateRanges: [{ start: "2026-01-01", end: "2027-12-31" }], extraPerformances: [{ date: "2026-08-27", times: ["8:00 PM"] }, { date: "2026-08-29", times: ["8:00 PM"] }, { date: "2026-09-01", times: ["8:00 PM"] }, { date: "2026-09-02", times: ["8:00 PM"] }, { date: "2026-09-03", times: ["8:00 PM"] }, { date: "2026-09-05", times: ["8:00 PM"] }, { date: "2026-09-06", times: ["2:00 PM"] }, { date: "2026-09-19", times: ["8:00 PM"] }, { date: "2026-09-22", times: ["8:00 PM"] }, { date: "2026-09-23", times: ["8:00 PM"] }, { date: "2026-09-24", times: ["8:00 PM"] }, { date: "2026-09-26", times: ["8:00 PM"] }, { date: "2026-09-29", times: ["8:00 PM"] }, { date: "2026-09-30", times: ["8:00 PM"] }, { date: "2026-10-01", times: ["8:00 PM"] }, { date: "2026-10-03", times: ["8:00 PM"] }, { date: "2026-10-06", times: ["8:00 PM"] }, { date: "2026-10-07", times: ["8:00 PM"] }, { date: "2026-10-08", times: ["8:00 PM"] }, { date: "2026-10-09", times: ["8:00 PM"] }, { date: "2026-10-10", times: ["8:00 PM"] }, { date: "2026-10-11", times: ["2:00 PM"] }, { date: "2026-10-13", times: ["8:00 PM"] }, { date: "2026-10-14", times: ["8:00 PM"] }, { date: "2026-10-15", times: ["8:00 PM"] }, { date: "2026-10-16", times: ["8:00 PM"] }, { date: "2026-10-17", times: ["8:00 PM"] }, { date: "2026-10-20", times: ["8:00 PM"] }, { date: "2026-10-21", times: ["8:00 PM"] }, { date: "2026-10-22", times: ["8:00 PM"] }, { date: "2026-10-24", times: ["8:00 PM"] }, { date: "2026-10-27", times: ["8:00 PM"] }, { date: "2026-10-28", times: ["8:00 PM"] }, { date: "2026-11-03", times: ["8:00 PM"] }, { date: "2026-11-04", times: ["8:00 PM"] }, { date: "2026-11-05", times: ["8:00 PM"] }, { date: "2026-11-07", times: ["8:00 PM"] }, { date: "2026-11-10", times: ["8:00 PM"] }, { date: "2026-11-11", times: ["8:00 PM"] }, { date: "2026-11-12", times: ["8:00 PM"] }, { date: "2026-11-14", times: ["8:00 PM"] }, { date: "2026-11-17", times: ["8:00 PM"] }, { date: "2026-11-18", times: ["8:00 PM"] }, { date: "2026-11-19", times: ["8:00 PM"] }, { date: "2026-11-21", times: ["8:00 PM"] }, { date: "2026-11-24", times: ["8:00 PM"] }, { date: "2026-11-25", times: ["8:00 PM"] }, { date: "2026-11-27", times: ["8:00 PM"] }, { date: "2026-11-28", times: ["8:00 PM"] }, { date: "2026-12-01", times: ["8:00 PM"] }, { date: "2026-12-02", times: ["8:00 PM"] }, { date: "2026-12-03", times: ["8:00 PM"] }, { date: "2026-12-05", times: ["8:00 PM"] }, { date: "2026-12-08", times: ["8:00 PM"] }, { date: "2026-12-09", times: ["8:00 PM"] }, { date: "2026-12-10", times: ["8:00 PM"] }, { date: "2026-12-12", times: ["8:00 PM"] }, { date: "2026-12-15", times: ["8:00 PM"] }, { date: "2026-12-19", times: ["8:00 PM"] }, { date: "2026-12-20", times: ["2:00 PM"] }, { date: "2026-12-21", times: ["8:00 PM"] }, { date: "2026-12-22", times: ["8:00 PM"] }, { date: "2026-12-23", times: ["8:00 PM"] }, { date: "2026-12-24", times: ["2:00 PM"] }, { date: "2026-12-26", times: ["8:00 PM"] }, { date: "2026-12-27", times: ["2:00 PM"] }, { date: "2026-12-28", times: ["8:00 PM"] }, { date: "2026-12-29", times: ["8:00 PM"] }, { date: "2026-12-30", times: ["8:00 PM"] }], scheduleNote: "Most weeks play Tuesday through Thursday and Saturday at 8:00 PM, with select Friday shows and 2:00 PM Sunday matinees. Dark September 7 to 18 and October 29 to November 2. The Christmas show begins November 3. December 24 is a 2:00 PM matinee; dark December 25; final show December 30. New Year's Eve December 31 is a special event sold by phone. Children 12 and under are free.", specialOffers: [], tags: ["variety", "magic", "comedy", "family-friendly", "spectacle"], seoKeywords: ["hamners branson", "branson variety show", "unbelievable variety branson"], relatedShows: ["reza-edge-of-illusion", "the-haygoods"], imageAlt: "Hamners Unbelievable Variety Show with magic and music in Branson", imageUrl: "/shows/hamners-unbelievable-variety.jpg", faqs: [
  {
    question: "What is in the Hamners' Unbelievable Variety Show?",
    answer: "A little of everything. Grand illusions, aerial performances, comedy sketches, live music, and specialty acts follow one another at a fast pace, so the show never settles into a single style for long.",
  },
  {
    question: "Is there a Christmas edition of the Hamners' show?",
    answer: "Yes. The Christmas show takes over starting November 3 and runs through the end of December, so a holiday-season visit gets the seasonal edition of the production.",
  },
  {
    question: "Is the show good for kids?",
    answer: "Yes! It is rated for all ages, children 12 and under are admitted free, and the magic and aerial acts hold young attention without any trouble.",
  },
  {
    question: "What makes this different from other Branson variety shows?",
    answer: "Most variety shows in town are built on music with comedy in between. The Hamners' show puts world-class magic and specialty acts at the center, and the Hamner family has been entertaining audiences for decades, so the transitions are seamless and the production values are on a Las Vegas level.",
  },
], isFeaturedPartner: true, externalUrl: "https://www.hamnersunbelievable.com",
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Rating read from the "Hamners' Unbelievable Variety Show - Branson, MO" Google listing via the Places API on 2026-09-06
// (4.6 stars, 3438 reviews). Fallback only; the page reads the live value via googlePlaceId.
googleRating: 4.6,
googleReviewCount: 3438,
googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=Hamners'%20Unbelievable%20Variety%20Show%20-%20Branson%2C%20MO%20Branson%20MO",
googlePlaceId: "ChIJNVumZmAbz4cROpsWJjBFAS8",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Branson's Magic and Variety Spectacle",
    paragraphs: ["The Hamners' Unbelievable Variety Show is a fast-paced production that folds world-class magic, live music, comedy, and specialty acts into a single two-hour show. The Hamner family has been entertaining audiences for decades, and that experience shows in polished performances, seamless transitions, and production values that rival anything in Las Vegas. Among Branson shows, it stands out because it refuses to be just one thing. A grand illusion is followed by an aerial performance, a comedy sketch gives way to a powerful musical number, and the pace never lets up.", "The word unbelievable is in the title for a reason. The show is built around moments that make a theater full of adults turn to each other and ask how that was possible, and it earns the name performance after performance. It plays at Hamners' Variety Theater on Shepherd of the Hills Expressway, and the whole evening feels tightly controlled, from the pacing to the transitions between acts. If you are choosing a single variety show for your Branson trip, this is the one that covers the most ground in one evening."],
  },
  {
    heading: "Illusions, Aerial Acts, and Live Music",
    paragraphs: ["Magic is the headliner. The grand illusions are the big-stage kind, with people appearing, vanishing, and turning up where they should not be, and they are staged with the timing of performers who have done this for a very long time. Aerial performances add height and grace, with artists working above the stage in routines that draw gasps from the front row to the back. Specialty acts fill in between, each one a short burst of skill that would be a highlight anywhere else.", "The music and comedy keep the show human. Powerful musical numbers give the audience something to feel between the illusions, and the comedy sketches let everyone laugh off the tension of watching someone do something that looks dangerous. The transitions are seamless, so there is no dead air while the next act sets up. It all moves quickly enough that two hours feel shorter, and slowly enough that you can actually take in what you just saw. That balance is the mark of a family that has been doing this for decades."],
  },
  {
    heading: "Hamners' Variety Theater and the 2026 Season",
    paragraphs: ["The show plays at Hamners' Variety Theater, 3090 Shepherd of the Hills Expy, Branson, MO 65616. Most weeks in 2026 it runs Tuesday through Thursday and Saturday at 8:00 PM, with select Friday performances and 2:00 PM Sunday matinees. The season runs from March into December, with dark stretches September 7 to 18 and October 29 through November 2. The Christmas show begins November 3. December 24 is a 2:00 PM matinee, the theater is dark December 25, and the final show of the year is December 30.", "An 8:00 PM curtain is later than most shows in town, which makes it easy to fit in a full dinner first. Plan to arrive about 30 minutes early to park at the theater and find your seats, since a fast-paced show is best seen from the first act. The show runs about two hours. The New Year's Eve performance on December 31 is a separate special event that is not on the regular calendar, so call us at (417) 243-9629 if you are interested in that night. For every other date, the calendar above shows every Hamners Branson performance currently on sale."],
  },
  {
    heading: "Kids Free, Families Welcome, Easy Booking",
    paragraphs: ["This is one of the better Branson shows for a family with a wide range of ages, and it is rated for all ages. Children 12 and under are free, which is a rare thing for an evening show in Branson and makes it a natural pick for grandparents treating the grandkids. Magic fans will get their fill of grand illusions, music lovers get real vocal power, and anyone who enjoys a good laugh is covered by the comedy sketches. Couples on a getaway like it too, because the 8:00 PM start leaves room for a relaxed dinner beforehand.", "Hamners' Unbelievable Variety Show tickets are sold here with no added fees. Adult tickets are $41.98 plus tax, kids 12 and under are free, and every ticket comes with free cancellation up to 24 hours before showtime. Pick a date on the calendar above, and your tickets arrive by email. If you are planning a Christmas-season visit, book early, because the Christmas show starts November 3 and the holiday weeks are the busiest time of year in Branson. Questions about accessible seating, group bookings, or which night fits your itinerary best can go to Get Branson Tickets at (417) 243-9629."],
  },
], }, { name: "Patsy Cline & Friends", slug: "patsy-cline-and-friends", tagline: "Celebrating the Queen of Country", category: ["tribute", "country-gospel"], theater: "Americana Theatre", theaterAddress: "2905 W 76 Country Blvd, Branson, MO 65616", description: "This beloved tribute show celebrates the music of the incomparable Patsy Cline along with other classic country legends. Featuring powerhouse vocals that capture the emotion and soul of Patsy's iconic songs like 'Crazy,' 'Walking After Midnight,' and 'I Fall to Pieces,' this show is a must-see for country music fans. The tribute extends to other legends of classic country, creating a full evening of the music that defined an era.", shortDescription: "Powerhouse tribute to Patsy Cline and classic country legends with iconic hits.", priceFrom: 42.95, priceTo: 47.0, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening", mealIncluded: true, mealType: "Dinner included, served from 4:15 PM", isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "April", seasonEnd: "November", showTimes: ["5:00 PM"], darkDays: ["Sunday", "Tuesday", "Thursday", "Friday", "Saturday"], scheduleNote: "Mondays and Wednesdays at 5:00 PM with dinner served from 4:15 PM. Final 2026 date is November 18.", specialOffers: [], tags: ["tribute", "country", "classic", "patsy-cline"], seoKeywords: ["patsy cline branson", "branson country tribute", "patsy cline tribute show"], relatedShows: ["cj-newsoms-classic-country", "legends-in-concert"], imageAlt: "Patsy Cline tribute performer singing classic country in Branson", imageUrl: "https://www.discoverbranson.com/media/products/f75a400f-b19a-4c79-8ae0-1c57a703540e.jpg", faqs: [
  {
    question: "Is dinner included with Patsy Cline & Friends?",
    answer: "Yes. Dinner is included with your ticket and is served from 4:15 PM, ahead of the 5:00 PM show, so plan to arrive for the meal rather than for curtain.",
  },
  {
    question: "Is the show only Patsy Cline songs?",
    answer: "No. Patsy's hits like 'Crazy,' 'Walking After Midnight,' and 'I Fall to Pieces' are the centerpiece, but the tribute extends to other classic country legends, so you get a full evening of music from that era.",
  },
  {
    question: "Is Patsy Cline & Friends a good show for seniors?",
    answer: "It is a natural fit. The show is recommended for all ages, the early dinner-and-show start means the evening ends early, and the classic country songs are ones most of the audience grew up with.",
  },
], isFeaturedPartner: false, externalUrl: "https://americanatheatrebranson.com/shows/patsy_cline_and_friends.html",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "A Tribute to the Queen of Country",
    paragraphs: ["Patsy Cline & Friends celebrates the singer known as the Queen of Country, and it does so the right way, with powerhouse vocals that go for the emotion in the songs rather than a simple impression. 'Crazy,' 'Walking After Midnight,' and 'I Fall to Pieces' are the songs fans come for, and they are the heart of the evening. Around them, the show widens out to other classic country legends, so the night becomes a tribute to a whole era of music rather than one artist.", "This is a dinner show, and that shapes the evening. Dinner is served from 4:15 PM and the show starts at 5:00 PM, so the whole outing runs early and ends early, which suits visitors who would rather not be out late. The Patsy Cline & Friends Branson show plays the Americana Theatre from April through November, and for classic country fans it is one of the easiest Branson shows to say yes to."],
  },
  {
    heading: "The Songs You Will Hear",
    paragraphs: ["The Patsy Cline portion of the show is where the vocals get their biggest workout. 'Crazy' asks for control and ache in equal measure, 'I Fall to Pieces' needs the same, and 'Walking After Midnight' lets the singer swing a little. Getting those three right is the real test of any Patsy Cline tribute, and this show is built to pass it. Powerhouse is the right word for the vocals, and the songs arrive with the emotion and soul that made the originals last.", "The friends in the title are the other legends of classic country, and their music fills out the rest of the two hours. Which voices from that era turn up alongside Patsy's is part of the fun, and it keeps the evening from feeling like a single long impression. What ties it all together is the sound itself, the plainspoken heartbreak and clean melodies of country music before it moved into the arenas. Expect a full evening of the songs that defined an era, sung by people who clearly love them."],
  },
  {
    heading: "Americana Theatre, Dinner, and Planning Your Evening",
    paragraphs: ["Patsy Cline & Friends plays the Americana Theatre at 2905 W 76 Country Blvd on the Branson strip. Performances are Mondays and Wednesdays at 5:00 PM, with dinner served from 4:15 PM, and the season runs April through November. The final 2026 date is November 18, so fall visitors should plan around it. Since dinner comes first, arrive by 4:15 PM rather than treating 5:00 PM as your target, and give yourself a few extra minutes beyond that to park and find your seats.", "The show runs about two hours, so the evening wraps up early enough to enjoy a walk on the strip afterward. Patsy Cline & Friends tickets are sold directly by the Americana Theatre, not through Get Branson Tickets, so book your seats and dinner with the venue. Our team is happy to help you plan the rest of the trip, whether that means a morning show the next day or a comedy show later in the week. Call (417) 243-9629 and we will talk it through."],
  },
], }, { name: "Down Home Country", slug: "down-home-country", tagline: "Start Your Morning with Country Fun", category: ["country-gospel", "variety-music"], theater: "Grand Country Music Hall", theaterAddress: "1945 W 76 Country Blvd, Branson, MO 65616", description: "Down Home Country kicks off the morning at Grand Country Music Hall with an energetic blend of classic country music, gospel favorites, and good-natured comedy that embodies the spirit of the Ozarks. The talented cast delivers crowd-pleasing performances of country hits from past and present, interspersed with wholesome humor and heartfelt gospel numbers. It's the perfect way to start your Branson day with a smile.", shortDescription: "Energetic morning show of classic country, gospel, and comedy at Grand Country.", priceFrom: 52.99, priceTo: 52.99, childPriceFrom: 18.14, childPriceTo: 18.14, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "morning" as const, mealIncluded: false, mealType: null, isNew2026: true, isFeatured: false, isFeaturedPartner: true, externalUrl: "https://www.grandcountry.com/down-home-country", isLimitedEngagement: false, seasonStart: "April", seasonEnd: "December", showTimes: ["10:00 AM"], darkDays: ["Saturday", "Sunday"], darkDateRanges: [{ start: "2026-06-01", end: "2026-09-08" }, { start: "2026-11-26", end: "2026-11-26" }, { start: "2026-12-07", end: "2026-12-07" }, { start: "2026-12-12", end: "2026-12-31" }], seasonalDarkWeekdays: [{ day: "Monday", start: "2026-09-01", end: "2026-09-30" }], scheduleNote: "Weekday mornings at 10:00 AM. Fall run September 9 through December 11, Tuesday to Friday in September, Monday to Friday from October, skipping Thanksgiving Day and December 7. Verified 2026-08-21 against tickets.grandcountry.com.", specialOffers: [], tags: ["country", "gospel", "morning-show", "family-friendly"], seoKeywords: ["down home country branson", "branson morning show", "grand country music hall morning"], relatedShows: ["grand-jubilee", "comedy-jamboree", "pets-and-giggles"], imageAlt: "Down Home Country show performing at Grand Country Music Hall in Branson", imageUrl: "/shows/down-home-country.jpg", faqs: [
  {
    question: "What kind of music is in Down Home Country?",
    answer: "Classic country is the heart of it, with country hits from past and present, gospel favorites, and good-natured comedy mixed in. If you like traditional country with a little Sunday morning gospel on the side, this is your show.",
  },
  {
    question: "Is Down Home Country new for 2026?",
    answer: "Yes. It is one of the new shows at Grand Country Music Hall for 2026, filling the weekday morning slot with country, gospel, and comedy.",
  },
  {
    question: "Does a morning show work for kids and seniors?",
    answer: "It works well for both. Kids are fresh in the morning, seniors often prefer to be done before the strip gets busy, and the show is rated for all ages with wholesome humor throughout.",
  },
  {
    question: "Can I see Down Home Country and another Grand Country show the same day?",
    answer: "Easily. The morning show is over before lunch, which leaves the afternoon for Comedy Jamboree or New South Gospel and the evening for Grand Jubilee on the same stage. Many visitors make a full Grand Country day of it.",
  },
],
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Rating read from the "Down Home Country" Google listing via the Places API on 2026-09-06
// (4.5 stars, 11 reviews). Fallback only; the page reads the live value via googlePlaceId.
googleRating: 4.5,
googleReviewCount: 11,
googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=Down%20Home%20Country%20Branson%20MO",
googlePlaceId: "ChIJzde6eTUDz4cRIQuouljhRWM",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Country and Gospel to Start the Day",
    paragraphs: ["Down Home Country is new for 2026, and it kicks off the morning at Grand Country Music Hall with an energetic blend of classic country, gospel favorites, and good-natured comedy. The show embodies the spirit of the Ozarks, which is to say it is warm, unpretentious, and happy to make you laugh. A talented cast delivers crowd-pleasing performances of country hits from past and present, and the whole thing wraps up before lunch. It is the kind of Branson show that sends you out the door in a good mood with the whole day still ahead.", "Morning shows have a long history in Branson, and Down Home Country Branson picks up that tradition for a new generation of visitors. The idea is simple. Start the day with music you love and comedy that makes the whole family smile, then head out for lunch, shopping, or the lake with time to spare. It suits early risers and anyone whose evenings are already booked with the big-name Branson shows. The energy is high from the first song, so there is no such thing as too early for this one."],
  },
  {
    heading: "Classic Hits, Gospel Favorites, and Clean Comedy",
    paragraphs: ["The music draws from country's past and present. Expect the classics that defined the genre alongside more recent hits, performed by a cast that clearly enjoys the material. The playing is tight and the vocals are front and center, with the kind of harmony singing that country and gospel have always shared. Between the country numbers, the cast turns to heartfelt gospel favorites, and those moments give the show its heart. Nothing feels rushed, but nothing drags either, and two hours go by in what feels like one.", "The comedy is wholesome and good-natured, the sort of humor that pokes fun without ever getting mean. It shows up between songs and sometimes in the middle of them, and it keeps the mood light even when the gospel numbers turn tender. Because the humor is clean, nobody in the family has to cover anyone's ears, and grandparents laugh just as hard as the kids. The combination of country hits, gospel, and laughs is a classic Ozarks formula, and this show handles it with real energy."],
  },
  {
    heading: "Weekday Mornings at Grand Country Music Hall",
    paragraphs: ["Down Home Country plays weekday mornings at 10:00 AM at Grand Country Music Hall, 1945 W 76 Country Blvd, Branson, MO 65616. The season opens in April, and the 2026 fall run goes from September 9 through December 11. In September the show plays Tuesday through Friday, and from October on it plays Monday through Friday, skipping Thanksgiving Day and December 7. The show runs about two hours, so you are out a little after noon, and parking is right at the theater.", "Plan to arrive by 9:30 AM. Thirty minutes is enough time to park, get inside, and find your seats before the music starts, and a morning arrival means you will never fight the evening crowds on the strip. If you are staying at a hotel with a breakfast buffet, eat first, because the show runs straight through to about noon. The calendar above shows every weekday date on sale for 2026, so you can match the show to whichever morning of your trip is free."],
  },
  {
    heading: "Early Risers, Families, and Country Fans",
    paragraphs: ["Down Home Country is for the country fan who would rather not wait until 8:00 PM for a show, for families with kids who are at their best in the morning, and for seniors who like to have the day's outing done before lunch. It is rated for all ages, and the wholesome humor means there is nothing to worry about with young ones in the row. Tour groups appreciate that it fits neatly before an afternoon of shopping or a lake cruise. If your tastes run to classic country and gospel, you will be tapping your foot before the first chorus ends.", "Down Home Country tickets are sold right here, with no added fees and free cancellation up to 24 hours before showtime. Pick a date on the calendar above, and your tickets are emailed to you. Adult tickets are $46.34 plus tax, and kids' tickets are $15.86 plus tax, which keeps a family morning affordable. Since this is a new show for 2026, it is a good one to book ahead rather than assume there will be seats on the day. Call Get Branson Tickets at (417) 243-9629 if you want a hand putting together a full Grand Country day."],
  },
], }, { name: "Ozarks Country", slug: "ozarks-country", tagline: "Sunday Night Country at Grand Country", category: ["country-gospel", "variety-music"], theater: "Grand Country Music Hall", theaterAddress: "1945 W 76 Country Blvd, Branson, MO 65616", description: "Ozarks Country is Grand Country Music Hall's Sunday evening show, bringing the authentic sound of Ozark country music to life. This high-spirited production features classic and contemporary country hits, western swing, and toe-tapping fiddle tunes performed by some of Branson's finest musicians. It's a celebration of country music traditions with the warmth and hospitality that Grand Country is known for.", shortDescription: "Sunday evening country music celebration at Grand Country Music Hall.", priceFrom: 52.99, priceTo: 52.99, childPriceFrom: 18.14, childPriceTo: 18.14, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening" as const, mealIncluded: false, mealType: null, isNew2026: true, isFeatured: false, isFeaturedPartner: true, externalUrl: "https://www.grandcountry.com/ozarks-country", isLimitedEngagement: false, seasonStart: "March", seasonEnd: "December", showTimes: ["7:00 PM"], darkDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], darkDateRanges: [{ start: "2026-08-23", end: "2026-08-23" }, { start: "2026-12-14", end: "2026-12-31" }], scheduleNote: "Sundays at 7:00 PM. Skips August 23. Final 2026 show is December 13. Verified 2026-08-21 against tickets.grandcountry.com.", specialOffers: [], tags: ["country", "sunday", "ozarks", "family-friendly"], seoKeywords: ["ozarks country branson", "branson sunday show", "grand country music hall sunday"], relatedShows: ["grand-jubilee", "down-home-country", "ozarks-gospel"], imageAlt: "Ozarks Country show at Grand Country Music Hall in Branson", imageUrl: "/shows/ozarks-country.jpg", faqs: [
  {
    question: "What kind of country music does Ozarks Country play?",
    answer: "Classic and contemporary country hits, western swing, and fiddle tunes. It is a celebration of country music traditions rather than a tribute to any one artist, so the range is wide.",
  },
  {
    question: "Is Ozarks Country new for 2026?",
    answer: "Yes. It is a new show for 2026 and the Sunday evening production at Grand Country Music Hall, giving Sunday night visitors a live country show at one of Branson's premier venues.",
  },
  {
    question: "Is it a good show for kids and older guests?",
    answer: "Yes. It is rated for all ages and the tone is family-friendly, with high-spirited music that older country fans will recognize and kids can clap along to.",
  },
  {
    question: "How is Ozarks Country different from Grand Jubilee?",
    answer: "Grand Jubilee is a variety show that covers country, gospel, rock, and pop with comedy segments, and it plays every night but Sunday. Ozarks Country is all country and only on Sunday, with western swing and fiddle tunes you will not get in the variety format. For a weekend trip, the two make a natural Saturday and Sunday pair.",
  },
],
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Country Music Owns Sunday Night",
    paragraphs: ["Ozarks Country is Grand Country Music Hall's Sunday evening show, and it is new for 2026. The idea is to bring the authentic sound of Ozark country music to life on a night when several other Branson shows take the evening off. It is a high-spirited production of classic and contemporary country hits, western swing, and toe-tapping fiddle tunes, performed by some of Branson's finest musicians. Add the warmth and hospitality Grand Country is known for, and you have a Sunday night that feels like a celebration.", "For visitors arriving on a weekend, Ozarks Country Branson solves a familiar problem. Saturday is easy to fill, but Sunday evening often ends up as a quiet night at the hotel. This show gives you a reason to go out. It is also a good match for anyone who came to Branson specifically for country music and wants a show that stays in that lane from start to finish, rather than a variety format that samples a little of everything. Country traditions are the whole point here, and they are honored well."],
  },
  {
    heading: "Fiddle Tunes, Western Swing, and Country Hits",
    paragraphs: ["The music covers a lot of country ground in two hours. Classic hits from the genre's golden years sit next to contemporary songs the radio is playing right now, and the musicians move between eras without a hitch. Western swing numbers bring a dance-hall bounce that gets toes tapping in every row, and the fiddle tunes are the kind that draw whoops from the crowd. Expect strong vocals, tight playing, and the sort of instrumental breaks that remind you why live country music beats a recording every time.", "What holds it together is the Ozarks flavor. This is country music as it has been played in these hills for generations, with a warmth that comes across from the stage and a cast that treats the audience like company rather than customers. The hospitality Grand Country is known for is part of the show itself. By the closing number, most of the room is clapping along, and the drive back to the hotel tends to include at least one person humming a fiddle tune."],
  },
  {
    heading: "Your Sunday Night Plan",
    paragraphs: ["Ozarks Country plays Sundays at 7:00 PM at Grand Country Music Hall, 1945 W 76 Country Blvd, Branson, MO 65616. The 2026 season runs from spring through December 13, which is the final show of the year, and the show skips August 23. It runs about two hours, so you will be back at the hotel at a reasonable time for a Monday morning drive home. Parking is at the theater, and arriving 30 minutes early leaves plenty of time to find your seats.", "Because it is a Sunday-only show, the calendar above is the place to confirm your date before you build the rest of the weekend around it. Many visitors pair it with Ozarks Gospel, the 2:00 PM Sunday matinee on the same stage, and spend the hours in between at dinner along 76 Country Boulevard. If you are checking out Monday, an evening show that ends around 9:00 PM is about as late as most folks want to stay out. Dress is casual, and you will not be the only one in boots."],
  },
  {
    heading: "Country Fans, Weekenders, and Families",
    paragraphs: ["Ozarks Country is a strong pick for country music fans of every age, for couples on a weekend getaway who want a lively Sunday night, and for families who would rather share a live show than another hour of hotel television. It is rated for all ages, and the tone is family-friendly throughout. Older guests who remember western swing on the radio will appreciate hearing it played live, and younger listeners will recognize the contemporary hits. Fiddle music has a way of winning over people who did not think they liked country, so bring the skeptic in your group too.", "Ozarks Country tickets are available through Get Branson Tickets with no added fees. Pick a date on the calendar above, and your tickets will be delivered by email. Free cancellation up to 24 hours before showtime comes standard, so a Sunday booking is easy to adjust if the weekend plans shift. Kids' tickets are offered at a lower price than adult tickets, which helps when the whole family is going. For help with group seating, accessibility questions, or building a full weekend of Branson shows around this one, call (417) 243-9629 and talk to a real person."],
  },
], }, { name: "The Texas Tenors", slug: "the-texas-tenors", tagline: "America's Got Talent's #1 Vocal Group", category: ["variety-music"], theater: "Mickey Gilley Grand Shanghai Theatre", theaterAddress: "3455 W 76 Country Blvd, Branson, MO 65616", description: "The Texas Tenors are the most successful music group in the history of America's Got Talent. These three classically trained vocalists deliver a breathtaking show that blends country, classical, Broadway, and pop into an unforgettable concert experience. Their three-part harmonies, individual vocal power, and genuine camaraderie create a show that moves audiences from laughter to tears and back again. With multiple albums, PBS specials, and world tours under their belt, The Texas Tenors bring world-class entertainment to Branson.", shortDescription: "America's Got Talent's top vocal group blending country, classical, and pop.", priceFrom: 58.00, priceTo: 58.00, childPriceFrom: 25.00, childPriceTo: 25.00, kidsFreeUnderAge: 3, duration: "2 hours", ageRecommendation: "All ages", timeOfDay: "evening" as const, mealIncluded: false, mealType: null, isNew2026: true, isFeatured: true, featuredOrder: 3, isFeaturedPartner: true, externalUrl: "https://thetexastenors.com", isLimitedEngagement: true, seasonStart: "April", seasonEnd: "November", showTimes: ["Tue 7:30 PM", "Wed 2:00 PM", "Thu 7:30 PM", "Fri 7:30 PM", "Sat 2:00 PM"], darkDays: ["Sunday", "Monday"], darkDateRanges: [{ start: "2026-08-01", end: "2026-09-07" }, { start: "2026-09-13", end: "2026-10-12" }, { start: "2026-10-18", end: "2026-11-02" }, { start: "2026-11-20", end: "2027-12-31" }], extraPerformances: [{ date: "2026-11-20", times: ["2:00 PM"] }], scheduleNote: "2026 Branson engagements: September 8 to 12, October 13 to 17, and November 3 to 20. Tuesday, Thursday, Friday at 7:30 PM; Wednesday and Saturday at 2:00 PM. The November 20 finale is a 2:00 PM matinee. 2027 engagement weeks exist on the theater calendar with different times and are deliberately not loaded yet; refresh from tickets.grandshanghaitheatre.com nearer the season. Verified 2026-08-21.", specialOffers: [], tags: ["vocal", "americas-got-talent", "country", "classical", "pop"], seoKeywords: ["texas tenors branson", "americas got talent branson", "branson vocal show"], relatedShows: ["six", "amazing-acrobats-of-shanghai"], imageAlt: "The Texas Tenors performing at Mickey Gilley Grand Shanghai Theatre in Branson", imageUrl: "/shows/the-texas-tenors.jpg", faqs: [
  {
    question: "What kind of music do The Texas Tenors sing?",
    answer: "They blend country, classical, Broadway, and pop in one concert. Three classically trained voices in three-part harmony can move from a country favorite to an operatic number to a Broadway standard in the same evening, and that range is a big part of the appeal.",
  },
  {
    question: "Is the show good for kids and seniors?",
    answer: "This concert is recommended for all ages. Seniors and music lovers are the core audience, but families are welcome, and children under 3 are admitted free.",
  },
  {
    question: "What should I wear, and how early should I arrive?",
    answer: "Dress is casual, as it is for most Branson shows, so come as you are. Plan to arrive about 30 minutes before showtime to park and find your seats.",
  },
  {
    question: "Can you help with accessible seating at the Mickey Gilley Grand Shanghai Theatre?",
    answer: "Yes. Call us at (417) 243-9629 before you book and we will coordinate accessible seating with the theater and answer any questions about the building.",
  },
],
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// bransonshows.com's listed adult rate for this show (their Adult Admission offer),
// captured 2026-09-06; see docs/substantiation/README.md. Re-verify monthly.
competitorPrice: 65.38,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "AGT's Most Successful Group Comes to Branson",
    paragraphs: ["The Texas Tenors are the most successful music group in the history of America's Got Talent, and in 2026 they bring their concert to the Mickey Gilley Grand Shanghai Theatre for a limited engagement. Three classically trained vocalists blend country, classical, Broadway, and pop into a single evening, and the three-part harmonies, individual vocal power, and genuine camaraderie between them have carried the group through multiple albums, PBS specials, and world tours.", "This is a limited engagement rather than a full-season run, which makes it one of the more sought-after Branson shows of the year. The group performs only a handful of weeks in Branson in 2026, so fans who want a specific date should check the calendar above early rather than waiting until they arrive in town. The Texas Tenors tickets on this page are booked directly with the theater."],
  },
  {
    heading: "Three Voices, Four Genres, One Concert",
    paragraphs: ["The concert moves between country, classical, Broadway, and pop, and the transitions are where the show shines. A country favorite might give way to a classical piece sung with full operatic power, followed by a Broadway standard delivered in three-part harmony. Each of the three tenors gets moments to show his individual range, and then the voices come back together for the big finish.", "What audiences remember most is the emotional range. The show moves people from laughter to tears and back again, thanks to the easy camaraderie between the three singers and the humor they bring to the stage between the big numbers. It is a true concert, built on voices rather than effects, and it rewards listeners who came for the singing."],
  },
  {
    heading: "Dates at the Mickey Gilley Grand Shanghai Theatre",
    paragraphs: ["The Texas Tenors perform at the Mickey Gilley Grand Shanghai Theatre, 3455 W 76 Country Blvd, Branson, MO 65616. The 2026 Branson engagements are September 8 to 12, October 13 to 17, and November 3 to 20. Within those weeks, shows are Tuesday, Thursday, and Friday at 7:30 PM and Wednesday and Saturday at 2:00 PM, and the November 20 finale is a 2:00 PM matinee.", "The concert runs about two hours. Arrive 30 minutes early to park at the theater and find your seats before the house lights dim. Because the engagement is limited, the calendar above only shows the 2026 weeks currently on sale. If you are planning a 2027 visit, call us and we will let you know when those dates open for booking."],
  },
  {
    heading: "Who Should See It and Why Book Here",
    paragraphs: ["The Texas Tenors are the right pick for anyone who loves great singing, whether that means country, classical, or Broadway. It is an ideal show for a special occasion, for seniors who want a seated concert with real musicianship, and for anyone who followed the group on America's Got Talent or caught their PBS specials. Families are welcome, kids' tickets are available, and children under 3 attend free.", "Booking The Texas Tenors Branson tickets through Get Branson Tickets means no added fees, tickets delivered by email, and free cancellation up to 24 hours before showtime, which matters when you are planning around a limited run. Pick a date on the calendar above, or call (417) 243-9629 and we will help you choose between an evening show and a matinee."],
  },
], }, { name: "Thank You for the Music", slug: "thank-you-for-the-music", tagline: "A Modern Tribute to ABBA", category: ["tribute", "variety-music"], theater: "Hamners' Variety Theater", theaterAddress: "3090 Shepherd of the Hills Expy, Branson, MO 65616", description: "Thank You for the Music: A Modern Tribute to ABBA celebrates the Swedish pop supergroup with powerful harmonies, high-energy dance, big personalities, and stunning lighting and video. The cast performs the hits that made ABBA a worldwide phenomenon, including Dancing Queen, Waterloo, Take a Chance on Me, Fernando, and Mamma Mia. It is a contemporary take on a songbook that has filled dance floors for five decades.", shortDescription: "High-energy modern tribute to ABBA with Dancing Queen, Mamma Mia, and more.", priceFrom: 40.00, priceTo: 40.00, childPriceFrom: 0.00, childPriceTo: 0.00, duration: "2 hours", ageRecommendation: "All ages", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "September", seasonEnd: "December", timeOfDay: "afternoon", showTimes: ["Tue 5:00 PM", "Thu 5:00 PM", "Fri 2:00 PM"], darkDays: ["Sunday", "Monday", "Wednesday", "Saturday"], darkDateRanges: [{ start: "2026-11-26", end: "2026-11-26" }, { start: "2026-12-12", end: "2027-12-31" }], scheduleNote: "Tuesday and Thursday at 5:00 PM and Friday at 2:00 PM, September 1 through December 11. Dark Thanksgiving Day. Children 12 and under are free.", specialOffers: [], tags: ["tribute", "abba", "70s", "family-friendly"], seoKeywords: ["abba tribute branson", "thank you for the music branson", "branson abba show"], relatedShows: ["back-to-the-bee-gees", "beach-boys-california-dreamin", "hamners-unbelievable-variety"], imageAlt: "Thank You for the Music cast in sparkling 70s costumes under stage lights", imageUrl: "/shows/thank-you-for-the-music.jpg", faqs: [
  {
    question: "What kind of show is Thank You for the Music?",
    answer: "It is a modern tribute to ABBA, performed live with powerful harmonies, high-energy dance, and lighting and video that give the songs a contemporary look. Expect the biggest hits, including Dancing Queen, Waterloo, Take a Chance on Me, Fernando, and Mamma Mia.",
  },
  {
    question: "Is it a good show for kids?",
    answer: "Yes! The show is recommended for all ages, the songs are upbeat and easy to sing along with, and children 12 and under are admitted free.",
  },
  {
    question: "Do I need to be an ABBA fan to enjoy it?",
    answer: "No. The songs are so familiar that most people know the choruses without realizing it, and the dancing, lighting, and video carry the show even for guests who came along for someone else.",
  },
  {
    question: "Is the theater wheelchair accessible?",
    answer: "Call us at (417) 243-9629 before you book and we will make sure Hamners' Variety Theater can seat your party comfortably.",
  },
], isFeaturedPartner: true, externalUrl: "https://hamnersvarietytheater.com",
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// bransonshows.com's listed adult rate for this show (their Adult Admission offer),
// captured 2026-09-06; see docs/substantiation/README.md. Re-verify monthly.
competitorPrice: 38.46,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "A Modern Take on the ABBA Songbook",
    paragraphs: ["Thank You for the Music Branson is a modern tribute to ABBA, the Swedish pop supergroup whose songs have filled dance floors for five decades. The show plays at Hamners' Variety Theater, and it is built around the same things that made the original records work: powerful harmonies, big personalities, and hooks you cannot help but sing along with. Rather than a museum piece, it is a contemporary take on the music, with high-energy dance and lighting and video that give the songs a fresh look.", "Tribute shows are a Branson staple, and ABBA is a natural fit for the town's audiences. The songs are cheerful, the choruses are easy to join, and nearly everyone in the room knows the words to at least a few of them. This is a good pick for couples who remember the 1970s firsthand, for groups who want something upbeat, and for grandparents bringing the kids along, since children 12 and under get in free. The season runs September 1 through December 11, 2026."],
  },
  {
    heading: "The Hits You Will Hear",
    paragraphs: ["The set list leans on the songs that made ABBA a worldwide phenomenon. Dancing Queen, Waterloo, Take a Chance on Me, Fernando, and Mamma Mia all get their turn, delivered with the layered vocal harmonies the group was famous for. The cast sings with real power, and the choreography keeps the stage in motion from the first number to the last. Big personalities on stage keep the show playful between songs, so the energy never drops while the cast catches its breath.", "Lighting and video are a big part of the production, and they give the show a look that matches the music. The color and sparkle of the 1970s are all there, with video that sets the scene for each song and lighting that brings the dance floor feel into the theater. It is a modern production in every sense, and the two hours pass quickly. If you have ever sung along to Dancing Queen in the car, you will be doing it again here, and you will not be the only one in the room."],
  },
  {
    heading: "Planning Your Visit to Hamners' Variety Theater",
    paragraphs: ["Thank You for the Music plays at Hamners' Variety Theater, 3090 Shepherd of the Hills Expy, Branson, MO 65616. Showtimes are Tuesday and Thursday at 5:00 PM and Friday at 2:00 PM, September 1 through December 11, with no show on Thanksgiving Day. The show runs about two hours. Plan to arrive 30 minutes early, which leaves time to park at the theater, check in at the box office, and get settled before the lights go down.", "The 5:00 PM start is one of the more convenient times in town. It is early enough to leave the evening open for dinner afterward, and late enough that you can spend the afternoon at the lake or the shops first. The Friday 2:00 PM matinee works well for anyone who prefers to be back at the hotel before dark. Parking is available at the theater, and the Shepherd of the Hills Expressway location puts you within a short drive of most Branson hotels and restaurants."],
  },
  {
    heading: "Who Will Love It and How to Book",
    paragraphs: ["Thank You for the Music suits just about everyone. Longtime ABBA fans will know every word, younger guests will recognize the songs anyway, and the pace and color hold kids' attention for the full two hours. The show is recommended for all ages, and children 12 and under are free, which makes it one of the easier Branson shows to bring the whole family to. Adult tickets are $34.98 plus tax.", "Thank You for the Music tickets are easy to book with Get Branson Tickets. Pick a date on the calendar above, choose how many tickets you need, and your tickets arrive by email. There are no added fees, and every order comes with free cancellation up to 24 hours before showtime, so a change in plans does not cost you anything. If you would rather talk it through with a person, or you are putting together a larger group, call us at (417) 243-9629 and we will help you sort out the details."],
  },
] }, { name: "Beach Boys California Dreamin'", slug: "beach-boys-california-dreamin", tagline: "A Musical Trip to 1960s California", category: ["tribute", "variety-music"], theater: "Hamners' Variety Theater", theaterAddress: "3090 Shepherd of the Hills Expy, Branson, MO 65616", description: "Beach Boys California Dreamin' takes the audience to the West Coast beaches of the 1960s with the Beach Boys songbook performed in authentic style, along with tributes to other artists of the surf rock era. Expect layered vocal harmonies, energetic choreography, comedy, colorful costumes and sets, and video that ties the era together.", shortDescription: "The Beach Boys songbook and the surf rock era, performed with authentic harmonies.", priceFrom: 40.00, priceTo: 40.00, childPriceFrom: 0.00, childPriceTo: 0.00, duration: "2 hours", ageRecommendation: "All ages", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "September", seasonEnd: "December", timeOfDay: "morning", showTimes: ["10:00 AM"], darkDays: ["Friday", "Saturday", "Sunday", "Monday"], darkDateRanges: [{ start: "2026-11-25", end: "2026-11-26" }, { start: "2026-12-11", end: "2027-12-31" }], scheduleNote: "Tuesday, Wednesday, and Thursday at 10:00 AM, September 1 through December 10. Dark November 25 and 26. Children 12 and under are free.", specialOffers: [], tags: ["tribute", "60s", "beach-boys", "family-friendly"], seoKeywords: ["beach boys tribute branson", "california dreamin branson", "branson surf rock show"], relatedShows: ["thank-you-for-the-music", "sound-of-simon-and-garfunkel", "hamners-unbelievable-variety"], imageAlt: "Beach Boys California Dreamin cast jumping with a surfboard in Hawaiian shirts", imageUrl: "/shows/beach-boys-california-dreamin.jpg", faqs: [
  {
    question: "What kind of music is in Beach Boys California Dreamin'?",
    answer: "It is the Beach Boys songbook performed in authentic style, with layered vocal harmonies, plus tributes to other artists of the 1960s surf rock era. Expect choreography, comedy, and colorful costumes along with the songs.",
  },
  {
    question: "Is a 10:00 AM show a good choice for seniors?",
    answer: "Yes. The show is recommended for all ages, and many of our guests prefer a morning performance because there is no late night and the afternoon and evening stay free for other plans.",
  },
  {
    question: "Will my grandchildren enjoy it?",
    answer: "Most kids do. The music is upbeat, the comedy and colorful sets hold their attention, and children 12 and under get in free.",
  },
  {
    question: "What should I wear?",
    answer: "Whatever is comfortable. Branson theaters are casual, and most guests come straight from breakfast in everyday clothes.",
  },
], isFeaturedPartner: true, externalUrl: "https://hamnersvarietytheater.com",
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// bransonshows.com's listed adult rate for this show (their Adult Admission offer),
// captured 2026-09-06; see docs/substantiation/README.md. Re-verify monthly.
competitorPrice: 38.46,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "A Morning Trip to 1960s California",
    paragraphs: ["Beach Boys California Dreamin' Branson is a tribute to the Beach Boys songbook and the surf rock era that surrounded it. The show plays mornings at Hamners' Variety Theater, and it is built to feel like a day at the beach in the 1960s, with colorful costumes and sets, comedy, and video that ties the whole era together. It is one of the sunnier Branson shows, and that is very much the point.", "Surf music was built on vocal harmony, and that is what this show gets right. The cast performs the songs in authentic style, which means the stacked harmonies and the bright, driving rhythm that made the originals sound like summer. Along the way, the show pays tribute to other artists of the surf rock era, so the set is broader than one band. If you grew up with a transistor radio on the beach towel, or you simply like music that makes you smile, this is your show."],
  },
  {
    heading: "Harmonies, Choreography, and Comedy on Stage",
    paragraphs: ["The heart of the show is the singing. The Beach Boys built their sound on layered vocal harmonies, and the cast recreates that sound live, voice on top of voice, until the chorus sounds like a whole beach full of people. Energetic choreography keeps the stage moving, and the comedy woven between the numbers gives the audience a chance to laugh and catch its breath before the next song starts.", "Colorful costumes and sets put the 1960s right in front of you, and video ties the era together between and behind the songs. The tributes to other surf rock artists give the show variety without ever leaving the decade. It all adds up to a two-hour production that is easy to follow, easy to enjoy, and full of songs you already know by heart. Nobody has to explain a plot, because there is not one. It is simply great music, performed well, in a room full of people having a good time."],
  },
  {
    heading: "Planning a Morning at Hamners' Variety Theater",
    paragraphs: ["Beach Boys California Dreamin' plays at Hamners' Variety Theater, 3090 Shepherd of the Hills Expy, Branson, MO 65616. Performances are Tuesday, Wednesday, and Thursday at 10:00 AM, September 1 through December 10, with no shows on November 25 and 26. The show runs about two hours, so you will be out a little after noon with the rest of the day still ahead of you. Arrive 30 minutes early to park at the theater and find your seats without rushing.", "A 10:00 AM show is a smart way to plan a Branson day. Have breakfast, see the show, and you still have the whole afternoon for the theme park, the lake, or a nap before an evening show somewhere else. Morning audiences tend to be relaxed and friendly, and the upbeat music suits the hour better than you might expect. Hamners' Variety Theater is on Shepherd of the Hills Expressway, an easy drive from the main strip, and parking at the theater keeps the morning simple."],
  },
  {
    heading: "Great for Families and Groups",
    paragraphs: ["This is a show for anyone who likes to smile. Fans who remember the 1960s will enjoy hearing the songs performed in authentic style, and the harmonies alone are worth the ticket for anyone who appreciates good singing. The show is recommended for all ages, and kids do well here, because the music is bright, the costumes are colorful, and the comedy keeps things light. Children 12 and under are free, so a family morning at the theater costs less than you might think. An adult ticket is $34.98 plus tax.", "Booking Beach Boys California Dreamin' tickets through Get Branson Tickets takes a minute. Pick a date on the calendar above, enter your party size, and check out. There are no added fees, and your tickets come by email. Every ticket includes free cancellation up to 24 hours before showtime. Questions about seating, groups, or which morning works best with the rest of your 2026 Branson plans? Call us at (417) 243-9629 and we will be glad to help."],
  },
] }, { name: "Back to the Bee Gees", slug: "back-to-the-bee-gees", tagline: "Relive the Kings of Disco", category: ["tribute", "variety-music"], theater: "Hamners' Variety Theater", theaterAddress: "3090 Shepherd of the Hills Expy, Branson, MO 65616", description: "Back to the Bee Gees relives the nearly four-decade career of the Kings of Disco. Three entertainers bring their own voices to the unmistakable Bee Gees sound with energetic choreography, big personalities, and a set list of chart-toppers from the disco era and beyond, with a few surprises along the way.", shortDescription: "Three entertainers relive the Bee Gees chart-toppers with energy and style.", priceFrom: 40.00, priceTo: 40.00, childPriceFrom: 0.00, childPriceTo: 0.00, duration: "2 hours", ageRecommendation: "All ages", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "September", seasonEnd: "December", timeOfDay: "evening", showTimes: ["5:00 PM"], darkDays: ["Tuesday", "Thursday", "Saturday", "Sunday"], darkDateRanges: [{ start: "2026-12-12", end: "2027-12-31" }], scheduleNote: "Monday, Wednesday, and Friday at 5:00 PM, September 2 through December 11, including holiday weeks. Children 12 and under are free.", specialOffers: [], tags: ["tribute", "disco", "70s", "family-friendly"], seoKeywords: ["bee gees tribute branson", "back to the bee gees branson", "branson disco show"], relatedShows: ["thank-you-for-the-music", "beach-boys-california-dreamin", "hamners-unbelievable-variety"], imageAlt: "Back to the Bee Gees performers in sequined jackets inside a neon ring", imageUrl: "/shows/back-to-the-bee-gees.jpg", faqs: [
  {
    question: "Is Back to the Bee Gees all disco?",
    answer: "No. Disco is the heart of it, but the show covers nearly four decades of Bee Gees hits, so you will hear songs from before and after the dance-floor years, plus a few surprises.",
  },
  {
    question: "Do the performers impersonate the Bee Gees?",
    answer: "The three entertainers bring their own voices to the Bee Gees sound rather than doing strict impressions. The harmonies, the energy, and the choreography are what the show is after.",
  },
  {
    question: "Is the show suitable for kids and seniors?",
    answer: "Yes. It is recommended for all ages, the 5:00 PM start is easy on early risers and young children alike, and children 12 and under are free.",
  },
  {
    question: "Does the theater have accessible seating?",
    answer: "Call us at (417) 243-9629 before you book and we will check the seating options at Hamners' Variety Theater for your party.",
  },
], isFeaturedPartner: true, externalUrl: "https://hamnersvarietytheater.com",
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// bransonshows.com's listed adult rate for this show (their Adult Admission offer),
// captured 2026-09-06; see docs/substantiation/README.md. Re-verify monthly.
competitorPrice: 38.46,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Reliving the Kings of Disco",
    paragraphs: ["Back to the Bee Gees Branson is a tribute to the Kings of Disco, whose falsetto harmonies defined a decade and whose career stretched nearly four decades in all. Three entertainers take the stage at Hamners' Variety Theater and bring their own voices to that unmistakable Bee Gees sound, rather than simply copying it. It is a live show with energetic choreography, big personalities, and a set list of chart-toppers that reaches from the disco years to the hits that came before and after them.", "Branson has always had a soft spot for the music of the 1970s, and the Bee Gees catalog is one of the deepest of that decade. The songs are instantly familiar, the grooves are hard to sit still through, and three voices on stage give the harmonies a fullness that a single singer could never manage. Add a few surprises along the way, and the two hours turn into a party for anyone who ever owned a pair of platform shoes."],
  },
  {
    heading: "Chart-Toppers, Choreography, and a Few Surprises",
    paragraphs: ["The set list is the draw. The Bee Gees wrote and recorded chart-toppers across the disco era and well beyond it, and the show works through the biggest of them with the energy the originals demand. Those soaring falsetto lines are all there, along with the tight three-part harmonies that made the records sound the way they did. The cast does not hide behind the songs, either. Big personalities carry the show between numbers, and the choreography keeps the whole thing moving at a pace that suits the music.", "Because the show covers nearly four decades of music, there is more variety than the word disco suggests. The dance-floor anthems get the crowd clapping, but the slower songs in the catalog show off the harmonies just as well, and the surprises sprinkled through the set keep even longtime fans guessing about what comes next. It is a well-paced two hours. By the closing numbers, expect to see plenty of people on their feet, and the rest at least tapping along."],
  },
  {
    heading: "Your Evening at Hamners' Variety Theater",
    paragraphs: ["Back to the Bee Gees plays at Hamners' Variety Theater, 3090 Shepherd of the Hills Expy, Branson, MO 65616. Showtime is 5:00 PM on Monday, Wednesday, and Friday, September 2 through December 11, and it keeps playing through the holiday weeks, which is welcome news for anyone visiting late in the season. The performance runs about two hours. Arriving 30 minutes early gives you time to park at the theater and settle in, and the early start means you are out in time for a late dinner.", "Hamners' Variety Theater is on Shepherd of the Hills Expressway, a quick drive from the main strip and from most Branson lodging, with parking at the theater. A 5:00 PM curtain suits a lot of visitors. You can spend the day at the lake or the outlets, catch the show, and still have the evening for a relaxed dinner. It also suits anyone who likes to be done early, since the show lets out around 7:00 PM and leaves the rest of the night up to you."],
  },
  {
    heading: "Disco Fans, Families, and Easy Booking",
    paragraphs: ["If you danced to the Bee Gees the first time around, this show will bring it all back. If you were too young, you will still know the songs, because they never really left. The show is recommended for all ages, and it is a good choice for families and multigenerational groups, since children 12 and under are free and the energy on stage holds younger attention easily. Couples looking for a fun date night in Branson will find it here too. Adults pay $34.98 plus tax.", "Back to the Bee Gees tickets are available right here. Pick a date on the calendar above, choose the number of tickets, and finish in a couple of minutes. Get Branson Tickets does not add fees, your tickets arrive by email, and every order includes free cancellation up to 24 hours before showtime. Many of our guests book several Branson shows for the same trip, and this 5:00 PM show pairs well with a later evening show elsewhere. Call (417) 243-9629 if you would like help lining up a whole week of 2026 dates."],
  },
] }, { name: "The Sound of Simon & Garfunkel", slug: "sound-of-simon-and-garfunkel", tagline: "Folk Rock's Greatest Duo, Remembered", category: ["tribute", "variety-music"], theater: "Hamners' Variety Theater", theaterAddress: "3090 Shepherd of the Hills Expy, Branson, MO 65616", description: "The Sound of Simon & Garfunkel pays homage to the legendary folk rock duo. Talented musicians and vocalists recreate hits such as The Sound of Silence, Bridge Over Troubled Water, and Mrs. Robinson, with the close harmonies and intricate guitar work that defined the originals. A nostalgic journey through one of the most influential songbooks of the 1960s.", shortDescription: "The harmonies of Simon & Garfunkel recreated live, from Mrs. Robinson to Bridge Over Troubled Water.", priceFrom: 40.00, priceTo: 40.00, childPriceFrom: 0.00, childPriceTo: 0.00, duration: "2 hours", ageRecommendation: "All ages", mealIncluded: false, mealType: null, isNew2026: false, isFeatured: false, isLimitedEngagement: false, seasonStart: "September", seasonEnd: "December", timeOfDay: "afternoon", showTimes: ["Mon 2:00 PM", "Wed 2:00 PM", "Fri 10:00 AM"], darkDays: ["Tuesday", "Thursday", "Saturday", "Sunday"], darkDateRanges: [{ start: "2026-12-12", end: "2027-12-31" }], scheduleNote: "Monday and Wednesday at 2:00 PM and Friday at 10:00 AM, September 2 through December 11, including holiday weeks. Children 12 and under are free.", specialOffers: [], tags: ["tribute", "folk", "60s", "family-friendly"], seoKeywords: ["simon and garfunkel tribute branson", "sound of simon and garfunkel branson", "branson folk show"], relatedShows: ["beach-boys-california-dreamin", "back-to-the-bee-gees", "hamners-unbelievable-variety"], imageAlt: "The Sound of Simon and Garfunkel show logo with acoustic guitar artwork", imageUrl: "/shows/sound-of-simon-and-garfunkel.jpg", faqs: [
  {
    question: "What is The Sound of Simon & Garfunkel like?",
    answer: "It is a live tribute to the folk rock duo, performed by musicians and vocalists who recreate the close harmonies and intricate guitar work of the original records. Expect hits such as The Sound of Silence, Bridge Over Troubled Water, and Mrs. Robinson.",
  },
  {
    question: "Is this a loud show?",
    answer: "No. It is a gentler, music-first show than most Branson tribute productions, which makes it a comfortable choice for guests who prefer to sit back and listen.",
  },
  {
    question: "Is it appropriate for children?",
    answer: "Yes. The show is recommended for all ages, the songs are familiar and easy on young ears, and children 12 and under are free.",
  },
  {
    question: "Will I know the songs if I was not around in the 1960s?",
    answer: "Almost certainly. Simon & Garfunkel's biggest hits have never left the radio, and several are so familiar that people sing along without realizing they knew the words.",
  },
], isFeaturedPartner: true, externalUrl: "https://hamnersvarietytheater.com",
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// bransonshows.com's listed adult rate for this show (their Adult Admission offer),
// captured 2026-09-06; see docs/substantiation/README.md. Re-verify monthly.
competitorPrice: 38.46,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "A Tribute Built on Two Voices",
    paragraphs: ["The Sound of Simon & Garfunkel Branson is a tribute to the folk rock duo whose songs became the soundtrack of the 1960s for a whole generation. Where many tribute shows aim for spectacle, this one aims for the songs themselves. Talented musicians and vocalists recreate the close harmonies and the intricate guitar work that defined the original records, and they let the writing do the rest. It plays afternoons and Friday mornings at Hamners' Variety Theater, September through December.", "Simon & Garfunkel's catalog is one of the most influential of its decade, and it holds up because the songs are so well made. The melodies are simple enough to hum, and the lyrics reward close listening. That combination is why the music still turns up at weddings, in films, and on the radio sixty years later. A show like this gives you the chance to hear those songs performed live and with care, in a comfortable theater, at a time of day that suits a relaxed Branson vacation."],
  },
  {
    heading: "The Songs and the Harmonies",
    paragraphs: ["The set includes the hits everyone comes for. The Sound of Silence, Bridge Over Troubled Water, and Mrs. Robinson are all recreated with the close harmonies that made the duo famous, the kind where two voices blend so tightly they sound like one. The guitar work matters just as much. The original recordings were built on intricate guitar parts, and the musicians on stage give those parts the attention they deserve rather than strumming through them.", "This is a listening show, and it rewards an audience that settles in. There is warmth and nostalgia in every number, and plenty of people find themselves quietly singing along by the second chorus. Between songs, the mood stays relaxed and unhurried, which suits the material. At about two hours, the show gives the songbook room to breathe. You leave humming, and probably a little more sentimental than when you walked in, which is exactly what a show like this should do."],
  },
  {
    heading: "Matinees and Mornings at Hamners' Variety Theater",
    paragraphs: ["The Sound of Simon & Garfunkel plays at Hamners' Variety Theater, 3090 Shepherd of the Hills Expy, Branson, MO 65616. Performances are Monday and Wednesday at 2:00 PM and Friday at 10:00 AM, September 2 through December 11, including the holiday weeks. Plan on about two hours in your seat. Give yourself 30 minutes before curtain to park at the theater, find your seats, and let the day slow down a little before the music starts.", "Daytime showtimes are a real advantage for this one. A 2:00 PM matinee fits neatly between lunch and dinner, and the Friday 10:00 AM performance leaves the entire afternoon and evening open for other Branson shows or a few hours on Table Rock Lake. Because the season runs through the holiday weeks in November and December, it is also a good option for visitors who come for the Christmas lights and want a calm afternoon in the middle of a busy trip. Hamners' Variety Theater is on Shepherd of the Hills Expressway, with parking at the theater."],
  },
  {
    heading: "For Music Lovers of Every Age",
    paragraphs: ["This show is for people who love songs. It will mean the most to anyone who bought the records the first time around, but it is recommended for all ages, and the gentle pace makes it an easy choice for older guests who prefer a seated, unhurried afternoon over a loud production. Children 12 and under are free, so grandparents can bring the grandkids along and introduce them to the music without paying extra. Adult admission is $34.98 plus tax.", "The Sound of Simon & Garfunkel tickets can be booked in a few clicks with Get Branson Tickets. Pick a date on the calendar above, tell us how many are coming, and your tickets will arrive by email. We never add fees, and if your plans shift, every ticket includes free cancellation up to 24 hours before showtime. We are also glad to help with the rest of your trip, whether that means pairing this matinee with an evening show or finding the right dates for a 2026 fall visit. Call (417) 243-9629 with any question."],
  },
] },
  {
    name: "British Invasion",
    slug: "british-invasion",
    tagline: "The Beatles, Queen, Elton John and More",
    category: ["tribute", "variety-music"],
    theater: "The Showroom at Branson Meadows",
    theaterAddress: "4600 Gretna Rd, Branson, MO 65616",
    description:
      "British Invasion is a live tribute to the British artists who reshaped rock music, performed by a full band at The Showroom at Branson Meadows. The set list covers The Beatles, Queen, Elton John, Dusty Springfield, Led Zeppelin, and more. The cast is led by Matthew Boyce, named Branson's 2025 Entertainer of the Year and a two-time Tribute Artist of the Year, alongside Guitarist of the Year Zach Peddie, Adam Webster, and drummer Drew Lanning. Expect faithful recreations of the songs, costumes, and energy of the era, from the first wave of 1964 through the stadium anthems that followed.",
    shortDescription:
      "Live full-band tribute to The Beatles, Queen, Elton John, and the British rock era.",
    priceFrom: 52.80,
    priceTo: 52.80,
    childPriceFrom: 0.00,
    childPriceTo: 0.00,
    duration: "2 hours",
    ageRecommendation: "All ages",
    timeOfDay: "evening",
    mealIncluded: false,
    mealType: null,
    isNew2026: false,
    isFeatured: false,
    isLimitedEngagement: false,
    seasonStart: "April",
    seasonEnd: "December",
    showTimes: ["Wed 8:00 PM", "Sat 2:00 PM"],
    darkDays: ["Sunday", "Monday", "Tuesday", "Thursday", "Friday"],
    // Schedule verified against showroom.completeticketing.co calendar 2026-08-29.
    darkDateRanges: [
      { start: "2026-09-02", end: "2026-09-02" },
      { start: "2026-11-04", end: "2026-11-04" },
      { start: "2026-12-21", end: "2026-12-27" },
    ],
    scheduleNote:
      "Wednesdays at 8:00 PM and Saturdays at 2:00 PM through December 30, 2026. No performances September 2, November 4, December 23, or December 26.",
    specialOffers: [],
    tags: ["tribute", "family-friendly"],
    seoKeywords: ["british invasion branson", "beatles tribute branson", "queen tribute branson", "branson tribute shows 2026"],
    relatedShows: ["rock-n-roll-sunrise", "dean-martin-tribute", "legends-in-concert"],
    imageAlt: "British Invasion cast performing on stage at The Showroom at Branson Meadows",
    imageUrl: "/shows/british-invasion.jpg",
    galleryImages: [
      "/shows/british-invasion/g1.jpg", "/shows/british-invasion/g2.jpg", "/shows/british-invasion/g3.jpg",
      "/shows/british-invasion/g4.jpg", "/shows/british-invasion/g5.jpg", "/shows/british-invasion/g6.jpg",
      "/shows/british-invasion/g7.jpg", "/shows/british-invasion/g8.jpg", "/shows/british-invasion/g9.jpg",
      "/shows/british-invasion/g10.jpg", "/shows/british-invasion/g11.jpg",
    ],
    faqs: [
  {
    question: "When does British Invasion play?",
    answer: "Wednesdays at 8:00 PM and Saturdays at 2:00 PM, April through December 30, 2026. The show does not play September 2, November 4, December 23, or December 26.",
  },
  {
    question: "Where does British Invasion play?",
    answer: "The Showroom at Branson Meadows, 4600 Gretna Rd, Branson, MO 65616.",
  },
  {
    question: "How do I get my tickets?",
    answer: "You receive an order confirmation right away, and your tickets arrive by email within about 12 hours. Present them at the box office.",
  },
  {
    question: "Which artists does British Invasion cover?",
    answer: "The set list covers The Beatles, Queen, Elton John, Dusty Springfield, Led Zeppelin, and more British artists, from the first wave of 1964 through the stadium anthems that followed.",
  },
  {
    question: "Who performs in British Invasion?",
    answer: "A full band led by Matthew Boyce, Branson's 2025 Entertainer of the Year and a two-time Tribute Artist of the Year, with Guitarist of the Year Zach Peddie, Adam Webster, and drummer Drew Lanning.",
  },
  {
    question: "Is British Invasion suitable for children?",
    answer: "Yes! It is recommended for all ages, the songs are ones most kids already know, and children 12 and under are free.",
  },
  {
    question: "Do I need to arrive early?",
    answer: "Arriving about 30 minutes before showtime gives you time to park, check in at the box office, and find your seats. Branson theaters are casual, so wear whatever is comfortable.",
  },
],
    isFeaturedPartner: true,
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Rating read from the "British Invasion Branson" Google listing via the Places API on 2026-09-06
// (4.9 stars, 10 reviews). Fallback only; the page reads the live value via googlePlaceId.
googleRating: 4.9,
googleReviewCount: 10,
googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=British%20Invasion%20Branson%20Branson%20MO",
googlePlaceId: "ChIJ1c_BOS8dz4cRcv_PKUms_EM",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "The British Bands That Reshaped Rock",
    paragraphs: ["British Invasion Branson is a full-band tribute to the British artists who reshaped rock music, from the first wave of 1964 through the stadium anthems that followed. It plays at The Showroom at Branson Meadows with a set list that covers The Beatles, Queen, Elton John, Dusty Springfield, Led Zeppelin, and more. Most tribute shows pick one act and stay there. This one moves through an entire era, which means the sound changes from song to song and there is always another favorite around the corner.", "The cast is led by Matthew Boyce, Branson's 2025 Entertainer of the Year and a two-time Tribute Artist of the Year, with Guitarist of the Year Zach Peddie, Adam Webster, and drummer Drew Lanning alongside him. That is a lot of recognized talent on one stage, and it shows in how faithfully the songs are recreated. Costumes follow the era as it changes, so the look on stage moves along with the music. The season is a long one, running April through December 30, 2026, which makes it easy to fit into almost any Branson trip."],
    imageUrl: "/shows/british-invasion/g1.jpg",
    imageAlt: "British Invasion cast on stage at The Showroom at Branson Meadows in Branson",
  },
  {
    heading: "From the Beatles to Stadium Anthems",
    paragraphs: ["The set list spans the whole era, from the first wave that arrived in 1964 and changed American radio overnight, through the stadium anthems that followed. Beatles songs sit alongside Dusty Springfield's soulful pop, Elton John's piano-driven hits, the hard rock of Led Zeppelin, and the big arena choruses of Queen. Every one of those acts had a distinct sound, and the band recreates each one faithfully, from the arrangements down to the tone of the guitars, rather than flattening them into one style.", "With a full band on stage, the songs carry the weight they were written for. The guitar parts are played live, the drums drive the rock numbers, and the vocals handle everything from tender ballads to full-throated anthems. The costumes change with the decades too, so the show looks as much like the era as it sounds. Expect two hours that pass quickly, plenty of singing along, and at least one song you had forgotten you loved."],
    imageUrl: "/shows/british-invasion/g2.jpg",
    imageAlt: "A performance of British Invasion in Branson, MO",
  },
  {
    heading: "Evenings and Matinees at Branson Meadows",
    paragraphs: ["British Invasion plays at The Showroom at Branson Meadows, 4600 Gretna Rd, Branson, MO 65616. Showtimes are Wednesdays at 8:00 PM and Saturdays at 2:00 PM, with the season running through December 30, 2026. There are no performances on September 2, November 4, December 23, or December 26, so check the calendar for the exact dates you have in mind. The show runs about two hours, and arriving 30 minutes early leaves plenty of time to park at the theater and get seated.", "The two showtimes suit different kinds of trips. The Wednesday 8:00 PM performance is a proper night out, ideal after a leisurely dinner, and it lets out around 10:00 PM. The Saturday 2:00 PM matinee is the pick for families and for anyone who would rather keep the evening free for another show or an early night. Branson Meadows is on Gretna Road, and parking is available at the theater. Because the season stretches from spring through the last days of the year, it fits a summer vacation and a Christmas trip equally well."],
    imageUrl: "/shows/british-invasion/g3.jpg",
    imageAlt: "British Invasion performers under the stage lights in Branson",
  },
  {
    heading: "Rock Fans, Families, and Easy Booking",
    paragraphs: ["If you have ever argued about the best Beatles album or turned up the radio for a Queen chorus, this is your show. It is recommended for all ages, and it is a good pick for families that span a few generations, because the set list has something for everyone, from grandparents who heard these songs when they were new to kids who know them from the movies. Children 12 and under are free. Adult tickets are $46.17 plus tax.", "British Invasion tickets are on sale now through Get Branson Tickets. Pick a date on the calendar above, select the number of tickets, and check out in a couple of minutes. We add no fees, your tickets arrive by email, and every order comes with free cancellation up to 24 hours before showtime. Whether you are planning a fall weekend, a Christmas trip, or a full week of Branson shows in 2026, our team can help you put the schedule together. Call (417) 243-9629 and we will take it from there."],
    imageUrl: "/shows/british-invasion/g4.jpg",
    imageAlt: "Scene from British Invasion at The Showroom at Branson Meadows",
  },
],
  },
  {
    name: "Matthew Boyce's Retro Christmas",
    slug: "retro-christmas",
    tagline: "Christmas Hits Through the Years",
    category: ["variety-music", "family"],
    theater: "The Showroom at Branson Meadows",
    theaterAddress: "4600 Gretna Rd, Branson, MO 65616",
    description:
      "Matthew Boyce's Retro Christmas is a morning show at The Showroom at Branson Meadows that revisits the classic era of Christmas entertainment. The set list works through holiday standards made famous by Elvis, Bing Crosby, the Andrews Sisters, the Beach Boys, and Michael Buble, backed by the MBE show band and the female trio The Garland Girls. Adam Webster adds family-friendly comedy, Santa makes an appearance, and Matthew shares his own Christmas stories between songs, honoring the true reason for the season. The show runs about two hours with a 15 minute intermission.",
    shortDescription:
      "Morning Christmas show of classics by Elvis, Bing Crosby, the Beach Boys, and more with Matthew Boyce.",
    priceFrom: 52.80,
    priceTo: 52.80,
    childPriceFrom: 0.00,
    childPriceTo: 0.00,
    duration: "2 hours",
    ageRecommendation: "All ages",
    timeOfDay: "morning",
    mealIncluded: false,
    mealType: null,
    isNew2026: false,
    isFeatured: false,
    isLimitedEngagement: false,
    seasonStart: "November",
    seasonEnd: "December",
    showTimes: ["Tue 10:00 AM", "Thu 10:00 AM", "Sat 10:00 AM"],
    darkDays: ["Sunday", "Monday", "Wednesday", "Friday"],
    // Schedule verified against showroom.completeticketing.co calendar 2026-08-29.
    darkDateRanges: [
      { start: "2026-11-01", end: "2026-11-04" },
      { start: "2026-11-26", end: "2026-11-26" },
      { start: "2026-12-24", end: "2026-12-24" },
      { start: "2026-12-27", end: "2026-12-31" },
    ],
    extraPerformances: [{ date: "2026-11-19", times: ["2:00 PM"] }],
    scheduleNote:
      "Tuesdays, Thursdays, and Saturdays at 10:00 AM, November 5 through December 26, 2026. No shows Thanksgiving Day or Christmas Eve. Added 2:00 PM matinee November 19.",
    specialOffers: [],
    tags: ["christmas", "family-friendly"],
    seoKeywords: ["retro christmas branson", "branson christmas shows 2026", "matthew boyce christmas show", "branson morning christmas show"],
    relatedShows: ["rock-n-roll-sunrise", "bransons-christmas-wonderland", "dean-martin-tribute"],
    imageAlt: "Matthew Boyce performing in a red suit at the Retro Christmas show in Branson",
    imageUrl: "/shows/retro-christmas.jpg",
    galleryImages: [
      "/shows/retro-christmas/g1.jpg", "/shows/retro-christmas/g2.jpg", "/shows/retro-christmas/g3.jpg",
      "/shows/retro-christmas/g4.jpg", "/shows/retro-christmas/g5.jpg", "/shows/retro-christmas/g6.jpg",
      "/shows/retro-christmas/g7.jpg", "/shows/retro-christmas/g8.jpg", "/shows/retro-christmas/g9.jpg",
      "/shows/retro-christmas/g10.jpg", "/shows/retro-christmas/g11.jpg", "/shows/retro-christmas/g12.jpg",
      "/shows/retro-christmas/g13.jpg", "/shows/retro-christmas/g14.jpg", "/shows/retro-christmas/g15.jpg",
      "/shows/retro-christmas/g16.jpg", "/shows/retro-christmas/g17.jpg", "/shows/retro-christmas/g18.jpg",
      "/shows/retro-christmas/g19.jpg", "/shows/retro-christmas/g20.jpg",
    ],
    faqs: [
  {
    question: "When does Retro Christmas play?",
    answer: "Tuesdays, Thursdays, and Saturdays at 10:00 AM from November 5 through December 26, 2026, plus a 2:00 PM matinee on November 19. No shows on Thanksgiving Day or Christmas Eve.",
  },
  {
    question: "How long is the show?",
    answer: "About two hours, including a 15 minute intermission.",
  },
  {
    question: "How do I get my tickets?",
    answer: "You receive an order confirmation right away, and your tickets arrive by email within about 12 hours. Present them at the box office.",
  },
  {
    question: "Is Retro Christmas good for young kids?",
    answer: "Yes! The show is recommended for all ages, Adam Webster's comedy is family-friendly, and Santa makes an appearance. Kids' tickets are free, so bringing the grandchildren costs nothing extra.",
  },
  {
    question: "What kind of music is in the show?",
    answer: "Holiday standards from the classic era of Christmas entertainment, the songs made famous by Elvis, Bing Crosby, the Andrews Sisters, the Beach Boys, and Michael Buble. Matthew Boyce sings them with the MBE show band and the female trio The Garland Girls.",
  },
  {
    question: "Is it a religious Christmas show?",
    answer: "It is a Christmas variety show first, with comedy, Santa, and the holiday hits, but Matthew shares his own Christmas stories between songs and the show honors the true reason for the season. Expect a warm balance of both.",
  },
  {
    question: "Why is Retro Christmas a morning show?",
    answer: "The 10:00 AM start is part of the design. You see the show fresh, and the afternoon and evening stay open for shopping, dinner, or a second show, which makes it easy to fit into a packed December trip.",
  },
],
    isFeaturedPartner: true,
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Christmas the Way You Remember It",
    paragraphs: ["Matthew Boyce's Retro Christmas is a morning show at The Showroom at Branson Meadows that revisits the classic era of Christmas entertainment. Instead of chasing the newest holiday trends, the show goes back to the standards that families have played every December for generations. Matthew Boyce, Branson's 2025 Entertainer of the Year, leads the cast, and the whole production runs about two hours with a 15 minute intermission. Among the Branson Christmas shows of 2026, it is the one to pick if your favorite holiday records come from Elvis, Bing Crosby, and the Andrews Sisters.", "The morning start is part of the appeal. A 10:00 AM curtain means you see the show fresh, then have the whole afternoon and evening free for shopping, dinner, or a second show. Families come for Santa and the comedy, and grandparents come for the songs they grew up with. Kids' tickets are free, which makes Retro Christmas one of the easier Branson shows to bring a whole group to during the holidays, and one of the few that gets everyone back to the hotel by lunch."],
    imageUrl: "/shows/retro-christmas/g1.jpg",
    imageAlt: "Matthew Boyce's Retro Christmas cast on stage at The Showroom at Branson Meadows in Branson",
  },
  {
    heading: "Holiday Standards, Comedy, and a Visit From Santa",
    paragraphs: ["The set list works through the holiday standards made famous by Elvis, Bing Crosby, the Andrews Sisters, the Beach Boys, and Michael Buble, so the songs stretch from the crooner years through the surf era to the modern big-band revival. Matthew Boyce sings them backed by the MBE show band, with the female trio The Garland Girls adding the close harmonies that give the Andrews Sisters material its shape. It is a live band and live voices from the first song to the last, and the whole point of a retro show is that classic sound.", "Between songs, Adam Webster adds family-friendly comedy that keeps the room laughing without anything you would need to explain to the grandkids. Santa makes an appearance, which is worth knowing if you are traveling with young children. Matthew also shares his own Christmas stories, and the show honors the true reason for the season alongside the fun. That mix of reverent and playful is what made the classic Christmas specials work, and it is the feeling this show is built to bring back."],
    imageUrl: "/shows/retro-christmas/g2.jpg",
    imageAlt: "A performance of Matthew Boyce's Retro Christmas in Branson, MO",
  },
  {
    heading: "Planning Your Morning at Branson Meadows",
    paragraphs: ["Matthew Boyce's Retro Christmas plays at The Showroom at Branson Meadows, 4600 Gretna Rd, Branson, MO 65616. The 2026 run goes Tuesdays, Thursdays, and Saturdays at 10:00 AM from November 5 through December 26, with an added 2:00 PM matinee on November 19. There are no performances on Thanksgiving Day or Christmas Eve. Every date and time the theater has on sale shows up on the booking calendar on this page, so you can match a performance to the rest of your holiday plans.", "The show runs about two hours including a 15 minute intermission, and arriving 30 minutes before curtain gives you time to park at the theater, show your tickets at the box office, and settle in without rushing. Parking is right at the theater. Kids' tickets are free, and the show is recommended for all ages, so there is no reason to leave anyone behind at the hotel. A 10:00 AM start also means breakfast first and lunch after, with the rest of the day still open."],
    imageUrl: "/shows/retro-christmas/g3.jpg",
    imageAlt: "Matthew Boyce's Retro Christmas performers under the stage lights in Branson",
  },
  {
    heading: "Who Will Love It and How to Book",
    paragraphs: ["This is the right pick for families with three generations in the car, for couples who want a Christmas show without a late night, and for anyone who thinks the holidays should sound like Bing Crosby. The comedy is clean, Santa shows up, and the songs are the ones your parents played. If you are comparing Branson Christmas shows for 2026 and want the classic era rather than a modern pop take, Matthew Boyce's Retro Christmas in Branson is the one built for you.", "Booking Matthew Boyce's Retro Christmas tickets through Get Branson Tickets is simple. Pick a date on the calendar above, and your tickets arrive by email with no added fees. Every ticket comes with free cancellation up to 24 hours before showtime, so a change in travel plans does not cost you anything. If you would rather talk it through with a person, call us at (417) 243-9629 and we will help you choose a date and line up the rest of your Branson trip."],
    imageUrl: "/shows/retro-christmas/g4.jpg",
    imageAlt: "Scene from Matthew Boyce's Retro Christmas at The Showroom at Branson Meadows",
  },
],
  },
  {
    name: "Classic Rock Icons",
    slug: "classic-rock-icons",
    tagline: "Journey, Kiss, Fleetwood Mac and More",
    category: ["tribute", "variety-music"],
    theater: "The Showroom at Branson Meadows",
    theaterAddress: "4600 Gretna Rd, Branson, MO 65616",
    description:
      "Classic Rock Icons is a full-band tribute to the biggest acts of the classic rock era, now playing at The Showroom at Branson Meadows. The set list runs through Journey, Kiss, Fleetwood Mac, Aerosmith, Tom Petty, Bon Jovi, and more. The cast is led by Matthew Boyce, Branson's 2025 Entertainer of the Year and a two-time Tribute Artist of the Year, with Instrumentalist of the Year Forrest Herzog, Adam Webster, drummer Drew Lanning, and vocalists Sarah Marie and Autumn Romines. The production is a past winner of Branson's Evening Show of the Year.",
    shortDescription:
      "Full-band tribute to Journey, Kiss, Fleetwood Mac, Aerosmith, and the classic rock era.",
    priceFrom: 52.80,
    priceTo: 52.80,
    childPriceFrom: 0.00,
    childPriceTo: 0.00,
    duration: "2 hours",
    ageRecommendation: "All ages",
    timeOfDay: "evening",
    mealIncluded: false,
    mealType: null,
    isNew2026: false,
    isFeatured: false,
    isLimitedEngagement: false,
    seasonStart: "September",
    seasonEnd: "December",
    showTimes: ["Sun 8:00 PM", "Thu 2:00 PM"],
    darkDays: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"],
    // Schedule verified against showroom.completeticketing.co calendar 2026-08-29.
    darkDateRanges: [{ start: "2026-09-03", end: "2026-09-03" }, { start: "2026-10-29", end: "2026-11-05" }, { start: "2026-11-19", end: "2026-11-19" }, { start: "2026-11-26", end: "2026-11-26" }, { start: "2026-12-24", end: "2026-12-24" }, { start: "2026-12-28", end: "2026-12-31" }],
    scheduleNote:
      "Sunday evenings at 8:00 PM and Thursday matinees at 2:00 PM, September through December 27, 2026. Some weeks skip individual dates, so check the booking calendar for exact dates.",
    specialOffers: [],
    tags: ["tribute", "classic-rock"],
    seoKeywords: ["classic rock icons branson", "branson rock show", "journey tribute branson", "classic rock tribute branson"],
    relatedShows: ["british-invasion", "rock-n-roll-sunrise", "elvis-story-of-a-king"],
    imageAlt: "Classic Rock Icons cast performing at The Showroom at Branson Meadows",
    imageUrl: "/shows/classic-rock-icons.jpg",
    galleryImages: ["/shows/classic-rock-icons/g1.jpg", "/shows/classic-rock-icons/g2.jpg", "/shows/classic-rock-icons/g3.jpg", "/shows/classic-rock-icons/g4.jpg", "/shows/classic-rock-icons/g5.jpg", "/shows/classic-rock-icons/g6.jpg", "/shows/classic-rock-icons/g7.jpg", "/shows/classic-rock-icons/g8.jpg", "/shows/classic-rock-icons/g9.jpg", "/shows/classic-rock-icons/g10.jpg"],
    faqs: [
  {
    question: "When does the show play?",
    answer: "Sunday evenings at 8:00 PM and Thursday matinees at 2:00 PM, September through December 27, 2026.",
  },
  {
    question: "How do I get my tickets?",
    answer: "You receive an order confirmation right away, and your tickets arrive by email within about 12 hours. Present them at the box office.",
  },
  {
    question: "Is the music live?",
    answer: "Yes. Classic Rock Icons is a full-band tribute with a live band on stage, including Instrumentalist of the Year Forrest Herzog and drummer Drew Lanning, with Matthew Boyce out front and vocalists Sarah Marie and Autumn Romines.",
  },
  {
    question: "Which bands are covered in the show?",
    answer: "The set list runs through Journey, Kiss, Fleetwood Mac, Aerosmith, Tom Petty, Bon Jovi, and more from the classic rock era. If you know the radio hits from those bands, you will know most of the show.",
  },
  {
    question: "Is a rock show appropriate for kids and older guests?",
    answer: "Yes. Classic Rock Icons is recommended for all ages, it plays in a theater rather than a bar, and kids' tickets are free. Expect rock-concert energy in a family-friendly setting.",
  },
  {
    question: "Who is Matthew Boyce?",
    answer: "Matthew Boyce is Branson's 2025 Entertainer of the Year and a two-time Tribute Artist of the Year. He leads Classic Rock Icons and also headlines Elvis: Story of a King and Matthew Boyce's Retro Christmas at the same theater.",
  },
],
    isFeaturedPartner: true,
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Rating read from the "Classic Rock Icons" Google listing via the Places API on 2026-09-06
// (5 stars, 23 reviews). Fallback only; the page reads the live value via googlePlaceId.
googleRating: 5,
googleReviewCount: 23,
googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=Classic%20Rock%20Icons%20Branson%20MO",
googlePlaceId: "ChIJzwXoKV4dz4cRDenAuRjBl5U",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "A Full-Band Tribute to the Classic Rock Era",
    paragraphs: ["Classic Rock Icons is a full-band tribute to the biggest acts of the classic rock era, and it plays at The Showroom at Branson Meadows through the fall of 2026. The set list runs through Journey, Kiss, Fleetwood Mac, Aerosmith, Tom Petty, and Bon Jovi, along with more from the years when arena rock ruled the radio. Branson is known for country and gospel, so among Branson shows, one built on arena rock stands out. This one is for the people who grew up with FM rock and still know every word.", "The production is a past winner of Branson's Evening Show of the Year, and the cast is led by Matthew Boyce, Branson's 2025 Entertainer of the Year and a two-time Tribute Artist of the Year. He is joined by Instrumentalist of the Year Forrest Herzog, Adam Webster, drummer Drew Lanning, and vocalists Sarah Marie and Autumn Romines. That is a lot of local award hardware for one stage. Classic Rock Icons tickets are a good bet for a group with mixed tastes, because almost everyone knows these songs."],
    imageUrl: "/shows/classic-rock-icons/g1.jpg",
    imageAlt: "Classic Rock Icons cast on stage at The Showroom at Branson Meadows in Branson",
  },
  {
    heading: "Arena Rock Anthems, Played Live",
    paragraphs: ["This is a live band, not a singer in front of backing tracks. Guitars, drums, and stacked vocals carry the show, and the set list runs through the best-known material from Journey, Kiss, Fleetwood Mac, Aerosmith, Tom Petty, and Bon Jovi. Expect the big choruses, the guitar solos, and the drum fills that made those records famous, delivered by a band that includes Branson's Instrumentalist of the Year. The vocalists trade leads and stack harmonies, which matters on the Fleetwood Mac material especially.", "Matthew Boyce fronts the show and moves between the very different vocal styles of these bands, from Journey's soaring high notes to Tom Petty's laid-back delivery. Sarah Marie and Autumn Romines take their own turns at the microphone, Forrest Herzog and drummer Drew Lanning anchor the band, and Adam Webster rounds out the cast. The show runs about two hours and is recommended for all ages. Expect the energy of a rock concert, but in a theater where families are welcome rather than a bar."],
    imageUrl: "/shows/classic-rock-icons/g2.jpg",
    imageAlt: "A performance of Classic Rock Icons in Branson, MO",
  },
  {
    heading: "Seeing the Show at Branson Meadows",
    paragraphs: ["Classic Rock Icons plays at The Showroom at Branson Meadows, 4600 Gretna Rd, Branson, MO 65616. The 2026 schedule runs Sunday evenings at 8:00 PM and Thursday matinees at 2:00 PM from September through December 27. Some weeks skip individual dates, so the booking calendar on this page is the reliable source for exactly which Sundays and Thursdays are on sale. Pick the performance that fits your trip, and your seats are booked with the theater.", "The show runs about two hours. Arrive 30 minutes before curtain so you can park at the theater and find your seats before the band starts. Parking is at the theater itself. The Sunday 8:00 PM show is the natural choice for a weekend trip, and the Thursday 2:00 PM matinee works well for anyone who would rather not be out late. Kids' tickets are free, so a rock show becomes an easy afternoon for the whole family."],
    imageUrl: "/shows/classic-rock-icons/g3.jpg",
    imageAlt: "Classic Rock Icons performers under the stage lights in Branson",
  },
  {
    heading: "Right for Rock Fans of Every Age",
    paragraphs: ["If your car radio has been on the same classic rock station since 1985, Classic Rock Icons in Branson is for you. It also works for a group with mixed tastes, since the songs of Journey, Fleetwood Mac, and Bon Jovi crossed over to just about everyone. Teenagers who found these bands through their parents' records will enjoy it as much as the parents do. And since kids' tickets are free, it is an easy Branson show to bring the family to.", "When you book Classic Rock Icons tickets through Get Branson Tickets, there are no added fees. Pick a date on the calendar above and your tickets come by email. If plans shift, every ticket includes free cancellation up to 24 hours before showtime, so there is no reason to wait on booking a date that fits. Questions about seating, dates, or how to fit the show around dinner reservations? Call us at (417) 243-9629 and a real person will help."],
    imageUrl: "/shows/classic-rock-icons/g4.jpg",
    imageAlt: "Scene from Classic Rock Icons at The Showroom at Branson Meadows",
  },
],
  },
  {
    name: "Elvis: Story of a King",
    slug: "elvis-story-of-a-king",
    tagline: "The Music and Story of Elvis Presley",
    category: ["tribute", "variety-music"],
    theater: "The Showroom at Branson Meadows",
    theaterAddress: "4600 Gretna Rd, Branson, MO 65616",
    description:
      "Elvis: Story of a King follows Elvis Presley's career from his gospel-rooted beginnings to the Las Vegas concert years, performed live by Matthew Boyce with a cast of musicians, singers, and dancers. The show moves through the 1950s rockabilly era, the movie classics, the 1968 Comeback Special, and the concert years, with costumes and staging to match each period. Story of a King won Branson's New Show of the Year and Matinee Show of the Year in 2022, and Boyce was named Branson's Tribute Artist of the Year in 2023 and 2025 and Entertainer of the Year in 2025.",
    shortDescription:
      "Live journey through every era of Elvis Presley's career, starring Matthew Boyce.",
    priceFrom: 52.80,
    priceTo: 52.80,
    childPriceFrom: 0.00,
    childPriceTo: 0.00,
    duration: "2 hours",
    ageRecommendation: "All ages",
    timeOfDay: "evening",
    mealIncluded: false,
    mealType: null,
    isNew2026: false,
    isFeatured: false,
    isLimitedEngagement: false,
    seasonStart: "September",
    seasonEnd: "October",
    showTimes: ["Thu 10:00 AM", "Sat 8:00 PM"],
    darkDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Friday"],
    // Schedule verified against showroom.completeticketing.co calendar 2026-08-29.
    darkDateRanges: [{ start: "2026-09-03", end: "2026-09-03" }, { start: "2026-09-12", end: "2026-09-12" }, { start: "2026-10-31", end: "2026-10-31" }],
    extraPerformances: [{ date: "2026-11-10", times: ["8:00 PM"] }],
    scheduleNote:
      "Thursdays at 10:00 AM and Saturdays at 8:00 PM, September through October 2026, plus an added 8:00 PM show November 10. No Saturday show September 12.",
    specialOffers: [],
    tags: ["tribute", "elvis"],
    seoKeywords: ["elvis tribute branson", "story of a king branson", "elvis show branson 2026", "matthew boyce elvis"],
    relatedShows: ["british-invasion", "rock-n-roll-sunrise", "classic-rock-icons"],
    imageAlt: "Matthew Boyce performing as Elvis in Story of a King at The Showroom in Branson",
    imageUrl: "/shows/elvis-story-of-a-king.jpg",
    galleryImages: ["/shows/elvis-story-of-a-king/g1.jpg", "/shows/elvis-story-of-a-king/g2.jpg", "/shows/elvis-story-of-a-king/g3.jpg", "/shows/elvis-story-of-a-king/g4.jpg", "/shows/elvis-story-of-a-king/g5.jpg", "/shows/elvis-story-of-a-king/g6.jpg", "/shows/elvis-story-of-a-king/g7.jpg"],
    faqs: [
  {
    question: "When does the show play?",
    answer: "Thursdays at 10:00 AM and Saturdays at 8:00 PM, September through October 2026, plus an added 8:00 PM show on November 10.",
  },
  {
    question: "How do I get my tickets?",
    answer: "You receive an order confirmation right away, and your tickets arrive by email within about 12 hours. Present them at the box office.",
  },
  {
    question: "Is the show a concert or a story?",
    answer: "Both. Elvis: Story of a King follows Elvis Presley's career in order, from his gospel-rooted beginnings through the 1950s, the movie years, the 1968 Comeback Special, and the Las Vegas concert years, with costumes and staging that change to match each era.",
  },
  {
    question: "Is Elvis: Story of a King good for kids and seniors?",
    answer: "Yes. The show is recommended for all ages, and kids' tickets are free. Seniors who remember the original records get the full arc of the career, and younger kids respond to the energy and the costume changes.",
  },
  {
    question: "Who plays Elvis?",
    answer: "Matthew Boyce, Branson's Tribute Artist of the Year in 2023 and 2025 and Entertainer of the Year in 2025. He performs live with a cast of musicians, singers, and dancers.",
  },
  {
    question: "Has the show won any awards?",
    answer: "Yes. Story of a King won Branson's New Show of the Year and Matinee Show of the Year in 2022.",
  },
],
    isFeaturedPartner: true,
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Rating read from the "Elvis: Story of a King" Google listing via the Places API on 2026-09-06
// (5 stars, 37 reviews). Fallback only; the page reads the live value via googlePlaceId.
googleRating: 5,
googleReviewCount: 37,
googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=Elvis%3A%20Story%20of%20a%20King%20Branson%20MO",
googlePlaceId: "ChIJQT0gM98dz4cRlTJvqNi3lfo",
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Every Era of Elvis on One Stage",
    paragraphs: ["Elvis: Story of a King follows Elvis Presley's career from his gospel-rooted beginnings to the Las Vegas concert years, and it plays at The Showroom at Branson Meadows in 2026. Rather than a greatest-hits revue, the show is told in order, so the music, the costumes, and the staging change as the story moves from decade to decade. Matthew Boyce performs it live with a cast of musicians, singers, and dancers. Elvis tributes are a Branson tradition, and this one earned its place fast.", "The awards back that up. Story of a King won Branson's New Show of the Year and Matinee Show of the Year in 2022. Matthew Boyce was named Branson's Tribute Artist of the Year in 2023 and again in 2025, and in 2025 he was also named Entertainer of the Year. For anyone comparing Elvis shows in Branson, that record is hard to match. It is a good reason to put Elvis: Story of a King tickets at the top of the list if you want a tribute with real credentials behind it."],
    imageUrl: "/shows/elvis-story-of-a-king/g1.jpg",
    imageAlt: "Elvis: Story of a King cast on stage at The Showroom at Branson Meadows in Branson",
  },
  {
    heading: "From Rockabilly to the Concert Years",
    paragraphs: ["The show starts with Elvis's gospel-rooted beginnings, then moves into the 1950s rockabilly era that made him famous. From there it works through the movie classics, the 1968 Comeback Special, and the concert years, with costumes and staging to match each period. That structure is what sets it apart from a standard tribute. You are not watching one version of Elvis for two hours. You watch him change, and the band, singers, and dancers change with him.", "Matthew Boyce carries the lead, and the difference between the young rockabilly singer and the Las Vegas headliner is in the voice as much as the wardrobe. Live musicians play behind him, backing singers fill out the harmonies, and dancers give the bigger numbers their movement. Two hours pass quickly, and the show is recommended for all ages. Grandparents who watched the concert years on television and grandchildren who only know the songs tend to leave humming the same tunes."],
    imageUrl: "/shows/elvis-story-of-a-king/g2.jpg",
    imageAlt: "A performance of Elvis: Story of a King in Branson, MO",
  },
  {
    heading: "Your Visit to Branson Meadows",
    paragraphs: ["Elvis: Story of a King plays at The Showroom at Branson Meadows, 4600 Gretna Rd, Branson, MO 65616. The 2026 season runs Thursdays at 10:00 AM and Saturdays at 8:00 PM from September through October, with an added 8:00 PM performance on November 10. There is no Saturday show on September 12. The booking calendar on this page lists every date that is on sale, and because the season is short, it pays to lock in your date early.", "Plan on about two hours for the show and arrive 30 minutes before curtain. Parking is at the theater, and the extra time lets you park, show your tickets at the box office, and find your seats without hurrying. The Thursday morning performance is a good fit for visitors who prefer daytime outings, and the Saturday evening show suits a weekend trip. Kids' tickets are free, and a 10:00 AM show is an easy way to introduce younger family members to the music."],
    imageUrl: "/shows/elvis-story-of-a-king/g3.jpg",
    imageAlt: "Elvis: Story of a King performers under the stage lights in Branson",
  },
  {
    heading: "Made for Elvis Fans and Their Families",
    paragraphs: ["Elvis: Story of a King in Branson belongs on your list if you grew up with Elvis, if you have seen other tributes and want one with a story, or if you simply want a live band and a singer who has earned Branson's top honors. It is recommended for all ages, and because kids' tickets are free, the grandchildren can come along at no extra cost. Couples, tour groups, and multigenerational families all fit comfortably, and among Branson shows, few cover this much musical ground in two hours.", "Get Branson Tickets sells Elvis: Story of a King tickets with no added fees. Pick a date on the calendar above, check out, and your tickets arrive by email. Free cancellation up to 24 hours before showtime is included with every order, which matters when a short fall season is in play and travel dates can move. Prefer to book by phone or ask about seating? Call (417) 243-9629 and we will take care of it."],
    imageUrl: "/shows/elvis-story-of-a-king/g4.jpg",
    imageAlt: "Scene from Elvis: Story of a King at The Showroom at Branson Meadows",
  },
],
  },
  {
    name: "Honky Tonk Heartland",
    slug: "honky-tonk-heartland",
    tagline: "Traditional Country, Live",
    category: ["country-gospel", "variety-music"],
    theater: "The Showroom at Branson Meadows",
    theaterAddress: "4600 Gretna Rd, Branson, MO 65616",
    description:
      "Honky Tonk Heartland is a 90 minute live country showcase at The Showroom at Branson Meadows. A live band and powerhouse vocalists work through classic honky tonk and heartland country favorites, with storytelling between songs and a family-friendly room. If your trip needs one show built on traditional country done straight, this is it.",
    shortDescription:
      "90 minute live showcase of classic honky tonk and traditional country favorites.",
    priceFrom: 52.80,
    priceTo: 52.80,
    childPriceFrom: 0.00,
    childPriceTo: 0.00,
    duration: "1.5 hours",
    ageRecommendation: "All ages",
    timeOfDay: "afternoon",
    mealIncluded: false,
    mealType: null,
    isNew2026: false,
    isFeatured: false,
    isLimitedEngagement: false,
    seasonStart: "September",
    seasonEnd: "December",
    showTimes: ["Tue 5:00 PM", "Fri 2:00 PM"],
    darkDays: ["Sunday", "Monday", "Wednesday", "Thursday", "Saturday"],
    // Schedule verified against showroom.completeticketing.co calendar 2026-08-29.
    darkDateRanges: [{ start: "2026-09-01", end: "2026-09-07" }, { start: "2026-11-27", end: "2026-11-27" }, { start: "2026-12-19", end: "2026-12-31" }],
    scheduleNote:
      "Tuesdays at 5:00 PM and Friday matinees at 2:00 PM, September 8 through December 18, 2026. No show the Friday after Thanksgiving.",
    specialOffers: [],
    tags: ["country", "family-friendly"],
    seoKeywords: ["honky tonk heartland branson", "branson country shows", "traditional country show branson"],
    relatedShows: ["clay-coopers-country-express", "the-duttons", "best-of-motown-and-more"],
    imageAlt: "Honky Tonk Heartland band performing at The Showroom at Branson Meadows",
    imageUrl: "/shows/honky-tonk-heartland.jpg",
    galleryImages: ["/shows/honky-tonk-heartland/g1.jpg", "/shows/honky-tonk-heartland/g2.jpg", "/shows/honky-tonk-heartland/g3.jpg", "/shows/honky-tonk-heartland/g4.jpg", "/shows/honky-tonk-heartland/g5.jpg", "/shows/honky-tonk-heartland/g6.jpg", "/shows/honky-tonk-heartland/g7.jpg", "/shows/honky-tonk-heartland/g8.jpg", "/shows/honky-tonk-heartland/g9.jpg", "/shows/honky-tonk-heartland/g10.jpg", "/shows/honky-tonk-heartland/g11.jpg", "/shows/honky-tonk-heartland/g12.jpg", "/shows/honky-tonk-heartland/g13.jpg", "/shows/honky-tonk-heartland/g14.jpg", "/shows/honky-tonk-heartland/g15.jpg", "/shows/honky-tonk-heartland/g16.jpg", "/shows/honky-tonk-heartland/g17.jpg", "/shows/honky-tonk-heartland/g18.jpg", "/shows/honky-tonk-heartland/g19.jpg", "/shows/honky-tonk-heartland/g20.jpg", "/shows/honky-tonk-heartland/g21.jpg"],
    faqs: [
  {
    question: "When does the show play?",
    answer: "Tuesdays at 5:00 PM and Friday matinees at 2:00 PM, September 8 through December 18, 2026. No show the Friday after Thanksgiving.",
  },
  {
    question: "How do I get my tickets?",
    answer: "You receive an order confirmation right away, and your tickets arrive by email within about 12 hours. Present them at the box office.",
  },
  {
    question: "What kind of country music is in the show?",
    answer: "Classic honky tonk and heartland country favorites, played by a live band with powerhouse vocalists and storytelling between songs. It is traditional country done straight.",
  },
  {
    question: "Is Honky Tonk Heartland a bar show?",
    answer: "No. Despite the name, it is a theater show in a family-friendly room at The Showroom at Branson Meadows, and it is recommended for all ages.",
  },
  {
    question: "Is it good for kids?",
    answer: "Yes. The show is recommended for all ages, the humor and stories are family-friendly, and kids' tickets are free. At 90 minutes it is also a comfortable length for younger attention spans.",
  },
  {
    question: "What should I wear?",
    answer: "Come as you are. Boots and jeans fit right in, and so does whatever you wore sightseeing. Plan to arrive about 30 minutes before showtime.",
  },
],
    isFeaturedPartner: true,
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "Traditional Country, Played Straight",
    paragraphs: ["Honky Tonk Heartland is a 90 minute live country showcase at The Showroom at Branson Meadows. There are no gimmicks and no genre-hopping. A live band and powerhouse vocalists work through classic honky tonk and heartland country favorites, with storytelling between songs, in a room that welcomes families. Branson built its reputation on country music, and this show is a reminder of why. If your trip has room for one show of traditional country done straight, this is the one.", "The 90 minute length is part of what makes it work. It is long enough for a full set of favorites and short enough to fit between an afternoon on the lake and dinner, or between shopping and an evening show. Among Branson country shows, this one is easy to fit around everything else on the itinerary. Kids' tickets are free, so it costs no more to bring the grandchildren than it does to come as a couple."],
    imageUrl: "/shows/honky-tonk-heartland/g1.jpg",
    imageAlt: "Honky Tonk Heartland cast on stage at The Showroom at Branson Meadows in Branson",
  },
  {
    heading: "Honky Tonk Favorites and Heartland Stories",
    paragraphs: ["Classic honky tonk is a style built on shuffle rhythms, steel guitar, and lyrics about real life, and that is the sound this show goes after. A live band plays every number, and the vocalists have the kind of power that traditional country demands, since these songs were written to be sung out loud rather than whispered. The set works through honky tonk and heartland country favorites, the songs that filled dance halls and kitchen radios across the middle of the country for decades.", "Between songs, the cast tells stories, which gives the show its warmth. Traditional country has always been as much about the tale as the tune, and the storytelling here keeps that tradition alive. It is a family-friendly room, so the humor and the stories are ones you can share with the kids and the grandparents in the same row. The show runs 90 minutes with the focus squarely on the music, and the music is the point."],
    imageUrl: "/shows/honky-tonk-heartland/g2.jpg",
    imageAlt: "A performance of Honky Tonk Heartland in Branson, MO",
  },
  {
    heading: "Getting to the Show and Arriving Early",
    paragraphs: ["Honky Tonk Heartland plays at The Showroom at Branson Meadows, 4600 Gretna Rd, Branson, MO 65616. The 2026 schedule runs Tuesdays at 5:00 PM and Friday matinees at 2:00 PM from September 8 through December 18, with no show on the Friday after Thanksgiving. The booking calendar on this page shows every performance the theater has on sale. Choose the one that fits your week and check out in a couple of minutes.", "The show runs about 90 minutes. Arrive 30 minutes early to park at the theater, show your tickets at the box office, and find your seats before the band counts off the first song. Parking is at the theater. The 5:00 PM Tuesday show is early enough that dinner can come after, and the Friday matinee leaves your evening free for another of the Branson shows on your list. Kids' tickets are free, and the show is recommended for all ages."],
    imageUrl: "/shows/honky-tonk-heartland/g3.jpg",
    imageAlt: "Honky Tonk Heartland performers under the stage lights in Branson",
  },
  {
    heading: "Built for Fans of Real Country",
    paragraphs: ["If you have ever turned off a modern country station because it did not sound like country to you, Honky Tonk Heartland in Branson is your show. It suits couples on a getaway, bus groups, and families with three generations along. The songs are familiar, the stories are clean, and the room is friendly. It also makes a good first show for visitors who are new to Branson and want to start with the music the town is known for.", "Book Honky Tonk Heartland tickets here with no added fees. Pick a date on the calendar above, and your tickets arrive by email, ready to show at the box office. Free cancellation up to 24 hours before showtime comes with every order, so you can book early without worrying about weather or a change of plans. If you have a question about seating or want help planning the rest of the trip, call Get Branson Tickets at (417) 243-9629."],
    imageUrl: "/shows/honky-tonk-heartland/g4.jpg",
    imageAlt: "Scene from Honky Tonk Heartland at The Showroom at Branson Meadows",
  },
],
  },
  {
    name: "The Best of Motown and More",
    slug: "best-of-motown-and-more",
    tagline: "Motown and Classic Soul Hits",
    category: ["variety-music", "tribute"],
    theater: "The Showroom at Branson Meadows",
    theaterAddress: "4600 Gretna Rd, Branson, MO 65616",
    description:
      "The Best of Motown and More celebrates the Motown and classic soul catalog: The Temptations, The Four Tops, The Stylistics, and more, delivered with tight vocal harmonies and classic choreography. Back in Branson as a residency at The Showroom at Branson Meadows, the show pairs outstanding vocal performances with the songs that defined the Motor City sound.",
    shortDescription:
      "Motown and classic soul hits from The Temptations, Four Tops, Stylistics, and more.",
    priceFrom: 52.80,
    priceTo: 52.80,
    childPriceFrom: 0.00,
    childPriceTo: 0.00,
    duration: "2 hours",
    ageRecommendation: "All ages",
    timeOfDay: "afternoon",
    mealIncluded: false,
    mealType: null,
    isNew2026: false,
    isFeatured: false,
    isLimitedEngagement: false,
    seasonStart: "August",
    seasonEnd: "December",
    showTimes: ["Wed 2:00 PM", "Sat 8:00 PM"],
    darkDays: ["Sunday", "Monday", "Tuesday", "Thursday", "Friday"],
    // Schedule verified against showroom.completeticketing.co calendar 2026-08-29.
    darkDateRanges: [{ start: "2026-09-02", end: "2026-09-02" }, { start: "2026-12-12", end: "2026-12-12" }, { start: "2026-12-24", end: "2026-12-31" }],
    seasonalDarkWeekdays: [{ day: "Saturday", start: "2026-08-30", end: "2026-11-06" }],
    scheduleNote:
      "Wednesday matinees at 2:00 PM through December 23, plus Saturday 8:00 PM shows November 7 through December 19 (except December 12).",
    specialOffers: [],
    tags: ["motown", "soul", "family-friendly"],
    seoKeywords: ["motown show branson", "best of motown branson", "soul music branson", "branson motown tribute"],
    relatedShows: ["classic-rock-icons", "british-invasion", "legends-in-concert"],
    imageAlt: "The Best of Motown and More cast performing at The Showroom at Branson Meadows",
    imageUrl: "/shows/best-of-motown-and-more.jpg",
    galleryImages: ["/shows/best-of-motown-and-more/g1.jpg", "/shows/best-of-motown-and-more/g2.jpg", "/shows/best-of-motown-and-more/g3.jpg", "/shows/best-of-motown-and-more/g4.jpg", "/shows/best-of-motown-and-more/g5.jpg", "/shows/best-of-motown-and-more/g6.jpg", "/shows/best-of-motown-and-more/g7.jpg", "/shows/best-of-motown-and-more/g8.jpg", "/shows/best-of-motown-and-more/g9.jpg", "/shows/best-of-motown-and-more/g10.jpg", "/shows/best-of-motown-and-more/g11.jpg", "/shows/best-of-motown-and-more/g12.jpg", "/shows/best-of-motown-and-more/g13.jpg", "/shows/best-of-motown-and-more/g14.jpg", "/shows/best-of-motown-and-more/g15.jpg", "/shows/best-of-motown-and-more/g16.jpg", "/shows/best-of-motown-and-more/g17.jpg", "/shows/best-of-motown-and-more/g18.jpg", "/shows/best-of-motown-and-more/g19.jpg"],
    faqs: [
  {
    question: "When does the show play?",
    answer: "Wednesday matinees at 2:00 PM through December 23, plus Saturday 8:00 PM shows November 7 through December 19, except December 12.",
  },
  {
    question: "How do I get my tickets?",
    answer: "You receive an order confirmation right away, and your tickets arrive by email within about 12 hours. Present them at the box office.",
  },
  {
    question: "Is this a Motown tribute show?",
    answer: "Yes. The Best of Motown and More celebrates the Motown and classic soul catalog, with the songs of The Temptations, The Four Tops, The Stylistics, and more, performed with tight vocal harmonies and classic choreography.",
  },
  {
    question: "Is it good for kids and seniors?",
    answer: "It is recommended for all ages, and kids' tickets are free. The songs are upbeat and familiar, and seniors who grew up with Motown will recognize nearly everything.",
  },
  {
    question: "Is the show new to Branson?",
    answer: "It is a return. The Best of Motown and More is back in Branson as a residency at The Showroom at Branson Meadows.",
  },
  {
    question: "Is the theater accessible?",
    answer: "Call us at (417) 243-9629 before you book and we will check seating options with the theater for you.",
  },
],
    isFeaturedPartner: true,
bookingPageV2: true,
demandBadges: true,
familyBundle: true,
// Long-form sections written 2026-09-06 from this entry's own data (no outside facts).
detailSections: [
  {
    heading: "The Motor City Sound, Back in Branson",
    paragraphs: ["The Best of Motown and More celebrates the Motown and classic soul catalog, the songs of The Temptations, The Four Tops, The Stylistics, and more. The show is back in Branson as a residency at The Showroom at Branson Meadows, and it pairs outstanding vocal performances with the songs that defined the Motor City sound. Branson is better known for country and gospel, so a full Motown show is a welcome addition for visitors who want soul music on the itinerary.", "Motown was built on lead singers with personality, background harmonies that lock together, and choreography that made every group look as if they had danced together since childhood. The Best of Motown and More brings all three to the stage with tight vocal harmonies and classic choreography. It runs about two hours, it is recommended for all ages, and kids' tickets are free. These are songs most of the audience already knows by heart, which is exactly the point."],
    imageUrl: "/shows/best-of-motown-and-more/g1.jpg",
    imageAlt: "The Best of Motown and More cast on stage at The Showroom at Branson Meadows in Branson",
  },
  {
    heading: "Harmonies, Choreography, and the Hits",
    paragraphs: ["The set list draws from the Motown and classic soul catalog, with The Temptations, The Four Tops, and The Stylistics at the center. Expect the tight vocal harmonies that defined those groups, delivered by singers who work as a unit rather than one lead with a backup. The classic choreography is part of the show too, the synchronized steps and turns that Motown groups made famous. It is a polished, upbeat two hours that never drifts far from the songs people came to hear.", "The 'and More' in the title is there for a reason. Beyond The Temptations, The Four Tops, and The Stylistics, the show reaches into the broader classic soul catalog, so it covers more ground than a single-group tribute would. Through all of it, the voices are the draw. Motown records were made by singers who could carry a room, and outstanding vocal performances are what this production is built around. Add the classic choreography, and it looks the part as well as sounds it."],
    imageUrl: "/shows/best-of-motown-and-more/g2.jpg",
    imageAlt: "A performance of The Best of Motown and More in Branson, MO",
  },
  {
    heading: "Matinees and Evenings at Branson Meadows",
    paragraphs: ["The Best of Motown and More plays at The Showroom at Branson Meadows, 4600 Gretna Rd, Branson, MO 65616. In 2026, Wednesday matinees at 2:00 PM run through December 23, and Saturday 8:00 PM shows are added from November 7 through December 19, except December 12. The Wednesday matinee is the regular slot, and the Saturday evenings give holiday-season visitors a second option. The booking calendar on this page shows exactly which dates are on sale.", "Plan on about two hours and arrive 30 minutes before curtain. Parking is at the theater, so the extra time is for parking, showing your tickets at the box office, and getting settled. A 2:00 PM matinee leaves the evening open for dinner and another show, and the Saturday 8:00 PM performance rounds out a weekend trip. Kids' tickets are free, and the show is recommended for all ages, so the whole group can come."],
    imageUrl: "/shows/best-of-motown-and-more/g3.jpg",
    imageAlt: "The Best of Motown and More performers under the stage lights in Branson",
  },
  {
    heading: "Great for Groups, Couples, and Families",
    paragraphs: ["The Best of Motown and More in Branson is a natural pick for anyone who danced to these songs the first time around, and just as good for the kids and grandkids who know them from movies and weddings. Couples, tour groups, and church groups all fit the room. If you are choosing between Branson shows for a group with a range of ages and tastes, Motown is one of the safest bets there is, because almost nobody dislikes The Temptations.", "Get Branson Tickets sells The Best of Motown and More tickets with no added fees. Pick a date on the calendar above, complete checkout, and your tickets arrive by email. Every order includes free cancellation up to 24 hours before showtime, so booking ahead for a holiday-season Saturday carries no risk. Want to talk to someone about seating or about pairing this with dinner and another show? Call (417) 243-9629 and we will help you put the day together."],
    imageUrl: "/shows/best-of-motown-and-more/g4.jpg",
    imageAlt: "Scene from The Best of Motown and More at The Showroom at Branson Meadows",
  },
],
  },
]; export function getShowBySlug(slug: string): Show | undefined { return shows.find((s) => s.slug === slug);
} export function getShowsByCategory(category: string): Show[] { if (category === "all") return shows; return shows.filter((s) => s.category.includes(category));
} export function getFeaturedShows(): Show[] { return shows .filter((s) => s.isFeatured) .sort((a, b) => { const ao = a.featuredOrder ?? Number.MAX_SAFE_INTEGER; const bo = b.featuredOrder ?? Number.MAX_SAFE_INTEGER; return ao - bo; });
} export function getShowCategories(): string[] { const cats = new Set<string>(); shows.forEach((s) => s.category.forEach((c) => cats.add(c))); return Array.from(cats);
} export function getPartnerShows(): Show[] { return shows.filter((s) => s.isFeaturedPartner);
}
