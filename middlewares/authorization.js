const { User, Product } = require("../models");

async function authorization(req, res, next) {
  try {
    // console.log(req.loginInfo, "login info");  //diterima dari authentication

    const { authorId, email, role } = req.loginInfo;

    // kalau Staff, harus dicek apakah data ini milik dia. kalau admin bisa semua jadi skip if else
    if (role == "Staff") {
      // double check start: hanya untuk make sure data di db sama
      // cari idnya
      const user = await User.findByPk(authorId);

      // console.log(user, "saya siapa?");
      //  kalau bukan user tidak boleh
      if (!user) throw { name: "Forbidden" };
      //   double check finish here

      //untuk page yg pake :id, dia hanya bisa ngedit product yg authorIdnya sama dengan authorId
      const { id } = req.params;
      console.log(req.params, "param apa berapa?");
      const productFound = await Product.findByPk(id);

      //   console.log(productFound, "dapet produk apa nih");

      if (!productFound) {
        // cek ini dulu Logikanya: 1. Pastikan product ada, 2. Baru cek authorId
        throw { name: "NotFound" };
      }

      if (productFound.authorId !== authorId) {
        throw { name: "Forbidden" };
      }
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = authorization;
