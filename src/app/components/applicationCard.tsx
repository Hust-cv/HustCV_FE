import Link from "next/link";
interface Post {
    id: any;
    title: any;
  }
  
interface CardProps {
    applications: any;
    href: any;
    title: any;
}
  
export default function Card({applications, href, title}: CardProps){
  return (
      <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
          <div className="text-center">
              <h1 className="text-3xl text-gray-800 font-semibold">
                  {title}
              </h1>
          </div>
          <div className="mt-10 grid gap-2 sm:grid-cols-1 lg:grid-cols-1 pb-5 auto-rows-fr">
              {
                  applications.map((items: any, key: any) => (
                      <article className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm hover:cursor-pointer" key={key}>
                          <Link href={`${href}${items.id}`}>
                              <img src={'https://devmountain.com/wp-content/uploads/2022/04/wBf2WFXnGZDWaKrTyYfLPmSP3XCp8MAGd6-RVz4cCAFntWN7cxzZqee9K3gOsTVHvW4NSB0JcoXeD6hQ4JROlpqwkQ8yvdEvuT_bAxtauCQaD_3P5ckeCWyrmU8Pc_ve09hqZw0J-1.png'} loading="lazy" alt={items.title}  className="w-full h-40 rounded-t-md" />
                              {/* <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                                  <div className="flex-none w-10 h-10 rounded-full">
                                      <img src={items.authorLogo} className="w-full h-full rounded-full" alt={items.authorName} />
                                  </div>
                                  <div className="ml-3">
                                      <span className="block text-gray-900">{items.authorName}</span>
                                      <span className="block text-gray-400 text-sm">{items.date}</span>
                                  </div>
                              </div> */}
                              <div className="pt-3 ml-4 mr-2 mb-3">
                                  <h3 className="text-xl text-gray-900">
                                      {items.user.username}
                                  </h3>
                                  {/* <p className="text-gray-400 text-sm mt-1 line-clamp-5">{items}</p> */}
                              </div>
                          </Link>
                      </article>
                  ))
              }
          </div>
      </section>
  )
}
