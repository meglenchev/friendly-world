import jwt from "jsonwebtoken";

const JWT_SECRET = 'fc7d1544e9a824db5e5bd382228ac20ebde073d0d1cbcaa51fca1657722a572a';

export function generateAuthToken(user) {
    // Create Token
    const payload = {
        id: user.id, 
        email: user.email
    };

    return jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'});
}