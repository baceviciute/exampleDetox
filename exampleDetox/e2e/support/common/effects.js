export const expectToSeeText = async (text) => {
  const visibleText = element(by.text(text));
  await expect(visibleText).toBeVisible();
};
