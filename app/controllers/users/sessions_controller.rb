class Users::SessionsController < Devise::SessionsController
  def create
    @user = User.find_by!(email: user_params[:email])
    if @user.valid_password?(user_params[:password])
      sign_in :user, @user
      render status: :ok, json: @user
    else
      invalid_login_attempt
    end
  end

  def destroy
    sign_out(@user)
    render :json=> {:success=>true}
  end

  private

    def invalid_login_attempt
      warden.custom_failure!
      render json: {error: 'Invalid login attempt'}, status: :unprocessable_entity
    end

    def user_params
       params.require(:user).permit(:email, :password)
    end
end
