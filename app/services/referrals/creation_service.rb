# frozen_string_literal: true

class Referrals::CreationService
  attr_reader :current_user, :referral_params

  def initialize(current_user, referral_params = {})
    @referral_params = referral_params
    @current_user = current_user
  end

  def process
    Referral.transaction do
      current_user.referrals.create!(referral_params)
      ReferrerMailer.with(to_email: referral_params[:email] ).send_welcome_email.deliver
    end
  end
end
