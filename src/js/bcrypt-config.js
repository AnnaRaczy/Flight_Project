const bcrypt = require("bcryptjs");

const hashing = async (psswd) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPsswd = await bcrypt.hash(psswd, salt);
    console.log("Salt:", salt);
    console.log("HashedPsswd:", hashedPsswd); // hashedPsswd already has Salt info
    return hashedPsswd;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

const compare = async (loginEmail, registerEmail, password, hashedPsswd) => {
  if (loginEmail !== registerEmail) {
    console.log("Email not found");
    return alert("Email not found");
  }
  try {
    if (await bcrypt.compare(password, hashedPsswd)) {
      console.log("Success"); //// ??
    }
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

export { hashing, compare };
