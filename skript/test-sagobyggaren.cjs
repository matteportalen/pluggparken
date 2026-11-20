const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const assert = require('node:assert/strict');
const url = process.env.TEST_URL || 'http://127.0.0.1:8765/sagobyggaren/';
const ready = p => p.waitForFunction(() => window.__sb);
const decode = p => p.locator('#pages img, #bok img').evaluateAll(async images => {
  await Promise.all(images.map(img => { img.loading = 'eager'; return img.decode(); }));
});
(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 844 } });
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(url); await ready(page);
      assert.equal(await page.locator('.story-choice').count(), 25);
      assert.deepEqual(await page.locator('.series-heading').allTextContents(), ['Vardag', 'Fabler', 'Fantasi och mysterier']);
      for (const [id, count] of [['guldringen', 4], ['manen', 3]]) {
        await page.locator(`[data-series="${id}"]`).click();
        assert.equal(await page.locator('textarea').count(), count);
        assert(await page.locator('#finish').isDisabled());
        await page.locator('#text-0').fill('På vägen hem upptäckte barnen något oväntat.');
        await page.reload(); await ready(page);
        await page.locator(`[data-series="${id}"]`).click();
        assert.equal(await page.locator('#text-0').inputValue(), 'På vägen hem upptäckte barnen något oväntat.');
        for (let i = 1; i < count - 1; i++) await page.locator(`#text-${i}`).fill('De undrade vad de skulle göra.');
        assert(await page.locator('#finish').isDisabled(), 'Every panel needs its own text');
        await page.locator(`#text-${count - 1}`).fill('Till slut vågade de fråga.');
        await page.locator('#help').click();
        assert.match(await page.locator('#helpText').innerText(), /Slutet|Ditt slut/);
        assert(!/undefined/.test(await page.locator('#helpText').innerText()));
        await decode(page);
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        await page.screenshot({ path: `/tmp/story-write-${id}-${width}.png`, fullPage: true });
        await page.locator('#finish').click();
        assert(await page.locator('#book').isVisible());
        assert.equal(await page.locator('.story-book-page').count(), count);
        await page.locator('#title').fill('Min egen berättelse');
        const savedCount = await page.evaluate(() => __sb.data.sagor.length);
        await page.locator('#edit').click();
        await page.locator(`#text-${count - 1}`).fill('Alla lyssnade och hjälpte till.');
        await page.locator('#finish').click();
        assert.equal(await page.evaluate(() => __sb.data.sagor.length), savedCount);
        await page.evaluate(() => { window.print = () => { window.printCalled = true; }; });
        await page.locator('#print').click();
        await page.waitForFunction(() => window.printCalled);
        await page.emulateMedia({ media: 'print' });
        await page.screenshot({ path: `/tmp/story-print-${id}-${width}.png`, fullPage: true });
        await page.emulateMedia({ media: 'screen' });
        await page.reload(); await ready(page);
        await page.locator('#mine').click(); await page.locator('[data-open="0"]').click();
        assert.equal(await page.locator('.story-book-page').count(), count);
        assert.match(await page.locator('#bok').innerText(), /Alla lyssnade och hjälpte till/);
        await page.locator('#new').click();
      }
      const series = await page.evaluate(() => __sb.SERIES.map(s => ({ id: s.id, count: s.alts.length, cols: s.cols || 3 })));
      for (const { id, count, cols } of series) {
        await page.evaluate(id => __sb.openSeries(id), id);
        await decode(page);
        assert.equal(await page.locator('textarea').count(), count);
        const actual = await page.locator('#pages .story-painting').evaluateAll(images => images.map(img => [img.style.left, img.style.top]));
        assert.deepEqual(actual, Array.from({ length: count }, (_, i) => [`${-100 * (i % cols)}%`, `${-100 * Math.floor(i / cols)}%`]));
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        await page.locator('#back').click();
      }
      assert.deepEqual(errors, []);
      console.log(`${width}px: all 25 stories, 3/4-panel drafts, help, save/reload/edit, print and layout passed`);
      await page.close();
    }
    const page = await browser.newPage(); await page.goto(url);
    await page.evaluate(() => localStorage.setItem('mattespel-sagobyggaren-v1', JSON.stringify({
      stars: { 1: 3 }, sagor: [{ v: 'kanin', p: 'skog', e: 'nyckel', t: ['En kanin.', 'En nyckel.', 'En dörr.', 'Slut.'], d: 12345, r: 'Gammal saga', l: 1 }],
      utkast: { series: 'nyckeln', t: ['Mitt gamla utkast.', '', ''], r: '' }
    })));
    await page.reload(); await ready(page);
    await page.locator('#resumeOld').click();
    assert.equal(await page.locator('#text-0').inputValue(), 'Mitt gamla utkast.');
    assert.equal(await page.locator('textarea').count(), 3);
    await page.locator('#back').click(); await page.locator('#mine').click(); await page.locator('[data-open]').click();
    assert.match(await page.locator('#bok').innerText(), /Gammal saga/);
    assert.equal(await page.evaluate(() => __sb.data.stars[1]), 3);
    assert.equal(await page.locator('#bok p').count(), 4);
    console.log('Legacy story, draft and stars preserved');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
