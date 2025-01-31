import React, { useEffect, useState } from "react";
import './Donations.css';
import { UserDonationDto, UserDto } from "types-api-volunteer/src";
import { fetchUserDonations } from "../../api/DonationApi";
import UserDonation from "./UserDonation";

interface DonationsProps{
    user: UserDto
}

const Donations: React.FC<DonationsProps> = ({user}) => {
    const [donations, setDonations] = useState<UserDonationDto[]>();
    
    useEffect(() => {
        const fetchAndSetDonations = async(userId: string) => {
            try{
                const token = localStorage.getItem('token');
                if(token){
                    const fetchedDonations: UserDonationDto[] = await fetchUserDonations(token, userId);
                    setDonations(fetchedDonations);
                }
            }catch(error){
                console.error("Error fetching user donations : ", error);
                setDonations([]);
            }
        }
        fetchAndSetDonations(user._id)
    }, [user._id]);

    return(
        <div className="user-donations-box">
            <h2><strong>Your donations</strong></h2>
            {donations &&
                donations.map((donation, index) => (
                    <UserDonation donation={donation}/>
                ))
            }
        </div>
    )
} 

export default Donations;