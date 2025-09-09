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
     add_certificate:BASE_URL+"/doctor/certificate",
     add_post:BASE_URL+"/post/",

     pat_signUp: BASE_URL + "/patient/signUp",
     pat_signIn: BASE_URL + "/patient/signIn",
     pt_signOut: BASE_URL + "/patient/signOut",
     pt_Profile: BASE_URL +"/patient/fethcProfile",
     pt_updateProfile : BASE_URL + '/patient/updateProfile',
     take_aptmt: BASE_URL + "/aptmt/create",
     
     fetch_post: BASE_URL + "/post/getposts",
     fetchPost_Id:BASE_URL+"/post/get/",
     

}
export default connect;