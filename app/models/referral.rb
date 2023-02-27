class Referral < ApplicationRecord
  validates :email, presence: true

  belongs_to :user
end
