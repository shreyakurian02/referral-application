class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :referrals, dependent: :destroy

  validates :email, presence: true, format: { with: Constants::VALID_EMAIL_REGEX }
end
