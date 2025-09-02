export const BASE_URL = "http://localhost:3000"
const connect = {
     doc_List: BASE_URL + "/doctor/doctorList",

     doc_signUp: BASE_URL + "/doctor/signUP",
     doc_signIn: BASE_URL + "/doctor/signIn",
     doc_signOut: BASE_URL + "/doctor/signOut",
     doc_profile : BASE_URL + "/doctor/fetchProfile",
     doc_profileUpdate : BASE_URL + "/doctor/updateProfile",
     get_profile : BASE_URL + "/doctor/profile",
     search_doc : BASE_URL +"/doctor/search",

     pat_signUp: BASE_URL + "/patient/signUp",
     pat_signIn: BASE_URL + "/patient/signIn",
     pt_signOut: BASE_URL + "/patient/signOut",

     take_aptmt: BASE_URL + "/aptmt/create",
     

}
export default connect;