import subscribeService from '../service/subscribeService';

describe('test Subscribe stock', () => {
  var subscribeNo = ['0056', '3105'];
  it('should find', () => {
    var title = '3105 穩懋 豬飼料走跌 多';
    expect(subscribeService.isSubscribedPost(title, subscribeNo)).toBeTruthy();
  });

  it('should find', () => {
    var title = 'ffff0056good';
    expect(subscribeService.isSubscribedPost(title, subscribeNo)).toBeTruthy();
  });

  it('should not find', () => {
    var title = '穩懋 豬飼料走跌 多';
    expect(subscribeService.isSubscribedPost(title, subscribeNo)).toBeFalsy();
  });
});
