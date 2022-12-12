/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test'
import * as dotenv from 'dotenv'
dotenv.config()

test('test', async ({ page }) => {
  const userName = process.env.REACT_APP_USER_NAME || ''
  const password = process.env.REACT_APP_PASSWORD || ''

  await page.goto('http://localhost:3010/')
  await page.getByRole('link', { name: 'ログイン' }).click()
  await page.getByLabel('ログインID').click()
  await page.getByLabel('ログインID').fill(userName)
  await page.getByLabel('ログインID').press('Tab')
  await page.getByLabel('パスワード\n    パスワードの再設定').fill(password)
  await page.getByRole('button', { name: 'ログイン' }).click()
  await page.locator('#top-menu').getByRole('link', { name: 'プロジェクト' }).click()
  await page.getByRole('link', { name: 'test' }).click()
  await page.locator('#main-menu').getByRole('link', { name: 'チケット' }).click()
  await page.getByRole('link', { name: '新しいチケット' }).click()
  await page.getByLabel('題名 *').fill('PlayWright test')
  await page.getByLabel('説明').click()
  await page.getByLabel('説明').fill('PlayWright test')
  await page.locator('input[name="commit"]').click()
  await page.waitForTimeout(3000) // 確認様に3秒待機
  const actual = await page.locator('h2').first().innerText()
  console.log('actual:', actual)
  await expect(actual).toContain('テスト')
})
