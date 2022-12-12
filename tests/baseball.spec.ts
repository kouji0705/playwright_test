/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('combobox', { name: '検索' }).click();
  await page.getByRole('combobox', { name: '検索' }).fill('apple');
  await page.getByRole('combobox', { name: '検索' }).press('Enter');
  await page.getByRole('link', { name: 'Apple - 公式サイト 広告· https://www.apple.com/jp' }).click();
  await page.getByRole('list', { name: '製品' }).getByRole('listitem').filter({ hasText: 'iPhone' }).locator('img').click();

  await page.waitForTimeout(3000) // 確認様に3秒待機
  await expect(page).toHaveURL(/.*buy-iphone/);
});

