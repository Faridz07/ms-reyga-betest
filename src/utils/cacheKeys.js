const userAccountNumberKey = (accountNumber) => `user:accountNumber:${accountNumber}`;

const userIdentityNumberKey = (identityNumber) => `user:identityNumber:${identityNumber}`;

module.exports = { userAccountNumberKey, userIdentityNumberKey };