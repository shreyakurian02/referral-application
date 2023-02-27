class ReferralsController < ApplicationController
  def index
    render status: :ok, json: { referrals: current_user.referrals }
  end

  def create
    current_user.referrals.create!(referral_params)
    ApplicationMailer.with(from_email: current_user.email,to_email: referral_params[:email] ).send_welcome_email.deliver
    render status: :ok, json: { notice: "Mail was sent to the referred email" }
  end

  private

  def referral_params
     params.require(:referral).permit(:email)
  end
end
