function Update_pro(){
const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: doctor?.name || "",
        specialization: doctor?.doctorInfo?.specialization || "",
        bio: doctor?.profile?.bio || "",
        experience: doctor?.doctorInfo?.experience || "",
        availability: doctor?.availability || "",
        address: doctor?.profile?.address || "",
    });
        const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await axios.patch(`${EndPoint.doc_profileUpdate}`,formData,{withCredentials:true});
            setIsEditing(false);
            loadDoctors();
        } catch (error) {
            console.log("Error updating profile", error);
        }
    };


    return(
        <>

        </>
    )
}
export default Update_pro;