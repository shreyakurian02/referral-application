class Referral < ApplicationRecord
  validates :email, presence: true, format: { with: Constants::VALID_EMAIL_REGEX}

  belongs_to :user
end
