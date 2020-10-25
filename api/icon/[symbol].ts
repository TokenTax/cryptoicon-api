import { NowRequest, NowResponse } from "@vercel/node";
import path from "path";
import fs from "fs";

export default (req: NowRequest, res: NowResponse) => {
  const { symbol } = req.query;

  let filePath = path.join(
    __dirname,
    `../../public/icons/128/color/${symbol}.png`
  );

  if (!fs.existsSync(filePath)) {
    // If file doesn't exist (no icon for the given [symbol]) => Replace it with the alt image (_no_image_.png)
    // This might be a better way to handle missing icons, we can avoid 404, plus, user might based on the [_no_image_] to report the missing icon
    filePath = path.join(__dirname, '../../public/icons/128/color/_no_image_.png');
  }

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
