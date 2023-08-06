'use client'
import React from 'react'
import { GeneralContext } from '@context/general';
import { API_PDF } from '@utils/apis';
import axios from 'axios'
import PdfUpload from '@components/PdfUpload';
import Notes_map from '@components/notes_map';
import Pyq_map from '@components/pyq_map';

function page() {

    const [mode, setMode] = React.useState('PYQ');
    const general = React.useContext(GeneralContext);
    const [upload, setUpload] = React.useState(false)
    const [pyqs, setPyqs] = React.useState([]);
    const [notes, setNotes] = React.useState([]);
    const [SubjectRelationId, setSubjectRelationId] = React.useState('')

    React.useEffect(() => {
        if (!general.subject) {
            var subb = localStorage.getItem('subject')
            general.setSubject(JSON.parse(subb))
        } else {
            localStorage.setItem('subject', JSON.stringify(general.subject))
            const getSubject = async () => {
                await axios.get(API_PDF, {
                    headers: {
                        "cooked": general.subject._id,
                        "named": general.subject.name
                    }
                }).then((response) => {
                    if (response.data.status) {
                        setPyqs(response.data.pdf.pyqs)
                        setNotes(response.data.pdf.notes)
                        setSubjectRelationId(response.data.pdf.SubjectRelationId)
                    } else {
                        alert('Something Bhent wrong')
                    }
                })
            }
            getSubject()
        }
    }, [general.subject])

    return (
        <div className="mt-36 mb-24 flex flex-col justify-center place-items-center">

            {
                general.subject &&
                <PdfUpload props={{ upload, setUpload, general, mode }} />
            }

            <div style={{ display: upload ? 'none' : 'block' }} className="py-8 bg-slate-400 w-4/5 rounded-lg shadow-md">
                <h1 className="mb-12 text-xl md:text-3xl text-center text-bold border-b-2 pb-4 text-white">{general.subject ? general.subject.name : ''}</h1>
                <div className="py-6 flex justify-center place-items-center gap-8">
                    <button onClick={() => setMode('PYQ')} style={{ transition: 'all 0.4s', transform: mode === 'PYQ' ? 'translateY(-1.8rem)' : 'translateY(0)' }} className="w-1/3 bg-blue-500 rounded-md shadow-md py-4 text-white text-bold">PYQ</button>
                    <button onClick={() => setMode('NOTES')} style={{ transition: 'all 0.4s', transform: mode === 'NOTES' ? 'translateY(-1.8rem)' : 'translateY(0)' }} className="w-1/3 bg-blue-500 rounded-md shadow-md py-4 text-white text-bold">Notes</button>
                </div>
            </div>

            <div style={{ display: upload ? 'none' : 'block' }} className="py-8 mt-8 bg-slate-400 w-4/5 rounded-lg shadow-md">
                <div className="flex border-b-2 pb-6 justify-around place-items-center">
                    <h1 className="text-xl md:text-3xl text-center text-bold text-white">{mode}</h1>
                    <button onClick={() => setUpload(true)} className='bg-blue-700 text-white rounded-md shadow-md py-4 px-6 md:px-12 duration-200 hover:bg-orange-400'>Upload {mode}</button>
                </div>
                <div className='flex flex-col justify-center place-items-center py-12'>
                    {
                        mode === 'PYQ' ?
                            (
                                pyqs.length === 0 ?
                                    <h1>Nothing is uploaded yet</h1>
                                    :
                                    <Pyq_map pyqs={pyqs} general={general} SubjectRelationId={SubjectRelationId} />
                            )
                            :
                            (
                                notes.length === 0 ?
                                    <h1>Nothing is uploaded yet</h1>
                                    :
                                    <Notes_map notes={notes} general={general} SubjectRelationId={SubjectRelationId} />
                            )
                    }
                </div>
            </div>

        </div>
    )
}

export default page