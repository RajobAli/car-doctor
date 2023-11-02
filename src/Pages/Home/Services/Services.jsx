import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
    const [services,setServices] = useState([]);
    useEffect(()=>{
        //https://car-doctor-server-a6fbn02qn-arajob039-gmailcom.vercel.app

        fetch('http://localhost:5000/services')
        .then(res=>res.json())
        .then(data =>setServices(data))
    },[])

 
    return (
        <div className="mt-4 mb-4">
            <div className="text-center">
                <h3 className="text-3xl font-bold text-orange-600">Our Services</h3>
                <h2 className="text-5xl">Our services Area</h2>
                <p>This is the go of the world .This is the go of the world</p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 items-center justify-center gap-4">
            {
                services.map(service =><ServiceCard key={service._id} service={service}></ServiceCard>)
            }
            </div>

        </div>
    );
};

export default Services;