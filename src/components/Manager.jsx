import React from 'react'
import { useState, useEffect } from 'react'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("https://passop-backend-pz3ec6yfy-bilal-rasheeds-projects-79a2e560.vercel.app")
        let passwords = await req.json()
        setpasswordArray(passwords)

    }

    useEffect(() => {
        getPasswords()


    }, [])


    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eye.png")) {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            console.log(form)

             await fetch("https://passop-backend-pz3ec6yfy-bilal-rasheeds-projects-79a2e560.vercel.app", {
                method: "DELETE", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id:form.id })
            })

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("https://passop-backend-pz3ec6yfy-bilal-rasheeds-projects-79a2e560.vercel.app", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, id: uuidv4() })
            })

            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form])
        }
        else {
            alert("Password not saved!")
        }
    }

    const editPassword = (id) => {
        console.log("Editing Password with id :", id)
        setForm({...passwordArray.filter(i => i.id === id)[0],id:id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const deletePassword = async (id) => {
        let c = confirm("Are you sure you want to delete ?")
        if (c) {
            console.log("Delting Password with id :", id)
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            let res = await fetch("https://passop-backend-pz3ec6yfy-bilal-rasheeds-projects-79a2e560.vercel.app", {
                method: "DELETE", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item.id !== id)))

        }
    }


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full
      bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),
      linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto
         h-[310px] w-[310px] rounded-full bg-green-400
         opacity-20 blur-[100px]"></div></div>

            <div className=" md:mycontainer min-h-[85vh]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    Pass<span className='text-green-500'>OP&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>


                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} className='rounded-full border border-green-600 w-full px-4 py-1'
                        placeholder='Enter Website URL' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full gap-8">
                        <input value={form.username} onChange={handleChange} className='rounded-full border border-green-600 w-full px-4 py-1'
                            placeholder='Enter Username' type="text" name="username" id="usernam" />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} className='rounded-full border border-green-600 w-full px-4 py-1'
                                placeholder='Enter Password' type="password" name="password" id="password" />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400
                    hover:bg-green-300 rounded-full px-8 py-2 w-fit gap-2 border-2 border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/gzqofmcx.json"
                            trigger="hover">
                        </lord-icon>
                        Save </button>
                </div>
                <div className="passwords">
                    <h1 className='font-bold text-2xl py-3 text-center'>Your Passwords</h1>
                    {passwordArray.length === 0 && <div> No Passwrods to Show </div>}
                    {passwordArray.length !== 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-1'>Site</th>
                                <th className='py-1'>Username</th>
                                <th className='py-1'>Passwords</th>
                                <th className='py-1'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='gap-2 items-center py-2 text-center w-32 flex'><a href={item.site} target='_blank'>{item.site}</a></td>
                                    <td className='py-2 text-center w-32'>{item.username}</td>
                                    <td className='py-2 text-center w-32'>{item.password}</td>
                                    <td className='py-2 text-center w-32'>
                                        <span className='flex justify-center items-center mx-2 w-13 gap-2 px-1'>
                                            <span onClick={() => {
                                                editPassword(item.id)
                                            }} className='cursor-pointer'>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/exymduqj.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </span>

                                            <span onClick={() => {
                                                deletePassword(item.id)
                                            }} className='cursor-pointer'>


                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xyfswyxf.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>

                                            </span>


                                        </span>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>


            </div>


        </>
    )
}

export default Manager
