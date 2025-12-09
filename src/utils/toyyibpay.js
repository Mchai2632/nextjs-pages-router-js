export const generatePaymentIntent = ({
  amount,
  customer_name,
  email,
  contact_number,
  address,
  postcode,
  state,
  country,
  reference_number,
  description,
  return_url,
}) => {
  // === 2️⃣ 組成回傳物件 ===
  return [
    {
      billAmount: amount,
      billTo: customer_name,
      billEmail: email,
      billPhone: contact_number,
      billAddress: address,
      billPostcode: postcode,
      billState: state,
      billCountry: country,
      billDescription: description,
      billReturnUrl: return_url,
      billExternalReferenceNo: reference_number,
      // === 自訂資訊（非 ToyyibPay 必要，但可附加） ===
      customerAddress: `${address}, ${postcode}, ${state}, ${country}`,
    },
  ];
};
