import {
  CHANNEL_ADMIN_ONLY_INFO_BANNER,
  CHANNEL_ADMIN_ONLY_INFO_BANNER_TEXT,
  CHANNEL_CANCEL_CARD_BUTTON,
  CHANNEL_CUSTOMIZE_CARD,
  CHANNEL_DELETE_DRAWER,
  CHANNEL_DETAILS_SCREEN_MEMBER,
  CHANNEL_DETAILS_SCREEN_OWNER,
  CHANNEL_DETAILS_WHO_CAN_POST,
  CHANNEL_INVITE_CARD,
  CHANNEL_POST,
  CHANNEL_POST_REPLIES_COUNT,
  CHANNEL_PUMP_MESSAGE_AMOUNT,
  CHANNEL_REPLIES_HEADER,
  CHANNEL_SCREEN,
  CHANNEL_WELCOME_CARD,
  CHANNELS_CHANNELS_LIST_ITEM,
  CHANNELS_EMPTY_LIST_BUTTON,
  CHANNELS_EMPTY_LIST_SCREEN,
  CHANNELS_LIST,
  CHANNELS_LIST_DISCOVER,
  CHANNELS_LIST_JOIN_DRAWER,
  CREATE_CHANNEL_COMMUNITY_GUIDELINES_DRAWER,
  CREATE_CHANNEL_SCREEN,
  SEND_SENSE_DRAWER,
  SEND_SENSE_DRAWER_EDIT_AMOUNT_INPUT,
  SENSE_BALANCE,
  SENSE_INPUT_TEXTAREA,
} from '../../../src/ui/testid-constants';
import i18n from 'i18n-js';
import { wait } from '../common/actions';

export const expectToBeOnDiscoverChannelsList = async () => {
  const channelsList = element(by.id(CHANNELS_LIST_DISCOVER));
  await expect(channelsList).toBeVisible();
};

export const expectToSeeJoinChannelDrawer = async () => {
  const joinChannelDrawer = element(by.id(CHANNELS_LIST_JOIN_DRAWER));
  await expect(joinChannelDrawer).toBeVisible();
};

export const expectToSeeEmptyChannelsListScreen = async () => {
  const emptyChannelsScreen = element(by.id(CHANNELS_EMPTY_LIST_SCREEN));
  await expect(emptyChannelsScreen).toBeVisible();
};

export const expectToSeeStartChannelButtonOnEmptyChannelsScreen = async () => {
  const emptyScreenButton = element(by.id(CHANNELS_EMPTY_LIST_BUTTON));
  await expect(emptyScreenButton).toBeVisible();
};

export const expectToBeOnChannelScreen = async () => {
  const channelScreen = element(by.id(CHANNEL_SCREEN));
  await expect(channelScreen).toBeVisible();
};

export const expectToNotBeOnChannelScreen = async () => {
  const channelScreen = element(by.id(CHANNEL_SCREEN));
  await expect(channelScreen).not.toBeVisible();
};

export const expectSenseBalanceToBe = async (senseAmount) => {
  await expect(element(by.text(senseAmount).withAncestor(by.id(SENSE_BALANCE))).atIndex(0)).toBeVisible();
};

export const expectToBeOnCreateChannelScreen = async () => {
  const createChannelScreen = element(by.id(CREATE_CHANNEL_SCREEN));
  await expect(createChannelScreen).toExist();
};

export const expectToSeeCommunityGuidelinesDrawer = async () => {
  const guidelinesDrawer = element(by.id(CREATE_CHANNEL_COMMUNITY_GUIDELINES_DRAWER));
  await expect(guidelinesDrawer).toBeVisible();
};

export const expectToNotSeeCommunityGuidelinesDrawer = async () => {
  const guidelinesDrawer = element(by.id(CREATE_CHANNEL_COMMUNITY_GUIDELINES_DRAWER));
  await expect(guidelinesDrawer).not.toBeVisible();
};

export const expectToSeeChooseFromLibraryOption = async () => {
  const chooseFromLib = element(by.text('Choose from Library...'));
  await expect(chooseFromLib).toBeVisible();
};

export const expectToNotSeeChooseFromLibraryOption = async () => {
  const chooseFromLib = element(by.text('Choose from Library...'));
  await expect(chooseFromLib).not.toBeVisible();
};

export const expectToSeeChannelOnChannelsList = async (channelName) => {
  const channel = element(by.text(channelName).withAncestor(by.id(CHANNELS_CHANNELS_LIST_ITEM)));
  await expect(channel).toBeVisible();
};

export const expectToNotSeeChannelOnChannelsList = async (channelName) => {
  const channel = element(by.text(channelName).withAncestor(by.id(CHANNELS_CHANNELS_LIST_ITEM)));
  await expect(channel).not.toExist();
};

export const expectToBeOnChannelDetailsScreen = async () => {
  const detailsScreen = element(by.id(CHANNEL_DETAILS_SCREEN_OWNER));
  await expect(detailsScreen).toBeVisible();
};

export const expectToBeOnChannelDetailsScreenAsMember = async () => {
  const detailsScreen = element(by.id(CHANNEL_DETAILS_SCREEN_MEMBER));
  await expect(detailsScreen).toBeVisible();
};

export const expectToBeOnChannelsList = async () => {
  const channelsList = element(by.id(CHANNELS_LIST));
  await wait(200);
  await expect(channelsList).toBeVisible();
};

export const expectToSeeWelcomeToChannelCard = async () => {
  const welcomeCard = element(by.id(CHANNEL_WELCOME_CARD));
  await expect(welcomeCard).toBeVisible();
};

export const expectToSeeCustomizeChannelCard = async () => {
  const customizeCard = element(by.id(CHANNEL_CUSTOMIZE_CARD));
  await expect(customizeCard).toBeVisible();
};

export const expectToNotSeeWelcomeToChannelCard = async () => {
  const customizeCard = element(by.id(CHANNEL_WELCOME_CARD));
  await expect(customizeCard).not.toBeVisible();
};

export const expectToNotSeeCustomizeChannelCard = async () => {
  const customizeCard = element(by.id(CHANNEL_CUSTOMIZE_CARD));
  await expect(customizeCard).not.toBeVisible();
};

export const expectToSeeInviteFriendsCard = async () => {
  const inviteFriendsCard = element(by.id(CHANNEL_INVITE_CARD));
  await expect(inviteFriendsCard).toBeVisible();
};

export const expectToNotSeeInviteFriendsCard = async () => {
  const inviteFriendsCard = element(by.id(CHANNEL_INVITE_CARD));
  await expect(inviteFriendsCard).not.toBeVisible();
};

export const tapXOnWelcomeCard = async () => {
  const xButton = element(by.id(CHANNEL_CANCEL_CARD_BUTTON).withAncestor(by.id(CHANNEL_WELCOME_CARD)));
  await xButton.tap();
};

export const tapXOnCustomizeCard = async () => {
  const xButton = element(by.id(CHANNEL_CANCEL_CARD_BUTTON).withAncestor(by.id(CHANNEL_CUSTOMIZE_CARD)));
  await xButton.tap();
};

export const tapXOnInviteFriendsCard = async () => {
  const xButton = element(by.id(CHANNEL_CANCEL_CARD_BUTTON).withAncestor(by.id(CHANNEL_INVITE_CARD)));
  await xButton.tap();
};

export const expectToSeePostOnChannel = async (postText) => {
  const channelPost = element(by.text(postText).withAncestor(by.id(CHANNEL_POST)));
  await expect(channelPost).toBeVisible();
};

export const expectToSeePumpMessageDrawer = async () => {
  const pumpDrawer = element(by.id(SEND_SENSE_DRAWER));
  await expect(pumpDrawer).toBeVisible();
};

export const expectPumpAmountToBe = async (amount) => {
  const pumpAmount = element(by.id(SEND_SENSE_DRAWER_EDIT_AMOUNT_INPUT));
  await expect(pumpAmount).toHaveText(amount);
};

export const expectToSeePumpedAmountUnderPost = async (postText, pumpAmount) => {
  await expect(
    element(
      by
        .id(CHANNEL_PUMP_MESSAGE_AMOUNT)
        .and(by.text(pumpAmount))
        .withAncestor(by.id(CHANNEL_POST).withDescendant(by.text(postText))),
    ),
  ).toBeVisible();
};

export const expectToBeOnPostReply = async (postText) => {
  const header = element(by.id(CHANNEL_REPLIES_HEADER));
  const headerDetails = element(by.text(postText).withAncestor(by.id(CHANNEL_POST)));
  await expect(header).toBeVisible();
  await expect(headerDetails).toBeVisible();
};

export const expectToSeePostActionsOverlayOnMyPostedMessage = async () => {
  const copyButton = element(by.text('Copy Message'));
  const deleteButton = element(by.text('Delete Message'));
  const replyButton = element(by.text('Reply to Post'));
  const editButton = element(by.text('Edit Message'));
  await expect(copyButton).toBeVisible();
  await expect(deleteButton).toBeVisible();
  await expect(replyButton).toBeVisible();
  await expect(editButton).toBeVisible();
};

export const expectToNotSeePostActionsOverlayOnMyPostedMessage = async () => {
  const copyButton = element(by.text('Copy Message'));
  const deleteButton = element(by.text('Delete Message'));
  const replyButton = element(by.text('Reply to Post'));
  const editButton = element(by.text('Edit Message'));
  await expect(copyButton).not.toBeVisible();
  await expect(deleteButton).not.toBeVisible();
  await expect(replyButton).not.toBeVisible();
  await expect(editButton).not.toBeVisible();
};

export const expectToSeePostActionsOverlayOnPostedMessage = async () => {
  const copyButton = element(by.text('Copy Message'));
  const replyButton = element(by.text('Reply to Post'));
  const reportButton = element(by.text('Report Post'));
  await expect(copyButton).toBeVisible();
  await expect(replyButton).toBeVisible();
  await expect(reportButton).toBeVisible();
};

export const expectToNotSeePostActionsOverlayOnPostedMessage = async () => {
  const copyButton = element(by.text('Copy Message'));
  const replyButton = element(by.text('Reply to Post'));
  const reportButton = element(by.text('Report Post'));
  await expect(copyButton).not.toBeVisible();
  await expect(replyButton).not.toBeVisible();
  await expect(reportButton).not.toBeVisible();
};

export const expectToSeeDeleteMessageDrawer = async () => {
  const deleteDrawer = element(by.id(CHANNEL_DELETE_DRAWER));
  await expect(deleteDrawer).toBeVisible();
};

export const expectToNotSeeTextInput = async () => {
  const textInput = element(by.id(SENSE_INPUT_TEXTAREA));
  await expect(textInput).not.toExist();
};

export const expectToSeeAdminsOnlyBanner = async () => {
  await expect(element(by.id(CHANNEL_ADMIN_ONLY_INFO_BANNER))).toBeVisible();
  await expect(element(by.id(CHANNEL_ADMIN_ONLY_INFO_BANNER_TEXT))).toBeVisible();
};

export const tapOnAdminNameOnAdminOnlyBanner = async (senseID) => {
  const adminName = element(by.text(senseID).withAncestor(by.id(CHANNEL_ADMIN_ONLY_INFO_BANNER)));
  await adminName.tap();
};

export const expectChannelSubheaderBe = async (channelName, channelSubheader) => {
  const channelListItem = element(
    by.text(channelSubheader).withAncestor(by.id(CHANNELS_CHANNELS_LIST_ITEM).withDescendant(by.text(channelName))),
  );
  await expect(channelListItem).toBeVisible();
};

export const expectToNotSeePostText = async (postText) => {
  const post = element(by.text(postText).withAncestor(by.id(CHANNEL_POST)));
  await expect(post).not.toBeVisible();
};

export const expectAdminsOnlyIsDisplayedOnChannelDetails = async () => {
  await expect(
    element(by.text(`${i18n.t('channelDetails.adminsOnly')}`).withAncestor(by.id(CHANNEL_DETAILS_WHO_CAN_POST))),
  ).toBeVisible();
};

export const expectEveryoneIsDisplayedOnChannelDetails = async () => {
  await expect(
    element(by.text(`${i18n.t('channelDetails.everybody')}`).withAncestor(by.id(CHANNEL_DETAILS_WHO_CAN_POST))),
  ).toBeVisible();
};

export const expectToSeeRepliesAmountUnderPost = async (postMessage, repliesAmount) => {
  await expect(
    element(by.id(CHANNEL_POST_REPLIES_COUNT).withAncestor(by.id(CHANNEL_POST).withDescendant(by.text(postMessage)))),
  ).toHaveText(repliesAmount);
};
