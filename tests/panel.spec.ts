import { test, expect } from '@grafana/plugin-e2e';

test('should display "Please provide a source URL" for a new panel', async ({ panelEditPage }) => {
  await panelEditPage.setVisualization('IFrame');
  await expect(panelEditPage.panel.locator).toContainText('Please provide a source URL');
});

test('should have "Empty" panel with proper message', async ({ gotoDashboardPage, dashboardPage }) => {
  await gotoDashboardPage({ uid: 'fdtfzttfbzv9ca' });
  await expect(dashboardPage.getPanelByTitle('Empty').locator).toBeVisible();
  await expect(dashboardPage.getPanelByTitle('Empty').locator).toContainText('Please provide a source URL');
});

test('should have "Robots" panel with proper content', async ({ gotoDashboardPage, dashboardPage }) => {
  await gotoDashboardPage({ uid: 'fdtfzttfbzv9ca' });
  const panel = dashboardPage.getPanelByTitle('Robots').locator;
  await expect(panel).toBeVisible();

  const iframe = panel.locator('iframe[title="IFrame"]');
  await expect(iframe).toHaveAttribute('src', '/robots.txt');

  const iframeContent = iframe.contentFrame();
  await expect(iframeContent.locator('body')).toContainText('User-agent: *');
});

test('should have "Variables" panel with proper content', async ({ gotoDashboardPage, dashboardPage }) => {
  await gotoDashboardPage({ uid: 'fdtfzttfbzv9ca' });
  const panel = dashboardPage.getPanelByTitle('Variables').locator;
  await expect(panel).toBeVisible();

  const iframe = panel.locator('iframe[title="IFrame"]');
  await expect(iframe).toHaveAttribute('src', '/robots.txt?env=dev&dbid=fdtfzttfbzv9ca');

  const iframeContent = iframe.contentFrame();
  await expect(iframeContent.locator('body')).toContainText('User-agent: *');
});
