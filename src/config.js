/** Booking Forms Initial Data */
export const formInitialData = {
  step1: {
    F_NAME: "Tour Overview",
    rooms: [
      {
        id: crypto.randomUUID(),
        room_index: 1,
        // all price get by API
      },
    ],

    checkbox1: false,
    checkbox2: false,
    paymode: "Pay Full Amount",
    promocode: "",
  },

  step2: {
    F_NAME: "Traveller",
    bill_info: {
      first_name: "",
      surname: "",
      nickname: "",
      title: "",
      gender: "",
      contact: "",
      email: "",
      address1: "",
      address2: "",
      postcode: "",
      state: "",
      country_region: "",
      checkbox1: "",
    },
    emer_contact: {
      first_name: "",
      surname: "",
      contact: "",
      email: "",
      relationship: "",
    },
    passenger_details: {
      room1_traveller1: {
        given_name: "",
        surname: "",
        nickname: "",
        title: "",
        gender: "",
        ic_no: "",
        date_of_birth: "",
        passport_no: "",
        passport_exp_date: "",
        nationality: "",
        remark: "",
        is_billing_person: "",
      },
    },
  },
  step3: {
    checkbox1: false,
    checkbox2: false,
  },
  step4: {
    payment_method: "",
  },
};

export const roomCodeMap = {
  // 🧍‍♂️ 成人房型
  adultSingle: {
    FT: "FT_SGL", // 全程團
    GA: "GA_SGL", // 地接團
  },
  adultTwin: {
    FT: "FT_TWN",
    GA: "GA_TWN",
  },
  adultTriple: {
    FT: "FT_TRIPLE",
    GA: "GA_TRIPLE",
  },

  // 👶 小孩房型
  childWithTwin: {
    FT: "FT_CTW",
    GA: "GA_CTW",
  },
  childWithBed: {
    FT: "FT_CWB",
    GA: "GA_CWB",
  },
  childNoBed: {
    FT: "FT_CNB",
    GA: "GA_CNB",
  },
  infant: {
    FT: "FT_INFT",
    GA: "GA_INFT",
  },
};

export const extraFeeCodeMap = {
  agentFee: "AC", // 代理服務費
  tipping: "TIPPING", // 小費
  travelInsurance: "TRVL_INS", // 旅遊保險
  visa: "VISA", // 簽證
  deviation: "DEVIATION", // 個人變更費
  discount: "DISC", // 折扣（負數）
};
