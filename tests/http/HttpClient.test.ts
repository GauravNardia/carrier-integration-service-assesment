import { describe, it, expect, vi, type Mock } from "vitest";
import axios from "axios";
import { HttpClient } from "../../src/http/Client.js";
import { NetworkError } from "../../src/errors/NetworkError.js";


// This tells Vitest: "replace axios with a fake version"
vi.mock("axios");

describe("HttpClient", () => {
  it("returns response data on successful POST", async () => {
    const postMock = vi.fn().mockResolvedValue({
      data: { success: true },
    });

    // Fake axios.create()
    (axios.create as unknown as Mock).mockReturnValue({
      post: postMock,
    });

    const client = new HttpClient("http://example.com");
    const result = await client.post<{ success: boolean }>("/test", {});

    expect(result.success).toBe(true);
    expect(postMock).toHaveBeenCalled();
  });

  it("throws NetworkError on failure", async () => {
    const postMock = vi.fn().mockRejectedValue(new Error("fail"));

    (axios.create as unknown as Mock).mockReturnValue({
      post: postMock,
    });

    const client = new HttpClient();

    await expect(client.post("/test")).rejects.toBeInstanceOf(NetworkError);
  });
});
