/* eslint-disable react/prop-types */
export default function Pagination({pages,currentPage,setCurrentPage}) {
    const generatedPages = []
    for(let i=1;i<=pages;i++){
        generatedPages.push(i)
    }
  return (
    <div className="flex justify-center my-5">
        <div className="flex flex-wrap items-center gap-3">
            <button onClick={()=>setCurrentPage(prev=>prev-1)} disabled={currentPage===1} className={`${currentPage===1 && 'cursor-not-allowed'} relative block rounded-full bg-primary px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-third dark:text-neutral-400`}>
                Previous
            </button>
            {generatedPages.map((page)=>(
                <button key={page} onClick={()=>setCurrentPage(page)} className={`${currentPage === page ? 'text-white bg-primary':'text-third'} relative block rounded-full px-3 py-1 text-lg hover:bg-primary`}>
                    {page}
                </button>
            ))}
            <button onClick={()=>setCurrentPage(prev=>prev+1)} disabled={currentPage===pages} className={`${currentPage===pages && 'cursor-not-allowed'} relative block rounded-full bg-primary px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-third dark:text-neutral-400`}>
                Next
            </button>
        </div>
    </div>
  )
}
