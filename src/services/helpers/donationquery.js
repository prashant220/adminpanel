import api from "../api";
import to from "await-to-js";

const donationRequests = {
  deleteDonation: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionaryMutation",
      actionName: "deleteDonation",
      data: {
        "@context": "http://semantro.com/",
        "@type": "Donation",
        identifier: "7ef376128e4048f0-a13b4fbc0460b438",
      },
    };

    let { data } = a;
    let queryFormat = {
      ...a,
      data: {
        ...data,
        identifier: queryData.identifier,
      },
    };
    let [error, response] = await to(api.POSTUSER_QUERY(queryFormat));
    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },
  listUserDonations: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "listUserDonations",
      pageLimit: {
        "@context": "http://semantro.com/",
        "@type": "PageProperty",
        start: 0,
        end: 10,
      },
    };

    let { pageLimit } = a;
    let queryFormat = {
      ...a,
      pageLimit: {
        ...pageLimit,
        start: queryData.pagination.start,
        end: queryData.pagination.end,
      },
    };
    let [error, response] = await to(api.POSTUSER_QUERY(queryFormat));
    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },
  countUserDonations: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionarySearch",
      actionName: "countUserDonations",
    };
    let queryFormat = {
      ...a,
    };
    let [error, response] = await to(api.POSTUSER_QUERY(queryFormat));
    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },
  addUserDonation: async (queryData) => {
    let a = {
      "@context": "http://semantro.com/",
      "@type": "DictionaryMutation",
      actionName: "addUserDonation",
      data: {
        "@context": "http://semantro.com/",
        "@type": "User",
        userName: "sachingiri619@gmail.com",
        hasDonated: {
          "@context": "http://semantro.com/",
          "@type": "Donation",
          donatedAmount: "10000",
          donationPaymentPlatform: "BANK TRANSFER",
          donationPaymentId: "54679",
          name: "",
          location: ""
        },
      },
    };

    const { data } = a;
    const { hasDonated } = data;
    let queryFormat = {
      ...a,
      data: {
        ...data,
        userName: queryData.userName,
        hasDonated: {
          ...hasDonated,
          donatedAmount: queryData.donatedAmount,
          donationPaymentPlatform: queryData.donationPaymentPlatform,
          donationPaymentId: queryData.donationPaymentId,
          name: queryData.name,
          location: queryData.location
        },
      },
    };

    let image = queryData.image ? queryData.image : null;
    let audio = null;

    let [error, response] = await to(
      api.POSTUSER_MUTATE_WORD(queryFormat, image, audio)
    );
    if (response.status === "fail") {
      throw { ...response };
    } else {
      return response;
    }
  },
};

export default donationRequests;
