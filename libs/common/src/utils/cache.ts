import { ExpParser } from '@libs/boat';

export class CacheKeys {
  static MOBILE_VERIFICATION = "MOBILE_VERIFICATION";
  static EMAIL_VERIFICATION = "EMAIL_VERIFICATION";
  static FORGOT_PASSWORD = "FORGOT_PASSWORD";
  static VERIFIED = "VERIFIED";

  static build(key: string, inputs?: Record<string, any>): string {
    const obj = inputs || {};
    obj["keyName"] = key;
    return ExpParser.buildFromObj(obj);
  }
}
