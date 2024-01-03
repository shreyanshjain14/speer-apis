import { AppConfig, ValidationFailed } from '@libs/boat';
import { CacheStore } from '@libs/boat/cache';
import { CacheKeys } from '@libs/common/utils/cache';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { random } from 'lodash';

export class Utils {
  static async fetchOrCreateOtp(key: string): Promise<string> {
    let otp = await CacheStore().get(key);
    if (otp) return JSON.parse(otp);
    if (AppConfig.get("app.env") == "local") otp = "111111";
    else otp = random(6);
    await CacheStore().set(key, `${otp}`, 2 * 60);
    return otp;
  }

  static async hashPassword(param: string): Promise<string> {
    return bcrypt.hash(param, 10);
  }

  static async comparePasswords(
    passwordFromUser: string,
    passwordFromDatabase: string
  ): Promise<void> {
    const isMatch = await bcrypt.compare(passwordFromUser, passwordFromDatabase);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid Credentials");
    }
  }

  static async verifyMobile(params, throwValidationErr?: boolean): Promise<void> {
    const { phoneNumber, otp } = params;
    const key = CacheKeys.build(CacheKeys.MOBILE_VERIFICATION, {
      phoneNumber,
    });
    const cachedOtp = await CacheStore().get(key);
    if (!cachedOtp || cachedOtp != otp) {
      if (throwValidationErr)
        throw new ValidationFailed({
          otp: ["Invalid OTP"],
        });
      throw new UnauthorizedException("Invalid OTP");
    }

    CacheStore().forget(key);
  }

  static async setVerifiedMobileOrEmail(key: string): Promise<void> {
    await CacheStore().set(key, "true", 60 * 60);
  }

  static async verifyMobileOrEmail(
    param: Record<string, any>,
    errFieldLabel: string
  ): Promise<void> {
    const key = CacheKeys.build(CacheKeys.VERIFIED, { ...param });
    const status = await CacheStore().get(key);
    if (!status || status != "true") {
      throw new ValidationFailed({ [errFieldLabel]: ["Verification failed"] });
    }
  }
}
