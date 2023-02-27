class Users::RegistrationsController < Devise::RegistrationsController
  def create
    user = User.create!(user_params)
    sign_in :user, user
    render status: :ok, json: {notice: "Signed up successfully", user: user}
  end

  private

  def user_params
     params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
