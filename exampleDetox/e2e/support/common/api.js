import request from '../request';
import Parse from 'parse/node';
import { createStreamUser } from '../simulate/modules/getstream';
import { wait } from './actions';

export const removeUsedPhoneNumbersFromDB = async () => {
  return request({
    method: 'GET',
    url: `http://v2-development-core.herokuapp.com/cleanupTestNumbers/4x`,
    headers: {},
    body: {},
    json: true,
  });
};

export const get1000SenseFor = async (senseID) => {
  return request({
    method: 'GET',
    url: `http://v2-development-core.herokuapp.com/faucet/${senseID}`,
    headers: {},
    body: {},
    json: true,
  });
};

export const getCurrentSessionTokenViaApi = async (senseID) => {
  const response = await request({
    method: 'GET',
    url: `http://v2-development-core.herokuapp.com/getSession/` + senseID,
    headers: {},
    body: {},
    json: true,
  });
  return response;
};

export const findExistingUsers = async (identifier) => {
  const body = {
    identifier: identifier,
  };
  const resp = await request({
    method: 'POST',
    url: `https://v2-development-core.herokuapp.com/parse/functions/user:find`,
    headers: {
      'X-Parse-Application-Id': 'sense-v2',
      'Content-Type': 'application/json',
    },
    body: body,
    json: true,
  });
  console.log(resp);
};

export const initializeParse = async () => {
  Parse.serverURL = Parse.serverURL = 'https://v2-development-core.herokuapp.com/parse';
  Parse.initialize('sense-v2');
  Parse.User.enableUnsafeCurrentUser();
};

export const createAndOnboardUserViaApi = async (phone, senseId) => {
  Parse.serverURL = Parse.serverURL = 'https://v2-development-core.herokuapp.com/parse';
  Parse.initialize('sense-v2');
  Parse.User.enableUnsafeCurrentUser();
  if (!phone.indexOf('+1') > -1) phone = `+1${phone}`;
  const verifyRequest = {
    phone,
    code: '123456',
  };
  const verifyResult = await Parse.Cloud.run('sms:verify', verifyRequest);
  const { userToken, uniqueId, streamToken } = verifyResult.data;
  // Yay, we have the token, let's tell Parse to authenticate as that user with `become()`
  await Parse.User.become(userToken);

  await createStreamUser(streamToken, uniqueId);
  // Now, everything we do after `Parse.User.become()` will be done in the name of that user
  const currentUser = Parse.User.current();
  currentUser.set('displayName', senseId);
  currentUser.set('senseId', senseId);
  currentUser.set('avatarUrl', 'https://avatars1.githubusercontent.com/u/2795185');
  currentUser.set('onboardedAt', new Date());
  await currentUser.save();
  return {
    userToken,
    uniqueId,
  };
};

export const createChannelByOtherMemberViaApi = async (channelName, allowPosting = true) => {
  // At this point we assume that we've already set Parse.User. Otherwise, we'll get a failed test
  const createChannelRequest = {
    name: channelName,
    imageUrl: 'https://avatars1.githubusercontent.com/u/2795185',
    allowPosting: allowPosting,
  };
  const createChannelResponse = await Parse.Cloud.run('channels:create', createChannelRequest);
  if (createChannelResponse.code !== 200) throw new Error('Ooops. Channel creation failed');
  const { id, name } = createChannelResponse.data;
  return {
    channelId: id,
    name,
  };
};

export const getUniqueIdBySenseId = async (senseId) => {
  const query = new Parse.Query(Parse.User);
  query.equalTo('senseId', senseId);
  const user = await query.first();
  return user ? user.get('uniqueId') : null;
};

export const create1to1Conversation = async (token, partnerUniqueId) => {
  await Parse.User.become(token);
  const createConversationRequest = {
    memberId: partnerUniqueId,
  };
  await Parse.Cloud.run('chat:create', createConversationRequest);
  console.log(createConversationRequest);
};

export const create1to1ChatViaApi = async (sessionToken, partnerUniqueId) => {
  return request({
    method: 'POST',
    url: `https://v2-development-core.herokuapp.com/parse/functions/chat:create`,
    headers: {
      'X-Parse-Application-Id': 'sense-v2',
      'Content-Type': 'application/json',
      'X-Parse-Session-Token': sessionToken,
    },
    body: { memberId: partnerUniqueId },
    json: true,
  });
};

export const getChannelIdByName = async (name) => {
  const query = new Parse.Query(Parse.Object.extend('Channels'));
  query.equalTo('name', name);
  const channel = await query.first();
  // channel will be null if nothing was found by that name
  // channel.channelId will contain ID of the channel
  return channel.get('channelId');
};

export const postTextBy = async (channelId, userId, message) => {
  await Parse.Cloud.run('system:sendChannelMessage', {
    channelId: channelId,
    userId: userId,
    message: message,
  });
  await wait(1500);
};

export const promoteToAdmin = async (channelId, user2uniqueId) => {
  await Parse.Cloud.run('channels:promoteMember', {
    userId: user2uniqueId,
    channelId: channelId,
  });
};

export const joinChannelViaApi = async (channelId) => {
  await Parse.Cloud.run('channels:join', {
    channelId: channelId,
  });
};
