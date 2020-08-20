import { NowRequest, NowResponse } from "@vercel/node";
import path from "path";
import fs from "fs";

export default (req: NowRequest, res: NowResponse) => {
  const { symbol } = req.query;

  const filePath = path.join(
    __dirname,
    `../../public/icons/128/color/${symbol}.png`
  );

  const readStream = fs.createReadStream(filePath);

  readStream.on("open", function () {
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-disposition": "inline; filename=" + symbol,
    });

    readStream.pipe(res);
  });

  readStream.on("error", (err) => {
    res.status(404);
    res.send("error");
  });
};
