export default function getUserToken(headers: Headers) {
    const token = headers.get('authorization')?.split(' ')?.at(1);
    return token;
}
