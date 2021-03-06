// TODO: None
const crypto = require('crypto');

module.exports = function verTokenFunctions(verTokenSchema) {
  const schema = verTokenSchema;

  schema.statics.generateVerToken = async function genVer(id) {
    const VerToken = this;
    const tokenValue = id + crypto.randomBytes(16).toString('hex');

    const token = new VerToken({
      owner: id,
      value: tokenValue,
    });

    await token.save();
  };

  schema.statics.findOld = async function findOld(userId) {
    const VerToken = this;

    const token = VerToken.findOne({ owner: userId });
    token.deleteOne();
  };
};
