import {
  CHANNEL_CUSTOMIZE_CARD,
  CHANNEL_DELETE_DRAWER_CONFIRM,
  CHANNEL_DELETE_DRAWER_DELETE,
  CHANNEL_DELETE_DRAWER_DELETE_MUTE,
  CHANNEL_DELETE_DRAWER_MUTE,
  CHANNEL_DISCOVER_CLOSE_SEARCH_ICON,
  CHANNEL_DISCOVER_SEARCH_ICON,
  CHANNEL_DISCOVER_SEARCH_INPUT,
  CHANNEL_HEADER,
  CHANNEL_POST,
  CHANNEL_POST_PUMP_ICON,
  CHANNEL_POST_REPLIES_COUNT,
  CHANNELS_CHANNELS_LIST_ITEM,
  CHANNELS_EMPTY_LIST_BUTTON,
  CHANNELS_LIST_ITEM,
  CHANNELS_TABS_CONTAINER_CHANNELS,
  CHANNELS_TABS_CONTAINER_DISCOVER,
  CREATE_BUTTON,
  CREATE_CHANNEL_BUTTON,
  CREATE_CHANNEL_COMMUNITY_GUIDELINES_LINK,
  CREATE_CHANNEL_I_UNDERSTAND_BUTTON,
  CREATE_CHANNEL_NAME_INPUT,
  JOIN_CHANNEL_DRAWER_SLIDER,
  SEND_SENSE_DRAWER_EDIT_AMOUNT_BUTTON,
  SEND_SENSE_DRAWER_EDIT_AMOUNT_INPUT,
  SEND_SENSE_DRAWER_SLIDER,
  SENSE_INPUT_BUTTON,
  SENSE_INPUT_TEXTAREA,
  SET_PROFILE_CAMERA_BUTTON,
} from '../../../src/ui/testid-constants';
import { wait } from '../common/actions';

export const navigateToDiscover = async () => {
  await element(by.text('Channels')).tap();
  await element(by.text('Discover')).tap();
};

export const navigateToChannels = async () => {
  await element(by.text('Channels')).tap();
};

export const tapOnChannelByName = async (name) => {
  await element(by.text(name).withAncestor(by.id(CHANNELS_LIST_ITEM))).tap();
  await wait(1000);
};

export const slideRightToJoinChannel = async () => {
  const slider = element(by.id(JOIN_CHANNEL_DRAWER_SLIDER));
  await slider.swipe('right', 'slow', NaN, 0.1);
};

export const tapCreateChannelButton = async () => {
  const createChannelButton = element(by.id(CREATE_CHANNEL_BUTTON)).atIndex(0);
  await createChannelButton.tap();
};

export const tapCreateButtonOnCreateChannelScreen = async () => {
  const createButton = element(by.id(CREATE_BUTTON));
  await createButton.tap();
};

export const enterChannelNameOnCreateChannelScreen = async (name) => {
  const nameInput = element(by.id(CREATE_CHANNEL_NAME_INPUT));
  await nameInput.typeText(name);
};

export const tapSenseChatCommunityGuidelinesLink = async () => {
  const guidelinesLink = element(by.id(CREATE_CHANNEL_COMMUNITY_GUIDELINES_LINK));
  await guidelinesLink.tap();
};

export const tapIUnderstandOnCommunityGuidelinesDrawer = async () => {
  const iUnderstandButton = element(by.id(CREATE_CHANNEL_I_UNDERSTAND_BUTTON));
  await iUnderstandButton.tap();
};

export const tapAddImageButton = async () => {
  const addImageButton = element(by.id(SET_PROFILE_CAMERA_BUTTON));
  await addImageButton.tap();
};

export const tapChooseFromLibraryButton = async () => {
  await element(by.text('Choose from Library...')).tap();
};

export const tapCancelOnChoosePhotoActionSheet = async () => {
  await element(by.text('Cancel')).tap();
};

export const tapChannelsOnDiscoverList = async () => {
  const channelsTab = element(by.text('Channels').withAncestor(by.id(CHANNELS_TABS_CONTAINER_DISCOVER))).atIndex(0);
  await channelsTab.tap();
};

export const tapDiscoverOnChannelsList = async () => {
  const channelsTab = element(by.text('Discover').withAncestor(by.id(CHANNELS_TABS_CONTAINER_CHANNELS))).atIndex(0);
  await channelsTab.tap();
};

export const tapStartAChannelButton = async () => {
  const startChannelButton = element(by.id(CHANNELS_EMPTY_LIST_BUTTON));
  await startChannelButton.tap();
};

export const joinChannel = async (channelName) => {
  await tapOnChannelByName(channelName);
  await slideRightToJoinChannel();
  await wait(1500);
};

export const searchChannelByName = async (channelName) => {
  await element(by.id(CHANNEL_DISCOVER_SEARCH_ICON)).tap();
  await element(by.id(CHANNEL_DISCOVER_SEARCH_INPUT)).typeText(channelName);
};

export const tapChannelsHeader = async () => {
  const header = element(by.id(CHANNEL_HEADER));
  await header.tap();
};

export const tapCustomizeChannelCard = async () => {
  const customizeCard = element(by.id(CHANNEL_CUSTOMIZE_CARD));
  await customizeCard.tap();
};

export const tapPumpIconOnPost = async (postText) => {
  const pumpIcon = element(
    by.id(CHANNEL_POST_PUMP_ICON).withAncestor(by.id(CHANNEL_POST).withDescendant(by.text(postText))),
  );
  await pumpIcon.tap();
};

export const slideRightToPumpChannelPost = async () => {
  const slider = element(by.id(SEND_SENSE_DRAWER_SLIDER));
  await slider.swipe('right', 'slow', NaN, 0.2);
};

export const tapEditAmountOnPumpDrawer = async () => {
  const editAmountButton = element(by.id(SEND_SENSE_DRAWER_EDIT_AMOUNT_BUTTON));
  await wait(500);
  await editAmountButton.tap();
};

export const enterPumpAmountOf = async (amount) => {
  const input = element(by.id(SEND_SENSE_DRAWER_EDIT_AMOUNT_INPUT));
  await input.typeText(amount);
};

export const tapOnChannelPost = async (postText) => {
  // const post = element(by.id(CHANNEL_POST).withDescendant(by.text(postText)));
  const post = element(by.text('Reply').withAncestor(by.id(CHANNEL_POST).withDescendant(by.text(postText))));
  await post.tap();
};

export const longPressOnChannelPost = async (text) => {
  const chatMessage = element(by.text(text).withAncestor(by.id(CHANNEL_POST)));
  await wait(500);
  await chatMessage.longPress();
};

export const tapReplyToPostOnActionOverlay = async () => {
  const replyButton = element(by.text('Reply to Post'));
  await replyButton.tap();
};

export const tapEditOnActionOverlay = async () => {
  const editButton = element(by.text('Edit Message'));
  await editButton.tap();
};

export const tapConfirmOnDeleteMessageDrawer = async () => {
  const confirm = element(by.id(CHANNEL_DELETE_DRAWER_CONFIRM));
  await confirm.tap();
};

export const tapDeleteOnDeleteMessageDrawer = async () => {
  const deleteBtn = element(by.id(CHANNEL_DELETE_DRAWER_DELETE));
  await deleteBtn.tap();
};

export const tapMuteMemberOnDeleteMessageDrawer = async () => {
  const muteBtn = element(by.id(CHANNEL_DELETE_DRAWER_MUTE));
  await muteBtn.tap();
};

export const tapMuteAndDeleteMemberOnDeleteMessageDrawer = async () => {
  const muteAndDeleteBtn = element(by.id(CHANNEL_DELETE_DRAWER_DELETE_MUTE));
  await muteAndDeleteBtn.tap();
};

export const tapChannelOnChannelsByName = async (channelName) => {
  const channel = element(by.text(channelName).withAncestor(by.id(CHANNELS_CHANNELS_LIST_ITEM)));
  await channel.tap();
};

export const postReply = async (text) => {
  const textInput = element(by.id(SENSE_INPUT_TEXTAREA));
  const sendButton = element(by.id(SENSE_INPUT_BUTTON));
  await textInput.typeText(text);
  await sendButton.tap();
};

export const tapReplyOnChannelPost = async (postMessage) => {
  await element(
    by
      .id(CHANNEL_POST_REPLIES_COUNT)
      .withAncestor(by.id(CHANNEL_POST).withDescendant(by.text(postMessage)))
      .and(by.text('Reply')),
  ).tap();
};

export const tapCloseChannelSearchIcon = async () => {
  await element(by.id(CHANNEL_DISCOVER_CLOSE_SEARCH_ICON)).tap();
};
