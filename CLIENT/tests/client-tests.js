import { Selector } from 'testcafe';

fixture('BookVault Client Tests')
  .page('http://localhost:5500');

test('Page loads and shows Book Inventory', async t => {
  await t
    .expect(Selector('h1').innerText).eql('Book Inventory')
    .expect(Selector('body').innerText).contains('BookVault');
});

test('Books are displayed in the inventory table', async t => {
  const rows = Selector('#bookTableBody tr');

  await t
    .expect(rows.count).gt(0)
    .expect(rows.nth(0).innerText).notEql('');
});

test('Add New Book button opens the form page', async t => {
  await t
    .click(Selector('#openAddBtn'))
    .expect(Selector('#formPage').hasClass('active')).ok()
    .expect(Selector('#formPageTitle').innerText).eql('Add New Book');
});

test('View button opens details page', async t => {
  await t
    .click(Selector('.icon-action').nth(0))
    .expect(Selector('#detailsPage').hasClass('active')).ok()
    .expect(Selector('#detailsTitle').innerText).notEql('');
});

test('Edit button opens edit page', async t => {
  await t
    .click(Selector('.icon-action').nth(1))
    .expect(Selector('#formPage').hasClass('active')).ok()
    .expect(Selector('#formPageTitle').innerText).eql('Edit Book');
});

test('Delete button opens delete modal', async t => {
  await t
    .click(Selector('.icon-action').nth(2))
    .expect(Selector('#deleteModal').hasClass('hidden')).notOk();
});