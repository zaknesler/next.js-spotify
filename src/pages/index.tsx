import Head from 'next/head'

export default function Index() {
  return (
    <>
      <Head>
        <title>Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-12">
        <h1 className="text-xl font-bold">Next.js + TypeScript + Tailwind</h1>
        <div className="max-w-lg pt-4 text-lg leading-relaxed text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut quas
          voluptatem cumque atque consequuntur culpa, dolore repudiandae fugiat
          quidem perspiciatis velit iure corporis nesciunt impedit explicabo
          blanditiis cum quae natus.
        </div>
      </main>
    </>
  )
}
