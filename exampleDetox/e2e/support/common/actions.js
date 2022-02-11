import { BACK_BUTTON, CHAT_MESSAGE } from '../../../src/ui/testid-constants';

export const launchNewAppInstanceWithPermissions = async () => {
  await device.launchApp({
    permissions: { contacts: 'YES', notifications: 'YES', camera: 'YES', photos: 'YES' },
    newInstance: true,
  });
};

export const reloadApp = async () => {
  await device.reloadReactNative();
};

export const uninstallAndInstallApp = async () => {
  await device.uninstallApp();
  await device.installApp();
};

export const wait = async (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export let getSenseID = () => {
  let date = `${Date.now()}`;
  return date.slice(2, 13);
};

export const getRandomPhoneNumber = () => {
  let numberStarting = '2025554';
  let numberEnding = '';
  for (let i = 0; i < 3; i++) {
    numberEnding += Math.floor(Math.random() * 10);
  }
  return numberStarting + numberEnding;
};

export const pressBack = async () => {
  if (device.getPlatform() === 'android') {
    await device.pressBack();
  } else {
    await element(by.id(BACK_BUTTON)).atIndex(0).tap();
  }
};

export const tapOnMessageToCancelActionsOverlay = async () => {
  const message = element(by.id(CHAT_MESSAGE)).atIndex(0);
  await message.tap();
};

export const tapCancelByText = async () => {
  await element(by.text('Cancel')).tap();
};

export const tapOKByText = async () => {
  await element(by.text('OK')).tap();
};
