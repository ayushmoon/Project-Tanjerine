// ============================================================
// CENTRALIZED DATA — All Keepsakes, Memories & Story Details
// ============================================================

export interface Memory {
  id: string
  image: string
  title: string
  caption: string
  date?: string
}

// ─── Photo keepsakes (10 Curated Keepsakes) ────────────────────
// Stored in public/Images/ folder.
export const memories: Memory[] = [
  {
    id: 'photo-01',
    image: '/Images/photo-01.jpg',
    title: 'Antera Evenings · Hyderabad',
    caption: 'Under the warm neon glow at Antera. A quiet, contemplative profile in the middle of a lively Hyderabad night.',
    date: 'Jubilee Hills, Hyderabad',
  },
  {
    id: 'photo-02',
    image: '/Images/photo-02.jpg',
    title: 'Balloons & Birthday Sunshine',
    caption: 'Pink balloons, open green lawns, and that radiant, genuine laugh that lights up everything around it.',
    date: '16 October · The Celebration',
  },
  {
    id: 'photo-03',
    image: '/Images/photo-03.jpg',
    title: 'The Lavender Organza',
    caption: 'Quiet, effortless traditional grace. The delicate shimmer of the lavender saree catching the afternoon sun.',
    date: 'Traditional Keepsake',
  },
  {
    id: 'photo-04',
    image: '/Images/photo-04.jpg',
    title: '100% Madamji Energy',
    caption: 'The iconic playful selfie — complete with a wink, a pout, and zero tolerance for being taken too seriously.',
    date: 'Candid & Playful',
  },
  {
    id: 'photo-05',
    image: '/Images/photo-05.jpg',
    title: 'Caught Mid-Laugh',
    caption: 'Tucking her hair behind her ear, laughing warmly in the sunlight. Unscripted, candid, and undeniably beautiful.',
    date: 'Golden Hour Moments',
  },
  {
    id: 'photo-06',
    image: '/Images/photo-06.jpg',
    title: 'The Tree-Lined Walk',
    caption: 'Standing beneath the tall trees, hair catching the gentle breeze. Calm, poised, and effortlessly graceful.',
    date: 'Campus Walks',
  },
  {
    id: 'photo-07',
    image: '/Images/photo-07.jpg',
    title: 'Cake, Confetti & Picnic Smiles',
    caption: 'Heart cutouts on the grass, birthday cake in hand, and uncontainable laughter. The sweetest outdoor celebration.',
    date: 'Birthday Picnic',
  },
  {
    id: 'photo-08',
    image: '/Images/photo-08.jpg',
    title: 'The Magenta Shimmer',
    caption: 'The rose-magenta shimmer saree, silver jhumkas, and that quiet, charming smile that steals the show every single time.',
    date: 'Celebration Attire',
  },
  {
    id: 'photo-09',
    image: '/Images/photo-09.jpg',
    title: 'Four Moods of Madamji',
    caption: 'From sweet smiles to playful golden moon filters. Four everyday moods, each one more memorable than the last.',
    date: 'Everyday Selfies',
  },
  {
    id: 'photo-10',
    image: '/Images/photo-10.jpg',
    title: 'Cozy & Content',
    caption: 'Hair in a claw clip, cozy sweatshirt, and that gentle, shy smile. The quiet, unscripted moments are the most special.',
    date: 'Quiet Moments',
  },
]

// ─── THE PORTRAIT — Reserved for the Final Reveal Altar ─────────
// The crowning, graceful portrait of Madamji
export const bestPhoto: Memory = {
  id: 'best-photo',
  image: '/Images/best-photo.jpg',
  title: 'Madamji · Tejasree',
  caption: 'Standing serene beneath open skies in pearl-white and magenta. That quiet, unhurried grace that makes Madamji truly one of a kind.',
  date: 'The Crowning Keepsake · 16 October',
}

// ─── Birthday config ──────────────────────────────────────────
export const BIRTHDAY = {
  name: 'Tejasree',
  nickname: 'Madamji',
  date: new Date('2026-10-16T00:00:00'),  // October 16
  sender: 'Ayush',
}

// ─── Telugu / Marathi phrases for Chapter 2 ──────────────────
export const languagePairs = [
  {
    telugu: { phrase: 'Em chestunav?', meaning: 'What are you doing?' },
    marathi: { phrase: 'Ky krt ahe?', meaning: 'What are you doing?' },
  },
  {
    telugu: { phrase: 'Mee peru enti?', meaning: 'What is your name?' },
    marathi: { phrase: 'Tuz naav ky ahe?', meaning: 'What is your name?' },
  },
  {
    telugu: { phrase: 'Ela unnav?', meaning: 'How are you?' },
    marathi: { phrase: 'Tu kasa ahe?', meaning: 'How are you?' },
  },
]

// ─── Spin wheel prizes ────────────────────────────────────────
export const spinWheelPrizes = [
  'Madamji is officially right about everything today.',
  'One extra dessert. No negotiations.',
  'French fries are mandatory. Non-optional.',
  'You may blame Ayush for one unrelated thing.',
  'Birthday luck: fully unlocked.',
  "Today's forecast: Excellent vibes only.",
  'Ice cream permission: GRANTED.',
  'You deserve a ridiculously good year.',
  'VIP Madamji Day: activated.',
  'That thing that happened? Because of you. Obviously.',
]

// ─── Food court items ─────────────────────────────────────────
export const foodItems = [
  {
    emoji: '🍟',
    name: 'French Fries',
    caption: 'Probably not optional.',
    highlight: true,
  },
  {
    emoji: '🍚',
    name: 'Flavoured Rice / Biryani',
    caption: 'No chicken. Strictly Madamji-approved.',
    highlight: false,
  },
  {
    emoji: '🍦',
    name: 'Ice Cream',
    caption: 'Any flavor, any excuse.',
    highlight: false,
  },
  {
    emoji: '🍔',
    name: 'Burger',
    caption: 'Because she said so.',
    highlight: false,
  },
]

// ─── "Because of you" joke items ─────────────────────────────
export const becauseOfYouItems = [
  { event: 'Forgot something?', blame: 'Because of you.' },
  { event: 'Got late?', blame: 'Because of you.' },
  { event: 'Missed something?', blame: 'Because of you.' },
  { event: "Mood's off?", blame: 'Obviously because of you.' },
  { event: 'Something completely unrelated happened?', blame: 'Still because of you.' },
  { event: 'It rained today?', blame: "Still because of you." },
]
