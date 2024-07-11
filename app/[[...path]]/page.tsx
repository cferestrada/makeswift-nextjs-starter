import { notFound } from 'next/navigation'

import { getSiteVersion } from '@makeswift/runtime/next/server'

import { client } from '@/lib/makeswift/client'


import dynamic from 'next/dynamic'

const MakeswiftPage = dynamic(
  () => import('@makeswift/runtime/next').then((mod) => mod.Page),
  {
    ssr: false,
  }
)

type ParsedUrlQuery = { path?: string[] }

export async function generateStaticParams() {
  return await client
    .getPages()
    .map(page => ({
      path: page.path.split('/').filter(segment => segment !== ''),
    }))
    .toArray()
}

export default async function Page({ params }: { params: ParsedUrlQuery }) {
  const path = '/' + (params?.path ?? []).join('/')
  const snapshot = await client.getPageSnapshot(path, {
    siteVersion: getSiteVersion(),
  })

  if (snapshot == null) return notFound()

  return <MakeswiftPage snapshot={snapshot} />
}
