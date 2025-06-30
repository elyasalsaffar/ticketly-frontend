import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"


const SubmitTicket = () => {
    const navigate = useNavigate();
    const initialState = {
        title: "",
        description: "",
        department: "inquiry",
        priority: "medium",
    }

    const [ formState , setFormState ] = useState(initialState)


    const handleChange = (event) => {
        setFormState({...formState, [event.target.id] : event.target.value})
    } 

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:3001/issues', formState)
        setFormState(initialState)
        getIssue()
        navigate("/tickets") // 
}


return (

    <form 

    onSubmit={handleSubmit}>
        <div>
            <label>Title:</label>
            <input 
            type= "text"
            name= "title"
            value= {formState.title}
            onChange={handleChange}
            required
            />
        </div>

        <div>
            <label> Decription: </label>
            <texterea 
            name= "description"
            value= {formState.description}
            onChange={handleChange}
            rows="6"
            required
            />

        </div>

        <div>
            <label>Department:</label>
            <select
             name= "department"
             value= {formState.department}
             onChange={handleChange}
             required
            >
            <option value="inquiry ">Inquiry </option>
            <option value="hardware ">Hardware </option>
            <option value="software ">Software </option>
            <option value="network ">Network </option>
            </select>
        </div>

        <div>
            <label>Priority:</label>
            <select
             name="priority"
             value={formState.priority}
             onChange={handleChange}
             required
            >
            <option value="low ">Low </option>
            <option value="medium ">Medium </option>
            <option value="high ">Software </option>
            </select>
        </div>

        <button type="submit">Submit Ticket</button>
    



    </form>

) }

export default SubmitTicket