// export default async function handler(req, res) {
//   try {
//     if (req.method === "POST") {
//       const someData = {
//         catname: process.env.DEV_TOYYIBPAY_CATEGORY_CODE, // CATEGORY NAME
//         catdescription:
//           "toyyibPay General Category, For toyyibPay Transactions 2", // DESCRIPTION
//         userSecretKey: process.env.DEV_TOYYIBPAY_SECRET_KEY, // 🔐 SECRET KEY (建议放 .env)
//       };

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_DEV_TOYYIBPAY_BASE_URL}/index.php/api/createCategory`,
//         {
//           method: "POST", // or 'PUT'
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//           body: new URLSearchParams(someData),
//         }
//       );

//       res.status(200).json(await response.json());
//     } else {
//       res.status(200).json({ name: "John Doe" });
//       // Handle any other HTTP method
//     }

//     //
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
