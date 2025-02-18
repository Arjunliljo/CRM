import axios from "axios";

export const getLongLivedAccessToken = async function (account) {
  try {
    const res = await axios.get(
      `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${account.appId}&client_secret=${account.appSecret}&fb_exchange_token=${account.accessToken}`
    );

    console.log("Response from Facebook:", res.data);

    if (!res.data.access_token) {
      throw new Error("Facebook response missing access_token");
    }

    account.longLivedAccessToken = res.data.access_token;
    account.expiresIn = res.data.expires_in;
    return account;
  } catch (error) {
    // Log the full error object for debugging
    console.error("Facebook API Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    throw new Error(
      `Failed to get long-lived access token: ${
        error.response?.data?.error?.message || error.message
      }`
    );
  }
};
