import {
  createAndOnboardUserViaApi,
  createChannelByOtherMemberViaApi,
  getChannelIdByName,
  getCurrentSessionTokenViaApi,
  getUniqueIdBySenseId,
  postTextBy,
  removeUsedPhoneNumbersFromDB,
} from '../../support/common/api';
import {
  getRandomPhoneNumber,
  getSenseID,
  launchNewAppInstanceWithPermissions,
  pressBack,
  reloadApp,
  tapOnMessageToCancelActionsOverlay,
  uninstallAndInstallApp,
} from '../../support/common/actions';
import { auth } from '../../support/common/auth';
import {
  expectChannelSubheaderBe,
  expectPumpAmountToBe,
  expectToBeOnChannelDetailsScreen,
  expectToBeOnChannelsList,
  expectToBeOnCreateChannelScreen,
  expectToBeOnPostReply,
  expectToNotSeePostActionsOverlayOnMyPostedMessage,
  expectToNotSeeCustomizeChannelCard,
  expectToNotSeeInviteFriendsCard,
  expectToNotSeePostText,
  expectToNotSeeWelcomeToChannelCard,
  expectToSeeChannelOnChannelsList,
  expectToSeePostActionsOverlayOnMyPostedMessage,
  expectToSeeCustomizeChannelCard,
  expectToSeeDeleteMessageDrawer,
  expectToSeeEmptyChannelsListScreen,
  expectToSeeInviteFriendsCard,
  expectToSeePostOnChannel,
  expectToSeePumpedAmountUnderPost,
  expectToSeePumpMessageDrawer,
  expectToSeeRepliesAmountUnderPost,
  expectToSeeWelcomeToChannelCard,
  tapXOnCustomizeCard,
  tapXOnInviteFriendsCard,
  tapXOnWelcomeCard,
  expectToSeePostActionsOverlayOnPostedMessage,
  expectToNotSeePostActionsOverlayOnPostedMessage,
} from '../../support/channels/effects';
import {
  enterPumpAmountOf,
  joinChannel,
  searchChannelByName,
  slideRightToPumpChannelPost,
  tapChannelsHeader,
  tapDiscoverOnChannelsList,
  tapCustomizeChannelCard,
  tapEditAmountOnPumpDrawer,
  tapOnChannelPost,
  tapPumpIconOnPost,
  tapChannelOnChannelsByName,
  postReply,
  longPressOnChannelPost,
  tapReplyToPostOnActionOverlay,
  tapEditOnActionOverlay,
  tapDeleteOnDeleteMessageDrawer,
  tapConfirmOnDeleteMessageDrawer,
  tapStartAChannelButton,
  tapReplyOnChannelPost,
  navigateToChannels,
} from '../../support/channels/actions';
import {
  sendTextMessage,
  tapDeleteMessageOnActionOverlay,
  tapDeleteOnDeleteModal,
  tapSendButton,
  typeMessageText,
} from '../../support/chats/actions';
import { expectToNotSeeMessage } from '../../support/chats/effects';
import { expectToSeeText } from '../../support/common/effects';
import { createChannelName, createChannelViaApi } from '../../support/channels/api';
import i18n from 'i18n-js';
import en from '../../../src/i18n/locales/en.json';
i18n.translations = { en: en.translation };
import { CHANNELS_LIST } from '../../../src/ui/testid-constants';

jest.retryTimes(2);
describe('Channels tab', () => {
  //this is used for log in
  const user1 = {
    phoneNumber: getRandomPhoneNumber(),
    senseID: `a${getSenseID()}`,
    token: '',
    uniqueID: '',
  };
  const user2 = {
    phoneNumber: getRandomPhoneNumber(),
    senseID: `b${getSenseID()}`,
    token: '',
    uniqueID: '',
  };

  beforeAll(async () => {
    await removeUsedPhoneNumbersFromDB();
    await createAndOnboardUserViaApi(user2.phoneNumber, user2.senseID);
    await launchNewAppInstanceWithPermissions();
    await auth(user1.phoneNumber, user1.senseID);
    user1.token = await getCurrentSessionTokenViaApi(user1.senseID);
    user2.uniqueID = await getUniqueIdBySenseId(user2.senseID);
  });

  afterEach(async () => {
    await reloadApp();
  });

  afterAll(async () => {
    await uninstallAndInstallApp();
  });

  beforeEach(async () => {
    await navigateToChannels();
  });

  describe('channels section navigation', () => {
    it("member should see empty screen when member hasn't created or joined any channels", async () => {
      await expectToSeeEmptyChannelsListScreen();
    });

    it("member should be navigated to create channel screen when user taps 'Start a Channel' button on an empty channels screen", async () => {
      await tapStartAChannelButton();
      await expectToBeOnCreateChannelScreen();
      await pressBack();
    });

    it('member should see a channel on channels list when member creates a channel', async () => {
      const channelName = `z${createChannelName()}`;

      await createChannelViaApi(user1.token, { channelName, allowPosting: true });
      await expectToSeeChannelOnChannelsList(channelName);
    });

    it('member should see a channel on channels list when member joins a channel', async () => {
      const channelName = `x${createChannelName()}`;

      await createChannelByOtherMemberViaApi(channelName);
      await tapDiscoverOnChannelsList();
      await searchChannelByName(channelName);
      await joinChannel(channelName);
      await pressBack();
      await expectToSeeChannelOnChannelsList(channelName);
    });

    it('member should see last post text on channel item on channels list', async () => {
      const channelName = `c${createChannelName()}`;
      const postText = 'Post-' + Date.now();
      const channelSubheader = postText;

      await createChannelViaApi(user1.token, { channelName, allowPosting: true });
      await tapChannelOnChannelsByName(channelName);
      await sendTextMessage(postText);
      await pressBack();
      await expectChannelSubheaderBe(channelName, channelSubheader);
    });

    it("member should see 'This is the start of your channel' message when member created a channel and no posts are posted", async () => {
      const channelName = `v${createChannelName()}`;
      const channelSubheader = `${i18n.t('channels.startChannel')}`;

      await createChannelViaApi(user1.token, { channelName, allowPosting: true });
      await expectChannelSubheaderBe(channelName, channelSubheader);
    });

    it('member should be able see 11 channels on channels channels list', async () => {
      const channelNames = [];
      for (let i = 0; i < 11; i++) {
        let channelName = createChannelName() + i;
        channelNames.push(channelName);
        await createChannelViaApi(user1.token, { channelName, allowPosting: true });
      }

      for (let i = 10; i >= 0; i--) {
        try {
          await expectToSeeChannelOnChannelsList(channelNames[i]);
        } catch (err) {
          await waitFor(element(by.text(channelNames[i])))
            .toBeVisible()
            .whileElement(by.id(CHANNELS_LIST))
            .scroll(50, 'down');
        }
      }
    });
  });

  describe('created channel', () => {
    const channel = {
      name: `b${createChannelName()}`,
      id: '',
    };

    beforeAll(async () => {
      await createChannelViaApi(user1.token, { channelName: channel.name, allowPosting: true });
      channel.id = await getChannelIdByName(channel.name);
    });

    beforeEach(async () => {
      await tapChannelOnChannelsByName(channel.name);
    });

    describe('navigation', () => {
      it('member should be navigated to joined/created Channels list when user taps back button', async () => {
        await pressBack();
        await expectToBeOnChannelsList();
      });

      it('member should be navigated to Channel Details when member taps on channel header', async () => {
        await tapChannelsHeader();
        await expectToBeOnChannelDetailsScreen();
      });

      it('member should see 3 cards when member creates a new channel', async () => {
        await expectToSeeWelcomeToChannelCard();
        await expectToSeeCustomizeChannelCard();
        await expectToSeeInviteFriendsCard();
      });

      it("member should be navigated to Channel Details when member taps on 'Customize your channel in your channel settings.' card", async () => {
        await tapCustomizeChannelCard();
        await expectToBeOnChannelDetailsScreen();
      });

      it("member should not see cards when member taps 'x' button", async () => {
        await tapXOnWelcomeCard();
        await tapXOnCustomizeCard();
        await tapXOnInviteFriendsCard();
        await expectToNotSeeWelcomeToChannelCard();
        await expectToNotSeeCustomizeChannelCard();
        await expectToNotSeeInviteFriendsCard();
      });
    });

    describe('posting', () => {
      it('member should be able to post a text message', async () => {
        const postText = `Post - ${Date.now()}`;

        await sendTextMessage(postText);
        await expectToSeePostOnChannel(postText);
      });
    });

    describe('pump drawer - own post', () => {
      it('member should see pump message drawer when member taps sense icon on post', async () => {
        const postText = 'Post-' + Date.now();

        await sendTextMessage(postText);
        await tapPumpIconOnPost(postText);
        await expectToSeePumpMessageDrawer();
      });

      it("member should see 'You can not pump your own message.' error message when member tries to pump own message", async () => {
        const postText = 'Post-' + Date.now();

        await sendTextMessage(postText);
        await tapPumpIconOnPost(postText);
        await slideRightToPumpChannelPost();
        await expectToSeeText(`${i18n.t('transactions.pumpOwnMessage')}`);
      });
    });

    describe('pump drawer - other member post', () => {
      const postText = `Member post-${Date.now()}a`;

      beforeAll(async () => {
        await postTextBy(channel.id, user2.uniqueID, postText);
      });

      it("member should see '12' instead of '1' when member taps 'Edit Amount' and enters '12' in amount", async () => {
        const pumpAmount = '12';

        await tapPumpIconOnPost(postText);
        await tapEditAmountOnPumpDrawer();
        await enterPumpAmountOf(pumpAmount);
        await expectPumpAmountToBe(pumpAmount);
      });

      it("member should see 'You do not have enough Sense. Please try again' error message when member taps 'Edit Amount', enters '1222' in amount and slides to the right", async () => {
        const pumpAmount = '1222';

        await tapPumpIconOnPost(postText);
        await tapEditAmountOnPumpDrawer();
        await enterPumpAmountOf(pumpAmount);
        await slideRightToPumpChannelPost();
        await expectToSeeText(`${i18n.t('transactions.notEnough')}`);
      });

      it('member should see 3 as a pumped amount under a post when member pumps a post with 3 sense', async () => {
        const pumpAmount = '3';

        await tapPumpIconOnPost(postText);
        await tapEditAmountOnPumpDrawer();
        await enterPumpAmountOf(pumpAmount);
        await slideRightToPumpChannelPost();
        await expectToSeePumpedAmountUnderPost(postText, pumpAmount);
      });
    });

    describe('reply - own post', () => {
      it('member should be navigated to reply screen when member taps on a post', async () => {
        const postText = 'Post-' + Date.now();

        await sendTextMessage(postText);
        await tapOnChannelPost(postText);
        await expectToBeOnPostReply(postText);
      });

      it('member should be able to post text as a reply on own post', async () => {
        const postText = 'Post-' + Date.now();
        const replyText = 'Reply-' + Date.now();

        await sendTextMessage(postText);
        await tapOnChannelPost(postText);
        await postReply(replyText);
        await expectToSeePostOnChannel(replyText);
      });

      it("member should see '1' instead of 'Reply' under a post on channel when member replies to own post", async () => {
        const postText = 'Post-' + Date.now();
        const replyText = 'Reply-' + Date.now();
        const repliesAmount = '1';

        await sendTextMessage(postText);
        await tapOnChannelPost(postText);
        await postReply(replyText);
        await pressBack();
        await expectToSeeRepliesAmountUnderPost(postText, repliesAmount);
      });

      it("member should be navigated to reply screen when member taps on 'Reply' under a post on channel", async () => {
        const postText = 'Post-' + Date.now();

        await sendTextMessage(postText);
        await tapReplyOnChannelPost(postText);
        await expectToBeOnPostReply(postText);
      });
    });

    describe('action sheet - own post', () => {
      it('member should see copy/delete/reply/edit action sheet when member long press on own post', async () => {
        const postText = 'Post-' + Date.now();

        await sendTextMessage(postText);
        await longPressOnChannelPost(postText);
        await expectToSeePostActionsOverlayOnMyPostedMessage();
      });

      it('member should dismiss copy/delete/reply/edit action sheet when member taps cancel', async () => {
        const postText = 'Post-' + Date.now();

        await sendTextMessage(postText);
        await longPressOnChannelPost(postText);
        await tapOnMessageToCancelActionsOverlay();
        await expectToNotSeePostActionsOverlayOnMyPostedMessage();
      });

      it('member should not see message when member taps delete', async () => {
        const postText = 'Post-' + Date.now();

        await sendTextMessage(postText);
        await longPressOnChannelPost(postText);
        await tapDeleteMessageOnActionOverlay();
        await tapDeleteOnDeleteModal();
        await expectToNotSeeMessage(postText);
      });

      it('member should be navigated to reply screen when member taps reply', async () => {
        const postText = 'Post-' + Date.now();

        await sendTextMessage(postText);
        await longPressOnChannelPost(postText);
        await tapReplyToPostOnActionOverlay();
        await expectToBeOnPostReply(postText);
      });

      it('member should be able to edit post when member taps edit', async () => {
        const postText = 'Post-' + Date.now();

        await sendTextMessage(postText);
        await longPressOnChannelPost(postText);
        await tapEditOnActionOverlay();
        await typeMessageText(' - edited');
        await tapSendButton();
        await expectToSeePostOnChannel(`${postText} - edited`);
      });
    });

    describe("action sheet - other member's post", () => {
      const postText = `Member post-${Date.now()}c`;

      beforeAll(async () => {
        await postTextBy(channel.id, user2.uniqueID, postText);
      });

      it("member should see copy/delete/reply action sheet when member long press on other member's post", async () => {
        await longPressOnChannelPost(postText);
        await expectToSeePostActionsOverlayOnPostedMessage();
      });

      it('member should dismiss copy/delete/reply/edit action sheet when member taps cancel', async () => {
        await longPressOnChannelPost(postText);
        await tapOnMessageToCancelActionsOverlay();
        await expectToNotSeePostActionsOverlayOnPostedMessage();
      });

      it('member should be navigated to reply screen when member taps reply', async () => {
        await longPressOnChannelPost(postText);
        await tapReplyToPostOnActionOverlay();
        await expectToBeOnPostReply(postText);
      });

      it("member should see delete/mute/delete and mute action sheet when member long press on other member's post and taps delete message", async () => {
        await longPressOnChannelPost(postText);
        await tapDeleteMessageOnActionOverlay();
        await expectToSeeDeleteMessageDrawer();
      });

      it("member should not see message when member taps delete message, chooses delete message option and taps 'Confirm'", async () => {
        await longPressOnChannelPost(postText);
        await tapDeleteMessageOnActionOverlay();
        await tapDeleteOnDeleteMessageDrawer();
        await tapConfirmOnDeleteMessageDrawer();
        await expectToNotSeePostText(postText);
      });
    });
  });
});
