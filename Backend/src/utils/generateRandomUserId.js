function generateRandomUserId() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  let userId = '';

  // Add 6 random uppercase letters
  for (let i = 0; i < 6; i++) {
    userId += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Add 10 random digits
  for (let i = 0; i < 10; i++) {
    userId += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return userId;
}

module.exports = generateRandomUserId;