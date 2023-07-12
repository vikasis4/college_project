import React from 'react'
import Image from 'next/image'

function Notes_map(props) {

  const deletePdf = (refrence, noteId)=>{
    const desertRef = ref(storage, refrence);
    deleteObject(desertRef).then(async() => {
      await axios.post(API_PDF,{
        type: 'DELETE',
        id: props.SubjectRelationId,
        userId: props.general.profile._id,
        PaperType: 'notes',
        noteId
      }).then((response) => {
        if (response.data.status) {
          alert('Deleted Successfully')
        }else{
          alert('Something went wrong')
        }
      })
    }).catch((error) => {
      alert('Something went wrong, please try again later')
    });
  }

  return (
    <div className=" w-full flex flex-wrap justify-center place-items-center">
      {
        props.notes.map((data) => {
          var id = props.general.profile.uploads.filter(({ relationId }) => relationId === data._id)
          return (
            <div className="bg-black flex border-2 relative border-blue-500 flex-col gap-4 justify-around place-items-center rounded-md shadow-md py-4 px-4 m-2 w-2/6">
              {
                id.lenght > 0 ?
                  <Image onClick={()=> deletePdf(data.refrence, data._id)} src="/images/bin.png" alt="bin" width="30" height="30" className='absolute right-2 top-2 hover:cursor-pointer' />
                  :
                  null
              }
              <Image src='/images/pdf.png' height='80' width='80' alt="KObra" />
              <h1 className="text-white">
                Topics Covered in the Notes
              </h1>
              <div className="flex flex-wrap gap-2">
                {
                  data.topics.map(({ name }) => {
                    return (
                      <h1 className="text-white bg-blue-500 py-1 px-2 text-sm rounded-md shadow-md">{name}</h1>
                    )
                  })
                }
              </div>
              <h1 className="text-white">
                Posted by - {data.author}
              </h1>
              <button className='bg-pink-500 duration-150 hover:bg-purple-700 px-6 py-1 rounded-md shadow-md text-white text-xl text-semibold'>Download</button>
            </div>)
        })
      }
    </div>
  )
}

export default Notes_map