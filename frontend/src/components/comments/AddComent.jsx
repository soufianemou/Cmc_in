import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../../api/requests/commentApi';

export default function AddComent({postId}) {
    const [text,setText]=useState(null)
    const dispatch = useDispatch()
    const handleFormSubmit =(e)=>{
        e.preventDefault()
        if(text.trim()==='') return alert('please write something')
        let comment = {body:text}
        dispatch(createComment(postId,comment))
        setText('')
    }
  return (
    <div className='w-full'>
        <form action="" onSubmit={handleFormSubmit}>
            <div className="">
                <input value={text} type="text" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder='Add comment' onChange={(e)=>setText(e.target.value)}/>
                <div className='flex mt-2'>
                    <button disabled={!text} type='submit' className={`bg-primary text-third px-3 py-2 rounded-lg ${!text && 'cursor-not-allowed'}`}>
                        comment
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}
