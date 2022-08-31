const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCzmmhScw/o3lKb\np8OHU750EHoYHoZFY6YVM3KHitJhEVIvil3atoNyWS8+AFnmxpdZKCuKpGa05Og+\nxuu+ZYfD4Du1mRwDCxzcGeVN8F9CwCut/2cM/uFm4RHqn3CVgOgt/Mwlw28iGtRS\nEOJVWeky9L3SbaR9iwSqXJMV3QvYlsm7Q34oAZEbbzIbGxtoVM+qMInjYRSnp6GB\nBjJXUFtFZmMoSZmCMW5XVbb9AOWdp4S6UK8yWOldneIzEb9o/9TbU7pn3KUwDXVJ\nUjjTVIyxHMIpSsUvMShf1bcKW4s9dayLhIdfwBFUdFFuJM5eEPHghDlZpwslh0kt\nJSzEUBrxAgMBAAECggEACp7/2plcmF82aCdVhi4XAhbb24uJkfaswo30cMzOOGiN\ncUuH1ZhrwVJCG5Lqfh3iIyb/nS8v9jRfwh+iHxQywUwER+7WI91vP1pmL7PedEx4\nQM3M5q03f+2hMTxszGCPSnHr0jNiofQPeItwUQ8UPfvQcm5itvxmwhrfpWA5ND2M\nK3GKpPtdO59bgLQzjZ+dKVPkTAA/NroWVTe2Gow87jssW3qzLr4HwdfdoAnaBuP5\nIPNonZGNRiNtpuKPIFgfyufOAo2pcp82PPyEezJu17Z1pMH6uE0XHAVC3Z/0fJ/D\nHRvTU7uxiLzFz4KnCks2uQxguVtv+arjb5IYUShawQKBgQDhlO+ObKSdNNUXmFXj\nnscTMd68FDf+DzyhcU45syhrOzX4pKXDNcptnmB40+gKiBlHxjf7wAGvgJSELuCZ\nWBkg67/YCGWLSKIIdLehPApazVYoaTCdwws6pjTzMPYAockEf8VDLEjWQ+dbgofK\nHe41feP3APlVfarNcuvj/kFYEQKBgQDL0kscyY5MG7yAR311S4dCuFa3e1oNko+B\n76m/mmYUSfUPkp9G5jpNCAQua9iW3hp4HBkPVD38wmD11CgqJJoJz+o45XXtvIpF\n8/RNvr8ES3GhvKBPlMiogGi77iY/B2zEQmklCUfedBTwBdsN6hmrPDeg3Lnf4+WP\nE16jC1p04QKBgQCt/ukAHECkmXm7515oYbH/1jmNLLM7nZkQlYrW6p/EhjlM/gJ1\nnenzv3N9/0U9ylhlijjoT+N88Vqc0mOfI9rOD8k74s4gLvf8Obrh/KOoAjXwmaJM\nLYNdy5GP+zXkquWYOM140JGl415ysS338joovF+3x+KJ1JKIQZo9k4HnYQKBgQCJ\nrXJ5bpjFRlMNX70aNzuV0QkahaMt2dtATRCf0X60o8R6kXMvpCKrmAejB8xVFJBS\no8A1v5TjoLV4OKgs126JxD0V08HWJe5NFF3pCjjjgMawFsc/GmR0ldCpaVPCbZSF\n+comb19xn33pKDtw6boPFe0Jpy+TUdDl1ZKuleOzYQKBgCHGpn0682asI8rBDKOt\negz+L5DNYREswDisrZVUi/Gc14XKUIBpouTYwUbmFtU1hwkOUKcat94cBeJkJ/gS\nwN9D2y7JlWCTKd/2evuaCDGdswHgDvK0xETBDxYiY3gNVNgbnyF45T59+fTR3hjd\nV+Hiocplimit/7EEHABi0kA/\n-----END PRIVATE KEY-----\n",
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
