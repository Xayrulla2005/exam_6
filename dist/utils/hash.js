import bcrypt from "bcryptjs";
///// Password ni hashlash
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
///// Passwordni tekshirish
export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
//# sourceMappingURL=hash.js.map