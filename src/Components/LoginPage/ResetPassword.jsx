import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../../appwriteConfig";
import "./ResetPassword.css";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const searchParams = new URLSearchParams(window.location.search);
        const userId = searchParams.get("userId");
        const secret = searchParams.get("secret");

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            await account.updateRecovery(
                userId,
                secret,
                password,
                confirmPassword
            );
            alert("Password has been reset successfully.");
            navigate("/loginpage");
        } catch (error) {
            console.error("Password reset failed:", error.message);
            alert("Password reset failed: " + error.message);
        }
    };

    return (
        <div className="ResetPas-main">
            <div className="Resetpas">
                <form onSubmit={handleResetPassword} className="Resetpas-form">
                    <h2>Reset Password</h2>
                    <div>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Reset Password</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
