import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BookingsRow from "./BookingsRow";


const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);


    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setBookings(data))

    }, [url])

    
    const handleDelete = id => {
        const proceed = confirm('Are you sure you want to delete');
        if (proceed) {
            fetch(`http://localhost:5000/bookings/${id}`,{
            
                method:'DELETE'
            })
            .then(res =>res.json())
            .then(data =>{
                console.log(data);
                if(data.deletedCount > 0){
                    alert('deleted successful');
                    const remaining = bookings.filter(booking =>booking._id !== id);
                    setBookings(remaining)
                }
            })
        }
    }
    const handleBookingConfirm = id =>{
        fetch(`http://localhost:5000/bookings/${id}`,{
            method:'PATCH',
            headers:{
                'content-type' :'application/json'
            },
            body:JSON.stringify({status: 'confirm'})
        })
        .then(res =>res.json())
        .then(data =>{
            console.log(data);
            if(data.modifiedCount >0 ){
                const remaining = bookings.filter(booking =>booking._id !== id);
                const updated = bookings.find(booking =>booking._id===id);
                updated.status = 'confirm'
                const newBookings = [updated, ...remaining]
                setBookings(newBookings)

            }
        })
    }
    

    return (
        <div>
            <h1 className="text-xl text-green-600 text-center">Your Bookings :{bookings.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>

                            <th className="text-xl text-green-500 font-bold">Image</th>
                            <th className="text-xl text-green-500 font-bold">Product</th>
                            <th className="text-xl text-green-500 font-bold">Date</th>
                            <th className="text-xl text-green-500 font-bold">Price</th>
                            <th className="text-xl text-green-500 font-bold">Status</th>

                        </tr>
                       
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingsRow key={booking._id} booking={booking} handleDelete={handleDelete} handleBookingConfirm={handleBookingConfirm}></BookingsRow>)
                        }



                    </tbody>


                </table>
            </div>

        </div>
    );
};

export default Bookings;