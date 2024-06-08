import axios from 'axios';

export const transcribeAnything = async ({ file, url, device, task, format }) => {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  if (url) {
    formData.append('url', url);
  }
  formData.append('device', device);
  formData.append('task', task);
  formData.append('format', format);

  try {
    const response = await axios.post('https://api.transcribe-anything.com/transcribe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during transcription:', error);
    throw error;
  }
};