require "test_helper"

class ReferralTest < ActiveSupport::TestCase
  def setup
    user = User.create("email":"example@gmail.com", password: "test_password" )
    @referred_user = Referral.new(user_id: user.id, email: "example@yahoo.com")
  end

  def test_password_is_required
    @referred_user.user_id = ""
    assert @referred_user.invalid?
  end

  def test_email_is_required
    @referred_user.email = ""
    assert @referred_user.invalid?
  end

  def test_email_is_valid
    assert @referred_user.valid?

    @referred_user.email = "qwweee"
    assert @referred_user.invalid?
  end
end
