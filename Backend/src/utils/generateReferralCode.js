function generateReferralCode() {
    const digits = '0123456789'; // Digits only
    let referralCode = '';

    // Generate a 5-digit code
    for (let i = 0; i < 5; i++) {
        referralCode += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    return referralCode;
}

module.exports = generateReferralCode;