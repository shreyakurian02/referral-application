class ReferralsController < ApplicationController
  def index
    render status: :ok, json: { referrals: current_user.referrals }
  end

  def create
    Referrals::CreationService.new(current_user, referral_params).process
    render status: :ok, json: { notice: "Mail was sent to the referred email" }
  end

  private

  def referral_params
     params.require(:referral).permit(:email)
  end
end
