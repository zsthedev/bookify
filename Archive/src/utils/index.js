const adjectives = [
  'Amazing',
  'Delicious',
  'Tasty',
  'Mouthwatering',
  'Savory',
  'Exquisite',
];
const nouns = [
  'Pakwan',
  'Cuisine',
  'Biryani',
  'Tandoor',
  'Tikka',
  'Grill',
  'Curry',
];

export function generateRandomName() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `The ${adjective} ${noun}`;
}
