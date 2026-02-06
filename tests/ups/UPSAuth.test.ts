import { describe, it, expect, vi, beforeEach } from "vitest";
import { UPSAuth } from "../../src/carriers/ups/UPSAuth.js";
import { AuthError } from "../../src/errors/AuthError.js"; 

import { HttpClient } from "../../src/http/Client.js";

describe("UPSAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches and returns a token", async () => {
    const postMock = vi
      .spyOn(HttpClient.prototype, "post")
      .mockResolvedValue({
        access_token: "fake-token",
        expires_in: 3600,
      });

    const auth = new UPSAuth();
    const token = await auth.getToken();

    expect(token).toBe("fake-token");
    expect(postMock).toHaveBeenCalledOnce();
  });

  it("caches token until expiry", async () => {
    const postMock = vi
      .spyOn(HttpClient.prototype, "post")
      .mockResolvedValue({
        access_token: "cached-token",
        expires_in: 3600,
      });

    const auth = new UPSAuth();

    const token1 = await auth.getToken();
    const token2 = await auth.getToken();

    expect(token1).toBe("cached-token");
    expect(token2).toBe("cached-token");
    expect(postMock).toHaveBeenCalledOnce();
  });

  it("throws AuthError on failure", async () => {
    vi.spyOn(HttpClient.prototype, "post").mockRejectedValue(
      new Error("auth failed")
    );

    const auth = new UPSAuth();

    await expect(auth.getToken()).rejects.toBeInstanceOf(AuthError);
  });
});
