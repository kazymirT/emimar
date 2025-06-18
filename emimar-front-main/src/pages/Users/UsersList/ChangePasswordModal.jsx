import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLazyResetPasswordQuery } from "../../../store/auth/auth.api";

export const ChangePasswordModal = ({ onClose, onRefetchUser, user }) => {
  const [newPassword, setNewPassword] = useState({
    password: "",
    password_confirmation: "",
  });

  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [resetPassword] = useLazyResetPasswordQuery();

  useEffect(() => {
    const overlay = document.querySelector(".modal-backdrop");
    overlay?.classList.add("show");
    return () => overlay?.classList.remove("show");
  }, [user]);

  const validateForm = () => {
    const { password, password_confirmation } = newPassword;

    if (password.length < 8 || password_confirmation.length < 8) {
      setValidationError("Пароль має бути не менше 8 символів.");
      return false;
    }

    if (password !== password_confirmation) {
      setValidationError("Паролі не збігаються.");
      return false;
    }

    setValidationError("");
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const { password, password_confirmation } = newPassword;

    resetPassword({ email: user.email, password, password_confirmation }).then(
      (resp) => {
        if (resp.isSuccess) {
          onClose();
          onRefetchUser();
          toast.success("Успішно змінено пароль");
        } else {
          toast.error("Помилка при зміні паролю");
        }
      }
    );
  };

  const isFormInvalid =
    !newPassword.password || !newPassword.password_confirmation;

  return (
    <div
      className="modal fade show"
      tabIndex={-1}
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog" role="document">
        <form className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Change password</h5>
            <button
              className="close"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              <em className="icon ni ni-cross" />
            </button>
          </div>

          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">New password</label>
              <div className="form-control-wrap">
                <div
                  className={`form-icon form-icon-right passcode-switch ${
                    showPassword ? "is-shown" : ""
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <em className="passcode-icon icon-show icon ni ni-eye" />
                  <em className="passcode-icon icon-hide icon ni ni-eye-off" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="form-control"
                  value={newPassword.password}
                  onChange={(e) =>
                    setNewPassword({
                      ...newPassword,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">New password confirmation</label>
              <div className="form-control-wrap">
                <div
                  className={`form-icon form-icon-right passcode-switch ${
                    showPasswordConfirm ? "is-shown" : ""
                  }`}
                  onClick={() =>
                    setShowPasswordConfirm(!showPasswordConfirm)
                  }
                >
                  <em className="passcode-icon icon-show icon ni ni-eye" />
                  <em className="passcode-icon icon-hide icon ni ni-eye-off" />
                </div>
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  className="form-control"
                  value={newPassword.password_confirmation}
                  onChange={(e) =>
                    setNewPassword({
                      ...newPassword,
                      password_confirmation: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {validationError && (
              <div className="alert alert-danger mt-2">{validationError}</div>
            )}
          </div>

          <div className="modal-footer bg-light">
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isFormInvalid}
              type="button"
            >
              Change password
            </button>
            <button className="btn btn-light" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
