import { VeplexV001Page } from './app.po';

describe('veplex-v001 App', function() {
  let page: VeplexV001Page;

  beforeEach(() => {
    page = new VeplexV001Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
