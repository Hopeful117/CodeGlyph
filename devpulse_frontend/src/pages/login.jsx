
import {useState } from 'react';
import { MagicLoginRequest} from '../api/auth';

const LoginPage = () => {
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");


  
 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await MagicLoginRequest(email)
    setMessage("A link was set to your email");
} catch (error) {
   setMessage(error.message || "Error while sending link, please verify your email");
  }
};
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Magic Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
         Send Link
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default LoginPage;
