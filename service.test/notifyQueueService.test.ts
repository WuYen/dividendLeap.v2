import { IAuthor } from "../model/Author";
import { ILineToken, TokenLevel } from "../model/lineToken";
import { IPostInfo } from "../model/PostInfo";
import { mainProcess } from "../service/notifyQueueService"; // Adjust the import according to your module structure

jest.mock("../service/queueTestRun", () => {
  return {
    ...jest.requireActual("../service/queueTestRun"),
    sendNotificationWithDelay: jest.fn(),
  };
});

describe("mainProcess", () => {
  const newPosts: IPostInfo[] = [
    {
      tag: "stock",
      title: "1 台積電漲停！散戶嗨翻：護盤有功",
      href: "stock/M.1672225269.A.102",
      author: "pttTestAuthor",
      date: "2023-10-04 23:54:09",
      batchNo: 12345,
      id: 123456,
    },
    {
      tag: "stock",
      title: "2 鴻海大跌！郭台銘：護盤沒用，要靠自身努力",
      href: "stock/M.1672225269.A.103",
      author: "anotherAuthor",
      date: "2023-10-04 23:55:09",
      batchNo: 12346,
      id: 123457,
    },
  ];

  const subscribeAuthors: IAuthor[] = [
    {
      name: "pttTestAuthor",
      likes: 100,
      dislikes: 50,
    },
  ];

  const users: ILineToken[] = [
    {
      channel: "A-TEST+STAND",
      token: "myToken1",
      updateDate: "2023-10-05 00:00:00",
      notifyEnabled: true,
      tokenLevel: [TokenLevel.Test, TokenLevel.Standard],
      favoritePosts: [],
    },
    {
      channel: "B-STAND",
      token: "myToken2",
      updateDate: "2023-10-05 00:00:00",
      notifyEnabled: true,
      tokenLevel: [TokenLevel.Standard],
      favoritePosts: [],
    },
    {
      channel: "C-BASIC",
      token: "myToken3",
      updateDate: "2023-10-05 00:00:00",
      notifyEnabled: true,
      tokenLevel: [TokenLevel.Basic],
      favoritePosts: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call sendNotificationWithDelay the correct number of times", async () => {
    await mainProcess(newPosts, users, subscribeAuthors);

    const sendNotificationWithDelay = require("../service/queueTestRun").sendNotificationWithDelay;

    // Verify that sendNotificationWithDelay was called 6 times
    expect(sendNotificationWithDelay).toHaveBeenCalledTimes(6);

    // Verify the calls for user A (test + standard)
    expect(sendNotificationWithDelay).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.objectContaining({ channel: "A-TEST+STAND" }),
        payload: expect.objectContaining({ level: TokenLevel.Test }),
      })
    );
    expect(sendNotificationWithDelay).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.objectContaining({ channel: "A-TEST+STAND" }),
        payload: expect.objectContaining({ level: TokenLevel.Standard }),
      })
    );

    // Verify the calls for user B (standard)
    expect(sendNotificationWithDelay).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.objectContaining({ channel: "B-STAND" }),
        payload: expect.objectContaining({ level: TokenLevel.Standard }),
      })
    );
    expect(sendNotificationWithDelay).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.objectContaining({ channel: "B-STAND" }),
        payload: expect.objectContaining({ level: TokenLevel.Standard }),
      })
    );

    // Verify the calls for user C (basic)
    expect(sendNotificationWithDelay).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.objectContaining({ channel: "C-BASIC" }),
        payload: expect.objectContaining({ level: TokenLevel.Basic }),
      })
    );
    expect(sendNotificationWithDelay).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.objectContaining({ channel: "C-BASIC" }),
        payload: expect.objectContaining({ level: TokenLevel.Basic }),
      })
    );
  });
});
