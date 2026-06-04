require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const router = require("./routers");
const errorHandler = require("./middlewares/errorHandler");
const upload = require("./utils/multers");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

// app.patch(
//   "/product/upload-image/:id",
//   upload.single("img"),
//   async function (req, res, next) {
//     // console.log(req.file, "filenyaaaa");
//     const client = new ImageKit({
//       privateKey: process.env["IMAGEKIT_PRIVATE_KEY"], // This is the default and can be omitted
//     });

//     // console.log(req.file.buffer, "filenyaaaa");
//     const response = await client.files.upload({
//       file: await ImageKit.toFile(Buffer.from(req.file.buffer), "img"),
//       fileName: req.file.originalname,
//     });

//     // console.log(response,'responnya'); //ada url
//     res.status(200).json({
//       message: "Succeed upload image",
//       url: response.url,
//     });
//   },
// );

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// console.log(`Hello ${process.env.SECRET_KEY}`);
