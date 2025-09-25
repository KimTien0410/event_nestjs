// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');


export async function encrypt(password: string) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}
