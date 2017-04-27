import { BookShelfPage } from './app.po';

describe('book-shelf App', () => {
  let page: BookShelfPage;

  beforeEach(() => {
    page = new BookShelfPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
