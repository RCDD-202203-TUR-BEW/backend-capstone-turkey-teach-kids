const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');

console.log(process.env.GOOGLE_CLOUD_PRIVATE_KEY);

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: JSON.parse(process.env.GOOGLE_CLOUD_PRIVATE_KEY || '{}')?.key,
  },
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET);

exports.uploadFileToGCS = async (file) => {
  if (!file) return null;
  const avatarName = `https://storage.googleapis.com/teach-capstone/${uuidv4()}.${
    file.mimetype.split('/')[1]
  }`;
  const avatarFile = bucket.file(avatarName);
  await avatarFile.save(file.buffer);
  const filePath = avatarFile.name;
  return filePath;
};
