import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage, AsideBarPage } from '../../page-objects/jhi-page-objects';

import { BedComponentsPage, BedDeleteDialog, BedUpdatePage } from './bed.page-object';

const expect = chai.expect;

describe('Bed e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let asideBarPage: AsideBarPage;
  let bedComponentsPage: BedComponentsPage;
  let bedUpdatePage: BedUpdatePage;
  let bedDeleteDialog: BedDeleteDialog;

  before(async () => {
    // await browser.get('/');
    navBarPage = new NavBarPage(true);
    asideBarPage = new AsideBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('appadmin', 'password1');
    await browser.wait(ec.visibilityOf(asideBarPage.entityMenu), 5000);
  });

  it('should load Beds', async () => {
    await asideBarPage.goToEntity('bed');
    bedComponentsPage = new BedComponentsPage();
    await browser.wait(ec.visibilityOf(bedComponentsPage.title), 5000);
    expect(await bedComponentsPage.getTitle()).to.eq('iconnectSampleAppLabApp.bed.home.title');
    await browser.wait(ec.or(ec.visibilityOf(bedComponentsPage.entities), ec.visibilityOf(bedComponentsPage.noResult)), 1000);
  });

  it('should load create Bed page', async () => {
    await bedComponentsPage.clickOnCreateButton();
    bedUpdatePage = new BedUpdatePage();
    expect(await bedUpdatePage.getPageTitle()).to.eq('iconnectSampleAppLabApp.bed.home.createOrEditLabel');
    await bedUpdatePage.cancel();
  });

  it('should create and save Beds', async () => {
    const nbButtonsBeforeCreate = await bedComponentsPage.countDeleteButtons();

    await bedComponentsPage.clickOnCreateButton();

    await promise.all([
      bedUpdatePage.setBedReferenceIdInput('bedReferenceId'),
      bedUpdatePage.setBedNameInput('bedName'),
      bedUpdatePage.setWardAllocationDateInput('2000-12-31'),
      bedUpdatePage.wardSelectLastOption()
    ]);

    expect(await bedUpdatePage.getBedReferenceIdInput()).to.eq(
      'bedReferenceId',
      'Expected BedReferenceId value to be equals to bedReferenceId'
    );
    expect(await bedUpdatePage.getBedNameInput()).to.eq('bedName', 'Expected BedName value to be equals to bedName');
    expect(await bedUpdatePage.getWardAllocationDateInput()).to.eq(
      '2000-12-31',
      'Expected wardAllocationDate value to be equals to 2000-12-31'
    );

    await bedUpdatePage.save();
    expect(await bedUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await bedComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Bed', async () => {
    const nbButtonsBeforeDelete = await bedComponentsPage.countDeleteButtons();
    await bedComponentsPage.clickOnLastDeleteButton();

    bedDeleteDialog = new BedDeleteDialog();
    expect(await bedDeleteDialog.getDialogTitle()).to.eq('iconnectSampleAppLabApp.bed.delete.question');
    await bedDeleteDialog.clickOnConfirmButton();

    expect(await bedComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
