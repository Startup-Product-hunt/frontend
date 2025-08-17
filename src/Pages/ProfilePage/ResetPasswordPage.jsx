// ResetPasswordPage.jsx
import { useParams } from "react-router-dom";
import LoginModal from "../../Components/Modals/LoginModel";
import Layout from "../../Components/Layout/Layout";

const ResetPasswordPage = () => {
  const { token } = useParams();

  return (
    <Layout>
     
      <div className="fixed inset-0 bg-black/10 backdrop-blur-md flex items-center justify-center z-50">
       
        <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-0 relative">
          <LoginModal defaultView="reset" resetToken={token} />
        </div>
      </div>
    </Layout>
  );
};


export default ResetPasswordPage;
