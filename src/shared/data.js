import axios from "axios";

export const channelCourtMap = {
  1: "court1",
  2: "court2",
  3: "court3",
};

export const paramusChannelCourtsMap = {};

export const getParamusChannelIDs = () => [
  {
    name: "Field 1",
    id: "Upx95Pka",
    elementName: "field1",
  },
  {
    name: "Field 2",
    id: "NKgk4iiR",
    elementName: "field2",
  },
  {
    name: "Field 3",
    id: "KgSq9dmy",
    elementName: "field3",
  },
  {
    name: "Field 4",
    id: "FTeWlBCu",
    elementName: "field4",
  },
  {
    name: "Field 5",
    id: "m9jrfF7Q",
    elementName: "field5",
  },
  {
    name: "Field 6",
    id: "LXkvVHSl",
    elementName: "field6",
  },
  {
    name: "Field 7",
    id: "ImkflBUX",
    elementName: "field7",
  },
  {
    name: "Field 8",
    id: "ZDAdclCQ",
    elementName: "field8",
  },
];

export const getChannelIDs = () => {
  const url = "https://api.jwplayer.com/v2/sites/3TrTO9d1/channels/";

  const options = {
    method: "GET",
    qs: { page: "1", page_length: "10" },
    headers: {
      Accept: "application/json",
      Authorization: "ADD API Key here",
    },
  };
  return axios.get(url, options).then((response) => {
    return response.data.channels;
  });
};

export const getChannelsByCategory = async (category) => {
  const url = `https://all-abilities-live-default-rtdb.firebaseio.com/channels/${category}.json`;
  const options = {
    method: "GET",
  };
  let channels = [];
  let activeChannels = [];
  const response = await axios.get(url, options);
  if (response.data) {
    Object.keys(response.data).forEach((key) => {
      channels.push(response.data[key]);
    });
  }
  console.log("start");
  for (let index = 0; index < channels.length; index++) {
    const channelId = channels[index].id;
    const isLive = await isChannelLive(channelId);
    console.log(isLive, "is live value");
    if (isLive) {
      activeChannels.push(channels[index]);
    }
  }
  console.log("end");
  return activeChannels;
};

const isChannelLive = async (channelId) => {
  const url = `https://cdn.jwplayer.com/live/channels/${channelId}.json`;
  const options = {
    method: "GET",
    headers: { Accept: "application/json; charset=utf-8" },
  };

  const response = await axios.get(url, options);
  console.log("Response is ", response);
  const isActive = response.data.status === "idle" ? false : true;
  return isActive;
};

export const getWeddingChannelId = () => {
  return "m9jrfF7Q";
};
