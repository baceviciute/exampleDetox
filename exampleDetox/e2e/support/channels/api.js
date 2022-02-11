import request from '../request';
import { wait } from '../common/actions';

export const createChannelName = () => {
  let date = `${Date.now()}`;
  return `Channel-${date.slice(7, 13)}`;
};

export const createChannelViaApi = async (sessionToken, channelData) => {
  const channel = {
    name: channelData.channelName,
    imageUrl: 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
    allowPosting: channelData.allowPosting,
  };
  await request({
    method: 'POST',
    url: `https://v2-development-core.herokuapp.com/parse/functions/channels:create`,
    headers: {
      'X-Parse-Application-Id': 'sense-v2',
      'Content-Type': 'application/json',
      'X-Parse-Session-Token': sessionToken,
    },
    body: channel,
    json: true,
  });
  await wait(1000);
};
