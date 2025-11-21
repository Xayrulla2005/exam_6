export interface JwtPayload {
    id: number;
    email: string;
    role: string;
}
export declare const generateToken: (payload: JwtPayload, expiresIn?: number) => string;
export declare const verifyToken: (token: string) => JwtPayload;
//# sourceMappingURL=token.d.ts.map