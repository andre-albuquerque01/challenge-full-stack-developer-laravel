import { revalidateTag } from 'next/cache'

export function RevalidateTag(tag: string) {
  revalidateTag(tag)
}
