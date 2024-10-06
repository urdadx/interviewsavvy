export const generateRandomString = (length: number) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const generateRandomUsername = () => {
  const adjectives = ["Curious", "Brave", "Lazy", "Mighty", "Silly", "Quiet"];
  const nouns = ["Otter", "Dragon", "Falcon", "Unicorn", "Turtle", "Badger"];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  const randomNum = Math.floor(Math.random() * 1000);

  return `${adjective}${noun}${randomNum}`;
};

export const generateRandomAvatar = () => {
  const randomSeed = generateRandomString(8);
  return `https://api.dicebear.com/9.x/glass/svg?seed=${randomSeed}`;
};
