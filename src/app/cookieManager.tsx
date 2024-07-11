import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

abstract class CookiesManager {
  abstract setCookie(
    cookieName: string,
    cookieValue: string,
    maxCookieAgeInSeconds: number
  ): boolean;
  abstract removeCookie(cookieName: string): boolean;
  abstract getCookieValue(cookieName: string): string | undefined;
  abstract getCookie(cookieName: string): RequestCookie | undefined;
  abstract isCookieSet(cookieName: string): boolean;
  abstract getAllCookies(): RequestCookie[];
}

class ClientSideCookiesManager extends CookiesManager {
  setCookie(
    cookieName: string,
    cookieValue: string,
    maxCookieAgeInSeconds: number
  ): boolean {
    let createdCookie;
    // if cookieValue is set to 'UUID' then a UUID is generated and then used as the cookieValue else, the passed in value is used instead

    let shouldGenUUIDAsCookieVal = cookieValue === "UUID";
    try {
      if (cookies().get(cookieName)) {
        createdCookie = cookies().get(cookieName);
        console.log("running 2345676543");
      } else {
        console.log("running 200000000345676543");
        cookies().set({
          name: cookieName,
          value: shouldGenUUIDAsCookieVal ? uuidv4() : cookieValue,
          httpOnly: true,
          path: "/",
          sameSite: "strict",
          maxAge: maxCookieAgeInSeconds,
        });

        // assign value of the set cookie to the cookieCreated variable
        createdCookie = cookies().get(cookieName);
      }
    } catch (err) {
      console.log("error while trying to set cookie ", cookieName, err);
      return false;
    }

    if (createdCookie) {
      return true;
    }
    return false;
  }

  removeCookie(cookieName: string): boolean {
    cookies().delete(cookieName);
    return this.isCookieSet(cookieName);
  }

  getCookieValue(cookieName: string): string | undefined {
    let cookieValue = cookies().get(cookieName)?.value;

    return cookieValue;
  }

  getCookie(cookieName: string): RequestCookie | undefined {
    let cookie = cookies().get(cookieName);

    return cookie;
  }

  getAllCookies(): RequestCookie[] {
    return cookies().getAll();
  }

  isCookieSet(cookieName: string): boolean {
    return cookies().has(cookieName);
  }
}

export default ClientSideCookiesManager;
