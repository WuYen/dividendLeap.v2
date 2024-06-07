import { generateVerifyCode, sendVerificationCode, verifyCodeAndGenerateToken } from '../service/authService';

// Mock the modules
jest.mock('../model/lineToken', () => ({
  LineTokenModel: {
    findOne: jest.fn(),
  },
}));

jest.mock('../service/lineService', () => ({
  sendMessage: jest.fn(),
}));
jest.mock('../utility/auth', () => ({
  sign: jest.fn(),
}));

describe('Authentication Utility Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe('generateVerifyCode', () => {
    it('should generate a 5-digit verification code', () => {
      const verifyCode = generateVerifyCode();
      expect(verifyCode).toMatch(/^\d{5}$/); // Check if the code is 5 digits
    });
  });

  describe('sendVerificationCode', () => {
    it('should send verification code successfully', async () => {
      const { LineTokenModel } = jest.requireMock('../model/lineToken');
      const lineService = jest.requireMock('../service/lineService');

      const account = 'testuser';

      // Mock findOne to return a mock user
      const mockUser = {
        channel: account,
        token: 'mock_token',
        save: jest.fn(),
      };
      LineTokenModel.findOne.mockResolvedValue(mockUser);

      // Mock lineService sendMessage
      lineService.sendMessage.mockResolvedValue('Message sent');

      // Call the function
      const result = await sendVerificationCode(account);

      // Assertions
      expect(LineTokenModel.findOne).toHaveBeenCalledWith({ channel: account });
      expect(lineService.sendMessage).toHaveBeenCalledWith(mockUser.token, expect.any(String));
      expect(result).toBe('驗證碼已發送到 Line');
    });

    it('should throw error if user not found', async () => {
      const { LineTokenModel } = jest.requireMock('../model/lineToken');
      const account = 'nonexistent_user';
      LineTokenModel.findOne.mockResolvedValue(null);

      await expect(sendVerificationCode(account)).rejects.toThrow('使用者不存在');
      expect(LineTokenModel.findOne).toHaveBeenCalledWith({ channel: account });
    });
  });

  describe('verifyCodeAndGenerateToken', () => {
    const { LineTokenModel } = jest.requireMock('../model/lineToken');
    const { sign } = jest.requireMock('../utility/auth');
    const account = 'testuser';
    const verifyCode = '12345';
    const mockUser = {
      channel: account,
      verifyCode,
      verifyCodeExpires: new Date(Date.now() + 5 * 60 * 1000),
    };

    it('should verify code and generate JWT token', async () => {
      LineTokenModel.findOne.mockResolvedValue(mockUser);

      // Mock sign function
      const mockToken = 'mock_token';
      sign.mockResolvedValue(mockToken);
      (LineTokenModel.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockUser),
      });
      // Call the function
      const result = await verifyCodeAndGenerateToken(account, verifyCode);

      // Assertions
      expect(LineTokenModel.findOne).toHaveBeenCalledWith({ channel: account });
      expect(result).toBe(mockToken);
    });

    it('should throw error if user not found', async () => {
      (LineTokenModel.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });
      await expect(verifyCodeAndGenerateToken(account, verifyCode)).rejects.toThrow('查無資料');
      expect(LineTokenModel.findOne).toHaveBeenCalledWith({ channel: account });
    });

    it('should throw error if verification code is incorrect', async () => {
      const wrongVerifyCode = '54321';
      const userWithWrongCode = { ...mockUser, verifyCode: wrongVerifyCode };
      (LineTokenModel.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(userWithWrongCode),
      });

      await expect(verifyCodeAndGenerateToken(account, verifyCode)).rejects.toThrow('驗證碼錯誤');
      expect(LineTokenModel.findOne).toHaveBeenCalledWith({ channel: account });
    });

    it('should throw error if verification code has expired', async () => {
      const expiredUser = { ...mockUser, verifyCodeExpires: new Date(Date.now() - 1000) };
      (LineTokenModel.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(expiredUser),
      });

      await expect(verifyCodeAndGenerateToken(account, verifyCode)).rejects.toThrow('驗證碼過期');
      expect(LineTokenModel.findOne).toHaveBeenCalledWith({ channel: account });
    });
  });
});
