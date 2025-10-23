import api from "@root/api";

export default async function handler(req, res) {
  try {
    const params = new URLSearchParams(req.query); // 自动处理所有 query 参数
    const response = await fetch(
      `${api().tourpkgdetail}?${params.toString()}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();

    // console.log(result.tourPkg.tourDepList);
    // const tourDepList = result.tourPkg.tourDepList;

    // const DepList = tourDepList.map((item) => {
    //   return {
    //     idBase: item.idBase,
    //     idCompany: result.tourPkg.idCompany,
    //   };
    // });

    // console.log("DepList:", DepList);

    // // fetch 2

    // const gotList = await Promise.all(
    //   DepList.map(async (item) => {
    //     const response2 = await fetch(
    //       `${api().tourdepdetail}?idTourDep=${item.idBase}&idCompany=${
    //         item.idCompany
    //       }`
    //     );

    //     const resJson = await response2.json();
    //     const tourDepItemList = resJson.tourDep.tourDepItemList;

    //     if (!tourDepItemList || tourDepItemList.length === 0) return;

    //     return resJson.tourDep;
    //   })
    // );

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
