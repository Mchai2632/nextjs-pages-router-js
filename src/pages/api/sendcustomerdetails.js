import api from "@root/api";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const url = `${api().sendCustomerDetails}`;

      console.log("req.body:", req.body);

      delete req.body.dob;
      delete req.body.icNo;
      delete req.body.paymentInfo.adminChargesPercentage;

      console.log("sendCustomerDetails body:", req.body);
      fetch(url, {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        if (response.status === 400) {
          res.status(400).json({ status: 400, message: "data format not match with backend request." });
          throw Error("data format not match with backend request.");
        }

        const data = await response.json();

        res.status(200).json(data);
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        message: "error",
        data: err,
      });
    }
  }
};

export default handler;
