import { jwtVerify } from 'jose'

export default async function verifyToken(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false
  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.NEXT_PRIVATE_KEY_JWT),
      { algorithms: ['HS256'] },
    )
    return true
  } catch (error) {
    return false
  }
}
