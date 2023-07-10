'use client'
import React from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@firebase.config.js';
import { API_PDF } from '@utils/apis';

function PdfUpload(props) {

    var { upload, setUpload, general, mode } = props.props;

    return (
        <div style={{ display: upload ? 'block' : 'none' }} className="py-12 px-6 w-4/5 rounded-md shadow-lg bg-slate-500">
            <div className="flex justify-center place-items-center border-b-2 border-black pb-4">
                <h1 className="text-xl text-semibold text-white">SUBJECT - {general.subject.name}</h1>
                <h1 className="text-2xl text-black">&nbsp;&nbsp;||&nbsp;&nbsp;</h1>
                <h1 className="text-xl text-semibold text-white"> You are uploading {mode}</h1>
                <h1 className="text-2xl text-black">&nbsp;&nbsp;||&nbsp;&nbsp;</h1>
                <button onClick={() => setUpload(false)} className="text-white text-xl text-bold bg-red-600 px-12 py-2 duration-200 hover:bg-red-900 rounded-md shadow-md">Close</button>
            </div>
            {
                mode === 'PYQ' ?
                    <Pyqs general={general} />
                    :
                    <Notes general={general} />
            }
        </div>
    )
}

function Notes(props) {
    return (
        <h1>Hello notes</h1>
    )
}
function Pyqs(props) {

    const [paper, setPaper] = React.useState('pyq');
    const [file, setFile] = React.useState(null);
    const [year, setYear] = React.useState(null);
    const [uploadProgress, setUploadProgress] = React.useState(null);
    const [downloadLink, setDownloadLink] = React.useState(null);

    React.useEffect(() => {
        if (downloadLink) {
            const sendPdf = async () => {
                var response = await fetch(API_PDF, {
                    method: 'POST',
                    body: JSON.stringify({ id: props.general.subject._id, author: props.general.profile.name, link: downloadLink, year, type: 'pyq', PaperType: paper })
                })
                var result = await response.json();
                if (result.status) {
                    alert('Uploaded Sucessfully');
                } else {
                    alert('Upload failed please try again later');
                }
                setUploadProgress(null)
                setFile(null)
            }
            sendPdf()
        }
    }, [downloadLink])

    const handleSelectedFile = (files) => {
        if (files && files[0].size < 60000000) {
            setFile(files[0])
        } else {
            alert('File size to large, size should be less than 60 mb')
        }
    }

    const submitfile = () => {
        if (!props.general.profile.login) {
            alert('Create an account and login to upload the pdf !!!');
            return
        }
        if (file) {
            const name = file.name
            const storageRef = ref(storage, `Pdf/${name}`)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setUploadProgress(Math.floor(progress))
                }, (error) => {
                    message.error(error.message)
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setDownloadLink(url)
                    })
                },
            )
        } else {
            alert('File not found')
        }
    }

    return (
        <div className="mt-12 flex flex-col justify-center place-items-center">
            <h1 className='text-bold text-2xl'>Is this a PYQ or Sample Paper ?</h1>
            <div className="flex justify-center place-items-center gap-8 pt-8">
                <button onClick={() => setPaper('pyq')} style={{ transform: `translateY(${paper === 'pyq' ? '-12px' : '0'})` }} className="py-2 px-6 bg-blue-500 rounded-md shadow-md duration-150 text-white">PYQ</button>
                <button onClick={() => setPaper('sample')} style={{ transform: `translateY(${paper === 'sample' ? '-12px' : '0'})` }} className="py-2 px-6 bg-blue-500 rounded-md shadow-md duration-150 text-white">Sample Paper</button>
            </div>
            {
                paper === 'pyq' ?
                    <input value={year} onChange={(e) => setYear(e.target.value)} type='number' placeholder='Enter the Year of this PYQ' className='py-2 px-6 mt-12 rounded-sm outline-none' />
                    :
                    null
            }
            <input className='mt-12' type='file' accept="application/pdf" onChange={(files) => handleSelectedFile(files.target.files)} />

            {
                uploadProgress ?
                    <h1 className='mt-12 text-green-400 shadow-md bg-black rounded-md py-4 px-12'>Uploading - {uploadProgress}%</h1>
                    :
                    null
            }
            {
                uploadProgress ?
                    null
                    :
                    <button onClick={submitfile} className='bg-pink-500 duration-150 hover:bg-purple-700 px-16 py-4 rounded-md shadow-md mt-12 text-white text-2xl text-bold'>Upload</button>
            }
        </div>
    )
}

export default PdfUpload