import { NowRequest, NowResponse } from "@vercel/node";
import path from "path";
import fs from "fs";

export default (req: NowRequest, res: NowResponse) => {
  const { symbol } = req.query;

  var filePath = path.join(
    __dirname,
    `../../public/icons/128/color/${symbol}.png`
  );

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-disposition": "inline; filename=" + symbol,
  });

  var readStream = fs.createReadStream(filePath);

  // We replaced all the event handlers with a simple call to readStream.pipe()
  readStream.pipe(res);
};
