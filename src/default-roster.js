export default `
[[servers]]
  Address = "tls://128.179.33.44:7000"
  Suite = "Ed25519"
  Public = "ec5c65a3c922d1df32075640e3de606197be24af76059a2ef145501122884bd3"
  Description = "EPFL Cothority-server"
  [servers.Services]
    [servers.Services.ByzCoin]
      Public = "6f69dc10dbef8f4d80072aa9d1bee191b0f68b137a9d06d006c39fe6667738fa2d3439caf428a1dcb6f4a5bd2ce6ff6f1462ebb1b7374080d95310bc6e1115e105d7ae38f9fed1585094b0cb13dc3a0f3e74daeaa794ca10058e44ef339055510f4d12a7234779f8db2e093dd8a14a03440a7d5a8ef04cac8fd735f20440b589"
      Suite = "bn256.adapter"
    [servers.Services.PoPServer]
      Public = "8f3d081c68394ffa6b6049da3f65ff996549ae4ccf9584a5a0b0ad6b7d6263265b39d9c044b2a58038670d6a8efe57dcc99a0ab7cbbd91dc08febacd4a1ee548142438b5eedca67789ba0bb664b02beea62cf40cde2d2a2f3794e9b3afdbacb322090b653b723ee59ae2d8b6db7281c32f764bc4250d160caab058057e25fa8a"
      Suite = "bn256.adapter"
    [servers.Services.Skipchain]
      Public = "32ba0cccec06ac4259b39102dcba13677eb385e0fdce99c93406542c5cbed3ec6ac71a81b01207451346402542923449ecf71fc0d69b1d019df34407b532fb2a09005c801e359afb377cc3255e918a096912bf6f7b7e4040532404996e05f78c408760b57fcf9e04c50eb7bc413438aca9d653dd0b6a8353d128370ebd4bdb10"
      Suite = "bn256.adapter"
    [servers.Services.blsCoSiService]
      Public = "6a62b35ee5ec659625bdcc69b47e14a5b5aad9a0aacb8c6ac1fa301667471be915da15f6fefa2537ee5cc8fdad0d31de01f3f7ab4dda80aa104215f1ee85f1e255cd767d8f353fd5f89815b18a8f0e96e08532a131f221e87d3e19eb07f0e27b55b03977579a30f8ce4aad04449f2ec405c4070cf37786de8322e8109d52b891"
      Suite = "bn256.adapter"

[[servers]]
  Address = "tls://fairywren.ch:7770"
  Suite = "Ed25519"
  Public = "0bcdaebde16f50fb65b717a0501e7ede020045286d6ece10fdea1bdd8f37af39"
  Description = "Gaylor's Conode"
  [servers.Services]
    [servers.Services.ByzCoin]
      Public = "2754e502579e77f92322458022f6b97ff18471f2e7523028ea6dab720da11ab189f98ef9a0308c7aa656f3339baded992248def25e3e2e1428c1601809579b934bb2aaf66b3d8a68712f68d744661d270278ebcf434204af961c729db6db85a54930dfe6b75184647d0e81138db2a87ccaeccff3500be2bf409827eef5ec150d"
      Suite = "bn256.adapter"
    [servers.Services.PoPServer]
      Public = "56f8aff826b48f4ccb60ce5aabf1484d3156533c6de378c8c9c209cf38d3e75249cd1dcc833a50173b59a27dd885683fbc68fabb536f0a55f89167fb7b2c393710564e2f9876dcef0067b68cf695d944e5d116420726cc1e20f48d20dc5dc4f96e5b9a9d35eb7b5a46059fc8aad4ce4ff282b89b6b1fd840eabbf307fe56338c"
      Suite = "bn256.adapter"
    [servers.Services.Skipchain]
      Public = "69088f9df0396cfd296eeeb060bc84d807f3f2cf3b02b8eafd953f30e9e979a203fd11035e9f1fca2662383841c3c630ee3554150ec2b5fdb50819a22a2682dd341f0424fec4eafb8a17041b939ef18eabdd8c38e2f057619a541c506bbae5755265ae6b9156690b7a2907ca0ec6394d79363d5492aa2c9512e3fba882aad358"
      Suite = "bn256.adapter"
    [servers.Services.blsCoSiService]
      Public = "753367383700559bc310a2ba7d201b19e00c5bd37fa9fc0c7914757b1d88bfc35b3f00fefb25a6cb2bb0f46f7b5d0439493f0ecb8aae1d6b939a1b0fa38a850b43be80468dc1cd5f81f9f57e22931c4535541c7f5565b5b46c0f26897764322a1aaacb7ad312396c995c3c934b8106fa4bcb4c370ebe6264e2cae376735f715a"
      Suite = "bn256.adapter"

[[servers]]
  Address = "tls://dedis.nella.org:7770"
  Suite = "Ed25519"
  Public = "ad91a87dd89d31e4fc77ee04f1fc684bb6697bcef96720b84422437ff00b79e3"
  Description = "dedis.nella.org"
  [servers.Services]
    [servers.Services.ByzCoin]
      Public = "7a989c19ef64ac45d4962fa0e60184c0adaf90082f5ea572de2d241d11ac8e6a53f968928d80a910ed7d883c05d74cf3e3c2c9096dd9fb5b64a03f9e552700388effcd3106e58f4bb99c384afb4b6b2530bfee6fdfb6b4f41a383b2ad31bf03c18d3f43a4a8bacbe5da16c3851c3c8be3607af1bb19b085861d71cd92c8b8406"
      Suite = "bn256.adapter"
    [servers.Services.PoPServer]
      Public = "28122b3f4a6d7a17d682859c4a37287d851aba7afd994e7dffbd0f636b21e975614dd3a4a8c45ac56044a045333fcaf9044031dd2d9c46e07847c6078a60740515d1bd01b83c6fffe7a55ff851feeb59dadb82f11bc70a5be65070408fd67da94ab250f6eac2c04f72edf122840ba6c7d76d0906ff20915a1d44a83df19b569f"
      Suite = "bn256.adapter"
    [servers.Services.Skipchain]
      Public = "78dd1cfd6e70ad9cf5afb8263811fabe95aedee835567cc5ca7773a6787a03736ee24accb8e00370768aab14dab949584054e255c626d0141182454f8c77794a4e8c69a4dc6082f30f1cf33de45daea63fc52c4a91ed79ca88e4f6d363a46d87017b038da5ca4656f610d77fd91e1aae320d7d399ca7fdf41f5348b63712310f"
      Suite = "bn256.adapter"
    [servers.Services.blsCoSiService]
      Public = "672a542f50329271b0e4832f39f7be95278ff65037ceab0affc485751feffd1089cef346e0a1c503ad48926f73f35849bed634dc7bc3f2c538fea8b186eb2cf8049ff177ae922fa6414c02b28689cc0afe571ff32c5a113b5b64f9651e935b5b5594a528505ff74ad4df7efecbd1b76f52cd3fe69751c6a4c046e75e454e643c"
      Suite = "bn256.adapter"
`

// for skipchain testing:
/* `
[[servers]]
    Address = "tls://localhost:7002"
    Suite = "Ed25519"
    Public = "57f43d164f82437064a59a02081984974deb821659e03262a67c190f6767e705"
    Description = "Conode_1"
  [[servers]]
    Address = "tls://localhost:7004"
    Suite = "Ed25519"
    Public = "40f3a1e76e8bc0bf0f0aad7e963e72c635c0d5e7f9b21e484714d1e8541b22db"
    Description = "Conode_2"
  [[servers]]
    Address = "tls://localhost:7006"
    Suite = "Ed25519"
    Public = "b21216372ea04f3c7d25e9386f94d58a564266ff7bd85d7acf79385e076e5f39"
    Description = "Conode_3"
`
*/
