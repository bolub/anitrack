import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.airtable.com/v0/appJGUjzAkZfyM3Ji',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  },
});
